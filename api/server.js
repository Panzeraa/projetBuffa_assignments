//https://www.frugalprototype.com/api-mongodb-mongoose-node-js/
//https://levelup.gitconnected.com/handling-errors-in-mongoose-express-for-display-in-react-d966287f573b

let express = require("express");
let path = require('path'); 
let app = express();
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

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log("Serveur démarré sur http://localhost:" + port);

module.exports = app;
