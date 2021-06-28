const {graphqlHTTP} = require('express-graphql')
const { makeExecutableSchema } = require('@graphql-tools/schema');

var typeDefs = require('./typeDefs'); // All Entity typedefs
var rootQuery = require('./queries'); //  RootQuery typedef
var resolvers = require('./resolvers'); // Resolver functions

const schema = makeExecutableSchema({
    typeDefs: `${rootQuery} ${typeDefs}`,
    resolvers,
  });

module.exports = (req, res, next) => graphqlHTTP({
    schema,
    graphiql: true
})(req, res, next)