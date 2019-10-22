const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema } = require('graphql');
const axios = require('axios');

// Launch Type
const LaunchType = new GraphQLObjectType({
  name: 'Launch', // name of the object type
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    rocket: { type: RocketType } // Separate graphql object type. This is how we create relationship within schema.
  })
});

//Rocket Type
const RocketType = new GraphQLObjectType({
  name: 'Rocket',
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString }
  })
});

// Root Query - Endpoints that have resolvers to resolve our data
// Resolvers - A resolver is a function that resolves a value for a type or field in a schema. 
// Resolvers can return objects or scalars like Strings, Numbers, Booleans, etc.
// Follow this(https://medium.com/paypal-engineering/graphql-resolvers-best-practices-cd36fdbcef55) to understand resolvers.
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    launches: { // Returns array of all the launches so GraphQLList
      type: new GraphQLList(LaunchType), // GraphQLList need a type so LaunchType
      resolve(root, args, context, info) {
        return axios
          .get('https://api.spacexdata.com/v3/launches')
          .then(res => res.data);
      }
    },
    launch: {
      type: LaunchType,
      args: {
        flight_number: { type: GraphQLInt }
      },
      resolve(root, args, context, info) {
        return axios
          .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
          .then(res => res.data);
      }
    },
    rockets: {
      type: new GraphQLList(RocketType),
      resolve(root, args, context, info) {
        return axios
          .get('https://api.spacexdata.com/v3/rockets')
          .then(res => res.data);
      }
    },
    rocket: {
      type: RocketType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(root, args, context, info) {
        return axios
          .get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
          .then(res => res.data);
      }
    }
  }
});

// Export GraphQLSchema
module.exports = new GraphQLSchema({
  query: RootQuery
});