const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const ingredientRoutes = require('./routes/ingredientRoutes');
const orderRoutes = require('./routes/ordersRoutes');
const smoothieRoutes = require('./routes/smoothieRoutes');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/ingredient', ingredientRoutes)
app.use('/smoothie', smoothieRoutes)
app.use('/order', orderRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
