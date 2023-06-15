import tokenService from "./service/tokenService.js";
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

    next();
  } catch (error) {
    return next(new Error("Не авторизован"));
  }
}
