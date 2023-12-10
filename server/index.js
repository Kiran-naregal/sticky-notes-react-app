const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
dotenv.config();
const port = process.env.PORT;
const app = express();
const connectToMongo = require('./db');

connectToMongo();

// app.get('/', (req, res) => {
//     res.send('hello')
// })
app.use(cors())
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
})