const AuthUsecase = require("../usecases/authUsecase");
const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcryptjs");
const {generateTokens, verifyRefreshToken} = require("../utils/jwt");
const {loginUserSchema} = require("../validations/authValidation");
const {
    ValidationError,
    AuthenticationError,
    NotFoundError,
} = require("../exceptions/errors");

// -------------------------------------------------------------------
// Mock all dependencies
// -------------------------------------------------------------------
jest.mock("../repositories/userRepository");
jest.mock("bcryptjs");
jest.mock("../utils/jwt");
jest.mock("../validations/authValidation");

describe("AuthUsecase", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // =================================================================
    // LOGIN TESTS
    // =================================================================
    describe("login()", () => {
        test("should throw ValidationError when Joi validation fails", async () => {
            loginUserSchema.validate = jest.fn().mockReturnValue({
                error: {
                    details: [
                        {
                            message: '"email" is required',
                            path: ["email"],
                            type: "string.empty",
                            context: {
                                key: "email",
                                label: "email"
                            }
                        }
                    ]
                }
            });

            await expect(
                AuthUsecase.login({email: "", password: ""})
            ).rejects.toThrow(ValidationError);
        });

        test("should throw AuthenticationError if user not found", async () => {
            loginUserSchema.validate = jest.fn().mockReturnValue({error: null});

            userRepository.findByEmail.mockResolvedValue(null);

            await expect(
                AuthUsecase.login({email: "test@mail.com", password: "123"})
            ).rejects.toThrow(AuthenticationError);
        });

        test("should throw AuthenticationError if password mismatch", async () => {
            loginUserSchema.validate = jest.fn().mockReturnValue({error: null});

            userRepository.findByEmail.mockResolvedValue({
                id: 1,
                email: "test@mail.com",
                password_hash: "hashed",
            });

            bcrypt.compare.mockResolvedValue(false);

            await expect(
                AuthUsecase.login({email: "test@mail.com", password: "wrong"})
            ).rejects.toThrow(AuthenticationError);
        });

        test("should throw AuthenticationError if user is not active", async () => {
            loginUserSchema.validate = jest.fn().mockReturnValue({error: null});

            userRepository.findByEmail.mockResolvedValue({
                id: 1,
                email: "test@mail.com",
                password_hash: "hashed",
                is_active: false,
            });

            bcrypt.compare.mockResolvedValue(true);

            await expect(
                AuthUsecase.login({email: "test@mail.com", password: "123"})
            ).rejects.toThrow(AuthenticationError);
        });

        test("should return user & tokens if login is successful", async () => {
            loginUserSchema.validate = jest.fn().mockReturnValue({error: null});

            const fakeUser = {
                id: 1,
                email: "test@mail.com",
                full_name: "John Doe",
                role: "ADMIN",
                password_hash: "hashed",
                is_active: true,
            };

            userRepository.findByEmail.mockResolvedValue(fakeUser);
            bcrypt.compare.mockResolvedValue(true);

            const fakeTokens = {
                accessToken: "access",
                refreshToken: "refresh",
            };
            generateTokens.mockReturnValue(fakeTokens);

            const result = await AuthUsecase.login({
                email: "test@mail.com",
                password: "123",
            });

            expect(generateTokens).toHaveBeenCalledWith({
                id: 1,
                email: "test@mail.com",
                role: "ADMIN",
            });

            expect(result).toEqual({
                user: {
                    id: 1,
                    email: "test@mail.com",
                    full_name: "John Doe",
                    role: "ADMIN",
                },
                tokens: fakeTokens,
            });
        });
    });

    // =================================================================
    // REFRESH TOKEN TESTS
    // =================================================================
    describe("refreshToken()", () => {
        test("should throw AuthenticationError if token invalid", async () => {
            verifyRefreshToken.mockImplementation(() => {
                throw new AuthenticationError("Invalid refresh token");
            });

            await expect(AuthUsecase.refreshToken("wrong"))
                .rejects
                .toThrow(AuthenticationError);
        });

        test("should throw AuthenticationError if user not found", async () => {
            verifyRefreshToken.mockReturnValue({id: 99});

            userRepository.findById.mockResolvedValue(null);

            await expect(AuthUsecase.refreshToken("valid"))
                .rejects
                .toThrow(AuthenticationError);
        });

        test("should return new tokens if refresh successful", async () => {
            verifyRefreshToken.mockReturnValue({id: 1});

            const fakeUser = {id: 1, email: "a@mail.com", role: "ADMIN"};
            userRepository.findById.mockResolvedValue(fakeUser);

            const fakeTokens = {accessToken: "acc", refreshToken: "ref"};
            generateTokens.mockReturnValue(fakeTokens);

            const result = await AuthUsecase.refreshToken("valid");

            expect(result).toEqual(fakeTokens);
        });
    });


    // =================================================================
    // LOGOUT TEST
    // =================================================================
    describe("logout()", () => {
        test("should return logout message", async () => {
            const result = await AuthUsecase.logout();
            expect(result).toEqual({message: "Logged out successfully"});
        });
    });
});
