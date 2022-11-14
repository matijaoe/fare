import GithubProvider from 'next-auth/providers/github'
import { NuxtAuthHandler } from '#auth'
import { db } from '~~/lib/db'
import { PrismaAdapter } from '~~/lib/nuxt-auth'

export default NuxtAuthHandler({
  adapter: PrismaAdapter(db),
  providers: [
    // @ts-expect-error Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // https://stackoverflow.com/questions/70409219/get-user-id-from-session-in-next-auth-client
    session: async ({ session, user }) => {
      if (user) {
        session.user.id = user.id
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
    newUser: '/login', // New users will be directed here on first sign in (leave the property out if not of interest)
  },
})
