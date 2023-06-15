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
      console.log(userData);
      console.log("userdata in token service");
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
  async saveRefreshToken(token, userId) {
    const tokenData = await Token.findOne({ userId });

    if (tokenData) {
      tokenData.refreshToken = token;

      return tokenData.save();
    }
    const retToken = await Token.create({
      userId: userId,
      refreshToken: token,
    });
    return retToken;
  }
  async findToken(token) {
    const foundToken = await Token.findOne({ refreshToken: token });

    return foundToken;
  }
  async deleteToken(refreshToken) {
    await Token.deleteOne({ refreshToken });
    return;
  }
}

export default new TokenService();
