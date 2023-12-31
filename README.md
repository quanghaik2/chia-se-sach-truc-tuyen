# Shared Books API Documentation

## Authentication

### Login

- **Method:** POST
- **Endpoint:** `https://shared-books.cyclic.app/api/auth/login`
- **Request Body:**
  - username
  - password

### Register

- **Method:** POST
- **Endpoint:** `https://shared-books.cyclic.app/api/auth/register`
- **Request Body:**
  - name
  - username
  - password
  - avatar

### Refresh Token

- **Method:** POST
- **Endpoint:** `https://shared-books.cyclic.app/api/auth/refreshToken`

## User

### Update User

- **Method:** POST
- **Endpoint:** `https://shared-books.cyclic.app/api/user/updateUser`
- **Request Body:**
  - name
  - avatar

### Soft Delete User

- **Method:** PUT
- **Endpoint:** `https://shared-books.cyclic.app/api/user/softDelete`
- **Request Body:**
  - userId

### Get All Users

- **Method:** GET
- **Endpoint:** `https://shared-books.cyclic.app/api/user/`

### Get One User

- **Method:** GET
- **Endpoint:** `https://shared-books.cyclic.app/api/user/getOneUser/:userId`
- **Request Params:**
  - userId

### Get User by Name

- **Method:** GET
- **Endpoint:** `https://shared-books.cyclic.app/api/user/getUserByName/:name`
- **Request Params:**
  - name

### Get Follow by User id

- **Method:** post
- **Endpoint:** `https://shared-books.cyclic.app/api/user/follow`
- **body:**
  - userId

## Books

### Create a Book

- **Method:** POST
- **Endpoint:** `https://shared-books.cyclic.app/api/book/`
- **Request Body:**
  - title
  - content
  - image

### Update Book

- **Method:** PUT
- **Endpoint:** `https://shared-books.cyclic.app/api/book/`
- **Request Body:**
  - bookId
  - title
  - content
  - image

### Soft Delete Book

- **Method:** PUT
- **Endpoint:** `https://shared-books.cyclic.app/api/book/softDelete`
- **Request Body:**
  - bookId

### Get All Books

- **Method:** GET
- **Endpoint:** `https://shared-books.cyclic.app/api/book/`

### Get One Book By Slug

- **Method:** GET
- **Endpoint:** `https://shared-books.cyclic.app/api/book/getOneBook/:slug`
- **Request Params:**
  - slug

### Get One Book By Id

- **Method:** GET
- **Endpoint:** `https://shared-books.cyclic.app/api/book/getBookId/:id`
- **Request Params:**
  - id

### Get Pending List Books

- **Method:** GET
- **Endpoint:** `https://shared-books.cyclic.app/api/book/getPendingBooks`

### Get List Book By Name

- **Method:** GET
- **Endpoint:** `https://shared-books.cyclic.app/api/book/getBookByName/:name`
- **Request Params:**
  - name

### Get List Book By name user

- **Method:** GET
- **Endpoint:** `https://shared-books.cyclic.app/api/book/getBookByUser/:nameUser`
- **Request Params:**
  - nameUser

### Get List Book by query

- **Method:** GET
- **Endpoint:** `https://shared-books.cyclic.app/api/book/searchBook`
- **Request Query:**
   // truyền 1 trong 2 nameUser hoặc title

### Approved Book

- **Method:** POST
- **Endpoint:** `https://shared-books.cyclic.app/api/book/approvedBook`
- **Request Params:**
  - bookId

## Comments

### Create a Comment

- **Method:** POST
- **Endpoint:** `https://shared-books.cyclic.app/api/comment/`
- **Request Body:**
  - bookId
  - content

### Update Comment

- **Method:** PUT
- **Endpoint:** `https://shared-books.cyclic.app/api/comment/`
- **Request Body:**
  - commentId
  - content

### Soft Delete Comment

- **Method:** PUT
- **Endpoint:** `https://shared-books.cyclic.app/api/comment/softDelete`
- **Request Body:**
  - commentId

### Get Comments by Book ID

- **Method:** GET
- **Endpoint:** `https://shared-books.cyclic.app/api/comment/getCommentsByBookId/:bookId`
- **Request Params:**
  - bookId

### Get Comments by User ID

- **Method:** GET
- **Endpoint:** `https://shared-books.cyclic.app/api/comment/getCommentsByUserId`

### Get All Comments

- **Method:** GET
- **Endpoint:** `https://shared-books.cyclic.app/api/comment`

## API Report

- **Get all comments**

  - **Endpoint:** `https://shared-books.cyclic.app/api/report/`
  - **Method:** GET

- **Create Report**

  - **Endpoint:** `https://shared-books.cyclic.app/api/report/`
  - **Method:** POST
  - **Body:**
    - title
    - bookId
    - content
    - image (allow null)
  - **User:** id (userId or req.body.userId)

- **Update Report**

  - **Endpoint:** `https://shared-books.cyclic.app/api/report/:reportId`
  - **Method:** PATCH
  - **Body:**
    - status
  - **Params:**
    - reportId

- **Delete Report**
  - **Endpoint:** `https://shared-books.cyclic.app/api/report/:reportId`
  - **Method:** DELETE
  - **Params:**
    - reportId

## API Rating

- **Get all rating**

  - **Endpoint:** `https://shared-books.cyclic.app/api/rating/`
  - **Method:** GET

- **Get list rating by bookId**

  - **Endpoint:** `https://shared-books.cyclic.app/api/rating/list`
  - **Method:** GET
  - **Query:**
    - bookId

- **Get list rating by userId**

  - **Endpoint:** `https://shared-books.cyclic.app/api/rating/list`
  - **Method:** GET
  - **Query:**
    - userId

- **Create rating**

  - **Endpoint:** `https://shared-books.cyclic.app/api/rating`
  - **Method:** POST
  - **Body:**
    - bookId
    - rate
    - userId (allow null if have req.user / logged)

- **Update rating by bookId, userId**

  - **Endpoint:** `https://shared-books.cyclic.app/api/rating`
  - **Method:** PUT
  - **Body:**
    - bookId
    - userId
    - rate

- **Update rating by id**

  - **Endpoint:** `https://shared-books.cyclic.app/api/rating`
  - **Method:** PUT
  - **Body:**
    - id
    - rate

- **Delete rating by bookId, userId**

  - **Endpoint:** `https://shared-books.cyclic.app/api/rating`
  - **Method:** DELETE
  - **Body:**
    - bookId
    - userId
    - rate

- **Delete rating by id**

  - **Endpoint:** `https://shared-books.cyclic.app/api/rating`
  - **Method:** DELETE
  - **Body:**
    - id
    - rate

## Favorite

### Get Favorite by User

- **Method:** get
- **Endpoint:** `https://shared-books.cyclic.app/api/favorite/getFavoriteByUser`
- **body:**
  - bookId

### Favorite Book

- **Method:** POST
- **Endpoint:** `https://shared-books.cyclic.app/api/favorite/favoriteBook`
- **body:**
  - bookId

### Unfavorite Book

- **Method:** DELETE
- **Endpoint:** `https://shared-books.cyclic.app/api/favorite/unFavoriteBook`
