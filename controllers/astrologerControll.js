const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require("../middlewares/catchAsyncError");
const Astrologer = require("../models/astrologerModel");

// registerAstrologer - {{base_url}}/api/v1/astrologer/register
exports.registerAstrologer = catchAsyncError(async (req, res, next) => {

  let BASE_URL = process.env.BACKEND_URL;
  if (process.env.NODE_ENV === "production") {
    BASE_URL = `${req.protocol}://${req.get("host")}`;
  }
  try{
    console.log(req.files)
    console.log(req.body)
    let certificateUrls = []
    let picUrls = [];

    if(req.files){
      req.files?.certificates?.forEach(element => {
      let astrologerUrl = `${BASE_URL}/uploads/certificates/${element.originalname}`;
      certificateUrls.push({ file: astrologerUrl });
  
      });
  
      let imagesUrl = `${BASE_URL}/uploads/profilepic/${req.files.profilePic[0].originalname}`;
      picUrls.push({ pic: imagesUrl });
    }

    req.body.certificates = certificateUrls;
    req.body.profilePic = picUrls;
    const astrologer = await Astrologer.create(req.body);
  
    res.status(201).json({
      success: true,
      astrologer,
    });
  }
  catch(error){
    return next(new ErrorHandler(error.message), 500)
  }

});


// exports.registerAstrologer = catchAsyncError(async(req,res,next)=>{
//   try {
//     const {  name,
//       dateOfBirth,
//       email,
//       mobilePrimary,
//       mobileSecondary,
//       address,
//       gender,
//       education,
//       experience,
//       course,
//       instituteAndTeacher,
//       files,
//       aboutAstro,
//       aboutExp,
//       knowAboutAstro,
//       workingHours,
//       isActive, } = req.body;
//     const {originalname} = req.file;
//     const createpost = new Post({
//       title,
//       summary,
//       description,
//       cover: originalname,
//       author,
//     });
//     const savePost = await createpost.save();
//     // const createpost = await Post.create({
//     //   title,
//     //   summary,
//     //   description,
//     //   cover: newPath ? newPath : null,
//     //   author,
//     // });
//     res.status(200).json(savePost);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// })
//updateAstrologer - {{base_url}}/api/v1/astrologer/update/:id
exports.updateAstrologer = catchAsyncError(async (req, res, next) => {
  const newUserData = ({
    firstname,
    lastname,
    dateOfBirth,
    email,
    mobilePrimary,
    mobileSecondary,
    address,
    gender,
    education,
    experience,
    course,
    instituteAndTeacher,
    files,
    aboutAstro,
    aboutExp,
    knowAboutAstro,
    workingHours,
    isActive,
  } = req.body);
  const astrologer = await Astrologer.findByIdAndUpdate(
    req.params.id,
    newUserData,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    astrologer,
  });
});

//deleteAstrologer - {{base_url}}/api/v1/astrologer/delete/:id
exports.deleteAstrologer = catchAsyncError(async (req, res, next) => {
  const astrologer = await Astrologer.findById(req.params.id);
  if (!astrologer) {
    return next(
      new ErrorHandler(`User not found with this id ${req.params.id}`)
    );
  }
  await astrologer.deleteOne();
  res.status(200).json({
    success: true,
  });
});

//getAllAstrologer - {{base_url}}/api/v1/astrologer/allAstrologers
exports.getAllAstrologers = catchAsyncError(async (req, res, next) => {
  try{
    const astrologers = await Astrologer.find();
    res.status(200).json({
      success: true,
      astrologers,
    });
  }
  catch(error){
    return next(new ErrorHandler(error.message), 500)
  }
 
});

//getAstrologer - {{base_url}}/api/v1/astrologer/getAstrologer/:id
exports.getAstrologer = catchAsyncError(async (req, res, next) => {
  const astrologer = await Astrologer.findById(req.params.id);
  if (!astrologer) {
    return next(
      new ErrorHandler(`User not found with this id ${req.params.id}`)
    );
  }
  res.status(200).json({
    success: true,
    astrologer,
  });
});

//changeAstrologer Active to inActive  - {{base_url}}/api/v1/astrologer/state/:id
exports.activeAstrologer = catchAsyncError(async (req, res, next) => {
  const newState = ({ isActive } = req.body);
  const activeAstrologer = await Astrologer.findByIdAndUpdate(
    req.params.id,
    newState,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    success: true,
    activeAstrologer,
  });
});



// const ErrorHandler = require('../utils/errorHandler')
// const catchAsyncError = require("../middlewares/catchAsyncError");
// const Astrologer = require("../models/astrologerModel");

// //registerAstrologer - {{base_url}}/api/v1/astrologer/register
// exports.registerAstrologer = catchAsyncError(async (req, res, next) => {

//   let BASE_URL = process.env.BACKEND_URL;
//   if (process.env.NODE_ENV === "production") {
//     BASE_URL = `${req.protocol}://${req.get("host")}`;
//   }


//   try{

//     let certificateUrls = []
//     req.files.certificates.forEach(element => {
//       let astrologerUrl = `${BASE_URL}/uploads/certificates/${element.originalname}`;
//       certificateUrls.push({ file: astrologerUrl });
  
//     });
  
//     let picUrls = [];
//     let imagesUrl = `${BASE_URL}/uploads/profilepic/${req.files.profilePic[0].originalname}`;
//     picUrls.push({ pic: imagesUrl });
  
//     req.body.certificates = certificateUrls;
//     req.body.profilePic = picUrls;
//     const astrologer = await Astrologer.create(req.body);
  
//     res.status(201).json({
//       success: true,
//       astrologer,
//     });
//   }
//   catch(error){
//     return next(new ErrorHandler(error.message), 500)
//   }

// });

// //updateAstrologer - {{base_url}}/api/v1/astrologer/update/:id
// exports.updateAstrologer = catchAsyncError(async (req, res, next) => {
//   const newUserData = ({
//     firstname,
//     lastname,
//     dob,
//     email,
//     mobilePrimery,
//     mobileSecondry,
//     address,
//     gender,
//     qualifications,
//     experience,
//     course,
//     institute,
//     certificates,
//     astrologyDescription,
//     astrologyExperience,
//     astrologyExpertise,
//     knowus,
//     maxTime,
//     isActive,
//   } = req.body);
//   const astrologer = await Astrologer.findByIdAndUpdate(
//     req.params.id,
//     newUserData,
//     {
//       new: true,
//       runValidators: true,
//     }
//   );

//   res.status(200).json({
//     success: true,
//     astrologer,
//   });
// });

// //deleteAstrologer - {{base_url}}/api/v1/astrologer/delete/:id
// exports.deleteAstrologer = catchAsyncError(async (req, res, next) => {
//   const astrologer = await Astrologer.findById(req.params.id);
//   if (!astrologer) {
//     return next(
//       new ErrorHandler(`User not found with this id ${req.params.id}`)
//     );
//   }
//   await astrologer.deleteOne();
//   res.status(200).json({
//     success: true,
//   });
// });

// //getAllAstrologer - {{base_url}}/api/v1/astrologer/allAstrologers
// exports.getAllAstrologers = catchAsyncError(async (req, res, next) => {
//   try{
//     const astrologers = await Astrologer.find();
//     res.status(200).json({
//       success: true,
//       astrologers,
//     });
//   }
//   catch(error){
//     return next(new ErrorHandler(error.message), 500)
//   }
 
// });

// //getAstrologer - {{base_url}}/api/v1/astrologer/getAstrologer/:id
// exports.getAstrologer = catchAsyncError(async (req, res, next) => {
//   const astrologer = await Astrologer.findById(req.params.id);
//   if (!astrologer) {
//     return next(
//       new ErrorHandler(`User not found with this id ${req.params.id}`)
//     );
//   }
//   res.status(200).json({
//     success: true,
//     astrologer,
//   });
// });

// //changeAstrologer Active to inActive  - {{base_url}}/api/v1/astrologer/state/:id
// exports.activeAstrologer = catchAsyncError(async (req, res, next) => {
//   const newState = ({ isActive } = req.body);
//   const activeAstrologer = await Astrologer.findByIdAndUpdate(
//     req.params.id,
//     newState,
//     {
//       new: true,
//       runValidators: true,
//     }
//   );
//   res.status(200).json({
//     success: true,
//     activeAstrologer,
//   });
// });