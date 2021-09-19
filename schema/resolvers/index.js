const Job = require('../../models/Job.model');
const User = require('../../models/User.model');
const Company = require('../../models/Company.model');
const Employee = require('../../models/Employee.model');

// Helpers
const getJobs = async (jobIds) => {
  try {
    const jobs = await Job.find({
      _id: {
        $in: jobIds,
      },
    });
    return jobs.map((job) => ({
      ...job._doc,
      id: job._id,
      company: job.company ? getCompany.bind(this, job._doc.company) : null,
      user: job.user ? getUser.bind(this, job._doc.user) : null,
      reports: job.reports ? getDirectReports.bind(this, job._doc.reports) : null,
      manager: job.manager ? getDirectReports.bind(this, job._doc.manager) : null,
    }));
  } catch (error) {
    throw error;
  }
};
const getUsers = async (userIds) => {
  try {
    const users = await User.find({
      _id: {
        $in: userIds,
      },
    });
    return users.map((user) => ({
      ...user._doc,
      id: user._id,
      job: getJob.bind(this, user._doc.job),
      company: getCompany.bind(this, user._doc.company),
    }));
  } catch (error) {
    throw error;
  }
};
const getEmployees = async (employeeIds) => {
  try {
    const employees = await Employee.find({
      _id: {
        $in: employeeIds,
      },
    });
    return employees.map((employee) => ({
      ...employee._doc,
      id: employee._id,
      manager: employee.manager ? getEmployee.bind(this, employee._doc.manager) : null,
    }));
  } catch (error) {
    throw error;
  }
};
const getCompanies = async (userIds) => {
  try {
    const companies = await Company.find({
      _id: {
        $in: userIds,
      },
    });
    return companies.map((company) => ({
      ...company._doc,
      id: company._id,
      job: getJob.bind(this, company._doc.job),
      users: getCompany.bind(this, company._doc.users),
    }));
  } catch (error) {
    throw error;
  }
};

const getCompany = async (companyId) => {
  try {
    const company = await Company.findById(companyId);
    return {
      ...company._doc,
      id: company._id,
      jobs: company.jobs ? getJobs.bind(this, company._doc.jobs) : null,
      owner: company.owner ? getUser.bind(this, company._doc.user) : null,
      users: company.users ? getUsers.bind(this, company._doc.users) : null,
      employees: company.employees ? getEmployees.bind(this, company._doc.employees) : null,
    };
  } catch (error) {
    throw error;
  }
};
const getEmployee = async (employeeId) => {
  try {
    const employee = await Employee.findById(employeeId);
    return {
      ...employee._doc,
      id: employee._id,
      manager: employee.manager ? getEmployee.bind(this, employee._doc.manager) : null,
      company: getCompany.bind(this, employee._doc.company),
      user: employee.user ? getUser.bind(this, employee._doc.user) : null,
    };
  } catch (error) {
    throw error;
  }
};

const getJob = async (jobId) => {
  try {
    const job = await Job.findById(jobId);
    return {
      ...job._doc,
      id: job._id,
      company: getCompany.bind(this, job._doc.company),
      user: getUser.bind(this, job._doc.user),
      manager: getManager.bind(this, job._doc.manager),
      reports: getReports.bind(this, job._doc.reports),
    };
  } catch (error) {
    throw error;
  }
};
const getUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      id: user._id,
      company: user.company ? getCompany.bind(this, user._doc.company) : null,
    };
  } catch (error) {
    throw error;
  }
};

const resolvers = {
  Query: {
    getAllCompanies: async () => {
      try {
        const companies = await Company.find();
        return companies.map((company) => ({
          ...company._doc,
          id: company._doc._id,
          jobs: getJobs.bind(this, company._doc.jobs),
          users: getUsers.bind(this, company._doc.users),
        }));
      } catch (error) {
        throw error;
      }
    },
    getAllEmployees: async (_parent, { id }, _context, _info) => {
      try {
        const company = await Company.findById(id);
        const employees = await Employee.find({
          company: {
            $in: [id, company],
          },
        });
        console.log('initial employees', employees);
        return employees.map((employee) => ({
          ...employee._doc,
          id: employee._doc._id,
          company: getCompany.bind(this, employee._doc.company),
          manager: employee.manager ? getEmployee.bind(this, employee._doc.manager) : null,
          reports: employee.reports ? getEmployees.bind(this, employee._doc.reports) : [],
        }));
      } catch (error) {
        throw error;
      }
    },
    getAllJobs: async () => {
      try {
        const jobs = await Job.find();
        return jobs.map((job) => ({
          id: job._id,
          ...job._doc,
          company: getCompany.bind(this, job._doc.company),
          user: getUser.bind(this, job._doc.user),
          reports: job.reports ? getReports.bind(this, job._doc.reports) : null,
          manager: job.manager ? getManager.bind(this, job._doc.manager) : null,
        }));
        return jobs;
      } catch (err) {
        throw err;
      }
    },
    getAllUsers: async () => {
      try {
        const users = await User.find();
        return users.map((user) => ({
          ...user._doc,
          id: user._id,
          company: getCompany.bind(this, user._doc.company),
          job: getJob.bind(this, user._doc.job),
          company: user.company ? getCompany.bind(this, user._doc.company) : null,
        }));
      } catch (error) {
        throw error;
      }
    },

    getUser: async (_parent, { id }, _context, _info) => {
      const user = await User.findById(id);
      return {
        ...user._doc,
        id: user._id,
        company: getCompany.bind(this, user._doc.company),
      };
    },
    getEmployeeById: async (_parent, { id }, _context, _info) => {
      const employee = await Employee.findById(id);
      return {
        ...employee._doc,
        id: employee._id,
        company: getCompany.bind(this, employee._doc.company),
        manager: employee.manager ? getEmployee.bind(this, employee._doc.manager) : null,
        reports: employee.reports ? getEmployees.bind(this, employee._doc.reports) : [],
      };
    },
    getJob: async (_parent, { id }, _context, _info) => {
      return await Job.findById(id);
    },
  },
  Mutation: {
    createCompany: async (parent, { name, userId, path }, context, info) => {
      try {
        const existingCompany = await Company.findOne({ name: name });
        if (existingCompany) {
          return new Error('A company with this name already exists. Try another name');
        }
        const user = await User.findById(userId);
        const company = new Company({
          name,
          path,
          owner: user,
          users: [userId],
          userEmails: [user.email],
        });
        await company.save();
        user.company = company;
        await user.save();
        return company;
      } catch (error) {
        throw error;
      }
    },
    addEmployee: async (
      parent,
      { name, email, position, companyId, managerId, image },
      context,
      info,
    ) => {
      try {
        const existingEmployee = await Employee.findOne({ email: email });
        if (existingEmployee) {
          return new Error('An employee with that email already exists');
        }
        console.log('details', name, email, companyId, position, managerId, image);
        const company = await Company.findById(companyId);
        const manager = await Employee.findById(managerId);
        console.log('manager', manager);
        console.log('company', company);
        const employee = new Employee({
          name,
          email,
          position,
          company: company,
          manager: manager ? manager : null,
        });

        if (managerId) {
          manager.reports.push(employee);
          await manager.save();
        }
        company.employees.push(employee);
        await company.save();
        const savedEmployee = await employee.save();
        return {
          ...savedEmployee,
          id: savedEmployee._id,
        };
      } catch (error) {
        throw error;
      }
    },
    createJob: async (parent, { name, companyId, email }, context, info) => {
      const job = new Job({
        name,
        company: companyId,
        email: email,
      });
      try {
        const existingUser = await User.findOne({ id: userId });
        if (existingUser) {
          return new Error(
            'That user already has a job, remove from current job before adding to a new job ',
          );
        }
        const savedJob = await job.save();
        const companyRecord = await Company.findById(companyId);
        companyRecord.jobs.push(job);
        await companyRecord.save();
        return {
          ...savedJob._doc,
          id: savedJob._id,
          company: getCompany.bind(this, companyId),
        };
      } catch (error) {
        throw error;
      }
    },
    addManager: async (parent, { jobId, managerJobId }, context, info) => {
      try {
        const userJob = await Job.findById(jobId);
        const managerJob = await Job.findById(managerJobId);
        if (managerJob.reports.length > 0 && managerJob.reports.includes(jobId)) {
          return new Error('This manager and user are already linked');
        }
        if (userJob.reports.length > 0 && userJob.reports.includes(managerJobId)) {
          return new Error('This manager cannot manage one of their direct reports');
        }
        userJob.manager = managerJob;
        const savedJob = await userJob.save();
        managerJob.reports.push(userJob);
        await managerJob.save();
        return {
          ...savedJob._doc,
          id: savedJob._id,
          manager: getManager.bind(this, managerJobId),
        };
      } catch (error) {
        throw error;
      }
    },

    addUser: async (parent, { name, email, companyId, position }, context, info) => {
      try {
        // const existingUser = await User.findOne({ email: email });
        const existingCompany = await Company.findOne({ id: companyId });
        if (existingCompany.userEmails.includes(email)) {
          return new Error(
            'A user with that email address already has an account with your company.',
          );
        }
        const companyRecord = await Company.findById(companyId);
        const job = new Job({
          name: position,
          company: companyRecord,
          userEmail: email,
        });
        await companyRecord.userEmails.push(email);
        await companyRecord.jobs.push(job);
        const savedCompany = await companyRecord.save();
        const savedJob = await job.save();
        return {
          ...savedJob._doc,
          id: savedJob._id,
          company: getCompany.bind(this, savedCompany),
        };
      } catch (error) {
        throw error;
      }
    },
    updateUser: async (parent, { id, name, email, companyId, jobId }, context, info) => {
      const updates = {};
      if (name !== undefined) {
        updates.name = name;
      }
      if (email !== undefined) {
        updates.email = email;
      }
      if (companyId !== undefined) {
        updates.companyId = companyId;
      }
      if (jobId !== undefined) {
        updates.jobId = jobId;
      }
      try {
        const savedUser = await User.findByIdAndUpdate(id, updates, { new: true });
        return {
          ...savedUser._doc,
          company: getCompany.bind(this, companyId),
          job: getJob.bind(this, jobId),
        };
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = resolvers;
