import User from "../models/User.js";
import Role from "../models/Role.js";
import tokenService from "./tokenService.js";
import cryptService from "./cryptService.js";
import dtwService from "./dtwService.js";
import Token from "../models/Token.js";
class AuthService {
  async registration(name, login, password) {
    password = password.join(" ");
    const foundUser = await User.findOne({ login });
    if (foundUser) {
      throw new Error("Пользователь с таким логином уже зарегистрирован");
    }
    let userRole = await Role.findOne({ value: "User" });
    const encryptedPassword = cryptService.encrypt(password, process.env.KEYDB);

    let user = await User.create({
      name,
      login,
      password: encryptedPassword,
      role: userRole,
    });
    const { id } = user;
    console.log(id);

    const tokens = await tokenService.generateToken({ id });
    console.log("после генерацции рефреш --" + tokens.refreshToken);
    console.log(tokens + "test");
    await tokenService.saveRefreshToken(tokens.refreshToken, id);
    return tokens;
  }

  async login(name, login, password) {
    console.log("yfxfkj");
    const foundUser = await User.findOne({ login });
    if (!foundUser) {
      throw new Error("Пользователя с таким логином не найден");
    }
    const referenceSign = cryptService.decrypt(
      foundUser.password,
      process.env.KEYDB
    );

    const equalPassword = await dtwService.CompareDynamocSign(
      referenceSign,
      password
    );
    if (!equalPassword) {
      return res.starus(400).json({ message: "Неверный пароль" });
    }
    // const tokens = await tokenService.generateToken({ id });
    // await tokenService.saveSignToken(tokens.refreshToken, id);
    // return tokens;
    // return res.json("ok");
    return foundUser;
  }

  async logout() {}

  async refresh(refreshToken) {
    console.log(`рефреш в ауз сервисе ${refreshToken}`);
    if (!refreshToken) {
      throw new Error("Не авторизован, нет токена");
    }
    const userData = await tokenService.validateRefreshToken(refreshToken);
    const foundToken = await tokenService.findToken(refreshToken);
    console.log(`userData - ${userData.userId}`);
    console.log(`foundToken - ${foundToken}`);
    // if (!userData || !foundToken) {
    //   throw new Error("Не авторизован");
    // }
    const user = await User.findById(userData.id);
    console.log(userData.id);
    const { id } = user;
    const tokens = await tokenService.generateToken({ id });
    // await tokenService.saveRefreshToken(refreshToken, id);
    // const tokenData = await Token.findOne({ userId });
    // console.log("как выглядит токендата ---" + tokenData);
    // if (tokenData) {
    //   console.log("должен быть измененный токен" + token);
    //   tokenData.refreshToken = token;
    //   console.log("как выглядит токендата потом ---" + tokenData);
    //   return tokenData.save();
    // }
    foundToken.refreshToken = tokens.refreshToken;
    foundToken.save();
    console.log("изменненый рефреш " + tokens.refreshToken);
    console.log("изменненый access " + tokens.accessToken);
    return tokens;
  }
}

export default new AuthService();
