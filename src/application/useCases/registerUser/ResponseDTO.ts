class ResponseDTO {
  id: string;
  email: string;
  name: string;
  token: string;

  constructor({
    id,
    email,
    name,
    token
  }: {
    id: string,
    email: string,
    name: string,
    token: string
  }) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.token = token;
  }
}

export default ResponseDTO;