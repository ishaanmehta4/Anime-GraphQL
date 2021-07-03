// ---------- Dependencies and imports ----------
const express = require('express');
const app = express();
const cors = require('cors')
const morgan = require('morgan');
const path = require('path');

const graphqlHTTP = require('./graphql');
const restRouter = require('./rest')

// ---------- Middlewares ----------
app.use(cors());
app.use(morgan('dev'));

// ---------- Routes ----------
// app.get('/', (req, res) => {
//   res.send({ status: 'success', message: 'Server running. Send queries to /graphql endpoint.' });
// });

app.use('/graphql', graphqlHTTP);
app.use('/rest', restRouter)

//---------- Root Route for frontend ----------
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})
app.use(express.static(path.join(__dirname, 'build')))

// ---------- Middlewares ----------
app.listen(process.env.PORT || 5000, () => {
  console.log('> Server listening to port ' + (process.env.PORT || 5000));
});
