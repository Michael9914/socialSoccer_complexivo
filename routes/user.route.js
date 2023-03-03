let express = require('express'),
  multer = require('multer'),
  mongoose = require('mongoose'),
  router = express.Router();
  mdAutenticacion = require('../middlewares/autenticacion');
  var app = express();
// Multer File upload settings
const DIR = './public/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});

var upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 5
  // },
 /* fileFilter: (req, file, cb) => {
    if (  file.mimetype == "image/pdf" || file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .pdf .png, .jpg and .jpeg format allowed!'));
    }
  }  */
});

// User model
let User = require('../models/UserDocumento');

app.post('/create-user', upload.array('avatar', 6), (req, res, next) => {
  var body = req.body;
  const reqFiles = []
  const url = req.protocol + '://' + req.get('host')
  for (var i = 0; i < req.files.length; i++) {
    reqFiles.push(url + '/public/' + req.files[i].filename)
  }

  const user = new User({

    
    _id: new mongoose.Types.ObjectId(),
    avatar: reqFiles,
    //referencia de collecion usuario
   
  });

  
  user.save().then(result => {
   // console.log(result);
    res.status(201).json({
      message: "Done upload!",
      userCreated: {
        _id: result._id,
        avatar: result.avatar
      }
    })
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        error: err
      }); 
  })
})  

app.get("/", (req, res, next) => {
  User.find()
  .populate('usuario')
  .then(data => {
    res.status(200).json({
      message: "Lista de usuarios recuperada con éxito!",
      userDocumentos: data
    });
  });
});




module.exports = app;  
