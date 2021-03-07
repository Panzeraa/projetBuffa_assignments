const { ObjectID } = require("bson");
let Subject = require("../model/subjectModel");

// Récupérer tous les subjects (GET)
function getSubjects(req, res) {
  var aggregateQuery = Subject.aggregate([
  { "$addFields": { "idTeacher": { "$toObjectId": "$idTeacher" } } },
  {
    $lookup: {
      from: "teachers",
      localField: "idTeacher",
      foreignField: "_id",
      as: "teacher"
    }
  },
  { $unwind: { path: "$teacher" } },
  ],
    (err, subjects) => {
      if (err) {
        res.send(err);
      }
      res.send(subjects);
    }
  );
}

// Récupérer un subject par son id (GET)
function getSubject(req, res) {
  let subjectId = ObjectID(req.params.id);

  Subject.findOne({ _id: subjectId }, (err, subject) => {
    if (err) {
      res.send(err);
    }
    res.json(subject);
  });
}

// Ajout d'un subject (POST)
function postSubject(req, res) {
  let subject = new Subject();
  subject.name = req.body.name;
  subject.idTeacher = req.body.idTeacher;

  console.log("POST subject reçu :");
  console.log(subject);

  subject.save((err) => {
    if (err) {
      res.send("cant post subject ", err);
    }
    res.json({ message: `${subject.name} saved!`, id: subject._id});
  });
}

// Update d'un subject (PUT)
function updateSubject(req, res) {
  console.log("UPDATE recu subject : ");
  console.log(req.body);
  Subject.findByIdAndUpdate(
    ObjectID(req.body._id),
    req.body,
    { new: true },
    (err, subject) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.json({ message: "updated" });
      }
    }
  );
}

// suppression d'un subject (DELETE)
function deleteSubject(req, res) {
    Subject.findByIdAndRemove(ObjectID(req.params.id), (err, subject) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: `${subject.name} deleted` });
  });
}

module.exports = {
  getSubjects,
  postSubject,
  getSubject,
  updateSubject,
  deleteSubject,
};
