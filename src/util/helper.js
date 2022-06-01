const date = function printDate() {
    console.log(Date())
}
const month = function printMonth(){
    console.log("June")
}
const info = function getBatchInfo(){
    console.log("Radon, W3D3, the topic for today is Nodejs module system")
}
module.exports.date = date
module.exports.month = month
module.exports.info = info