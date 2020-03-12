module.exports = (err, req, res, next) => {
  let code = 500
  let messages = []
  let MongoErr = err.name.includes(/mongo/i)
  if (err.errCode) {
    code = err.errCode
    messages.push(err.msg)
  } else if (MongoErr) {
    code = 500
    messages.push('Database Error')
  } else {
    code = 500
    messages.push('Internal Server Error')
  }
  res.status(code).json({ code, messages })
}
