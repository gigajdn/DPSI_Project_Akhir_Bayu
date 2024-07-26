const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();

connectDB();

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/members', require('./routes/memberRoutes'));
app.use('/api/loans', require('./routes/loanRoutes'));
app.use('/api/staff', require('./routes/staffRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
