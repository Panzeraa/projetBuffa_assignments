const { ObjectID } = require("mongodb");
let mongoose = require("mongoose");
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
let Schema = mongoose.Schema;

let AssignmentSchema = Schema({
  dateDeRendu: Date,
  name: String,
  rendu: Boolean,
  remarque: String,
  idSubject: ObjectID,
  idStudent: ObjectID,
  note: Number
});
AssignmentSchema.plugin(aggregatePaginate);
// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model("Assignment", AssignmentSchema);
