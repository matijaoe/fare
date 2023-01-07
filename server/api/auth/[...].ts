import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { NuxtAuthHandler } from '#auth'
import { db } from '~~/lib/db'

export default NuxtAuthHandler({
  adapter: PrismaAdapter(db),
  secret: useRuntimeConfig().authSecret,
  providers: [
    // @ts-expect-error Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: useRuntimeConfig().githubClientId,
      clientSecret: useRuntimeConfig().githubClientSecret,
    }),
    // @ts-expect-error Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
    GoogleProvider.default({
      clientId: useRuntimeConfig().googleClientId,
      clientSecret: useRuntimeConfig().googleClientSecret,
    }),
  ],
  pages: {
    signIn: '/login',
    newUser: '/login',
  },
  callbacks: {
    session: async ({ session, user }) => {
      if (user) {
        session.user.id = user.id
      }
      return session
    },
  },
})
