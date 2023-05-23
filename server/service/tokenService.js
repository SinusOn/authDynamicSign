import jwt from "jsonwebtoken";
import Token from "../models/Token.js";

class TokenService {
  async generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return { accessToken, refreshToken };
  }
  async validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.ACCESS_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  async validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.REFRESH_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }
  async saveSignToken(token, userId) {
    const tokenData = await Token.findOne({ userId });
    const tokenSign = token.split(".")[2];
    if (!tokenData) {
      await Token.create({ userId, tokenSign });
      return tokenSign;
    }
    tokenData.tokenSign = tokenSign;
    return tokenSign.save();
  }
}

export default new TokenService();
