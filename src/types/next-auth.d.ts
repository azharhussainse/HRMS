import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      userInfo: {
        id: string;
        userName: string;
        email: string;
        niNumber: string;
        profilePicture: string;
        twoFactorEnabled: boolean;
        mobile: string;
        fullName: string;
      };
      userRoles: string[];
      token: string;
    };
  }
}
