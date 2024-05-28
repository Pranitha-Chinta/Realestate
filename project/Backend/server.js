const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./router'); // Assuming your routes file is named routes.js

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', routes);

// Database connection
mongoose.connect('mongodb+srv://pranitha:pranitha123@cluster0.onb2am8.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
