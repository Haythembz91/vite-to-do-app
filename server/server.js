
const PORT = process.env.PORT||8000
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
const pool = require('./db.js')

app.get('/',(req,res)=>{
    console.log(req.params)
    res.json('ANIA IS THE BEST')
})

app.get('/todos/:userEmail',async (req,res)=>{
    try{
        const {userEmail} = req.params
        console.log(userEmail)
        const todos = await  pool.query('SELECT * FROM todos WHERE user_email=$1',[userEmail]);
        res.json(todos.rows)
    }catch (err){
        console.error(err)
    }
})




app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`))