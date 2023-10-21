************Api Authentication*****************

// login method post
https://shared-books.cyclic.app/api/auth/login
req.boy = (username, password)
// register method post
https://shared-books.cyclic.app/api/auth/register
req.boy = (name,username, password, avatar)
// refresh token method post
https://shared-books.cyclic.app/api/auth/refreshToken


***********Api User****************************

// update user methods post
https://shared-books.cyclic.app/api/user/updateUser
req.body = (name,avatar)
// soft delete user methods pu
https://shared-books.cyclic.app/api/user/softDelete
req.body = (userId)
// get all users methods get
https://shared-books.cyclic.app/api/user/
// get one user methods get
https://shared-books.cyclic.app/api/user/getUser
req.params = (userId)
// get user by name
https://shared-books.cyclic.app/api/user/getuserByName
req.params = (name)
************Api Books*****************
// create a book method post
https://shared-books.cyclic.app/api/book/
req.body = (title,content,image)
// update book method put
https://shared-books.cyclic.app/api/book/
req.body = (bookId,title,content,image)
// soft delete book method put
https://shared-books.cyclic.app/api/book/softDelete
req.body = (bookId)
// get all books methods get
https://shared-books.cyclic.app/api/book/
// get one book methods get
https://shared-books.cyclic.app/api/book/:slug
req.params= (slug)

************Api Comment*****************
// create a comment method post
https://shared-books.cyclic.app/api/comment/
req.body = (bookId,comment)
// update comment method put
https://shared-books.cyclic.app/api/comment/
req.body = (commentId,content)
// soft delete book method put
https://shared-books.cyclic.app/api/comment/softDelete
req.body = (commentId)
// get comment by book id
https://shared-books.cyclic.app/api/comment/getCommentsByBookId
req.params (bookId)
// get comment by user id
https://shared-books.cyclic.app/api/comment/getCommentsByUserId
// get all comments
https://shared-books.cyclic.app/api/comment





