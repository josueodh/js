const express = require("express");
const cors = require("cors");
const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());
function validateId(request, response, next) {
  const { id } = request.params;
  if (!isUuid(id)) {
    return response.status(400).json({ error: "This id is invalid" })
  }
  next();
}

app.use('/repositories/:id', validateId);
const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = { id: uuid(), title, url, techs, likes: 0 };
  repositories.push(repository);
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id == id);
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found ." })
  }
  repository = { id: uuid(), title, url, techs, likes: repositories[repositoryIndex].likes };
  repositories[repositoryIndex] = repository;
  return response.json(repositories[repositoryIndex]);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id == id);
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found ." })
  }
  repositories.splice(repositoryIndex, 1);
  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id == id);
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found ." })
  }
  repository = repositories[repositoryIndex];
  repository.likes += 1;
  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

module.exports = app;
