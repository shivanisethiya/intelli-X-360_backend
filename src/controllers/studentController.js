const db = require("../config/db");

const addStudent = async (req, res) => {
  try {
    const fields = req.body;
  
    if (req.file) {
      fields.image = req.file.path.replace("\\", "/");
    }
    console.log("all fied are",fields);
    const columns = Object.keys(fields).join(", ");
    console.log("columns",columns);
    const placeholders = Object.keys(fields)
      .map((_, index) => `$${index + 1}`)
      .join(", ");
      console.log("placeholder",placeholders);
    const values = Object.values(fields);
    console.log("vallues",values);
    const query = `INSERT INTO student (${columns}) VALUES (${placeholders}) RETURNING *`;

    const result = await db.query(query, values);
   console.log("result",result);
       res.status(201).json({
      message: "Student added successfully",
      student: result.rows[0],
    });
  } catch (error) {
    console.error("Error adding student:", error.message);
    res.status(500).json({ error: "Failed to add student" });
  }
};

// Fetch all students
const getStudents = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM student");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch students" });
  }
};

// Fetch a student by ID
const getStudentById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      "SELECT * FROM student WHERE admissionno = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch student" });
  }
};

// Update a student
const updateStudent = async (req, res) => {
  const { id } = req.params;
  const fields = req.body;

  if (req.file) {
    fields.image = req.file.path.replace("\\", "/");
  }

  const updates = Object.keys(fields)
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");
  const values = Object.values(fields);

  try {
    const query = `UPDATE student SET ${updates} WHERE admissionno = $${
      values.length + 1
    } RETURNING *`;
    const result = await db.query(query, [...values, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    result.rows[0].image = `/uploads/${result.rows[0].image}`;

    res
      .status(200)
      .json({
        message: "Student updated successfully",
        student: result.rows[0],
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to update student" });
  }
};

// Delete a student
const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      "DELETE FROM student WHERE admissionno = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to delete student" });
  }
};

module.exports = {
  addStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
