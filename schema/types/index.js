const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Company {
    id: ID
    name: String!
    path: String!
    owner: String!
    employees: [Employee]
    userEmails: [String]
    jobs: [Job]
    users: [User]
  }
  type Job {
    id: ID
    name: String
    description: String
    company: Company
    userEmail: String
    user: User
    reports: [Job]
    manager: Job
  }
  type User {
    id: ID
    name: String
    email: String
    image: String
    emailVerified: Boolean
    company: Company
    job: Job
    confirmed: Boolean
  }
  type Employee {
    id: ID
    name: String
    email: String
    image: String
    position: String
    manager: Employee
    reports: [Employee]
    company: Company
    user: User
  }
  type Query {
    getAllCompanies: [Company]
    getAllJobs: [Job]
    getAllUsers: [User]
    getAllEmployees(id: ID): [Employee]
    getUser(id: ID): User
    getEmployeeById(id: ID): Employee
    getJob(id: ID): Job
    jobReports(id: ID): [Job]
  }

  type Mutation {
    createCompany(name: String!, path: String!, userId: String): Company!
    createJob(name: String!, companyId: String!, userId: String!): Job
    addManager(jobId: String!, managerJobId: String!): Job
    addUser(
      name: String!
      email: String!
      companyId: String
      position: String
      managerId: String
      image: String
    ): User
    addEmployee(
      name: String!
      email: String!
      position: String!
      companyId: String
      managerId: String
      image: String
    ): Employee
    updateUser(id: ID, name: String, email: String, companyId: String, jobId: String): User
  }
`;

module.exports = typeDefs;
