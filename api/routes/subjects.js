let Subject = require("../model/subjectModel");

// Récupérer tous les subjects (GET)
function getSubjects(req, res) {
  
  let name = req.query.name;
  console.log(name)
  rendu = Boolean(Number(rendu));
  console.log(rendu)
  var aggregateQuery = Subject.aggregate([{ $match: { rendu: rendu} }]);
  Subject.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    },
    (err, subjects) => {
      if (err) {
        res.send(err);
      }
      // console.log(subjects);
      res.send(subjects);
    }
  );
}

// Récupérer un subject par son id (GET)
function getSubject(req, res) {
  let subjectId = req.params.id;

  Subject.findOne({ id: subjectId }, (err, subject) => {
    if (err) {
      res.send(err);
    }
    res.json(subject);
  });
}

// Ajout d'un subject (POST)
function postSubject(req, res) {
  let subject = new Subject();
  subject.id = req.body.id;
  subject.name = req.body.name;
  subject.teacher = req.body.teacher;

  console.log("POST subject reçu :");
  console.log(subject);

  subject.save((err) => {
    if (err) {
      res.send("cant post subject ", err);
    }
    res.json({ message: `${subject.name} saved!` });
  });
}

// Update d'un subject (PUT)
function updateSubject(req, res) {
  console.log("UPDATE recu subject : ");
  console.log(req.body);
  Subject.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true },
    (err, subject) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.json({ message: "updated" });
      }

      // console.log('updated ', subject)
    }
  );
}

// suppression d'un subject (DELETE)
function deleteSubject(req, res) {
    Subject.findByIdAndRemove(req.params.id, (err, subject) => {
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