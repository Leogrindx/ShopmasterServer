import UserModule from "../module/user.module.js";
import bcrypt from "bcryptjs";
import { v4 } from "uuid";
import MailService from "./mail.servise.js";
import ApiError from "../exceptions/api-error.js";
import UserDTO from "../dtos/user-dto.js";
import TokenService from "./token.service.js";
class UserService {
  async registration(prop) {
    const candidate = await UserModule.getOne("email", prop.email);
    if (candidate.length !== 0) {
      throw ApiError.BadRequest(
        `This email address ${prop.email} is already in use`
      );
    }
    const body = { ...prop };
    const hashPassword = await bcrypt.hash(prop.password, 3);
    const activationLink = v4();
    body.password = hashPassword;
    body.activationLink = activationLink;
    body.position = "user";
    await UserModule.create(body);
    await MailService.sendActivationMail(
      body.email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );
    return true;
  }

  async login(prop) {
    const candidate = await UserModule.getOne("email", prop.email);
    if (candidate.length === 0) {
      throw ApiError.BadRequest(`this email \'${prop.email}\' not registered`);
    }
    if (
      (await bcrypt.compare(prop.password, candidate[0].password)) === false
    ) {
      throw ApiError.BadRequest(`password wrong`);
    }
    const user = new UserDTO(candidate[0]);
    const token = await TokenService.generateTokens({ ...user });

    return { ...token, user: user };
  }

  async activate(activationLink) {
    const user = await UserModule.getOne("activationlink", activationLink);
    console.log(user);
    if (user.length === 0) {
      throw ApiError.BadRequest("wrong activation link");
    }
    await UserModule.update("isactivated", true, user[0].id);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = await TokenService.validateRefreshToken(refreshToken);
    if (!userData) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModule.getOne("id", userData.id);
    const userDTO = new UserDTO(user[0]);
    const tokens = await TokenService.generateTokens({ ...userDTO });
    return { ...tokens, user: userDTO };
  }

  async getUsers() {
    const candidate = await UserModule.get();
    return candidate;
  }
}

export default new UserService();
