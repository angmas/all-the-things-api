# All the Things

To create/upload a file:

```js
// Needs to be multipart/form-data
let data = new FormData(event.target)

return $.ajax({
  // url: 'http://localhost:4741/uploads',
  url: 'enter api url',
  method: 'POST',
  data,
  contentType: false,
  processData: false
})

}

{
  image[file]: //file data
  image[tags]:  // JSON stringified array of tags
}
```

Data needs to be stored in `image[file]`.

# Get Folders By User

## Route

/folders/:id

:id = Owner Id

## Returns

```js
{"user":{"email":"baduser","id":"591c58cdc62a9e09239ebc89"},"folders":["05-17-2017","05-16-2017"]}
```

# Get Documents By folder

## Route

/uploads/folder/:path/:owner

-   :path = folder path
-   :owner = user id

## Returns

```js
[{
	"_id": "591ca9b37456a62bfa356481",
	"updatedAt": "2017-05-17T19:51:15.720Z",
	"createdAt": "2017-05-17T19:51:15.720Z",
	"url": "https://wdi-documents.s3.amazonaws.com/2017-05-17/aef428f94dc92f7cf724070700360c75.png",
	"title": "jadams.png",
	"path": "05-16-2017",
	"_owner": "591c58cdc62a9e09239ebc89",
	"__v": 0,
	"tags": [],
	"length": 10,
	"id": "591ca9b37456a62bfa356481",
	"editable": false
}, {
	"_id": "591ca9b77456a62bfa356482",
	"updatedAt": "2017-05-17T19:51:19.167Z",
	"createdAt": "2017-05-17T19:51:19.167Z",
	"url": "https://wdi-documents.s3.amazonaws.com/2017-05-17/e1cbd4290963cc9e2d5d5610a649e809.png",
	"title": "jadams.png",
	"path": "05-16-2017",
	"_owner": "591c58cdc62a9e09239ebc89",
	"__v": 0,
	"tags": [],
	"length": 10,
	"id": "591ca9b77456a62bfa356482",
	"editable": false
}, {
	"_id": "591ca9bc7456a62bfa356483",
	"updatedAt": "2017-05-17T19:51:24.512Z",
	"createdAt": "2017-05-17T19:51:24.512Z",
	"url": "https://wdi-documents.s3.amazonaws.com/2017-05-17/6ee19c125664040935a954ccd323f50c.png",
	"title": "jim",
	"path": "05-16-2017",
	"_owner": "591c58cdc62a9e09239ebc89",
	"__v": 0,
	"tags": [],
	"length": 3,
	"id": "591ca9bc7456a62bfa356483",
	"editable": false
}]
```
