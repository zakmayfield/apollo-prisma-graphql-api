import prisma from '../prisma/client';

export const findOrCreateUser = async (
    args: {
        emailInput: {
            email: string;
        };
}) => {
  const email = args.emailInput.email;
  const user = await prisma.user.upsert({
    where: { email },
    create: { email },
    update: { email },
  });

  return user;
};
