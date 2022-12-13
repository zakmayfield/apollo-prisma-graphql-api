import prisma from '../../prisma/client';
import { UserByIdInput } from '../../types';

export const Query = {
  getAllUsers: async () => {
    const users = await prisma.user.findMany();

    if (!users) {
      throw new Error('🚫 NO USERS FOUND :::');
    }

    return users;
  },

  getUserById: async (parent, args: UserByIdInput, context) => {
    const id = Number(args.input.id);

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    console.log('USER :::', user)

    if (!user) {
      throw new Error('🚫 NO USER FOUND :::');
    }

    return user;
  },
};
