const express = require('express');
const { getGameById, getGames } = require('./controllers');
const app = express();

app.use(express.json());

app.get('/games', async (req, res) => {
  const games = getGames();
  res.json({ games });
});

app.get('/games/details/:id', async (req, res) => {
  const game = getGameById(parseInt(req.params.id));

  res.json({ game });
});

module.exports = { app };
