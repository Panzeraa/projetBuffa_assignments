let Student = require("../model/studentModel");

// Récupérer tous les subjects (GET)
function getStudents(req, res) {
  var aggregateQuery = Student.find({},
    (err, students) => {
      if (err) {
        res.send(err);
      }
      res.send(students);
    }
  );
}

// // Récupérer un subject par son id (GET)
// function getSubject(req, res) {
//   let subjectId = req.params.id;

//   Subject.findOne({ id: subjectId }, (err, subject) => {
//     if (err) {
//       res.send(err);
//     }
//     res.json(subject);
//   });
// }

// // Ajout d'un subject (POST)
// function postSubject(req, res) {
//   let subject = new Subject();
//   subject.id = req.body.id;
//   subject.name = req.body.name;
//   subject.teacher = req.body.teacher;

//   console.log("POST subject reçu :");
//   console.log(subject);

//   subject.save((err) => {
//     if (err) {
//       res.send("cant post subject ", err);
//     }
//     res.json({ message: `${subject.name} saved!` });
//   });
// }

// // Update d'un subject (PUT)
// function updateSubject(req, res) {
//   console.log("UPDATE recu subject : ");
//   console.log(req.body);
//   Subject.findByIdAndUpdate(
//     req.body._id,
//     req.body,
//     { new: true },
//     (err, subject) => {
//       if (err) {
//         console.log(err);
//         res.send(err);
//       } else {
//         res.json({ message: "updated" });
//       }

//       // console.log('updated ', subject)
//     }
//   );
// }

// // suppression d'un subject (DELETE)
// function deleteSubject(req, res) {
//     Subject.findByIdAndRemove(req.params.id, (err, subject) => {
//     if (err) {
//       res.send(err);
//     }
//     res.json({ message: `${subject.name} deleted` });
//   });
// }

module.exports = {
  getStudents,
};
