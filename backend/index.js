const express = require('express')
const RootRouter = require('./routes/index')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const JWT_SECRET =require('../backend/config')
const cors=require('cors')
const app = express()
app.use(cors())
app.use(express.json())

app.use('/mypaytm/api/v1/', RootRouter)

const PORT = 3000

app.use((err,req,res,next)=>{
    res.status(404).json({
        message:"server is not responding"
    })
})
app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
})
