import Role from "../models/Role.js";
import User from "../models/User.js";
import authService from "../service/authService.js";

class authController {
  async registration(req, res) {
    try {
      const { name, login, password } = req.body;
      const tokens = await authService.registration(name, login, password);
      console.log(tokens);
      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: 3600 * 1000,
        httpOnly: true,
      });
      res.cookie("accessToken", tokens.accessToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.json(tokens);
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
  async refresh(req, res) {
    try {
      const { refreshToken } = req.cookies;
      console.log(`рефреш в контроллере ${refreshToken}`);
      const tokens = await authService.refresh(refreshToken);
      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: 3600 * 1000,
        httpOnly: true,
      });
      res.cookie("accessToken", tokens.accessToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.json(tokens);
    } catch (error) {
      console.log(error);
    }
  }
  async users(req, res) {
    try {
      // res.send("users ----");
      res.json({
        user: "ALina user",
      });
    } catch (error) {
      console.log(error);
    }
  }

  async fakeLogin(req, res) {
    const { name, login, password } = req.body;
    const userFake = await authService.fakeLogin(name, login, password);
    console.log(userFake);
    res.json(userFake);
  }
}
export default new authController();
