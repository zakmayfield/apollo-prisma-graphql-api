import { findOrCreateUser } from '../../data/user';

interface FindOrCreateUserArgs {
  emailInput: {
    email: string
  }
}

export const Mutation = {
    findOrCreateUser: (_parent, args: FindOrCreateUserArgs) => findOrCreateUser(args)
}