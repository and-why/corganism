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

export const UPDATE_EMPLOYEE = gql`
  mutation UPDATE_EMPLOYEE($id: ID, $phone: String, $twitter: String, $linkedin: String) {
    updateEmployee(id: $id, phone: $phone, twitter: $twitter, linkedin: $linkedin) {
      id
    }
  }
`;

export const LINK_USER = gql`
  mutation LINK_USER($userId: String, $employeeId: String, $companyId: String) {
    linkUser(userId: $userId, employeeId: $employeeId, companyId: $companyId) {
      id
    }
  }
`;
