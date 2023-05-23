import tokenService from "./service/tokenService.js";

export default function aut(req, res, next) {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      // console.log("error auth");
      return res.status(400).json("not auth");
    }
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return res.status(400).json("not auth");
    }
    req.user = userData;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json("not auth");
  }
}
