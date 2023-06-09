import User from "../models/User.js";
import Role from "../models/Role.js";
import tokenService from "./tokenService.js";
import cryptService from "./cryptService.js";
import dtwService from "./dtwService.js";
import role from "../roleMiddle.js";

class AuthService {
  async registration(name, login, password) {
    password = password.join(" ");
    const foundUser = await User.findOne({ login });
    if (foundUser) {
      throw new Error("Пользователь с таким логином уже зарегистрирован");
    }
    // let userRole = await Role.findOne({ value: "User" });
    // let userRole = await Role.findOne({ value: "Admin" });
    const encryptedPassword = cryptService.encrypt(password, process.env.KEYDB);

    let user = await User.create({
      name,
      login,
      password: encryptedPassword,
      role: "User",
    });
    const { id, role } = user;

    console.log(role);
    console.log(" role in auth ser regis");
    // const role = "User";
    const tokens = await tokenService.generateToken({ id, role });

    await tokenService.saveRefreshToken(tokens.refreshToken, id);
    // return tokens;
    return { role, ...tokens };
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
    const { id, role } = foundUser;
    const tokens = await tokenService.generateToken({ id });
    await tokenService.saveRefreshToken(tokens.refreshToken, id);
    return { role, ...tokens };
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

    const { id, role } = user;
    console.log("user in auth service resf");
    console.log(user);
    const tokens = await tokenService.generateToken({ id });
    console.log(tokens);
    console.log("foundToken");
    console.log(foundToken);
    foundToken.refreshToken = tokens.refreshToken;
    foundToken.save();

    return { role, ...tokens };
    // return tokens;
  }
  async compareSign(reference, input) {
    const similarity = await dtwService.CompareDynamocSign(
      reference.join(" "),
      input
    );
    if (similarity) return similarity;
    throw new Error("Подписи не похожи, попробуйте еще раз");
  }
  async changePass(name, login, password) {
    password = password.join(" ");
    const encryptedPassword = cryptService.encrypt(password, process.env.KEYDB);
    const foundUser = await User.findOne({ login });
    const changedUser = await User.updateOne(
      { login: login },
      { $set: { password: encryptedPassword } }
    );
    if (changedUser.modifiedCount === 0) {
      throw new Error("Не удалось обновить подпись");
    }
    const { id } = foundUser;
    const tokens = await tokenService.generateToken({ id });
    await tokenService.saveRefreshToken(tokens.refreshToken, id);
    return tokens;
  }
  // async users() {
  //   userData = await tokenService.validateAccessToken(accessToken);
  //   usersFound = await User.find(userData.id);
  //   console.log(userFounded);
  //   console.log("userFounded сверху в сервисе");
  //   return usersFound;
  // }

  async users() {
    const usersFound = await User.find();
    console.log(usersFound);
    console.log("userFounded сверху в сервисе");
    return usersFound;
  }
  async getUser(id) {
    const userFounded = await User.findById(id);
    return userFounded;
  }
  async getRole() {}
}

export default new AuthService();
