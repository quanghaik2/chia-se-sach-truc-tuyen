# Shared Books API Documentation

## Authentication

### Login

**Method:** POST
**Endpoint:** <https://shared-books.cyclic.app/api/auth/login>
**Request** Body:

- username
- password

### Register

**Method:** POST
**Endpoint:** <https://shared-books.cyclic.app/api/auth/register>
**Request** Body:

- name
- username
- password
- avatar

### Refresh Token

**Method:** POST
**Endpoint:** <https://shared-books.cyclic.app/api/auth/refreshToken>

## User

### Update User

**Method:** POST
**Endpoint:** <https://shared-books.cyclic.app/api/user/updateUser>
**Request** Body:

- name
- avatar

### Soft Delete User

**Method:** PUT
**Endpoint:** <https://shared-books.cyclic.app/api/user/softDelete>
**Request** Body:

- userId

### Get All Users

**Method:** GET
**Endpoint:** <https://shared-books.cyclic.app/api/user/>

### Get One User

**Method:** GET
**Endpoint:** <https://shared-books.cyclic.app/api/user/getOneUser/:userId>
**Request Params:**

- userId

### Get User by Name

**Method:** GET
**Endpoint:** <https://shared-books.cyclic.app/api/user/getUserByName/:name>
**Request Params:**

- name

## Books

### Create a Book

**Method:** POST
**Endpoint:** <https://shared-books.cyclic.app/api/book/>
**Request** Body:

- title
- content
- image

### Update Book

**Method:** PUT
**Endpoint:** <https://shared-books.cyclic.app/api/book/>
**Request** Body:

- bookId
- title
- content
- image

### Soft Delete Book

**Method:** PUT
**Endpoint:** <https://shared-books.cyclic.app/api/book/softDelete>
**Request** Body:

- bookId

### Get All Books

**Method:** GET
**Endpoint:** <https://shared-books.cyclic.app/api/book/>

### Get One Book By Slug

<<<<<<< HEAD
 **Method:** GET
 **Endpoint:** <https://shared-books.cyclic.app/api/book/getOneBook/:slug>
 **Request Params:**

- slug

### Get Book Id

 **Method:** GET
 **Endpoint:** <https://shared-books.cyclic.app/api/book/getBookId/:id>
 **Request Params:**

- id
=======
**Method:** GET
**Endpoint:** <https://shared-books.cyclic.app/api/book/getOneBook/:slug>
**Request Params:**

- slug

### Get One Book By Id

**Method:** GET
**Endpoint:** <https://shared-books.cyclic.app/api/book/getBookId/:id>
**Request Params:**

- id

>>>>>>> 60f24bb1c98915bb4a16a51c50f9c5412d79f10b
## Comments

### Create a Comment

**Method:** POST
**Endpoint:** <https://shared-books.cyclic.app/api/comment/>
**Request** Body:

- bookId
- comment

### Update Comment

**Method:** PUT
**Endpoint:** <https://shared-books.cyclic.app/api/comment/>
**Request** Body:

- commentId
- content

### Soft Delete Comment

**Method:** PUT
**Endpoint:** <https://shared-books.cyclic.app/api/comment/softDelete>
**Request** Body:

- commentId

### Get Comments by Book ID

<<<<<<< HEAD
 **Method:** GET
 **Endpoint:** <https://shared-books.cyclic.app/api/comment/getCommentsByBookId/:bookId>
 **Request Params:**
=======
**Method:** GET
**Endpoint:** <https://shared-books.cyclic.app/api/comment/getCommentsByBookId>
**Request Params:**
>>>>>>> 60f24bb1c98915bb4a16a51c50f9c5412d79f10b

- bookId

### Get Comments by User ID

**Method:** GET
**Endpoint:** <https://shared-books.cyclic.app/api/comment/getCommentsByUserId>

### Get All Comments

**Method:** GET
**Endpoint:** <https://shared-books.cyclic.app/api/comment>

## Api report

- **Get all comments**\
    `Endpoint: https://shared-books.cyclic.app/api/report/`\
    `METHOD: GET`
- **Create report**\
    `Endpoint: https://shared-books.cyclic.app/api/report/`\
    `METHOD: POST`\
    `BODY: title, bookId, content, image(allow null)`\
    `USER: id (userId or req.body.userId)`
- **Update report** \
    `Endpoint: https://shared-books.cyclic.app/api/report/:reportId`\
    `METHOD: PATCH`\
    `BODY: status`\
    `PARAMS: reportId`
- **Delete report**\
    `Endpoint: https://shared-books.cyclic.app/api/report/:reportId`\
    `METHOD: DELETE`\
    `PARAMS: reportId`

