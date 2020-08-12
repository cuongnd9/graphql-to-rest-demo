const typeDef = `
  extend type Query {
    categories: [Category]
  }

  extend type Mutation {
    createCategory(name: String!): Category
    updateCategory(id: String!, name: String): Category
    deleteCategory(id: String!): Int
  }

  type Category {
    id: String
    name: String
    cats: [Cat]
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

export default typeDef;
