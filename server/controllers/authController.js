import authService from "../service/authService.js";

class authController {
  async registration(req, res) {
    try {
      console.log("регистрация старт");
      const { name, login, password } = req.body;
      const userData = await authService.registration(name, login, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.cookie("accessToken", userData.accessToken, {
        maxAge: 3600 * 1000,
      });
      res.json(userData);
    } catch (error) {
      res.status(401).json(error.message);
    }
  }

  async login(req, res) {
    try {
      const { name, login, password } = req.body;

      const userData = await authService.login(name, login, password);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.cookie("accessToken", userData.accessToken, {
        maxAge: 3600 * 1000,
      });

      res.status(200);
      res.json(userData);
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
      const userData = await authService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.cookie("accessToken", userData.accessToken, {
        maxAge: 3600 * 1000,
      });
      res.status(200).json(userData);
      return;
    } catch (error) {
      res.status(401);
    }
  }
  async users(req, res) {
    try {
      const users = await authService.users();
      res.json(users);
    } catch (error) {
      res.status(401).json(error.message);
    }
  }
  async logout(req, res) {
    try {
      const { refreshToken } = req.cookies;
      await authService.logout(refreshToken);

      res.clearCookie("refreshToken", {
        httpOnly: true,
      });
      res.clearCookie("accessToken");
      res.status(200).json("ok");
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

  async compareSign(req, res) {
    try {
      const { reference, input } = req.body;
      await authService.compareSign(reference, input);

      res.status(200).json({ mess: "подписи похожи" });
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
  async changePass(req, res) {
    try {
      const { name, login, password } = req.body;

      const tokens = await authService.changePass(name, login, password);

      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.cookie("accessToken", tokens.accessToken, {
        maxAge: 3600 * 1000,
      });

      res.status(200).json({ name, login });
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
  async getRole(req, res) {
    const { user } = req.body;

    res.json(user);
    try {
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
}
export default new authController();
