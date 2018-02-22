var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var app = express();
var Schema = mongoose.Schema;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './authorsApp', '/dist')));
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/authorsApp');

var authorsSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3},
    quotes: {type: Array}
}, {timestamps: true});


mongoose.model('Authors', authorsSchema);
var Author = mongoose.model('Authors');

app.get('/api/authors', function(req, res) {
    Author.find({}, function(err, authors) {
        if (err) {
            console.log(err);
            res.json({ message: "Error", errors: err });
        } else {
            res.json({ message: "Got all Authors", data: authors });
        }
    })
})

app.get('/api/authors/:id', function(req, res) {
    Author.findOne({ _id: req.params.id }, function(err, author) {
        if (err) {
            console.log(err);
            res.json({ message: "Error", errors: err });
        } else {
            res.json({ message: "Successfully got one", data: author });
        }
    })
})

app.post('/api/authors', function(req, res) {
    let newAuthor = new Author(req.body);
    console.log(newAuthor);
    newAuthor.save(function(err, data) {
        if (err) {
            console.log(err);
            res.json({ message: "Error", errors: err })
        } else {
            console.log(data);
            res.json({ message: "Successfully added to the db!", data: data });
        }
    })
})

app.put('/api/authors/:id', function(req, res) {
    Author.update({_id: req.params.id}, {name: req.body.name, quotes: req.body.quotes}, function(err, author) {
        if (err) {
            console.log(err);
            res.json({ message: "Error", errors: err });
        } else {
            res.json({ message: "Successfully updated", data: author });
        }
    })
})

app.delete('/api/authors/:id', function(req, res) {
    Author.remove({ _id: req.params.id }, function(err) {
        if (err) {
            console.log(err);
            res.json({ message: "Error", errors: err });
        } else {
            res.json({message: "Successfully deleted from the db"});
        }
    })
})

app.all('*', (req, res, next)=> {
    res.sendFile(path.resolve('./authorsApp/dist/index.html'));
})

app.listen(8000, function() {
    console.log('listening on port 8000');
})