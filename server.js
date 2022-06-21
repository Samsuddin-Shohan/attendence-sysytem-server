const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDb = require('./db/db');
const router = require('./routes/index');
const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.use((err, req, res, next) => {
  // console.log(err);
  const message = err.message ? err.message : 'server errror occured';
  const status = err.status ? err.status : 500;
  //et answer = x > 10 ? "greater than 10" : "less than 10";
  res.status(status).json({ message });
});

// app.get('/public', authenticate, (req, res, next) => {
//   return res.json({ message: 'I am a public route' });
// });
// app.get('/private', authenticate, (req, res, next) => {
//   console.log(`i am the user ${req.user}`);
//   return res.status(200).json({ message: 'I am a private route' });
// });

connectDb('mongodb://localhost:27017/attendence-system').then(() => {
  console.log('databse connected');
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
});
