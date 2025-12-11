class User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt?: Date | undefined;

  constructor({
    id,  
    email, 
    password,
    name,
    createdAt
   } : 
    { id?: string;
      email: string, 
      password: string, 
      name: string,
      createdAt?: Date | undefined
    }) {
      this.id = id ?? '';
      this.email = email;
      this.password = password;
      this.name = name;
      this.createdAt = createdAt;
    }

}

export default User;