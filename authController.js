import Role from "./models/Role.js";
import User from "./models/User.js";

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
      let user = await User.create({ name, login, password, role: userRole });
      console.log("Зарегистрирован");
      res.status(200);
    } catch (error) {
      console.log(error);
      res.status(400);
    }
  }
}
export default new authController();
