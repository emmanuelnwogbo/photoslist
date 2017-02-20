var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');

/*  Get home page blogposts */
router.get('/add', function(req, res, next) {
  res.render('addcategory', {
    "title": "Add Category"
  });
});

router.post('/add', function(req, res, next) {
  //get form values
  var title     = req.body.title;

  //Form Validation
  req.checkBody('title', 'Title field is required').notEmpty();

  //Check Errors
  var errors = req.validationErrors();

  if(errors) {
    res.render('addcategory', {
      "errors": errors,
      "title": title,
    });
  }
  else {
    var categories = db.get('categories');

    //Submit to db
    categories.insert({
      "title": title
    }, function(err, category) {
      if(err) {
        res.send('there was an issue submiting the category');
      }
      else {
        req.flash('success', 'category added');
        res.location('/');
        res.redirect('/');
      }
    });
  }
});


module.exports = router;
