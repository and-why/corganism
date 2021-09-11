const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Company {
    id: ID
    name: String!
    path: String!
    owner: String!
    jobs: [Job]
    users: [User]
  }
  type Job {
    id: ID
    name: String
    description: String
    company: Company
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
  }
  type Query {
    getAllCompanies: [Company]
    getAllJobs: [Job]
    getAllUsers: [User]
    getUser(id: ID): User
    getJob(id: ID): Job
    jobReports(id: ID): [Job]
  }

  type Mutation {
    createCompany(name: String!, path: String!, userId: String): Company!
    createJob(name: String!, companyId: String!, userId: String!): Job
    addManager(jobId: String!, managerJobId: String!): Job
    updateUser(id: ID, name: String, email: String, companyId: String, jobId: String): User
  }
`;

module.exports = typeDefs;
