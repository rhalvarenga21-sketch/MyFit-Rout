
export const mockAuth = {
  signIn: async (email: string, pass: string) => {
    await new Promise(r => setTimeout(r, 1000));
    if (email && pass) {
      return { id: 'usr_' + Math.random().toString(36).substring(7), email };
    }
    throw new Error("Invalid credentials");
  },
  signUp: async (email: string, pass: string) => {
    await new Promise(r => setTimeout(r, 1500));
    return { id: 'usr_' + Math.random().toString(36).substring(7), email };
  },
  resetPassword: async (email: string) => {
    await new Promise(r => setTimeout(r, 1200));
    console.log(`🔑 Reset link sent to ${email}`);
    return true;
  },
  signOut: async () => {
    localStorage.removeItem('current_user_token');
  }
};
