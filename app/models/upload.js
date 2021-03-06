'use strict'

const mongoose = require('mongoose')

const uploadSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    maxlength: [140, 'Title cannot exceed 140 characters']
  },
  tags: {
    type: Array,
    required: false
  },
  path: {
    type: String,
    require: true
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret, options) {
      const userId = (options.user && options.user._id) || false
      ret.editable = userId && userId.equals(doc._owner)
      return ret
    }
  }
})

uploadSchema.virtual('length').get(function length () {
  return this.title.length
})

const Upload = mongoose.model('Upload', uploadSchema)

module.exports = Upload
