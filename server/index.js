const express = require('express');
const mongoose = require("mongoose");
var cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const DB_URL = process.env.CONNECTION_URL;
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})