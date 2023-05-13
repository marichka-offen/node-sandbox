const express = require('express')
const path = require('path')

const app = express()

app.use((req, res, next) => {
  const { method, path } = req
  console.log(
    `New request to: ${method} ${path} at ${new Date().toISOString()}`
  )
  next()
})

const publicDirectoryPath = path.join(__dirname, './public')

// app.use() is a method that allows you to add middleware functions to the request handling chain
// express.static() is a built-in middleware function in Express that allows you to serve static files such as HTML, CSS, and JavaScript files from a directory on your file system.
app.use(express.static(publicDirectoryPath))

// Routing
app.get('/', (req, res) => {
  res.send('Hello young padawan!')
})

app.get('/:name', (req, res) => {
  res.send(`Salutations! Welcome to Express Recipes dear, ${req.params.name}!`)
})

// Port configs
const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
})
