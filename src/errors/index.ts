export function validationError(message: any) {
  return {
    name: "ValidationError",
    message,
  };
}

export function notFoundError() {
  return {
    name: "NotFoundError",
    message: "No meal with this id!",
  };
}

export function badRequestError() {
  return {
    name: "BadRequestError",
    message: "Bad Request",
  };
}
