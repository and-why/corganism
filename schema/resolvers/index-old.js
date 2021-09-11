const Job = require('../../models/Job.model');
const User = require('../../models/User.model');
const Company = require('../../models/Company.model');
const { populate } = require('../../models/Job.model');

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
      company: getCompany.bind(this, job._doc.company),
      reportsTo: getReports.bind(this, job._doc.reports),
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
      jobs: getJobs.bind(this, company._doc.jobs),
      users: getUsers.bind(this, company._doc.users),
    };
  } catch (error) {
    throw error;
  }
};
const getReportsTo = async (jobId) => {
  try {
    const job = await Job.findById(jobId);
    if (job == null) {
      return [];
    }
    return {
      id: job._id,
      ...job._doc,
      reportsTo: getJob.bind(this, job._doc.reportsTo),
    };
  } catch (error) {
    throw error;
  }
};
const getReports = async (jobId) => {
  try {
    const job = await Job.findById(jobId);
    console.log(job);
    return job;
    return {
      id: job._id,
      ...job._doc,
      reports: getJobs.bind(this, job._doc.reports),
    };
  } catch (error) {
    throw error;
  }
};
const getJob = async (jobId) => {
  try {
    const job = await Job.findById(jobId);
    return {
      id: job._id,
      ...job._doc,
      company: getCompany.bind(this, job._doc.company),
      user: getUser.bind(this, job._doc.user),
    };
  } catch (err) {
    throw err;
  }
};
const getUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      id: user._id,
      ...user._doc,
      company: getCompany.bind(this, user._doc.company),
      job: getJob.bind(this, user._doc.job),
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
        const jobs = await Job.find().populate('company');
        // return jobs.map((job) => ({
        //   id: job._id,
        //   ...job._doc,
        //   company: getCompany.bind(this, job._doc.companies),
        //   user: getUser.bind(this, job._doc.user),
        //   reports: getReports.bind(this, job._doc.reports),
        //   reportsTo: getReportsTo.bind(this, job._doc.reportsTo),
        // }));
        return jobs;
      } catch (err) {
        throw err;
      }
    },
    getAllUsers: async () => {
      try {
        const users = await User.find();
        return users.map((user) => ({
          id: user._id,
          ...user._doc,
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
    createCompany: async (parent, { name, userId }, context, info) => {
      try {
        const userRecord = await User.findById(userId);
        userRecord.job = job;
        await userRecord.save();
        const company = new Company({
          name,
        });
        await company.save();

        return company;
      } catch (err) {
        throw err;
      }
    },
    createJob: async (parent, { name, companyId, userId, reportsToJobId }, context, info) => {
      const job = new Job({
        name,
        company: companyId,
        user: userId,
        reportsTo: reportsToJobId,
        reports: [],
      });
      try {
        const savedJob = await job.save();
        const companyRecord = await Company.findById(companyId);
        companyRecord.jobs.push(job);
        await companyRecord.save();
        if (reportsToJobId != null) {
          const jobRecord = await Job.findById(reportsToJobId);
          jobRecord.reports.push(job);
          await jobRecord.save();
        }
        return {
          id: savedJob._id,
          ...savedJob._doc,
          company: getCompany.bind(this, companyId),
          user: getUser.bind(this, userId),
          reportsTo: getReportsTo.bind(this, reportsToJobId),
        };
      } catch (err) {
        throw err;
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
