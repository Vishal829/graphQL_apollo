const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');

const app = express(); // initialize express.

app.use(
  '/graphql', // with graphql and express we only have one endpoint.
  graphqlHTTP({
    schema, // From here we create a schema, which has all the queries, mutation(add, update, delete)
    graphiql: true, // It allows to use GraphiQL tool to manually issue GraphQL queries. If you navigate in a web browser to http://localhost:4000/graphql, you should see an interface that lets you enter queries
  }),
);

const PORT = process.env.PORT || 5000 // whatever is in the environment variable PORT, or 3000 if there's nothing there.

app.listen(PORT, () => console.log(`Server running on port number ${PORT}`));