import User from "../model/user.js";

export default {
  async signUp(req, res) {
    const newUser = await User.create(req.body);
    req.session.user = newUser;
    res.status(201).json({ user: newUser });
  },
  async signIn(req, res) {
    const user = await User.findOne({ username: req.body.username });
    if (user.password === req.body.password) {
      req.session.user = user;
      res.status(201).json({ user });
    } else res.sendStatus(404);
  },
};
