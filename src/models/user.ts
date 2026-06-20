export class User {
  id: number = 0;
  name: string = "";
  email: string = "";
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
