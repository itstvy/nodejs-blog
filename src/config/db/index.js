const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/f8_education_dev");
    console.log("Connect to DB successfully !!!");
  } catch (error) {
    console.log("Connect failure");
  }
}
module.exports = { connect };

// hàm này sẽ được gọi trong file /src/index.js
// để sử dụng hàm connect này ở file index.js thì phải export nó ra
// module.exports = { connect };
// để sử dụng hàm connect này ở file src/index.js thì phải import nó vào
// const db = require("./config/db");
// sau đó gọi hàm connect
// db.connect();
