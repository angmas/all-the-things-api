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
| GET    | `/uploadowners`                | `users#usersWithDocs`     |
| GET    | `/folders/:id`                 | `uploads#folders`         |
| GET    | `/uploads/folder/:path/:owner` | `uploads#uploadsByFolder` |


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
<td>images</td>
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

`script/uploads/get-all-uploads.sh`

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

The `create` action expects a *POST* of `image` that is created using the
[]`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
interface, e.g. :

```html
<form id="add-item"  enctype="multipart/form-data">
  <fieldset>
    <legend>Upload a File</legend>
    <label>
      Title
      <input type="text" name="image[title]" placeholder='140 character limit' maxlength=140 required >
    </label>
    <label>
      Image
      <input type="file" name="image[file]" required>
    </label>
    <input type="submit" name="submit" value="Upload">
  </fieldset>
    </form>
```


If the request is successful, the response will have an HTTP Status of 201
 Created, and the body will contain JSON of the created upload, e.g.:

```json
{
	"upload": {
		"__v": 0,
		"updatedAt": "2017-05-18T19:20:32.359Z",
		"createdAt": "2017-05-18T19:20:32.359Z",
		"url": "https://angmas-bucket.s3.amazonaws.com/2017-05-18/0fcfcb08a12f4ded7586d76231151d94.txt",
		"title": "test",
		"path": "05-18-2017",
		"_owner": "591c59777727f733df13226d",
		"_id": "591df40084c548e52ec28ae8",
		"tags": [],
		"length": 4,
		"id": "591df40084c548e52ec28ae8",
		"editable": false
	}
}
```

If the request is unsuccessful, the response will have an HTTP Status of 400 Bad
 Request, and the response body will be JSON describing the errors.


 ### show

 The `show` action is a *GET* specifing the `id` of the upload to retrieve, e.g.:


`scripts\uploads\get-one-upload.sh`

 ```curl
 API="http://localhost:4741"
 URL_PATH="/uploads"
 ID="<document id>"
 TOKEN="<put in token value>"

 curl "${API}${URL_PATH}/${ID}" \
   --include \
   --request GET \
   --header "Authorization: Token token=$TOKEN"
 ```
 If the request is successful the status will be 200, OK, and the response body
  will contain JSON for the upload requested, e.g.:

 ```json
 {
	"upload": {
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
		"editable": false
	}
}
 ```

 ### update

 #### update a game's states

 This `update` action expects a *PATCH* with changes to to an existing game,
  e.g.:

 ```html
 <form id="update-item" enctype="multipart/form-data">
  <fieldset>
    <legend>Update a File</legend>
    <label>
        Title
        <input type="text" name="upload[title]" id="update-upload-title"  maxlength=140 required>
    </label>
    <input type="submit" name="submit" value="Update" id="submit-update-form-button">
  </fieldset>
  </form>
 ```
`scripts/uploads/update-upload.sh`

```curl
API="http://localhost:4741"
URL_PATH="/uploads"
ID="<document id>"
TOKEN="<put in token value>"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "upload": {
      "title": "'"${TITLE}"'"
    }
  }'
```
```json
 {
   "upload": {
     "title": "change title"
   }
 }
 ```

 If the request is successful, the response body will contain JSON containing an array of document owners and their respective `id`.

 ```json
 {
	"users": [
		{
			"email": "a",
			"id": "591c59777727f733df13226d"
		},
		{
			"email": "b",
			"id": "591c877eabc5913dc26bbfab"
		}
	]
}
 ```

 If the request is unsuccessful, the response will have an HTTP Status of 400 Bad
  Request, and the response body will be JSON describing the errors.

# Get Document Owners

The `usersWithDoc` action is a *GET* that retrieves all the users that have
uploads.

`scripts/users/allusers.sh`

```curl
API="http://localhost:4741"
URL_PATH="/allusers"
TOKEN="<put in token value>"
curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Token token=$TOKEN"
```
If the request is successful, the response will have an HTTP Status of 204 No Content.

If the request is unsuccessful, the response will have an HTTP Status of 400 Bad
 Request, and the response body will be JSON describing the errors.


# Get Folders By Owner
The `uploadsByFolder` action is a *GET* that retrieves all of an owner's folders names.

`scripts/uploads/get-folders.sh`

```curl
API="http://localhost:4741"
URL_PATH="/folders"
TOKEN="<put in token value"
ID="<owner id>"
curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  --header "Authorization: Token token=$TOKEN"
```

If the request is successful, the response body will contain JSON containing an array of folder paths for the owner, e.g.:

```json
{
	"user": {
		"email": "a",
		"id": "591c59777727f733df13226d"
	},
	"folders": [
		"05-17-2017",
		"05-18-2017"
	]
}
```

If the request is unsuccessful, the response will have an HTTP Status of 400 Bad
 Request, and the response body will be JSON describing the errors.


# Get Documents By Folder
The `uploadsByFolder` action is a *GET* that retrieves all an owner's documents for the specified `path`.

```curl
API="http://localhost:4741"
URL_PATH="/uploads/folder"
TOKEN="<put in token value>"
FOLDER="05-16-2017"
ID="<owner id>"
curl "${API}${URL_PATH}/${FOLDER}/${ID}" \
  --include \
  --request GET \
  --header "Authorization: Token token=$TOKEN"
```
If the request is successful, the response body will contain JSON containing an array of documents for that owner's specified path, e.g.:

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
		}
	]
}
```
If the request is unsuccessful, the response will have an HTTP Status of 400 Bad
 Request, and the response body will be JSON describing the errors.
