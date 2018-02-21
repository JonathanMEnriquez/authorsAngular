var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './authorsApp', '/dist')));
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/authorsApp');

var authorsSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3}
}, {timestamps: true});

mongoose.model('Authors', authorsSchema);
var Author = mongoose.model('Authors');

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

app.all('*', (req, res, next)=> {
    res.sendFile(path.resolve('./authorsApp/dist/index.html'));
})

app.listen(8000, function() {
    console.log('listening on port 8000');
})