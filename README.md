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
```

Data needs to be stored in `image[file]`. 
