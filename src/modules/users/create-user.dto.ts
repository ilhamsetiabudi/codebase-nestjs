export class CreateUserDto {
  email: string;
  fullname: string;
  password: string;
}

export class verifyUser {
  id: string;
  code: string;
}

export class loginUser {
  email: string;
  password: string;
}
