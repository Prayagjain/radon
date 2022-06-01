const trim =function tri() {
      a =   "     FunctionUp    "
    console.log(a.trim())
}

const lower = function lowerCase() {
       b =  "FUNCTIONUP"
    console.log(b.toLowerCase())
}

const upper = function upperCase() {
       c =  "functionup"
    console.log(c.toUpperCase())
}

module.exports.trim = trim
module.exports.lower = lower
module.exports.upper = upper