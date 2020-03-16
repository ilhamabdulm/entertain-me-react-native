const { ApolloServer, gql } = require('apollo-server')

const { typeDefs, resolvers } = require('./schemas')

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => console.log(url))
