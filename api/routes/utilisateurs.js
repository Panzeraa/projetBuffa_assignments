let Utilisateur = require("../model/utilisateurModel");

// Connexion POST
function login(req, res) {
    //   var aggregateQuery = Assignment.aggregate();
    //   Assignment.aggregatePaginate(
    //     aggregateQuery,
    //     {
    //       page: parseInt(req.query.page) || 1,
    //       limit: parseInt(req.query.limit) || 10,
    //     },
    //     (err, assignments) => {
    //       if (err) {
    //         res.send(err);
    //       }
    //       console.log(assignments);
    //       res.send(assignments);
    //     }
    //   );
    // let username = req.params.username;
    let username = req.body.username;
    let password = req.body.password;
    console.log("req : " + req)
    console.log(username + " - " + password)

    // console.log('username ::: ' + username)
    Utilisateur.findOne({ username: username, password: password }, (err, user) => {
        if (err) {
            res.send(err);
        }
        if (user == null) {
            res.status(401)
        }
        console.log(user);
        res.send(user);
    });
    // res.send(req.query);
}

// // Récupérer un assignment par son id (GET)
// function getAssignment(req, res) {
//   let assignmentId = req.params.id;

//   Assignment.findOne({ id: assignmentId }, (err, assignment) => {
//     if (err) {
//       res.send(err);
//     }
//     res.json(assignment);
//   });
// }

// // Ajout d'un assignment (POST)
// function postAssignment(req, res) {
//   let assignment = new Assignment();
//   assignment.id = req.body.id;
//   assignment.nom = req.body.nom;
//   assignment.dateDeRendu = req.body.dateDeRendu;
//   assignment.rendu = req.body.rendu;

//   console.log("POST assignment reçu :");
//   console.log(assignment);

//   assignment.save((err) => {
//     if (err) {
//       res.send("cant post assignment ", err);
//     }
//     res.json({ message: `${assignment.nom} saved!` });
//   });
// }

// // Update d'un assignment (PUT)
// function updateAssignment(req, res) {
//   console.log("UPDATE recu assignment : ");
//   console.log(req.body);
//   Assignment.findByIdAndUpdate(
//     req.body._id,
//     req.body,
//     { new: true },
//     (err, assignment) => {
//       if (err) {
//         console.log(err);
//         res.send(err);
//       } else {
//         res.json({ message: "updated" });
//       }

//       // console.log('updated ', assignment)
//     }
//   );
// }

// // suppression d'un assignment (DELETE)
// function deleteAssignment(req, res) {
//   Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
//     if (err) {
//       res.send(err);
//     }
//     res.json({ message: `${assignment.nom} deleted` });
//   });
// }

module.exports = {
    login
};
