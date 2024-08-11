const express = require('express')
const router = express.Router()

 
const {
    uploadAvatar, 
    uploadImages,
    getProfile,
    editProfile,
    getAvatar,
    updateAvatar,
    addFavorites,
    deleteFavorites,
    getFavorites

} = require('../controllers/user.controller')


router.get('/:id', getProfile)
router.put('/',  editProfile)

router.get('/avatar/:id', getAvatar)
router.put('/avatar',  updateAvatar)

router.get('/favorites',  getFavorites)
router.post('/favorites/:id',  addFavorites)
router.delete('/favorites/:id', deleteFavorites)


router.post('/avatar', uploadAvatar)
router.post('/images', uploadImages)




module.exports = router