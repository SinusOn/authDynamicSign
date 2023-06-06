import User from "../models/User.js";
import Role from "../models/Role.js";
import tokenService from "./tokenService.js";
import cryptService from "./cryptService.js";
import dtwService from "./dtwService.js";

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

    const tokens = await tokenService.generateToken({ id });

    await tokenService.saveRefreshToken(tokens.refreshToken, id);
    return tokens;
  }

  async login(name, login, password) {
    const foundUser = await User.findOne({ login });
    if (!foundUser) {
      throw new Error("Пользователь с таким логином не найден");
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
      throw new Error("Неверная подпись");
    }
    const { id } = foundUser;
    const tokens = await tokenService.generateToken({ id });
    await tokenService.saveRefreshToken(tokens.refreshToken, id);
    return tokens;
  }

  async logout(refreshToken) {
    await tokenService.deleteToken(refreshToken);
    return;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new Error("Ошибка аутентификации");
    }
    const userData = await tokenService.validateRefreshToken(refreshToken);
    const foundToken = await tokenService.findToken(refreshToken);

    const user = await User.findById(userData.id);

    const { id } = user;
    const tokens = await tokenService.generateToken({ id });

    foundToken.refreshToken = tokens.refreshToken;
    foundToken.save();

    return tokens;
  }
}

export default new AuthService();
