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

app.get("/api/courses", (req, res) => {
  res.send([courses]);
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
