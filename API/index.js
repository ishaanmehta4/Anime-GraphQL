// ---------- Dependencies and imports ----------
const express = require('express')
const app = express()
const morgan = require('morgan')
const {graphqlHTTP} = require('express-graphql')
const { makeExecutableSchema } = require('@graphql-tools/schema');

var typeDefs = require('./graphql/typeDefs'); // All Entity typedefs
var rootQuery = require('./graphql/queries'); //  RootQuery typedef
var resolvers = require('./graphql/resolvers'); // Resolver functions

// ---------- Middlewares ----------
app.use(morgan('dev'))

// ---------- Routes ----------
app.get('/', (req, res) => {
    res.send({ status: "success", message: "Server running. Send queries to /graphql endpoint." })
})

const schema = makeExecutableSchema({
    typeDefs: `${rootQuery} ${typeDefs}`,
    resolvers,
  });

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

// ---------- Middlewares ----------
app.listen(process.env.PORT || 5000, () => {
    console.log('> Server listening to port ' + (process.env.PORT || 5000))
})