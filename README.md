# Shared Books API Documentation
## Authentication
### Login
 **Method:** POST
 **Endpoint:** https://shared-books.cyclic.app/api/auth/login
 **Request** Body:**
-   username
-   password
### Register
 **Method:** POST
 **Endpoint:** https://shared-books.cyclic.app/api/auth/register
 **Request** Body:**
-   name
-   username
-   password
-   avatar
### Refresh Token
 **Method:** POST
 **Endpoint:** https://shared-books.cyclic.app/api/auth/refreshToken
## User
### Update User
 **Method:** POST
 **Endpoint:** https://shared-books.cyclic.app/api/user/updateUser
 **Request** Body:
- name
- avatar
### Soft Delete User
 **Method:** PUT
 **Endpoint:** https://shared-books.cyclic.app/api/user/softDelete
 **Request** Body:
- userId
### Get All Users
 **Method:** GET
 **Endpoint:** https://shared-books.cyclic.app/api/user/
### Get One User
 **Method:** GET
 **Endpoint:** https://shared-books.cyclic.app/api/user/getUser
 **Request Params:**
- userId
### Get User by Name
 **Method:** GET
 **Endpoint:** https://shared-books.cyclic.app/api/user/getUserByName
 **Request Params:**
- name
## Books
### Create a Book
 **Method:** POST
 **Endpoint:** https://shared-books.cyclic.app/api/book/
 **Request** Body:
- title
- content
- image
### Update Book
 **Method:** PUT
 **Endpoint:** https://shared-books.cyclic.app/api/book/
 **Request** Body:
- bookId
- title
- content
- image
### Soft Delete Book
 **Method:** PUT
 **Endpoint:** https://shared-books.cyclic.app/api/book/softDelete
 **Request** Body:
- bookId
### Get All Books
 **Method:** GET
 **Endpoint:** https://shared-books.cyclic.app/api/book/
### Get One Book
 **Method:** GET
 **Endpoint:** https://shared-books.cyclic.app/api/book/:slug
 **Request Params:**
- slug
## Comments
### Create a Comment
 **Method:** POST
 **Endpoint:** https://shared-books.cyclic.app/api/comment/
 **Request** Body:
- bookId
- comment
### Update Comment
 **Method:** PUT
 **Endpoint:** https://shared-books.cyclic.app/api/comment/
 **Request** Body:
- commentId
- content
### Soft Delete Comment
 **Method:** PUT
 **Endpoint:** https://shared-books.cyclic.app/api/comment/softDelete
 **Request** Body:
- commentId
### Get Comments by Book ID
 **Method:** GET
 **Endpoint:** https://shared-books.cyclic.app/api/comment/getCommentsByBookId
 **Request Params:**
- bookId
### Get Comments by User ID
 **Method:** GET
 **Endpoint:** https://shared-books.cyclic.app/api/comment/getCommentsByUserId
### Get All Comments
 **Method:** GET
 **Endpoint:** https://shared-books.cyclic.app/api/comment




