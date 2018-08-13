const express = require('express')
const app = express()
const { port } = require('./config')

const mainRouter = require('./routes/main')
const movieRouter = require('./routes/movie')

app.use('/api', mainRouter);
app.use('/api/movie/', movieRouter);

app.listen(port, () => console.log(`listening on port ${port}!`))

