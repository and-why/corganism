import gql from 'graphql-tag';

export const GET_ALL_USERS = gql`
  query GET_ALL_USERS {
    getAllUsers {
      id
      name
      email
      company {
        id
        name
      }
    }
  }
`;

export const GET_ALL_EMPLOYEES = gql`
  query GET_ALL_EMPLOYEES($id: ID) {
    getAllEmployees(id: $id) {
      id
      name
      position
      email
      manager {
        id
        name
        manager {
          id
          name
          manager {
            id
            name
          }
        }
      }
      reports {
        name
        id
      }
      company {
        id
        name
      }
    }
  }
`;

export const GET_EMPLOYEE_BY_ID = gql`
  query GET_EMPLOYEE_BY_ID($id: ID!) {
    getEmployeeById(id: $id) {
      id
      name
      position
      email
      manager {
        id
        name
      }
      reports {
        id
        name
      }
      company {
        id
        name
        users {
          id
        }
      }
    }
  }
`;
