const app = require('../app')
const http = require('http').createServer(app)
const PORT = process.env.PORT || 8000

http.listen(PORT, () => {
  console.log('App listening on PORT:', PORT)
})
