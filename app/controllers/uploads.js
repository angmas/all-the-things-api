'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Upload = models.upload

// const authenticate = require('./concerns/authenticate')
// const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const s3Upload = require('../../lib/s3-upload')

// multer is a package, installed already in the api template
const multer = require('multer')
const multerUpload = multer({ dest: '/tmp/' })

const index = (req, res, next) => {
  Upload.find()
    .then(uploads => res.json({
      uploads: uploads.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

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
  console.log('req.file ', req.file)

  const file = {
    path: req.file.path,
    title: req.file.originalname,
    originalname: req.file.originalname,
    mimetype: req.file.mimetype
  }
  // include s3 upload?
  s3Upload(file)
    .then((s3Response) => {
      return Upload.create({
        url: s3Response.Location,
        title: file.title
      })
    })
    .then((upload) => res.json({ upload }))
    .catch((error) => next(error))
}

const update = (req, res, next) => {
  delete req.body._owner  // disallow owner reassignment.
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
  destroy
}, { before: [
  { method: multerUpload.single('image[file]'), only: ['create'] },
  // { method: setUser, only: ['index', 'show'] },
  // { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Upload), only: ['show'] },
  { method: setModel(Upload, { forUser: true }), only: ['update', 'destroy'] }
] })
