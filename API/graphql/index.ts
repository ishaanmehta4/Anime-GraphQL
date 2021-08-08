import { Request, Response, NextFunction } from "express";
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const depthLimit = require('graphql-depth-limit');

// var typeDefs = require('./typeDefs'); // All Entity typedefs
import typeDefs from './typeDefs'; // All Entity typedefs
import rootQuery from'./queries'; //  RootQuery typedef
import resolvers from './resolvers'; // Resolver functions

const schema = makeExecutableSchema({
  typeDefs: `${rootQuery} ${typeDefs}`,
  resolvers,
});

module.exports = (req:Request, res:Response, next:NextFunction) =>
  graphqlHTTP({
    schema,
    graphiql: true,
    validationRules: [depthLimit(4)],
    formatError: (error:Error) => {
      return error;
    },
  })(req, res, next);
