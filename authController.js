import Role from "./models/Role.js";
import User from "./models/User.js";
import dtw from "./models/dtw.js";
import bcrypt from "bcrypt";

class authController {
  async registration(req, res) {
    try {
      console.log(req.body);
      let { name, login, password } = req.body;
      const foundUser = await User.findOne({ login });
      if (foundUser) {
        return res.status(400);
      }
      let userRole = await Role.findOne({ value: "User" });
      const hashPass = await bcrypt.hash(password, 2);
      let user = await User.create({
        name,
        login,
        password: hashPass,
        role: userRole,
      });
      console.log("Зарегистрирован");
      res.cookie("myTestcookie", "value cookie", {
        httpOnly: true,
      });
      res.status(200);
      res.json("good");
    } catch (error) {
      console.log(error);
      res.status(400);
    }
  }
  async users(req, res) {
    try {
      res.send("users ");
    } catch (error) {
      console.log(error);
    }
  }
  async login(req, res) {
    try {
      const { name, login, password } = req.body;
      const findUser = await User.findOne({ login });
      if (!findUser) {
        res.send("НЕт пользователя");
      }
      const passEqual = await bcrypt.compare(password, findUser.password);
      if (!passEqual) {
        res.send("Неверный пароль");
      }
      res.cookie("myTestcookie", "heheheh its value cookie", {
        httpOnly: true,
      });
      res.send("Авторизован");
    } catch (error) {
      console.log(error);
    }
  }
  async postCoord(req, res) {
    try {
      console.log(req.body);
      const { coordinates } = req.body;
      let g = await dtw.create({ coordinates: coordinates });
      console.log("Координаты сохранены");
      res.status(200);
      res.json("good");
    } catch (error) {
      console.log(error);
    }
  }
}
export default new authController();
