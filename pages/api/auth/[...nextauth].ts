import bcrypt from 'bcrypt';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import prisma from '@/libs/prismadb';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text', placeholder: 'Email', },
        password: { label: 'Password', type: 'password', placeholder: 'Password' }
      },
      async authorize(credentials) {
        if(!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if(!user || !user?.hashedPassword) {
          throw new Error('Invalid email or password')
        }

        const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword)
        
        if(!isCorrectPassword) {
          throw new Error('Invalid email or password')
        }

        return user
      }
    })
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
})