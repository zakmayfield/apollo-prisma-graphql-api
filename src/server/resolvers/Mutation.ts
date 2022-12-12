import prisma from '../../prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginUserInput, RegisterUserInput } from '../../types';

const { APP_SECRET } = process.env;


const generateToken = (id: number) =>
  jwt.sign({ userId: id }, APP_SECRET, { expiresIn: '2d' });

export const Mutation = {
  loginUser: async (parent, args: LoginUserInput, context) => {
    const { input } = args;

    const user = await prisma.user.findUnique({
      where: {
        email: input.email,
      },
    });

    if (!user) {
      throw new Error(`🚫 EMAIL DOES NOT EXIST :::`);
    }

    const valid = await bcrypt.compare(input.password, user.password);

    if (!valid) throw new Error(`🚫 Invalid Password`);

    const validUser = {
      ...user,
      token: generateToken(user.id),
    };

    // this will need to be looked into
    // regarding the context of the server apollo
    // need to figure out types and
    context.user.token = validUser.token;

    return validUser;
  },
  signupUser: async (parent, args: RegisterUserInput, context) => {
    const { input } = args;
    const email = input.email;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(input.password, salt);

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
        password: hashedPassword,
      },
    });

    const validUser = {
      ...createdUser,
      token: generateToken(createdUser.id),
    };

    return validUser;
  },
};
