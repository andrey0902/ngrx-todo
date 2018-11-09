// custom user interface
export interface User {
  uid: string;
  email: string;
  emailVerified: boolean;
  photoURL?: string;
  catchPhrase?: string;
  displayName?: string;
}
