import User from "../models/User.js";
import Role from "../models/Role.js";
import tokenService from "./tokenService.js";
import cryptService from "./cryptService.js";
import dtwService from "./dtwService.js";
class AuthService {
  async registration(name, login, password) {
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
    await tokenService.saveSignToken(tokens.refreshToken, id);
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

  async refresh() {}
}

export default new AuthService();
