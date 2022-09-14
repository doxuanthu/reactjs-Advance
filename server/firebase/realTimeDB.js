const admin = require("firebase-admin");

const serviceAccount = require("../config/product-management-50c04-firebase-adminsdk-z7k8w-12169d666c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://product-management-50c04-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const db = admin.database();

module.exports = db;
