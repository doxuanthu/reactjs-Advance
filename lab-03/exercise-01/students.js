const express = require("express");
const router = express.Router();

const db = require("./db.json");

const studentsInfo = (students) => {
  const output = students.reduce((student, curr) => {
    student.push({
      sid: curr.sid,
      name: curr.name,
      average_grades:
        Math.round(
          (curr.scores
            .map((score) => score.score)
            .reduce((acc, score) => acc + score) /
            curr.scores.length) *
            100
        ) / 100,
    });
    return student;
  }, []);
  return output;
};

// get all students; path: /api/students
router.get("/", (req, res) => {
  res.json(db);
});

// get all students have field average grades; path: /api/students/info
router.get("/info", (req, res) => {
  const data = studentsInfo(db.students);
  res.json(data);
});

// get student have highest average grades; path: /api/students/highest-score
router.get("/highest-score", (req, res) => {
  const data = studentsInfo(db.students);

  const result = data.filter(
    (student) =>
      student.average_grades ===
      Math.max(...data.map((data) => data.average_grades))
  );

  res.json(result);
});

// get student have lowest average grades; path: /api/students/lowest-score
router.get("/lowest-score", (req, res) => {
  const data = studentsInfo(db.students);
  const result = data.filter(
    (student) =>
      student.average_grades ===
      Math.min(...data.map((data) => data.average_grades))
  );

  res.json(result);
});

// get student by sid; path: /api/students/:sid
router.get("/:sid", (req, res) => {
  const _sid = req.params.sid;
  const result = db.students.find((student) => student.sid === +_sid);

  res.json(result);
});

// remove student by sid; path: /api/students/delete/:id
router.delete("/delete/:sid", (req, res) => {
  const _sid = req.params.sid;
  const entity = db.students.find((student) => student.sid === +_sid);
  const index = db.students.findIndex((student) => student.sid === +_sid);
  db.students.splice(index, 1);
  res.json(entity);
});

// update info student by sid; path: /api/students/updated/:sid
router.patch("/updated/:sid", (req, res) => {
  const _sid = req.params.sid;
  const data = req.body;

  let result = db.students.map((student) =>
    student.sid === +_sid
      ? { ...student, scores: [...student.scores, data] }
      : student
  );

  res.json(result);
});

// Create student; path: /api/students/new-student
router.post("/new-student", (req, res) => {
  let student = {
    ...req.body,
    sid: db.students[db.students.length - 1].sid + 1,
  };

  db.students.push(student);
  res.json(student);
});

module.exports = router;
