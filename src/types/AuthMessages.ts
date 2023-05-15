export enum AuthMessages {
  EMAIL_EXISTS = "This email already exists in the system.",
  INCORRECT_PASSWORD = "Incorrect password.",
  INCORRECT_EMAIL = "This email does not exist in the system.",
  INCORRECT_EMAIL_FORMAT = "Incorrect email format",
  INCORRECT_EMAIL_FORMAT_FOR_USER = "Please enter a valid email, e.g. sample@mail.com",
  PASSWORD_TOO_SHORT = "Password must be at least 6 characters long.",
  PASSWORDS_NOT_MATCH = "Passwords do not match.",
  GOOGLE_ERROR = "Could not sign in with Google.",
}

export enum AuthErrorCodes {
  INVALID_EMAIL = "auth/invalid-email",
  USER_NOT_FOUND = "auth/user-not-found",
  MISSING_PASSWORD = "auth/missing-password",
  WEAK_PASSWORD = "auth/weak-password",
  WRONG_PASSWORD = "auth/wrong-password",
  EMAIL_ALREADY_EXISTS = "auth/email-already-in-use",
}
