'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Upload = models.upload
const User = models.user
const moment = require('moment')

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const s3Upload = require('../../lib/s3-upload')

// multer is a package, installed already in the api template
const multer = require('multer')
const multerUpload = multer({ dest: '/tmp/' })

// Retrieve all of the uploaded items
const index = (req, res, next) => {
  // console.log('req.body is', req.body)
  // console.log('req.file ', req.file)

  Upload.find()
    .then(uploads => res.json({
      uploads: uploads.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

const indexByUser = (req, res, next) => {
  const uploadsByDate = {}
  let email = ''
  User.findOne({_id: req.params.id}, {email: 1, _id: 0})
  .then(user => {
    // console.log(email)
    email = user.email
  })
  .then(() =>
   Upload.find({_owner: req.params.id})
  )
  // get unique dates
  .then(uploads => {
    // const uploadsByDate = {}
    const dates = uploads.map(upload => {
      // return upload.createdAt
      return moment(upload.createdAt).format('MM-DD-YYYY')
    })
    const uniqueDates = dates.filter((e, i, a) => a.indexOf(e) === i)
    uniqueDates.forEach((date) => {
      // make each unique date a key on the object, then set the
      // value to be the array of documents that has that createdAt
      uploadsByDate[date] = uploads.filter(upload => {
        return moment(upload.createdAt).format('MM-DD-YYYY') === date
      })
    })
    // return uploadsByDate
  })
  .then(() => res.json({
    email: email,
    uploads: uploadsByDate
  }))
  .catch(next)
}

// setModel(Upload) is going to search for the id in the request
// Once it finds that id, it will return the uploadSchema
// setModel will add it to the request
// Then, show will take in the request and generate a JSON response
const show = (req, res) => {
  res.json({
    upload: req.upload.toJSON({ virtuals: true, user: req.user })
  })
}

// const file = {
//   path: process.argv[2],
//   title: process.argv[3] || 'default'
// }

const create = (req, res, next) => {
  console.log('req.body is', req.body)
  // next()
  // const tags = JSON.parse(req.body.image.tags)
  const title = req.body.image.title.trim() || req.file.originalname
  const path = moment().add(-1, 'days').format('MM-DD-YYYY')
  console.log(title)
  console.log(req.file.originalname)
  const file = {
    path: req.file.path,
    title: title,
    originalname: req.file.originalname,
    mimetype: req.file.mimetype
  }
  // include s3 upload?
  s3Upload(file)
    .then((s3Response) => {
      return Upload.create({
        url: s3Response.Location,
        title: file.title,
        path: path,
        // tags: tags,
        _owner: req.user._id
      })
    })
    .then((upload) => res.json({ upload }))
    .catch((error) => next(error))
}

const update = (req, res, next) => {
  delete req.body._owner  // disallow owner reassignment.
  delete req.body.url // disallow url reassignment
  req.upload.update(req.body.upload)
    .then(() => res.sendStatus(204))
    .catch(next)
}

const destroy = (req, res, next) => {
  req.upload.remove()
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy,
  indexByUser
}, { before: [
  { method: multerUpload.single('image[file]'), only: ['create'] },
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Upload), only: ['show'] },
  { method: setModel(Upload, { forUser: true }), only: ['update', 'destroy'] }
] })
