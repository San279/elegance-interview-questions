const express = require('express');
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');
const port = 3000;

// CORS
app.use(cors());

// mock database
const database_mock = [
  { "username": "user", "password": "pass" }
]

// endpoint สำหรับ login
app.post('/login', bodyParser.json(), (req, res) => {
  try {
    const userReq = req.body
    let found = false
    for (let i = 0; i < database_mock.length; i++) {
      const userDb = database_mock[i]
      // จริงๆ ต้องมี decryption พอดึง password มาจาก db 
      // const hashedPassword = CryptoJS.AES.decrypt(data.password, process.env.PASS_SECRET);
      //  const O_password = hashedPassword.toString(CryptoJS.enc.Utf8);
      if (userDb.username == userReq.username && userDb.password == userReq.password) {
        found = true
      }
    }
    if (found) {
      // ต้องเพิ่ม jwt token ให้เมื่อเจอ user กับ pass ใน db
      /*
      const accessToken = jwt.sign({
        id:data._id, 
        isAdmin: data.isAdmin,
    }, 
        process.env.JWT_SECRET,
        {expiresIn: "20d"}
    );
    */
      res.status(200).json({ "status": "success" }) //ส่ง 200 success กลับไป
    } else {
      res.status(401).json({ "status": "error" }) // ส่ง 401 error กลับไป
    }
  }
  catch (err) {
    res.status(500).json(err); //มี error กับ function ใดก้ตามให้ส่ง error กลับไปทมี่ front จะได้ตรวจได้
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
