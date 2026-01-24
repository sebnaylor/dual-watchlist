export interface User {
  id: number;
  email: string;
  name: string;
  profileImageUrl?: string;
  joinCode?: string;
}

export interface UserWithJoinCode {
  joinCode: string;
}
