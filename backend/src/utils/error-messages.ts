export const ERROR_MESSAGES = {
  FIELDS_REQUIRED: { message: "All fields are required", code: 400 },
  USER_ALREADY_EXISTS: { message: "User already exists", code: 400 },
  USER_NOT_FOUND: { message: "User not found", code: 404 },
  CREDENTIALS_INCORRECT: { message: "Credentials are incorrect", code: 401 },
  TOKEN_NOT_PROVIDED: { message: "Token not provided", code: 401 },
  UNAUTHORIZED: { message: "Unauthorized", code: 401 },
  PET_NOT_FOUND: { message: "Pet not found", code: 404 },
  PET_ALREADY_EXISTS: { message: "Pet already exists", code: 400 },
  LOST_PET_NOTICE_ALREADY_EXISTS: {
    message: "Lost pet notice already exists",
    code: 400,
  },
  LOST_PET_NOTICE_NOT_FOUND: {
    message: "Lost pet notice not found",
    code: 404,
  },
};
