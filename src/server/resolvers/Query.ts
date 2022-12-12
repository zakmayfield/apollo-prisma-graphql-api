import prisma from '../../prisma/client';

export const Query = {
  allUsers: async () => {
    const users = await prisma.user.findMany()

    if (!users) {
      throw new Error('🚫 NO USERS FOUND :::')
    }

    return users
  },

  test: () => 'test'
};