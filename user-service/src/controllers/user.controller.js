const multer = require("multer")
const upload = require("../middlewares/lib/multer")
const APIError = require("../utils/Error")
const Response = require("../utils/Response")
const userModel = require('../models/user.model')


const createUser = async(userFromQueue) => {
    const user = JSON.parse(userFromQueue)

    if(!user) throw new APIError('failed to retrieve user data from queue', 500)
    
    const saveUser = new userModel({
        _id : user._id,
        name : user.name,
        lastname : user.lastname,
        email : user.email,
        password : user.password
    })
    const result = await saveUser.save()
    if(result) console.log("user created")
    
}


const getProfile = async (req,res) => {
    const user = await userModel.findById(req.params.id).select('name lastname email avatar location language school work about')

    if(!user) throw new APIError("not found user", 404)
    else return new Response(user, "user profile").ok(res)
}


const editProfile = async(req,res) => {
    const userId = req.headers['user-id']

    const user = await userModel.findById(userId) 
    const updateInfo = req.body

    if(!user) return new Response('you are not authorized for this operation')
    
    const updatedProfile = await userModel.findByIdAndUpdate(user._id, updateInfo , { new: true }).select('name lastname email avatar location language school work about')
    return new Response(updatedProfile,'updated user profile information').ok(res)
}

const getAvatar = async (req,res) => {

    const user = await userModel.findById(req.params.id)

    if(!user) return new Response(null, 'not found user').notfound(res)
    
    return new Response(user.avatar, 'user avatar').ok(res)

}

const updateAvatar = async (req,res) => {
    const userId = req.headers['user-id']
    
    const user = await userModel.findById(userId)
    if (!user) return new Response(null, 'user not found').notfound(res)

    upload.avatar(req,res, async function(err) {
        if (err instanceof multer.MulterError) {
            return new Response(null, "An error caused by multer.").internalServerError(res)
        }
        else if (err) {
            return new Response(null, err.message).badRequest(res)
        }
        else {
            const result = await userModel.findByIdAndUpdate(user._id, {$set : {'avatar' : req.savedImages}}, { new: true })
            return new Response(result, "Avatar successfully updated.").ok(res)
        }
    })

}










const uploadAvatar = async(req,res) => {
    upload.avatar(req,res, function(err) {
        if (err instanceof multer.MulterError) {
            return new Response(null, "An error caused by multer.").internalServerError(res)
        }
        else if (err) {
            return new Response(null, err.message).badRequest(res)
        }
        else {
            return new Response(req.savedImages, "Avatar successfully added.").created(res)
        }
    })
}

const uploadImages = async(req,res) => {
    upload.images(req,res, function(err) {
        if (err instanceof multer.MulterError) {
            return new Response(null, "An error caused by multer.").internalServerError(res)
        }
        else if (err) {
            return new Response(null, err.message).badRequest(res)
        }
        else {
            return new Response(req.savedImages, "Images successfully added.").created(res)
        }
    })
}




module.exports = {
    createUser,
    uploadAvatar,
    uploadImages,
    getProfile,
    editProfile,
    getAvatar,
    updateAvatar,
}