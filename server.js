const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

const app = express()
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`)
    } else {
      next()
    }
  })
}

app.use('/', serveStatic(path.join(__dirname, '/dist')))
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'))
})

const port = process.env.PORT || 8080
app.listen(port, function () {
  console.log(`Server started on port ${port}`) // eslint-disable-line no-console
})
