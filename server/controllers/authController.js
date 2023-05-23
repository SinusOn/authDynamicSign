import Role from "../models/Role.js";
import User from "../models/User.js";
import authService from "../service/authService.js";

class authController {
  async registration(req, res) {
    try {
      console.log(req.body);
      let { name, login, password } = req.body;
      const tokens = await authService.registration(name, login, password);
      console.log("Зарегистрирован");

      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
      });
      res.cookie("accessToken", tokens.accessToken, {
        httpOnly: true,
      });

      res.status(200);
      res.json("good");
    } catch (error) {
      console.log(error);
      res.status(400);
    }
  }

  async login(req, res) {
    try {
      const { name, login, password } = req.body;
      // const tokens = await authService.login(name, login, password);
      // console.log("Авторизован");
      console.log(req.body);

      // res.cookie("refreshToken", tokens.refreshToken, {
      //   httpOnly: true,
      // });
      // res.cookie("accessToken", tokens.accessToken, {
      //   httpOnly: true,
      // });

      res.status(200);
      res.json(tokens);
    } catch (error) {
      console.log(error);
    }
  }
  async users(req, res) {
    try {
      res.send("users ");
    } catch (error) {
      console.log(error);
    }
  }
  async test(req, res) {
    console.log(req.body.name);
    const { name, login, password } = req.body;
    const tokens = await authService.login(name, login, password);
    console.log("Авторизован");
    res.status(200);
  }
}
export default new authController();
