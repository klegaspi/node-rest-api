const express = require('express');
require('dotenv').config();
const helmet = require('helmet');
const app = express();
const morgan = require('morgan');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan('tiny'));

const port = process.env.PORT;

const todoRoutes = require('./Routes/todo-routes');

app.use('/api/todos', todoRoutes);

app.listen(port, () => console.log(`server running on port ${port}`));
