export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserSignup {
  name: string;
  email: string;
  password: string;
}
