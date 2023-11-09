const catchAsyncError = require('../middlewares/catchAsyncError')
const Astrologer = require('../models/astrologerModel');


//registerAstrologer - {{base_url}}/api/v1/astrologer/register
exports.registerAstrologer = catchAsyncError(async(req,res,next)=>{
    const{
        name,
        dateOfBirth,
        email,
        mobilePrimery,
        mobileSecondry,
        address,
        gender,
        education,
        experience,
        course,
        instituteAndTeacher,
        certificates,
        aboutAstro,
        aboutExp,
        knowAboutAstro,
        workingHours
    } = req.body
   
    let BASE_URL = process.env.BACKEND_URL
    if(process.env.NODE_ENV === 'production'){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }
//     let files = [] 
  
//     if(req.files.length > 0) {
//         req.files.forEach( file => {
//             let url = `${BASE_URL}/uploads/astrologer/${file.originalname}`;
//             files.push({ doc: url })
           
           
//         })
//     }
//    req.body.certificates = files;
    const astrologer = await Astrologer.create({
        name,
        dateOfBirth,
        email,
        mobilePrimery,
        mobileSecondry,
        address,
        gender,
        education,
        experience,
        course,
        instituteAndTeacher,
        certificates,
        aboutAstro,
        aboutExp,
        knowAboutAstro,
        workingHours
    });

  res.status(201).json({
    success: true,
    astrologer
})

    
})

//updateAstrologer - {{base_url}}/api/v1/astrologer/update/:id
exports.updateAstrologer = catchAsyncError(async(req,res,next)=>{
    const newUserData = {
      name:req.body.name,
      email: req.body.email,
     
    }
     const astrologer = await Astrologer.findByIdAndUpdate(req.params.id,newUserData,{
      new:true,
      runValidators: true,
    })
  
    res.status(200).json({
      success:true,
      astrologer
     }) 
  })

  //getAllAstrologer - {{base_url}}/api/v1/astrologer//allAstrologers
exports.getAllAstrologers = catchAsyncError(async(req,res,next)=>{
    const astrologers = await Astrologer.find();
    res.status(200).json({
      success:true,
      astrologers
     }) 
  })

//deleteAstrologer - {{base_url}}/api/v1/astrologer/delete/:id
  exports.deleteAstrologer = catchAsyncError(async (req, res, next) => {
    const astrologer = await Astrologer.findById(req.params.id);
    if(!astrologer) {
        return next(new ErrorHandler(`User not found with this id ${req.params.id}`))
    }
    await astrologer.deleteOne();
    res.status(200).json({
        success: true,
    })
  })
  