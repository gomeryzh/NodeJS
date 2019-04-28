const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" }
];

app.get("/", (req, res) => {
  res.send("Hello from inex js");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const currentCourse = courses.find(
    course => course.id === parseInt(req.params.id)
  );

  if (!currentCourse) res.status(404).send("Current course does not exist");
  res.send(currentCourse);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateInput(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const newCourse = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(newCourse);
  res.send(newCourse);
});

app.put("/api/courses/:id", (req, res) => {
  const currentCourse = courses.find(
    course => course.id === parseInt(req.params.id)
  );
  if (!currentCourse) res.status(404).send("Current course does not exist");

  const { error } = validateInput(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  currentCourse.name = req.body.name;
  res.send(currentCourse);
});

function validateInput(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(course, schema);
}

const port = process.env.PORT || 4777;

app.listen(port, () => console.log(`Listening on port ${port}`));
