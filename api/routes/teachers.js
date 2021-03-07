let Teacher = require("../model/teacherModel");

// Récupérer tous les teacher (GET)
function getTeachers(req, res) {
  var aggregateQuery = Teacher.find({},
    (err, teachers) => {
      if (err) {
        res.send(err);
      }
      res.send(teachers);
    }
  );
}

// Récupérer un teacher par son id (GET)
function getTeacher(req, res) {
  let subjectId = req.params.id;

  Subject.findOne({ id: teachertId }, (err, teacher) => {
    if (err) {
      res.send(err);
    }
    res.json(teacher);
  });
}

// Ajout d'un teacher (POST)
function postTeacher(req, res) {
  let teacher = new Subject();
  teacher.name = req.body.name;

  console.log("POST teacher reçu :");
  console.log(teacher);

  teacher.save((err) => {
    if (err) {
      res.send("cant post teacher ", err);
    }
    res.json({ message: `${teacher.name} saved!` });
  });
}

// Update d'un teacher (PUT)
function updateTeacher(req, res) {
  console.log("UPDATE recu teacher : ");
  console.log(req.body);
  Teacher.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true },
    (err, teacher) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.json({ message: "updated" });
      }
    }
  );
}

// suppression d'un teacher (DELETE)
function deleteTeacher(req, res) {
    Teacher.findByIdAndRemove(req.params.id, (err, teacher) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: `${teacher.name} deleted` });
  });
}

module.exports = {
  getTeachers,
  getTeacher,
  postTeacher,
  updateTeacher,
  deleteTeacher,
};
