const express = require("express");
const port = process.env.PORT || 3000;
const app = express();

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

app.get("/api/courses/:id", (req, res) => {
  const result = courses.find((c) => c.id === req.params.id);
});

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
