export class RateLimitError extends Error {
  constructor() {
    super("Rate limit exceeded");
    this.name = "RateLimitError";
  }
}

export class UnauthorisedAccessError extends Error {
  constructor() {
    super("Unauthorised Access");
    this.name = "UnauthorisedAccess";
  }
}
