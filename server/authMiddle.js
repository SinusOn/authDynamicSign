import tokenService from "./service/tokenService.js";
import authService from "./service/authService.js";
export default function aut(req, res, next) {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return next(new Error("Не авторизован"));
    }
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(new Error("Не авторизован"));
    }
    req.user = userData;
    console.log("in auth middle");
    console.log(userData);
    // tokenService.validateAccessToken(accessToken).then((userData) => {
    //   if (!userData) {
    //     return next(new Error("Не авторизован"));
    //   }
    //   req.userId = userData.id;
    //   console.log("in auth middle");
    //   console.log(req.userId);

    //   next();
    // });

    next();
  } catch (error) {
    return next(new Error("Не авторизован"));
  }
}
