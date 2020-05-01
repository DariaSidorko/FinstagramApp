const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const post = require('./routes/api/posts');
const passport = require('passport');

const app = express(); 

const path = require('path');

//Body parser function
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Passport middlewear
app.use(passport.initialize());
//passport config
require('./config/passport')(passport);


//DB config
const db = require('./config/keys').mongoURI;

//connect to mongodb
mongoose.connect(db,  { useNewUrlParser: true })
.then(() => console.log('MongoDB connected!'))
.catch(err => console.log(err))

//first route
app.get('/', (req, res) => res.send('Hello'));

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', post);


if (process.env.NODE_ENV === 'production') {
  //Set static folder and start index.html
  app.use(express.static('client/build'))
  app.get('*', (req, ress) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

const port = process.env.PORT || 8050;
app.listen(port, () => console.log(`Server running on port ${port}`));