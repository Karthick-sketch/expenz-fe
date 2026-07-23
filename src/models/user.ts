interface User {
  id: number;
  name: string;
  email: string;
  currencyCode: string;
}

interface UserLogin {
  email: string;
  password: string;
}

interface UserSignup {
  name: string;
  email: string;
  password: string;
}

export type { User, UserLogin, UserSignup };
