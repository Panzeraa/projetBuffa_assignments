const { ObjectID } = require('mongodb');
let path = require('path');
let Assignment = require("../model/assignmentModel");

// Récupérer un assignment par son id (GET)
function uploadImage(req, res) {

}
// Récupérer un assignment par son id (GET)
function getImage(req, res) {
  console.log("GET Image");
  let _filename = req.query.id
  var options = {
    root: path.join(__dirname, "..", "data")
  };
  var fileName = _filename + '.png';
  res.sendFile(fileName, options, function (err) {
    if (err) {
      res.sendStatus(404);
    } else {
      console.log('Sent:', fileName);
    }
  });
}


// Récupérer tous les assignments (GET)
function getAssignments(req, res) {

  let rendu = req.query.rendu;
  console.log(rendu)
  rendu = Boolean(parseInt(rendu));
  console.log(rendu)
  var aggregateQuery = Assignment.aggregate([{
    $match: {
      rendu: rendu
    }
  },
  { "$addFields": { "idSubject": { "$toObjectId": "$idSubject" } } },
  { "$addFields": { "idStudent": { "$toObjectId": "$idStudent" } } },
  {
    $lookup: {
      from: "subjects",
      localField: "idSubject",
      foreignField: "_id",
      as: "subject"
    }
  }, {
    $lookup: {
      from: "students",
      localField: "idStudent",
      foreignField: "_id",
      as: "student"
    }
  },
  { $unwind: { path: "$subject" } },
  { $unwind: { path: "$student" } },
  { "$addFields": { "subject.idTeacher": { "$toObjectId": "$subject.idTeacher" } } },
  {
    $lookup: {
      from: "teachers",
      localField: "subject.idTeacher",
      foreignField: "_id",
      as: "teacher"
    }
  },
  { $unwind: { path: "$teacher" } },
  { "$addFields": { "subject.teacher": "$teacher" } },
  {
    $group: {
      _id: "$_id",
      dateDeRendu: { $first: "$dateDeRendu" },
      name: { $first: "$name" },
      note: { $first: "$note" },
      remarque: { $first: "$remarque" },
      rendu: { $first: "$rendu" },
      student: { $first: "$student" },
      subject: { $first: "$subject" },
    }
  },
  { $sort: { "_id": -1} },
  ]);
  Assignment.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    },
    (err, assignments) => {
      if (err) {
        res.send(err);
      }
      // console.log(assignments);
      res.send(assignments);
    }
  );
}


// Récupérer un assignment par son id (GET)
function getAssignment(req, res) {
  let assignmentId = req.params.id;
  assignmentId = ObjectID(assignmentId);
  var aggregateQuery = Assignment.aggregate([{
    $match: {
      _id: assignmentId
    }
  },
  { "$addFields": { "idSubject": { "$toObjectId": "$idSubject" } } },
  { "$addFields": { "idStudent": { "$toObjectId": "$idStudent" } } },
  {
    $lookup: {
      from: "subjects",
      localField: "idSubject",
      foreignField: "_id",
      as: "subject"
    }
  }, {
    $lookup: {
      from: "students",
      localField: "idStudent",
      foreignField: "_id",
      as: "student"
    }
  },
  { $unwind: { path: "$subject" } },
  { $unwind: { path: "$student" } },
  { "$addFields": { "subject.idTeacher": { "$toObjectId": "$subject.idTeacher" } } },
  {
    $lookup: {
      from: "teachers",
      localField: "subject.idTeacher",
      foreignField: "_id",
      as: "teacher"
    }
  },
  { $unwind: { path: "$teacher" } },
  { "$addFields": { "subject.teacher": "$teacher" } },
  {
    $group: {
      _id: "$_id",
      dateDeRendu: { $first: "$dateDeRendu" },
      name: { $first: "$name" },
      note: { $first: "$note" },
      remarque: { $first: "$remarque" },
      rendu: { $first: "$rendu" },
      student: { $first: "$student" },
      subject: { $first: "$subject" },
    }
  },
  { $limit: 1 }
  ], function (err, retour) {
    if (err) {
      res.send(err);
    }
    //Retour d'un seul assignment avec aggregate
    res.send(retour[0]);
  });

  // console.log(aggregateQuery);

  // Assignment.findOne({ _id: assignmentId }, (err, assignment) => {
  //   if (err) {
  //     res.send(err);
  //   }
  //   res.json(assignment);
  // });
}

// Ajout d'un assignment (POST)
function postAssignment(req, res) {
  let assignment = new Assignment();
  assignment.id = req.body.id;
  assignment.name = req.body.name;
  assignment.remarque = req.body.remarque;
  assignment.dateDeRendu = req.body.dateDeRendu;
  assignment.rendu = req.body.rendu;
  assignment.note = +req.body.note;
  assignment.idStudent = ObjectID(req.body.idStudent);
  assignment.idSubject = ObjectID(req.body.idSubject);


  console.log("POST assignment reçu :");
  console.log(assignment);

  assignment.save((err) => {
    if (err) {
      res.send("cant post assignment ", err);
    }
    res.json({ message: `${assignment.name} saved!` });
  });
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
  console.log("UPDATE recu assignment : ");
  console.log(req.body);
  Assignment.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true },
    (err, assignment) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.json({ message: "updated" });
      }

      // console.log('updated ', assignment)
    }
  );
}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {
  Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: `${assignment.nom} deleted` });
  });
}

module.exports = {
  getAssignments,
  postAssignment,
  getAssignment,
  updateAssignment,
  deleteAssignment,
  getImage,
  uploadImage
};
