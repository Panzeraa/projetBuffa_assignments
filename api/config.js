const mongo_username = "userBuffa";
const mongo_password = "vbdiodLB2SrPHm2B";
const mongo_cluster = "clusterbuffa.9qnpe";
const mongo_dbname = "assignments";

module.exports = {
  mongo: {
    username: mongo_username,
    password: mongo_password,
    cluster: mongo_cluster,
    dbname: mongo_dbname,
    endpoint: `mongodb+srv://${mongo_username}:${mongo_password}@${mongo_cluster}.mongodb.net/${mongo_dbname}?retryWrites=true&w=majority`,
  },
};
