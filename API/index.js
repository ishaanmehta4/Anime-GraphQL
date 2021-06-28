// ---------- Dependencies and imports ----------
const express = require('express');
const app = express();
const morgan = require('morgan');

const graphqlHTTP = require('./graphql');

// ---------- Middlewares ----------
app.use(morgan('dev'));

// ---------- Routes ----------
app.get('/', (req, res) => {
  res.send({ status: 'success', message: 'Server running. Send queries to /graphql endpoint.' });
});

app.use('/graphql', graphqlHTTP);
// app.use('/rest', restRouter)

// ---------- Middlewares ----------
app.listen(process.env.PORT || 5000, () => {
  console.log('> Server listening to port ' + (process.env.PORT || 5000));
});
