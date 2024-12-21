export interface User {
  id: number;
  email: string;
  password: string;
  token: string; // Assuming this is part of the user response
  name?: string;
}

export interface RegisterPostData {
  email: string;
  password: string;
  name: string;
}
