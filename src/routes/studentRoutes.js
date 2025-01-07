const express = require('express');
const { addStudent, getStudents, getStudentById, updateStudent, deleteStudent } = require('../controllers/studentController');
const upload = require('../middlewares/imageUpload')
const router = express.Router();

// Routes
router.post('/add-student', upload, addStudent);
router.get('/students', getStudents);
router.get('/students/:id', getStudentById);
router.put('/edit-student/:id',upload,updateStudent);
router.delete('/delete-student/:id', deleteStudent);

module.exports = router;
