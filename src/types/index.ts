export interface UserInterface {
    id: number;
    createdAt: string;
    updatedAt: string;
    email: string;
    token: string;
}

export interface LoginUserInput {
  input: {
    email: string;
    password: string;
  };
}

export interface RegisterUserInput {
  input: {
    email: string;
    password: string;
  };
}

export interface UserByIdInput {
  input: {
    id: number;
  }
}

export interface ServerContext {
  user: UserInterface;
}