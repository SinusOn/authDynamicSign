import tokenService from "./service/tokenService.js";
import authService from "./service/authService.js";
export default function role(roleValue) {
  return function (req, res, next) {
    try {
      const accessToken = req.cookies.accessToken;
      if (!accessToken) {
        return next(new Error("Нет доступа к ресурсу"));
      }

      tokenService.validateAccessToken(accessToken).then((userData) => {
        authService.getUser(userData.id).then((userFounded) => {
          if (roleValue !== userFounded.role) {
            return next(new Error("Нет доступа к ресурсу"));
          }
          next();
        });
      });
    } catch (error) {
      console.log(error);
      return next(new Error("Нет доступа к ресурсу"));
    }
  };
}
