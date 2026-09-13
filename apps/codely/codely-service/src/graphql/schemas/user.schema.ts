import gql from 'graphql-tag';

/**
 * The root `Query`/`Mutation` types are declared here; every other schema module
 * adds to them with `extend type`.
 */
export const userTypeDefs = gql`
  enum Role {
    MEMBER
    ADMIN
  }

  type User {
    id: ID!
    userName: String!
    email: String!
    avatarUrl: String!
    role: Role!
    snippets: [Snippet!]!
    createdAt: String!
    updatedAt: String!
  }

  type Response {
    message: String!
  }

  input UserInput {
    userName: String!
    email: String!
    avatarUrl: String
    role: Role
  }

  type Query {
    getUsers: [User!]!
    getUserById(userId: ID!): User
  }

  type Mutation {
    createUser(input: UserInput!): Response!
  }
`;
