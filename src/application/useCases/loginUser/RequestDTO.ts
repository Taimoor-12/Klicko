class RequestDTO {
  email: string;
  password: string;

  constructor({ email, password } : { email: string, password: string}) {
    this.email = email;
    this.password = password;
  }
}

export default RequestDTO;