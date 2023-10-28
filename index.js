const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const z = require("zod");

app.use(express.json());

const schema = z.object({
  id: z.number(),
  name: z.string().min(3).max(16),
});

const courses = [
  { id: 1, name: "course" },
  { id: 2, name: "course1" },
  { id: 3, name: "course2" },
];

app.get("/", (req, res) => {
  res.send("hello world");
});
app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/api/courses", (req, res) => {
  res.send([courses]);
});

app.post("/api/courses", (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  try {
    schema.parse(course);
    res.send(course).status(201);
    courses.push(course);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404);
  else {
    try {
      schema.parse(course);
      course.name = req.body.name;
      res.send(course);
    } catch (e) {
      res.status(400).send(e);
    }
  }
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send(`course with id :: ${req.params.id} not found`);
  } else {
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
  }
});

app.get("/api/courses/:id", (req, res) => {
  const result = courses.find((c) => c.id === parseInt(req.params.id));
  if (!result)
    res.send("the course you were looking for cannot be found ").status(400);
  else {
    res.send([result]);
  }
});

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
