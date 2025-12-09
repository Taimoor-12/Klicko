import User from "../User";

interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<User | null>;
}

export default IUserRepository;