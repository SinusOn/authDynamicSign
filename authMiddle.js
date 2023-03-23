export default function aut(req, res, next) {
  try {
    if (!req.cookies.myTestcookie) {
      console.log("error");
      return res.status(400).json("not auth");
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json("not auth");
  }
}
