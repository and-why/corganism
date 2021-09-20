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

export const GET_USER_BY_ID = gql`
  query GET_USER_BY_ID($id: ID!) {
    getUser(id: $id) {
      id
      employee {
        id
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
      user {
        id
      }
    }
  }
`;

export const GET_COMPANY_BY_ID = gql`
  query GET_COMPANY_BY_ID($id: ID!) {
    getCompanyById(id: $id) {
      id
      name
      employees {
        id
        email
      }
      users {
        id
      }
    }
  }
`;

export const GET_ALL_COMPANIES = gql`
  query GET_ALL_COMPANIES {
    getAllCompanies {
      id
      name
      users {
        email
      }
      employees {
        id
        email
      }
    }
  }
`;
