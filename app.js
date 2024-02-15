const express = require('express')
const app = express()
const port = 5000

app.get('/', (req,res) => {
    res.send("Hello World!");
})

app.get('/getcode', (req,res)=> {
    res.send("This is /getcode routes.")
})

app.get('/plus/:num1/:num2', (req,res) => {
    try {
        if(isNaN(req.params.num1) || isNaN(req.params.num2)) {
            throw new Error("Error")
        }
        res.status(200).send((parseFloat(req.params.num1) + parseFloat(req.params.num2)).toString());
    } catch(err) {
        res.status(400).send("Bad Request")
    }
})


const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = server