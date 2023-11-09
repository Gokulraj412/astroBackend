const express = require('express')
const {registerAstrologer, getAllAstrologers, deleteAstrologer, updateAstrologer} = require('../controllers/astrologerController')
const multer = require('multer')
const router = express.Router();

const upload = multer({storage:multer.diskStorage({
    desitination:function(req,file,cb){
        cb(null, path.join(__dirname,'..','uploads/astrologer'))
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})})

router.route('/astrologer/register').post(registerAstrologer)
router.route('/astrologer/allAstrologers').get(getAllAstrologers)
router.route('/astrologer/delete/:id').delete(deleteAstrologer)
router.route('/astrologer/update/:id').patch(updateAstrologer)
module.exports = router;
