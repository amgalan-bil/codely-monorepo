import gql from 'graphql-tag';

export const commentTypeDefs = gql`
  type Comment {
    id: ID!
    body: String!
    snippetId: ID!
    authorId: ID!
    author: User
    createdAt: String!
  }

  input CommentInput {
    snippetId: ID!
    authorId: ID!
    body: String!
  }

  extend type Mutation {
    createComment(input: CommentInput!): Response!
  }
`;
