import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/UserRepository";
import { env } from "../../../shared/config/env";
import { LoginRequest, LoginResponse } from "../types";

class AuthUseCase {
  async login({ email, password }: LoginRequest): Promise<LoginResponse> {
    const user = await UserRepository.findByEmail({ email });

    if (!user) {
      throw new Error("Authentication failed. User not found.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Authentication failed. Email or password is incorrect.");
    }

    const token = jwt.sign({ id: user.id, email: user.email }, env.jwtSecret, {
      expiresIn: "12h",
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}

export default new AuthUseCase();
