import gql from 'graphql-tag';

export const ADD_EMPLOYEE = gql`
  mutation ADD_EMPLOYEE(
    $name: String!
    $email: String!
    $position: String!
    $companyId: String
    $managerId: String
  ) {
    addEmployee(
      name: $name
      email: $email
      position: $position
      companyId: $companyId
      managerId: $managerId
    ) {
      id
    }
  }
`;
