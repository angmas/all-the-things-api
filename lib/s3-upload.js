'use strict'
// this loads our environment variables and gives
// us access to them via process.env.VARIABLENAME
require('dotenv').load()

const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const fs = require('fs')

const path = require('path')
// const mime = require('mime')

const crypto = require('crypto')

// const mongoose = require('../app/middleware/mongoose')
// const Upload = require('../app/models/upload')

const randomBytesPromise = function () {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, function (error, buffer) {
      if (error) {
        reject(error)
      } else {
        // console.log('inside crypto success', buffer.toString('hex'))
        resolve(buffer.toString('hex'))
      }
    })
  })
}

const s3UploadPromise = function (options) {
  // what happens if readStrem fails?
  const stream = fs.createReadStream(options.path)
  const ext = path.extname(options.originalname)
  const folder = new Date().toISOString().split('T')[0]

  const params = {
    ACL: 'public-read',
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${folder}/${options.name}${ext}`,
    Body: stream,
    ContentType: options.mimetype
  }

  return new Promise((resolve, reject) => {
    s3.upload(params, function (error, data) {
      if (error) {
        reject(error)
      } else {
        resolve(data)
      }
    })
  })
}
const s3Upload = function (file) {
  // this will now return a Promise
  // now, this is thenable
  return randomBytesPromise()
    .then((buffer) => {
      file.name = buffer
      return file
    })
    .then(s3UploadPromise)
    // .then(save it in the db)
    // .then((s3Response) => {
    //   console.log('inside s3 response is ', s3Response)
    //   return Upload.create({
    //     url: s3Response.Location,
    //     title: file.title
    //   })
    // })
    // .then(console.log)
    // .catch(console.error)
    // .then(() => mongoose.connection.close())
}

module.exports = s3Upload
