'use strict'

const s3Upload = require('../lib/s3-upload')

const mime = require('mime')

const mongoose = require('../app/middleware/mongoose')
const Upload = require('../app/models/upload')

const file = {
  path: process.argv[2],
  title: process.argv[3] || 'default',
  originalname: process.argv[2] // everything after the last slash
}

file.mimetype = mime.lookup(file.path)

s3Upload(file)
 .then((s3Response) => {
   console.log('inside s3 response is ', s3Response)
   return Upload.create({
     url: s3Response.Location,
     title: file.title
   })
 })
 .then(() => {
   console.log('File uploaded successfully')
 })
 .catch(console.error)
 .then(() => mongoose.connection.close())
