import tokenService from "./service/tokenService.js";
import User from "./models/User.js";
import authService from "./service/authService.js";
export default function role(roleValue) {
  return function (req, res, next) {
    try {
      const accessToken = req.cookies.accessToken;
      if (!accessToken) {
        return next(new Error("Нет доступа к ресурсу"));
      }
      //   const userData = tokenService.validateAccessToken(accessToken);
      //   if (!userData) {
      //     return next(new Error("Нет доступа к ресурсу"));
      //   }
      //   console.log(userData);
      //   console.log("userData");
      tokenService.validateAccessToken(accessToken).then((userData) => {
        console.log(userData);
        console.log("userData");
        console.log(userData.id);
        authService.getUser(userData.id).then((userFounded) => {
          console.log(userFounded.role);
          console.log("userFounded");
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
