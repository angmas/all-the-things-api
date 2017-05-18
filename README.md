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

All upload action requests must include a valid HTTP header `Authoriazation: Token token=<token>` or they will be rejected with a status of 401 Unauthoirzed.

All of the upload actions, except for `placeholder`, follow the RESTful style.

An upload is associated with a user. In the All-the-things community, a user has the ability to read and download any content, even those belonging to other users. A user may only make updates to the uploads that s/he owns.

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
<td>`/games[?over=<true|false>]`</td>
<td>n/a</td>
<td>200, OK</td>
<td><strong>games found</strong></td>
</tr>
<tr>
  <td colspan="3">
  The optional `over` query parameter restricts the response to games with a
   matching `over` property.
  </td>
  <td>200, OK</td>
  <td><em>empty games</em></td>
</tr>
<tr>
  <td colspan="3">
  The default is to retrieve all games associated with the user..
  </td>
  <td>401 Unauthorized</td>
  <td><em>empty</em></td>
</tr>
<tr>
<td>POST</td>
<td>`/games`</td>
<td>n/a</td>
<td>201, Created</td>
<td><strong>game created</strong></td>
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
<td>`/games/:id`</td>
<td>n/a</td>
<td>200, OK</td>
<td><strong>game found</strong</td>
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
<td>`/games/:id`</td>
<td><em>empty</em></td>
<td>200, OK</td>
<td><strong>game joined</strong></td>
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
<td>PATCH</td>
<td>`/games/:id`</td>
<td><strong>game delta</strong></td>
<td>200, OK</td>
<td><strong>game updated</strong></td>
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
