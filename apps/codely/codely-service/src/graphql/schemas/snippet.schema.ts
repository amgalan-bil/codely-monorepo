import gql from 'graphql-tag';

export const snippetTypeDefs = gql`
  enum Visibility {
    PUBLIC
    PRIVATE
  }

  type Snippet {
    id: ID!
    title: String!
    description: String
    language: String!
    code: String!
    tags: [String!]!
    visibility: Visibility!
    authorId: ID!
    author: User
    comments: [Comment!]!
    viewCount: Int!
    createdAt: String!
    updatedAt: String!
  }

  input SnippetInput {
    authorId: ID!
    title: String!
    language: String!
    code: String!
    description: String
    tags: [String!]
    visibility: Visibility
  }

  input SnippetUpdateInput {
    title: String
    language: String
    code: String
    description: String
    tags: [String!]
    visibility: Visibility
  }

  extend type Query {
    getSnippets(visibility: Visibility, limit: Int): [Snippet!]!
    getSnippetById(snippetId: ID!): Snippet
    getSnippetsByUserId(userId: ID!): [Snippet!]!
  }

  extend type Mutation {
    createSnippet(input: SnippetInput!): Response!
    updateSnippet(
      snippetId: ID!
      authorId: ID!
      input: SnippetUpdateInput!
    ): Response!
    deleteSnippet(snippetId: ID!, authorId: ID!): Response!
  }
`;
