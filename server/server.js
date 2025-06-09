const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const logger  = require('./middleware/logger'); // Assuming you have a logger middleware


const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));


const todoRoutes = require('./routes/ToDo.route');
app.use('/api/todos', todoRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});