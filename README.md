# An All-the-things data store API

An API to store All-the-things data. It allows the players to register as users of the API, upload and manage their own files, while sharing content with others in the All-the-things community.

## API end-points
| Verb   | URI Pattern                    | Controller#Action         |
|--------|--------------------------------|---------------------------|
| POST   | `/sign-up`                     | `users#signup`            |
| POST   | `/sign-in`                     | `users#signin`            |
| DELETE | `/sign-out/:id`                | `users#signout`           |
| PATCH  | `/change-password/:id`         | `users#changepw`          |
| GET    | `/uploads`                     | `uploads#index`           |
| POST   | `/uploads`                     | `uploads#create`          |
| GET    | `/uploads/:id`                 | `uploads#show`            |
| PATCH  | `/uploads/:id`                 | `uploads#update`          |
| GET    | `/uploads/folder/:path/:owner` | `uploads#uploadsByFolder` |
| GET    | `/folders/:id`                 | `uploads#folders`         |
| GET    | `/uploadowners`                | `users#usersWithDocs`     |

All data returned from API actions is formatted as JSON.

---

## User actions

*Summary:*

<table>
<tr>
  <th colspan="3">Request</th>
  <th colspan="2">Response</th>
</tr>
<tr>
  <th>Verb</th>
  <th>URI</th>
  <th>body</th>
  <th>Status</th>
  <th>body</th>
</tr>
<tr>
<td>POST</td>
<td>`/sign-up`</td>
<td><strong>credentials</strong></td>
<td>201, Created</td>
<td><strong>user</strong></td>
</tr>
<tr>
  <td colspan="3"></td>
  <td>400 Bad Request</td>
  <td><em>empty</em></td>
</tr>
<tr>
<td>POST</td>
<td>`/sign-in`</td>
<td><strong>credentials</strong></td>
<td>200 OK</td>
<td><strong>user w/token</strong></td>
</tr>
<tr>
  <td colspan="3"></td>
  <td>401 Unauthorized</td>
  <td><em>empty</em></td>
</tr>
<tr>
<td>DELETE</td>
<td>`/sign-out/:id`</td>
<td>empty</td>
<td>201 Created</td>
<td>empty</td>
</tr>
<tr>
  <td colspan="3"></td>
  <td>401 Unauthorized</td>
  <td><em>empty</em></td>
</tr>
<tr>
<td>PATCH</td>
<td>`/change-password/:id`</td>
<td><strong>passwords</strong></td>
<td>204 No Content</td>
<td><strong>user w/token</strong></td>
</tr>
<tr>
  <td colspan="3"></td>
  <td>400 Bad Request</td>
  <td><em>empty</em></td>
</tr>
</table>


### signup

The `create` action expects a *POST* of `credentials` identifying a new user to
 create, e.g. using `getFormFields`:

```html
<form>
  <input name="credentials[email]" type="text" value="an@example.email">
  <input name="credentials[password]" type="password" value="an example password">
  <input name="credentials[password_confirmation]" type="password" value="an example password">
</form>

```

or using `JSON`:

```json
{
  "credentials": {
    "email": "an@example.email",
    "password": "an example password",
    "password_confirmation": "an example password"
  }
}
```

The `password_confirmation` field is optional.

If the request is successful, the response will have an HTTP Status of 201,
 Created, and the body will be JSON containing the `id` and `email` of the new
 user, e.g.:

```json
{
  "user": {
    "id": 1,
    "email": "an@example.email"
  }
}
```

If the request is unsuccessful, the response will have an HTTP Status of 400 Bad
 Request, and the response body will be empty.

### signin

The `signin` action expects a *POST* with `credentials` identifying a previously
 registered user, e.g.:

```html
<form>
  <input name="credentials[email]" type="text" value="an@example.email">
  <input name="credentials[password]" type="password" value="an example password">
</form>
```

or:

```json
{
  "credentials": {
    "email": "an@example.email",
    "password": "an example password"
  }
}
```

If the request is successful, the response will have an HTTP Status of 200 OK,
 and the body will be JSON containing the user's `id`, `email`, and the `token`
 used to authenticate other requests, e.g.:

```json
{
  "user": {
    "id": 1,
    "email": "an@example.email",
    "token": "an example authentication token"
  }
}
```

If the request is unsuccessful, the response will have an HTTP Status of 401
 Unauthorized, and the response body will be empty.

### signout

The `signout` actions is a *DELETE* specifying the `id` of the user to sign out.

If the request is successful the response will have an HTTP status of 204 No
 Content.

If the request is unsuccessful, the response will have a status of 401
 Unauthorized.

### changepw

The `changepw` action expects a PATCH of `passwords` specifying the `old` and
 `new`.

If the request is successful the response will have an HTTP status of 204 No
 Content.

If the request is unsuccessful the reponse will have an HTTP status of 400 Bad
 Request.

---

The `sign-out` and `change-password` requests must include a valid HTTP header
 `Authorization: Token token=<token>` or they will be rejected with a status of
 401 Unauthorized.


## Upload actions

An upload is associated with a user. In the All-the-things community, a user has the ability to read and download any content, even those belonging to other users. A user may only make updates to the uploads that s/he owns.

All upload action requests must include a valid HTTP header `Authoriazation: Token token=<token>` or they will be rejected with a status of 401 Unauthorized.

All of the upload actions, except for `placeholder`, follow the RESTful style.



*Summary:*

<table>
<tr>
  <th colspan="3">Request</th>
  <th colspan="2">Response</th>
</tr>
<tr>
  <th>Verb</th>
  <th>URI</th>
  <th>body</th>
  <th>Status</th>
  <th>body</th>
</tr>
<tr>
<td>GET</td>
<td>`/uploads`</td>
<td>n/a</td>
<td>200, OK</td>
<td><strong>uploads</strong></td>
</tr>
<tr>
  <td colspan="3">
  Any user is authorized to do a GET for a single upload.
  </td>
  <td>401 Unauthorized</td>
  <td><em>empty</em></td>
</tr>
<tr>
<td>POST</td>
<td>`/uploads`</td>
<td>n/a</td>
<td>204, No Content</td>
<td><strong>n/a</strong></td>
</tr>
<tr>
  <td colspan="3">
  </td>
  <td>401 Unauthorized</td>
  <td><em>empty</em></td>
</tr>
<tr>
  <td colspan="3">
  </td>
  <td>400 Bad Request</td>
  <td><strong>errors</strong></td>
</tr>
<tr>
<td>GET</td>
<td>`/uploads/:id`</td>
<td>n/a</td>
<td>200, OK</td>
<td><strong>upload</strong</td>
</tr>
<tr>
  <td colspan="3">
  Any user is authorized to do a GET for a single upload.
  </td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td colspan="3">
  </td>
  <td>401 Unauthorized</td>
  <td><em>empty</em></td>
</tr>
<tr>
  <td colspan="3">
  </td>
  <td>404 Not Found</td>
  <td><em>empty</em></td>
</tr>
<tr>
<td>PATCH</td>
<td>`/uploads/:id`</td>
<td><em>upload</em></td>
<td>204, No Content</td>
<td><strong>empty</strong></td>
</tr>
<tr>
  <td colspan="3"></td>
  <td>400 Bad Request</td>
  <td><strong>errors</strong></td>
</tr>
<tr>
  <td colspan="3"></td>
  <td>400 Bad Request</td>
  <td><em>empty</em></td>
</tr>
<tr>
<td>GET</td>
<td>`/uploadowners`</td>
<td><strong>n/a</strong></td>
<td>200, OK</td>
<td><strong>users</strong></td>
</tr>
<tr>
  <td colspan="3"></td>
  <td>400 Bad Request</td>
  <td><strong>errors</strong></td>
</tr>
<tr>
  <td colspan="3"></td>
  <td>404 Not Found</td>
  <td><em>empty</em></td>
</tr>
<tr>
<td>GET</td>
<td>`/uploads/folder/:path/:owner`</td>
<td><strong>n/a</strong></td>
<td>200, OK</td>
<td><strong>user</strong></td>
</tr>
<tr>
  <td colspan="3"></td>
  <td>400 Bad Request</td>
  <td><strong>errors</strong></td>
</tr>
<tr>
  <td colspan="3"></td>
  <td>404 Not Found</td>
  <td><em>empty</em></td>
</tr>
<td>GET</td>
<td>`/folders/:id`</td>
<td><strong>n/a</strong></td>
<td>200, OK</td>
<td><strong>uploads</strong></td>
</tr>
<tr>
  <td colspan="3"></td>
  <td>400 Bad Request</td>
  <td><strong>errors</strong></td>
</tr>
<tr>
  <td colspan="3"></td>
  <td>404 Not Found</td>
  <td><em>empty</em></td>
</tr>
</table>

### index

The `index` action is a *GET* that retrieves all the uploads.

```curl script
API="http://localhost:4741"
URL_PATH="/uploads"
TOKEN="<put in token value>"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Token token=$TOKEN"
```
The response body will contain JSON containing an array of uploads, e.g.:

```json
{
	"uploads": [
		{
			"_id": "591cc467536d1569b139bf1a",
			"updatedAt": "2017-05-18T14:04:02.174Z",
			"createdAt": "2017-05-17T21:45:11.114Z",
			"url": "https://angmas-bucket.s3.amazonaws.com/2017-05-17/17e7f8f0d2b438d899a75bbab492563a.jpg",
			"title": "readme update",
			"path": "05-17-2017",
			"_owner": "591c59777727f733df13226d",
			"__v": 0,
			"tags": [],
			"length": 13,
			"id": "591cc467536d1569b139bf1a",
			"editable": true
		},
		{
			"_id": "591cc47d536d1569b139bf1b",
			"updatedAt": "2017-05-17T21:54:56.402Z",
			"createdAt": "2017-05-17T21:45:33.314Z",
			"url": "https://angmas-bucket.s3.amazonaws.com/2017-05-17/09f3ca217a85d06b9ee14dceb9ccd17c.jpg",
			"title": "updated file",
			"path": "05-17-2017",
			"_owner": "591c59777727f733df13226d",
			"__v": 0,
			"tags": [],
			"length": 12,
			"id": "591cc47d536d1569b139bf1b",
			"editable": true
		},
		{
			"_id": "591d7e665ad4d7b4784f3d04",
			"updatedAt": "2017-05-18T10:58:46.076Z",
			"createdAt": "2017-05-18T10:58:46.076Z",
			"url": "https://angmas-bucket.s3.amazonaws.com/2017-05-18/c81d3547b7727fb67625c47097b87d23.jpg",
			"title": "b's first file",
			"path": "05-18-2017",
			"_owner": "591c877eabc5913dc26bbfab",
			"__v": 0,
			"tags": [],
			"length": 14,
			"id": "591d7e665ad4d7b4784f3d04",
			"editable": false
		},
		{
			"_id": "591da719a88daecd40d9935e",
			"updatedAt": "2017-05-18T13:52:25.776Z",
			"createdAt": "2017-05-18T13:52:25.776Z",
			"url": "https://angmas-bucket.s3.amazonaws.com/2017-05-18/4f3f37758d730f4dcb22268fa71d3156.jpg",
			"title": "for readme",
			"path": "05-18-2017",
			"_owner": "591c59777727f733df13226d",
			"__v": 0,
			"tags": [],
			"length": 10,
			"id": "591da719a88daecd40d9935e",
			"editable": true
		}
	]
}
```

If there are no uploads at all, the response body will contain
 an empty uploads array, e.g.:

```json
{
  "uploads": [
  ]
}
```
### create

The `create` action expects a *POST* with an empty body (e.g `''` or `'{}'` if
 JSON).
If the request is successful, the response will have an HTTP Status of 201
 Created, and the body will contain JSON of the created upload, e.g.:

```json
{
  "game": {
    "id": 3,
    "cells": ["","","","","","","","",""],
    "over": false,
    "player_x": {
      "id": 1,
      "email": "and@and.com"
    },
    "player_o": null
  }
}
```

If the request is unsuccessful, the response will have an HTTP Status of 400 Bad
 Request, and the response body will be JSON describing the errors.
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
