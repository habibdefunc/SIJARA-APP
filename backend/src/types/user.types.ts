export interface CreateUserInput {
  nama: string;
  username: string;
  password: string;
  role?: "ADMIN" | "USER";
}

export interface UpdateUserInput {
  nama?: string;
  username?: string;
  password?: string;
  role?: "ADMIN" | "USER";
}
