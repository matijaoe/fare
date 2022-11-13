import GithubProvider from 'next-auth/providers/github'
import { NuxtAuthHandler } from '#auth'
import { db } from '~~/lib/db'
import { PrismaAdapter } from '~~/lib/nuxt-auth/adapter-prisma'

export default NuxtAuthHandler({
  adapter: PrismaAdapter(db),
  providers: [
    // @ts-expect-error Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  // callbacks: {
  //   // @ts-expect-error kajgod
  //   signIn: async (user, account, profile) => {
  //     console.log('signIn', user, account, profile)
  //     return true
  //   },
  // },
})
