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

# Get Documents By User

## Route

/useruploads/:id

:id = Owner Id

## Returns

```js
{
	"uploads": {
		"05-17-2017": [{
			"_id": "591c5a2990e5740cef976dbc",
			"updatedAt": "2017-05-17T14:11:53.394Z",
			"createdAt": "2017-05-17T14:11:53.394Z",
			"url": "https://wdi-documents.s3.amazonaws.com/2017-05-17/71058ae14f04a2bd991184110360173b.png",
			"title": "jadams.png",
			"_owner": "591c58cdc62a9e09239ebc89",
			"__v": 0,
			"tags": [],
			"length": 10,
			"id": "591c5a2990e5740cef976dbc",
			"editable": false
		}, {
			"_id": "591c5a4a4796320d0ae1c34d",
			"updatedAt": "2017-05-17T14:12:26.269Z",
			"createdAt": "2017-05-17T14:12:26.269Z",
			"url": "https://wdi-documents.s3.amazonaws.com/2017-05-17/7f289bd1265792934697b9ccee9fbfaf.png",
			"title": "jadams.png",
			"_owner": "591c58cdc62a9e09239ebc89",
			"__v": 0,
			"tags": [],
			"length": 10,
			"id": "591c5a4a4796320d0ae1c34d",
			"editable": false
		}]
	},
	"email": "baduser"
}
```
