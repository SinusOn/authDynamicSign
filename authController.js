import Role from "./models/Role.js";
import User from "./models/User.js";

class authController {
  async registration(req, res) {
    try {
      console.log(req.body);
      let { name, login, password } = req.body;
      //   let foundedUser = await User.findOne({ login });
      //   if (foundedUser) {
      //     return res
      //       .status(400)
      //       .json({ message: "Этот пользователь уже зарегистрирован" });
      //   }
      //   let userRole = await Role.findOne({ value: "User" });
      let user = User.create({ name, login, password, role: "User" });
      console.log("Зарегистрирован");
      res.status(200).json("SAved user");
      //   return res.json({ message: "Пользователь успешно зарегистрирован" });
    } catch (error) {
      console.log(error);
      res.status(400).json("Registration error");
    }
  }
}
export default new authController();
