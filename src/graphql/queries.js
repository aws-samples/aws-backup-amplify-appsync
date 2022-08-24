/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      name
      items {
        items {
          id
          name
          headline
          category {
            id
            name
            createdAt
            updatedAt
            owner
          }
          createdAt
          updatedAt
          categoryItemsId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listCategories = /* GraphQL */ `
  query ListCategories(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        items {
          items {
            id
            name
            headline
            createdAt
            updatedAt
            categoryItemsId
            owner
          }
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getItem = /* GraphQL */ `
  query GetItem($id: ID!) {
    getItem(id: $id) {
      id
      name
      headline
      category {
        id
        name
        items {
          items {
            id
            name
            headline
            createdAt
            updatedAt
            categoryItemsId
            owner
          }
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      categoryItemsId
      owner
    }
  }
`;
export const listItems = /* GraphQL */ `
  query ListItems(
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        headline
        category {
          id
          name
          items {
            nextToken
          }
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
        categoryItemsId
        owner
      }
      nextToken
    }
  }
`;
