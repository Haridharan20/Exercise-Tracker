const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//requiring files
const exercisesRouter = require('./routes/excercises')
const usersRouter = require('./routes/users')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

const uri = 'mongodb+srv://hari:root@cluster0.xq4oi.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
})

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, 'localhost', () => {
    console.log(`listening to port ${port}`)
})
