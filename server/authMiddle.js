import tokenService from "./service/tokenService.js";

export default function aut(req, res, next) {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      // return res.status(401).json("Не авторизован");
      return next(new Error("Не авторизован"));
    }
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      // return res.status(401).json("Не авторизован");
      return next(new Error("Не авторизован"));
    }
    req.user = userData;
    next();
  } catch (error) {
    // return res.status(400).json("not auth");
    return next(new Error("Не авторизован"));
  }
}
