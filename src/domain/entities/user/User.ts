class User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  
  constructor({ 
    id, 
    email, 
    password, 
    name,
    createdAt
   } : 
    { id: string, 
      email: string, 
      password: string, 
      name: string,
      createdAt: Date
    }) {
      this.id = id;
      this.email = email;
      this.password = password;
      this.name = name;
      this.createdAt = createdAt ?? new Date();
    }
}

export default User;