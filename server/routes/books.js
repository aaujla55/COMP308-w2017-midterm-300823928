//File Name: books.js
//Author: Amandeep Aujla
//Student ID: 300823928
//Website:https://comp308-w17-midterm-300823928.herokuapp.com/


// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// define the user model
let UserModel = require('../models/users');
let User = UserModel.User; // alias for User

// define the book model
let book = require('../models/books');

// function to check if the user is authenticated
function requireAuth(req, res, next) {
  // check if the user is logged index
  if(!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
}

/* GET books List page. READ */
router.get('/', requireAuth,(req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books,
        displayName: req.user.displayName
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add',requireAuth, (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     res.render('books/details', {
      title: "Add a new Book",
      books: '',
      displayName: req.user ? req.user.displayName : ''
  });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add',requireAuth, (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let newBook = book({
      "Title": req.body.title,
      "Description": req.body.description,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
    });

    book.create(newBook, (err, book) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        res.redirect('/books');
      }
    });

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id',requireAuth, (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    try {
      // get a reference to the id from the url
      let id = mongoose.Types.ObjectId.createFromHexString(req.params.id);

        // find one book by its id
      book.findById(id, (err, books) => {
        if(err) {
          console.log(err);
          res.end(error);
        } else {
          // show the book details view
          res.render('books/details', {
              title: 'Book Details',
              books: books,
              displayName: req.user.displayName
          });
        }
      });
    } catch (err) {
      console.log(err);
      res.redirect('/errors/404');
    }
    
});

// POST - process the information passed from the details form and update the document
router.post('/:id',requireAuth, (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
      // get a reference to the id from the url
    let id = req.params.id;

     let updatedBook = book({
       "_id": id,
      "Title": req.body.title,
      "Description": req.body.description,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
    });

    book.update({_id: id}, updatedBook, (err) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        // refresh the book List
        res.redirect('/books');
      }
    });
});

// GET - process the delete by user id
router.get('/delete/:id',requireAuth, (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    // get a reference to the id from the url
    let id = req.params.id;

    book.remove({_id: id}, (err) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        // refresh the books list
        res.redirect('/books');
      }
    });
});


module.exports = router;
