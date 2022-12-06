import prisma from '../../prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { APP_SECRET } = process.env;

interface InitUserArgs {
  input: {
    email: string;
    password: string;
  };
}

export const Mutation = {
  loginUser: async (parent, args: InitUserArgs, context) => {
    const { input } = args;

    const user = await prisma.user.findUnique({
      where: {
        email: input.email,
      },
    });

    if (!user) {
      throw new Error(`🚫 EMAIL DOES NOT EXIST :::`);
    }

    const valid = await bcrypt.compare(input.password, user.password)

    if (!valid) throw new Error(`🚫 Invalid Password`)

    const validUser = {
      ...user,
      token: jwt.sign({ userId: user.id }, APP_SECRET, {
        expiresIn: '2d',
      }),
    };

    return validUser
  },
  signupUser: async (parent, args: InitUserArgs, context) => {
    const { input } = args;
    const email = input.email;
    const password = await bcrypt.hash(input.password, 10);

    let user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      throw new Error(`🚫 EMAIL ALREADY EXISTS :::`);
    }

    const createdUser = await prisma.user.create({
      data: {
        email,
        password,
      },
    });

    const validUser = {
      ...createdUser,
      token: jwt.sign({ userId: createdUser.id }, APP_SECRET, {
        expiresIn: '2d',
      }),
    };

    return validUser;
  },
};
