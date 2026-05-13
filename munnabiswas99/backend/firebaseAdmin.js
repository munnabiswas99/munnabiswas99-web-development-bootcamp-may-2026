const admin = require("firebase-admin");

const serviceAccount = require("./personal-expense-tracker-a4828-firebase-adminsdk-fbsvc-a929c21870.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;