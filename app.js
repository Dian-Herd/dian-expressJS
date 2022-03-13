const express = require('express')
const app = express()
const userRouter = require('./router/users')

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.get('/', (req, res)=>{
    res.send('<h1>Home</h1>')
})
app.get('/about', (req, res)=>{
    res.send('<h1>About</h1>')
})
app.use(userRouter)

app.listen(process.env.PORT || 5000)