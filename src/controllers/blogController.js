
const blogModel = require("../models/blogModel");
const authorModel = require("../models/authorModel")
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

const isValid = function(val){
    if(typeof val === "undefined" || val === null) return false
    if(typeof val === "string" && val.trim().length === 0 ) return false
    return true;
}

const bodyValidator = function(data){
    return Object.keys(data).length > 0
}
const isValidObjectId = function(objectId){
    return mongoose.Types.ObjectId.isValid(objectId)
}

let createBlog = async function (req, res) {
    try {
        let Data = req.body;
        if(!bodyValidator(Data)) return res.status(400).send({status : false , msg : "please enter body"})
        if(!isValid(Data.title)) return res.status(400).send({status : false , msg : "please enter title"})
        if(!isValid(Data.body)) return res.status(400).send({status : false , msg : "please enter body"})
        if(!isValid(Data.authorId)) return res.status(400).send({status : false , msg : "please enter authorId"})
        if(!isValidObjectId(Data.authorId)) return res.status(400).send({status: false, msg:`${authorId} is not valid`})
        if(!isValid(Data.category)) return res.status(400).send({status : false , msg : "please enter category"})
        
        let blog = await blogModel.create(Data)
      return  res.status(201).send({status: true , msg: "blog created successfully"})
    }
    catch (err) {
      return  res.status(500).send({ status: false, msg: "SERVER ISSUES", reason: err.message })
    }
}



const getBlogs = async function (req, res) {
    try { 
       let authorId = req.query.authorId
       let category = req.query.category
       let tags = req.query.tags
       let subcategory = req.query.subcategory
   
       let obj = {
           isDeleted: false,
           isPublished: true
       }
   
       if (authorId) {
           obj.authorId = authorId
       }
       if (category) {
           obj.category = category
       }
       if (tags) {
           obj.tags = tags
       }
       if (subcategory) {
           obj.subcategory = subcategory
       }
   
       let savedData = await blogModel.find(obj)
       if (savedData.length == 0) {
           return res.status(400).send({ status: true, msg: "No such Blogs Available" })
       } else {
           return res.status(200).send({ msg: savedData })
       } }catch(err){
         return  res.status(500).send({ msg: err.message })
       }
   }
   



const updatedBlogs = async function(req , res){
    try{
        let {title , body , tags , subcategory, isPublished} = req.body
        let blogId = req.params.blogId
    
        let blog = await blogModel.findById(blogId);
        if(blog  && blog.isDeleted === false){
            if(title){
                blog.title = title
            }
            if(body){
                blog.body = body
            }
            if(tags){
                if(typeof tags == "object"){
                    for(let i of tags){
                        blog.tags.push(i)
                    }
                }
              else{ blog.tags.push(tags)}
            
            }
            if(subcategory){
                if(typeof tags == "object"){
                    for(let i of subcategory){
                     blog.subcategory.push(i)
                    }
                }
             else{ blog.subcategory.push(subcategory)}
                
            }
            if(isPublished === true || isPublished === false){
           if( blog.isPublished === false && isPublished === true){
            blog.isPublished = true
            let date = new Date();
            blog.publishedAt = date
        }
        else if( blog.isPublished == true && isPublished == false){
            blog.isPublished = false
            blog.publishedAt = null
        }else{return res.status(400).send({msg: "Already Unpublished or Published"})}
    }
            blog.save()
          return  res.status(200).send({status: true , data: blog})
        }
        else{
           return res.status(404).send({status: false , msg: "data not found or deleted"})
        }
    }
    catch(err){
      return  res.status(500).send({error : err.message})
    }

}




const deleteBlog = async function (req, res) {
    try {
        let blogId = req.params.blogId
        let blog = await blogModel.findById(blogId)
        if (blog) {
            if (blog.isDeleted == false) {
                blog.isDeleted = true
                let date = new Date();
                blog.deletedAt = date
                blog.save()
              return  res.status(200).send({status:true,})
            } else{
                res.status(404).send({msg : "already deleted"})
            }
        }
        else {
         return   res.status(404).send({ status: false, msg: "blog dosen't exist" })
        }
    }
    catch(err){
      return  res.status(500).send({msg : err.message})
    }
    
}



const deleteBlogByQuery = async function(req , res){
    try{
    let obj = req.findObj
    let decodedToken = req.token
     obj.isDeleted = false
     obj.isPublished = false
    obj.authorId = decodedToken.authorId
    let date = new Date();

            let updatedBlogs = await blogModel.updateMany(obj,{$set: {isDeleted : true, deletedAt:date}})
            if(updatedBlogs.modifiedCount == 0){return res.status(400).send({status: false,msg:"blog is already deleted or published"})}
         else {return  res.status(200).send({status : true})}
        }
    catch(err){
      return  res.status(500).send({msg : err.message})
    }
}



module.exports.createBlog = createBlog;
module.exports.getBlogs = getBlogs
module.exports.updatedBlogs = updatedBlogs;
module.exports.deleteBlog = deleteBlog;
module.exports.deleteBlogByQuery = deleteBlogByQuery;
