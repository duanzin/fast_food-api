export function badRequestError() {
  return {
    name: "BadRequestError",
    message: "Bad Request",
  };
}

export function validationError(message: any) {
  return {
    name: "ValidationError",
    message,
  };
}
