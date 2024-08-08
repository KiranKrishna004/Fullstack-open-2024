const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

morgan.token("req", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(express.json());
app.use(cors());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :req")
);
app.use(express.static("dist"));

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const time = new Date();
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p><br/><p>${time}</p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const person = persons.find((person) => person.id === request.params.id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((note) => note.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const person = request.body;

  const foundName = persons.find((p) => person.name === p.name);

  const foundNumber = persons.find((p) => person.number === p.number);

  if (foundName) {
    response.json({ error: "name must be unique" }).status(400).end();
  } else if (foundNumber) {
    response.json({ error: "number must be unique" }).status(400).end();
  } else {
    const id = Math.floor(Math.random() * 10000);

    person.id = id;
    persons = persons.concat(person);

    response.json(person);
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
