
const PORT = process.env.PORT||8000
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
const pool = require('./db.js')
const {v4:uuidv4}=require('uuid')

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

app.post('/todos',async (req,res)=>{
    const {user_email,title,progress,date}=req.body
    console.log(user_email,title,progress,date)
    const id = uuidv4()
    try{
            const newTodo=await pool.query('INSERT INTO todos(id,user_email,title,progress,date) VALUES($1,$2,$3,$4,$5)',
            [id,user_email,title,progress,date])
            res.json(newTodo)
    }catch(err){console.error(err)}





})



app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`))