const express = require("express")
const app = express()

const posts = [
    {
        username: "Pedro",
        title: "Post 1"
    },
    {
        username: "Carlos",
        title: "Post 2"
    }
]

app.get('/posts', (req, res) => {
    res.json(posts)
})

app.listen(3333)