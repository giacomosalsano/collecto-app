import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthUseCase from "./AuthUseCase";
import UserRepository from "../repositories/UserRepository";
import { LoginRequest } from "../types";


jest.mock("bcryptjs");
jest.mock("jsonwebtoken");
jest.mock("../repositories/UserRepository");

const mockUserRepository = UserRepository as jest.Mocked<typeof UserRepository>;
const mockBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;
const mockJwt = jwt as jest.Mocked<typeof jwt>;

describe("AuthUseCase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should authenticate a user with valid credentials and return a token", async () => {
    const loginRequest: LoginRequest = {
      email: "test@example.com",
      password: "password123",
    };

    const mockUser = {
      id: 1,
      name: "Test User",
      email: loginRequest.email,
      password: "hashedPassword", 
    };

    const expectedToken = "fake-jwt-token";

    mockUserRepository.findByEmail.mockResolvedValue(mockUser as any);
    mockBcrypt.compare.mockResolvedValue(true as never);
    mockJwt.sign.mockReturnValue(expectedToken as never);

    const result = await AuthUseCase.login(loginRequest);

    expect(UserRepository.findByEmail).toHaveBeenCalledWith({
      email: loginRequest.email,
    });
    expect(bcrypt.compare).toHaveBeenCalledWith(
      loginRequest.password,
      mockUser.password
    );
    expect(jwt.sign).toHaveBeenCalled();
    expect(result.token).toBe(expectedToken);
    expect(result.user.email).toBe(loginRequest.email);
  });

  it("should throw an error if user is not found", async () => {
    const loginRequest: LoginRequest = {
      email: "nonexistent@example.com",
      password: "password123",
    };
    mockUserRepository.findByEmail.mockResolvedValue(null as any);


    await expect(AuthUseCase.login(loginRequest)).rejects.toThrow(
      "Authentication failed. User not found."
    );
  });

  it("should throw an error if password is incorrect", async () => {
    const loginRequest: LoginRequest = {
      email: "test@example.com",
      password: "wrongpassword",
    };
    const mockUser = { id: 1, password: "hashedPassword" };

    mockUserRepository.findByEmail.mockResolvedValue(mockUser as any);
    mockBcrypt.compare.mockResolvedValue(false as never);

    await expect(AuthUseCase.login(loginRequest)).rejects.toThrow(
      "Authentication failed. Email or password is incorrect."
    );
  });
});
