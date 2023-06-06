import Role from "../models/Role.js";
import User from "../models/User.js";
import authService from "../service/authService.js";

class authController {
  async registration(req, res) {
    try {
      const { name, login, password } = req.body;
      const tokens = await authService.registration(name, login, password);
      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.cookie("accessToken", tokens.accessToken, {
        maxAge: 3600 * 1000,
      });
      res.json(name);
    } catch (error) {
      res.status(401).json(error.message);
    }
  }

  async login(req, res) {
    try {
      const { name, login, password } = req.body;
      const tokens = await authService.login(name, login, password);

      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.cookie("accessToken", tokens.accessToken, {
        maxAge: 3600 * 1000,
      });

      res.status(200);
      res.json(tokens);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
  async refresh(req, res) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        res.json("ok");
      }

      const tokens = await authService.refresh(refreshToken);
      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.cookie("accessToken", tokens.accessToken, {
        maxAge: 3600 * 1000,
      });
      res.json(tokens);
      return;
    } catch (error) {
      res.status(401);
    }
  }
  async users(req, res) {
    try {
      // res.send("users ----");
      res.json({
        user: "ALina user",
      });
    } catch (error) {
      res.status(401).json(error.message);
    }
  }
  async logout(req, res) {
    try {
      const { refreshToken } = req.cookies;

      await authService.logout(refreshToken);

      res.clearCookie("refreshToken");
      res.clearCookie("accessToken");
      return res.json("logout end");
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
  async user(req, res) {
    try {
    } catch (error) {}
  }
}
export default new authController();
