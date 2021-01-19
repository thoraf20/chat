import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import express from 'express';

dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());




// Error Handler
app.use((error, req, res, next) => {
    console.log('An error occured:', error);
    res.json({ message: error.message || 'An unknown error occured.', error: true });
  });





// Connect to DB && Start server
mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server up and running on port ${process.env.PORT || 5000}!`)
    );
  })
  .catch(error => console.log('Could not start server: ', error));