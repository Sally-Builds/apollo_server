const typeDefs = `#graphql
  type User {
      username: String
      password: String
      _id: ID!
      id: ID!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    createUser(input: createUser):User
  }

  input createUser {
    username: String,
    password: String
  }
`;

export default typeDefs