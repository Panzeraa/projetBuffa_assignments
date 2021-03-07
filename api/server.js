//https://www.frugalprototype.com/api-mongodb-mongoose-node-js/
//https://levelup.gitconnected.com/handling-errors-in-mongoose-express-for-display-in-react-d966287f573b

let express = require("express");
let path = require('path');
let app = express();
const multer = require('multer');
let bodyParser = require("body-parser");
let assignment = require("./routes/assignments");
let utilisateur = require("./routes/utilisateurs");
let subject = require("./routes/subjects");
let student = require("./routes/students");
let teacher = require("./routes/teachers");


let mongoose = require("mongoose");
mongoose.Promise = global.Promise;
//mongoose.set('debug', true);

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
const uri = require("./config").mongo.endpoint;
// const utilisateur = require("./model/utilisateur");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(uri, options).then(
  () => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log(
      "vérifiez with http://localhost:8010/api/assignments que cela fonctionne"
    );
  },
  (err) => {
    console.log("Erreur de connexion: ", err);
  }
);

var storage = multer.diskStorage({ 
  destination: function (req, file, cb) { 

      // Uploads is the Upload_folder_name 
      cb(null, "data") 
  }, 
  filename: function (req, file, cb) { 
    cb(null, file.originalname+".png") 
  } 
})

// Define the maximum size for uploading 
// picture i.e. 1 MB. it is optional 
const maxSize = 100 * 1000 * 1000; 
    
var upload = multer({ dest: './uploads/', storage: storage});

// var upload = multer({  
//     storage: storage, 
//     limits: { fileSize: maxSize }, 
//     fileFilter: function (req, file, cb){ 
    
//         // Set the filetypes, it is optional 
//         var filetypes = /jpeg|jpg|png/; 
//         var mimetype = filetypes.test(file.mimetype); 
  
//         var extname = filetypes.test(path.extname( 
//                     file.originalname).toLowerCase()); 
        
//         if (mimetype && extname) { 
//             return cb(null, true); 
//         } 
      
//         cb("Error: File upload only supports the "
//                 + "following filetypes - " + filetypes); 
//       }  
  
// // mypic is the name of file attribute 
// }).single("mypic");   

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;

// les routes
const prefix = "/api";

app.route(prefix + "/utilisateurs").post(utilisateur.login);

app.route(prefix + "/assignments").get(assignment.getAssignments);

app.route(prefix + "/image").get(assignment.getImage);

app.route(prefix + "/subjects").get(subject.getSubjects);

app.route(prefix + "/students").get(student.getStudents);

app.route(prefix + "/subjects").post(subject.postSubject);
app.route(prefix + "/subject/:id").get(subject.getSubject).delete(subject.deleteSubject).put(subject.updateSubject);
app.route(prefix + "/subject").put(subject.updateSubject);

app.route(prefix + "/teachers").get(teacher.getTeachers);

app.route(prefix + "/teachers").post(teacher.postTeacher);

app
  .route(prefix + "/assignments/:id")
  .get(assignment.getAssignment)
  .delete(assignment.deleteAssignment);

app
  .route(prefix + "/assignments")
  .post(assignment.postAssignment)
  .put(assignment.updateAssignment);

app.post('/api/image',upload.single('uploadfile'), function (req, res, next) {

  console.log(req);
  // Error MiddleWare for multer file upload, so if any 
    // error occurs, the image would not be uploaded! 
  //   upload(req,res,function(err) { 
  
  //     if(err) { 

  //         // ERROR occured (here it can be occured due 
  //         // to uploading image of size greater than 
  //         // 1MB or uploading different file type) 
  //         res.send(err) 
  //     } 
  //     else { 

  //         // SUCCESS, image successfully uploaded 
  //         res.send("Success, Image uploaded!") 
  //     } 
  // }) 
});

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log("Serveur démarré sur http://localhost:" + port);

module.exports = app;
