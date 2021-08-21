const { gql } = require('apollo-server-express');

const user = gql`
  type User {
    _id: String
    username: String
    email: String
    createdAt: String
    google: Boolean
    googleId: String
  }

  input auth {
    email: String!
    password: String!
  }

  type authData {
    token: String
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    register(input: auth!, username: String!): User
    login(input: auth!): authData
  }
`;

module.exports = user;
