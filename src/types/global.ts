declare global {
  namespace Jwt {
    interface JwtPayload {
      username: string;
    }
  }
}
