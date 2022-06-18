let axios = require("axios")

let allMeme = async function (req, res) {

    try {
        let options = {
            method: 'get',
            url: 'https://api.imgflip.com/get_memes'
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }


}

let oneMemeEdit = async function (req, res) {
let userName = req.body.username
let password = req.body.password
let id = req.body.template_id
let text0 = req.body.text0
let text1 = req.body.text1
    try {
        let options = {
            method: 'post',
            url: `https://api.imgflip.com/caption_image?template_id=${id}&text0=${text0}&text1=${text1}&username=${userName}&password=${password}`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }


}
module.exports.allMeme = allMeme
module.exports.oneMemeEdit = oneMemeEdit