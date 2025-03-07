export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  cin: string;
  role: "admin" | "client" | "user";
  avatar: string;
}
