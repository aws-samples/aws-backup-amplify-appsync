/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory($owner: String) {
    onCreateCategory(owner: $owner) {
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
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory($owner: String) {
    onUpdateCategory(owner: $owner) {
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
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory($owner: String) {
    onDeleteCategory(owner: $owner) {
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
export const onCreateItem = /* GraphQL */ `
  subscription OnCreateItem($owner: String) {
    onCreateItem(owner: $owner) {
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
export const onUpdateItem = /* GraphQL */ `
  subscription OnUpdateItem($owner: String) {
    onUpdateItem(owner: $owner) {
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
export const onDeleteItem = /* GraphQL */ `
  subscription OnDeleteItem($owner: String) {
    onDeleteItem(owner: $owner) {
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
