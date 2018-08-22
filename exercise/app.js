const express = require('express')
const app = express()
const { port, publicKey } = require('./config')
const bodyParser = require('body-parser')
const cors = require('cors')

const mainRouter = require('./routes/main')
const movieRouter = require('./routes/movie')
const imgRoute = require('./img_route');

app.use( express.static('public'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// app.use('/api',function(req, res, next) {
    // if (!req.headers.authorization) {
    //     return res.status(403).json({ error: 'No credentials sent!' });
    // }
    // if (req.headers.authorization != publicKey){
    //     return res.status(403).json({ error: 'No credentials sent!' });
    // }
    // next();
// });
app.use('/api', mainRouter);
app.use('/api/movie/', movieRouter);
app.use('/image', imgRoute)


app.listen(port, () => console.log(`listening on port ${port}!`))

