import UserService from "../services/user.service.js";
class UserController {
  async registration(req, res, next) {
    try {
      const register = await UserService.registration(req.body);
      return res.json({ status: 200 });
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const userData = await UserService.login(req.body);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      delete userData.refreshToken;
      res.status(200).json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      res.clearCookie("refreshToken");
      return res.json({ status: 200 });
    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      await UserService.activate(req.params.link);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      delete userData.refreshToken;
      res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await UserService.getUsers();
      res.json(users);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
