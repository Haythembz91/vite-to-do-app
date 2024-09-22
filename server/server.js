require('dotenv').config()
const PORT = process.env.PORT
const express = require('express')
const cors = require('cors')
const app = express()
const pool = require('./db.js')
const {v4:uuidv4}=require('uuid')
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
app.use(cors())
app.use(express.json())

app.get('/todos/:userEmail',async (req,res)=>{
    try{
        const {userEmail} = req.params
        const todos = await  pool.query('SELECT * FROM todos WHERE user_email=$1',[userEmail]);
        res.json(todos.rows)
    }catch (err){
        console.error(err)
    }
})

app.post('/todos',async (req,res)=>{
    const {user_email,title,progress,date}=req.body
    const id = uuidv4()
    try{
            const newTodo=await pool.query('INSERT INTO todos(id,user_email,title,progress,date) VALUES($1,$2,$3,$4,$5)',
            [id,user_email,title,progress,date])
            res.json(newTodo)
    }catch(err){console.error(err)}
})

app.put('/todos/:id',async (req,res)=>{
    const {id}=req.params
    const {user_email,title,progress,date}=req.body
    try{
        const editTodo = await pool.query('UPDATE todos SET user_email=$1,title=$2,progress=$3,date=$4 WHERE id=$5;',[user_email,title,progress,date,id])
        res.json(editTodo)
    }catch(err){console.error(err)}
})


app.delete('/todos/:id',async (req,res)=>{
    const {id}=req.params

    try{
        const deleteTodo = await pool.query('DELETE FROM todos WHERE id=$1;',[id])
        res.json(deleteTodo)
    }catch(err){console.error(err)}
})

app.post('/signup',async (req,res)=>{
    const {email,password}=req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password,salt)

    try{
        const signUp = await pool.query('INSERT INTO users(email,hashed_password) VALUES($1,$2)',[email,hashedPassword])
        const token = jwt.sign({email},'secret',{expiresIn:'1hr'})
        res.json({email,token})
    }catch (err) {
        console.error(err)
        if (err){
            res.json({detail:err.detail.slice(12)})
        }
    }



})

app.post('/login',async (req,res)=>{
    const {email,password}=req.body
    try{
        const users = await pool.query('SELECT * FROM users WHERE email = $1',[email])
        if (!users.rows.length){
            res.json({detail:`${email} does not exist`
        })
        }
        const success = await bcrypt.compare(password,users.rows[0].hashed_password)
        if (success){
            const token = jwt.sign({email},'secret',{expiresIn:'1hr'})
            res.json({'email':users.rows[0].email,'token':token})
        }else{
            res.json({detail:'Wrong password'})
        }
    }catch (err) {
        console.error(err)
    }
})

app.delete('/delete',async (req,res)=>{
    const {email}=req.body
    try{
        const deleteUser = await pool.query('DELETE FROM users WHERE email=$1;',[email])
        const deletetodos= await pool.query('DELETE FROM todos WHERE user_email=$1', [email])
        res.json(deleteUser)
    }catch(err){console.error(err)}
})



app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`))