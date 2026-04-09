require("dotenv").config();
require('express-async-errors');

const connectDB = require("./db/connect");
const express = require("express");
const cors = require('cors')
const app = express();
const mainRouter = require("./routes/user");

app.use(express.json());

app.use(cors())
app.use("/api/v1", mainRouter);
//////////////////////////////////////////////////////////
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({ status: 'UP', message: 'Server is healthy' });
});
///////////////////////////////////////////////////////////
const port = process.env.PORT || 4000;

const start = async () => {

    try {        
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        })

    } catch (error) {
       console.log(error); 
    }
}

start();

