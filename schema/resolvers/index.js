const Job = require('../../models/Job.model');
const User = require('../../models/User.model');
const Company = require('../../models/Company.model');

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
      company: getCompany.bind(this, job._doc.company),
      user: getUser.bind(this, job._doc.user),
      reports: getReports.bind(this, job._doc.reports),
      manager: job.manager ? getManager.bind(this, job._doc.manager) : null,
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
const getReports = async (jobIds) => {
  try {
    const jobs = await Job.find({
      _id: {
        $in: jobIds,
      },
    });
    return jobs.map((job) => ({
      ...job._doc,
      id: job._id,
      reports: getJob.bind(this, job._doc.reports),
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
      jobs: getJobs.bind(this, company._doc.jobs),
      owner: getUser.bind(this, company._doc.user),
      users: getUsers.bind(this, company._doc.users),
    };
  } catch (error) {
    throw error;
  }
};
const getManager = async (jobId) => {
  try {
    const job = await Job.findById(jobId);
    return {
      ...job._doc,
      id: job._id,
      manager: getJob.bind(this, job._doc.manager),
      company: getCompany.bind(this, job._doc.company),
      user: getUser.bind(this, job._doc.user),
      reports: job.report ? getReports(this, job._doc.reports) : [],
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
      manager: getManager(this, job._doc.manager),
      reports: getReports(this, job._doc.reports),
    };
  } catch (err) {
    throw err;
  }
};
const getUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      id: user._id,
    };
  } catch (err) {
    throw err;
  }
};

const resolvers = {
  Query: {
    getAllCompanies: async () => {
      try {
        const companies = await Company.find();
        return companies.map((company) => ({
          ...company._doc,
          jobs: getJobs.bind(this, company._doc.jobs),
          users: getUsers.bind(this, company._doc.users),
        }));
      } catch (err) {
        throw err;
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
          reports: getReports.bind(this, job._doc.reports),
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
        }));
      } catch (err) {
        throw err;
      }
    },

    getJob: async (_parent, { id }, _context, _info) => {
      // const {id} = args destructured above
      return await Job.findById(id);
    },
    getUser: async (_parent, { id }, _context, _info) => {
      return await User.findById(id);
    },
  },
  Mutation: {
    createCompany: async (parent, { name, userId, path }, context, info) => {
      try {
        const existingCompany = await Company.findOne({ name: name });
        if (existingCompany) {
          return new Error('A company with this name already exists. Try another name');
        }
        const company = new Company({
          name,
          path,
          owner: userId,
          jobs: [],
          users: [userId],
        });
        await company.save();

        return company;
      } catch (err) {
        throw err;
      }
    },
    createJob: async (parent, { name, companyId, userId }, context, info) => {
      const job = new Job({
        name,
        company: companyId,
        user: userId,
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
          user: getUser.bind(this, userId),
          company: getCompany.bind(this, companyId),
        };
      } catch (err) {
        throw err;
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
      } catch (err) {
        throw err;
      }
    },

    // add resolver to add reports to job

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
