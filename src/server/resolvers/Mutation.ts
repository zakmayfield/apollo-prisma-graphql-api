import { findOrCreateUser } from '../../data/user';

export const Mutation = {
  findOrCreateUser: (
    _parent,
    args: {
      emailInput: {
        email: string;
      };
    }
  ) => {
    return findOrCreateUser(args);
  },
};