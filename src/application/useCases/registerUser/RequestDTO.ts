class RequestDTO {
  email: string;
  password: string;
  name?: string;

  constructor({ 
    email, 
    password, 
    name
  } : { 
      email: string, 
      password: string, 
      name?: string
    }) {
        this.email = email;
        this.password = password;
        this.name = name ?? '';
  }
}

export default RequestDTO;