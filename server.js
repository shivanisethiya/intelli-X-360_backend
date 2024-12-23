const express=require('express');
const bodyParser=require('body-parser');
const cors=require("cors");
const app=express();

const {Pool}=require("pg");
app.get('/',(req,res)=>{
    res.send("hello world");
})
app.use(cors());
const db= new Pool({
    host:'localhost',
    user:'postgres',
    password:'shivani',
    database:'students',
    port:5432,
})


app.use(bodyParser.json());

const PORT=5000;
app.post('/add-student', async (req, res) => {
  const {
    name,
    admissionno,
    image,
    classs,  
    discount,
    mobileno,
    dateofadm,
    dob,
    gender,
    family,
    mark,
    bloodgrp,
    disease,
    formid,
    castt,
    prevschl,
    boardrollno,
    addnote,
    isorphan,
    osc,
    religion,
    totalsiblings,
    fathername,
    mothername,
    address,
    fatheredu,
    fatherocc,
    fathernationalid,
    fathermobile,
    fatherprofession,
    fatherincome,
    motheredu,
    motherocc,
    mothernationalid,
    mothermobile,
    motherprofession,
    motherincome,
  } = req.body;

  // Map keys to match the database column names
  const query = `
    INSERT INTO Student (
   name,
    admissionno,
    image,
    classs,  
    discount,
    mobileno,
    dateofadm,
    dob,
    gender,
    family,
    mark,
    bloodgrp,
    disease,
    formid,
    castt,
    prevschl,
    boardrollno,
    addnote,
    isorphan,
    osc,
    religion,
    totalsiblings,
    fathername,
    mothername,
    address,
    fatheredu,
    fatherocc,
    fathernationalid,
    fathermobile,
    fatherprofession,
    fatherincome,
    motheredu,
    motherocc,
    mothernationalid,
    mothermobile,
    motherprofession,
    motherincome
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 
      $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37
    ) RETURNING *`;

  try {
    const result = await db.query(query, [
      name,
      admissionno,
      image,
      classs,  
      discount,
      mobileno,
      dateofadm,
      dob,
      gender,
      family,
      mark,
      bloodgrp,
      disease,
      formid,
      castt,
      prevschl,
      boardrollno,
      addnote,
      isorphan,
      osc,
      religion,
      totalsiblings,
      fathername,
      mothername,
      address,
      fatheredu,
      fatherocc,
      fathernationalid,
      fathermobile,
      fatherprofession,
      fatherincome,
      motheredu,
      motherocc,
      mothernationalid,
      mothermobile,
      motherprofession,
      motherincome,
    ]);

    res.status(200).send({ message: 'Student added successfully', student: result.rows[0] });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error in adding a student');
  }
});

  



app.listen(PORT ,()=>{
    console.log(`server is running on port ${PORT}`);
})