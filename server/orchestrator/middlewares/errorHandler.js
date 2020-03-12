module.exports = (err, req, res, next) => {
  let code = 500
  let messages = []
  if (err.errCode) {
    code = err.errCode
    messages.push(err.msg)
  } else {
    code = err.code
    messages = err.messages
  }
  res.status(code).json({ code, messages })
}
