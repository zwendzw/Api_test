const express = require('express');
const app = express();
const gameRouter = require('./routes/game.router');

const port = 3003;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/game', gameRouter);

app.listen(port, () => console.log(`Url: http://localhost:${port}`));
