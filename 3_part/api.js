const mysql = require('mysql')

const express = require('express');

const cors = require('cors');
const dotenv = require("dotenv");

const { verifyTokenAndAdmin } = require("./verifyToken");

const app = express();

app.use(express.json());

dotenv.config();

//ดึง ค่าต่างๆ ของ db จาก env
app.use(cors({
  origin: process.env.FRONTEND,
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}));

const connection = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.PRODUCT_DB,
});

const port = process.env.PORT;

//ในทุกๆ path เรา verify jwt token และ admin เนื่องจากเราจะ restrict คนที่มี access เท่านั้นสำหรับ crub operations
//เพิ่ม product ใหม่โดยใช้ post และนำ request body insert เข้า db
/*
ตัวอย่าง request
http://localhost:3000/post
  {
      "name" : "bag",
      "price" : 50000,
      "category" : "util"
  }

ตัวอย่าง response
  {
      "message" : "created successfully"
      "product": {
        "name": "bag",
        "price": "50000",
        "category": "util"
    }
  }
*/
app.post("/post", verifyTokenAndAdmin, async (req, res) => {
  const { name, price, category } = req.body;
  //เช็คว่ามี field ของ product ครบไหมใน json body
  if (!name || !price || !category) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  let product = req.body;
  try {
    
    const [{ insertId }] = await connection.promise().query(
      `INSERT INTO products (price, name, category) 
            VALUES (?, ?,?)`,
      [product.price, product.name, product.category]
    );
    
    res.status(200).json({
      message: "Created successfully",
      product: product
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: err,
    });
  }
});

// update product โดยนำ id จาก params ไปหาใน db และ update ค่าต่างๆจาก request body
/*
ตัวอย่าง request
http://localhost:3000/update?id=2
  {
      "name" : "bag",
      "price" : 100000,
      "category" : "cosmetic"
  }

ตัวอย่าง response
  {
      "message" : "updated successfully"
      "product": {
        "name": "bag",
        "price": "50000",
        "category" : "cosmetic"
    }
  }
*/
app.patch("/update", verifyTokenAndAdmin, async (req, res) => {
  //เช็คว่ามี id ใส่ใน query ไหม e.g /update?id=2
  if (req.query.id == undefined) {
    return res.status(400).json({ error: "Missing id in query fields" })
  }
  const { name, price, category } = req.body;
  //เช็คว่ามี field ของ product ครบไหมใน json body
  if (!name || !price || !category) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const id = req.query.id;
  let product = req.body;
  try {
    
    const update = await connection
      .promise()
      .query(
        `UPDATE products set name = ?, address = ?, country = ? where id = ?`,
        [product.price, product.name, product.category, id]
      );
    
    res.status(200).json({
      message: "updated successfully",
      product: product
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});
//delete product โดยนำ id จาก params มาเหมือนกับ route update และ query เพื่อลบออกใน db
/*
ตัวอย่าง request
http://localhost:3000/delete?id=2
ไม่มี body
{}

ตัวอย่าง response
  {
      "message" : "deleted successfully"
  }
*/

app.delete("/delete", verifyTokenAndAdmin, async (req, res) => {
  if (req.query.id == undefined) {
    return res.status(400).json({ error: "Missing id in query fields" })
  }
  const { id } = req.params;
  try {
    
    const update = await connection
      .promise()
      .query(
        `DELETE FROM  products where id = ?`,
        [id]
      );
    
    res.status(200).json({
      message: "deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
