import { Token } from 'graphql';
import NextAuth from 'next-auth';
import Adapters from 'next-auth/adapters';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Providers.Twitter({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    }),
    Providers.Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  database: process.env.MONGO_DB_URI,
  // jwt: {
  //   secret: process.env.JWT_SECRET,
  // },
  callbacks: {
    /**
     * @param  {object} session      Session object
     * @param  {object} user         User object    (if using database sessions)
     *                               JSON Web Token (if not using database sessions)
     * @return {object}              Session that will be returned to the client
     */
    // async jwt({ token, account }) {
    //   if (account) {
    //     token.accessToken = account.access_token;
    //   }
    // },

    session: async (session, user, _sessionToken) => {
      session.user.id = user.id;
      return Promise.resolve(session);
    },
  },
});
