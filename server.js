require('dotenv').config();
const express = require('express');
const {connectToDatabase} = require('./db');
const PORT = process.env.PORT || 5000
const userRoutes=require('./routes/userRoutes');
const chatRoutes=require('./routes/chatRoutes')
const messageRoutes=require('./routes/messageRoutes')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const app = express();
const cors = require('cors')

app.use(express.json()); //to accept the json Data
connectToDatabase()


app.use(cors());
app.use('/api/user',userRoutes)
app.use("/api/chat",chatRoutes)
app.use("/api/message",messageRoutes)

app.use(notFound)
app.use(errorHandler)

app.get('/', (req, res) => {
    res.send('Hello World')
})
app.listen(PORT, console.log("started on port",PORT))