const bcrypt = require("bcryptjs");
const userRepository = require("../repositories/userRepository");
const userService = require("../services/userService");
const {createUserSchema, updateUserSchema} = require("../validations/userValidation");
const {handleJoiErrorMessage} = require("../utils/general");

// 🔹 Mock semua dependensi eksternal
jest.mock("../repositories/userRepository");
jest.mock("bcryptjs");
jest.mock("../validations/userValidation");
jest.mock("../utils/general");

describe("UserService", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    // 🧩 CREATE USER
    describe("createUser", () => {
        it("should create a new user successfully", async () => {
            // Arrange
            const dummyInput = {
                username: "johndoe",
                email: "john@example.com",
                password: "secret123",
                full_name: "John Doe",
                role: "staff",
            };

            const hashedPassword = "hashed_password";
            const savedUser = {id: 1, username: "johndoe", email: "john@example.com"};

            createUserSchema.validate.mockReturnValue({error: null, value: dummyInput});
            bcrypt.hash.mockResolvedValue(hashedPassword);
            userRepository.create.mockResolvedValue(savedUser);

            // Act
            const result = await userService.createUser(dummyInput);

            // Assert
            expect(createUserSchema.validate).toHaveBeenCalledWith(dummyInput);
            expect(bcrypt.hash).toHaveBeenCalledWith(dummyInput.password, 10);
            expect(userRepository.create).toHaveBeenCalledWith(expect.objectContaining({
                username: "johndoe", password_hash: hashedPassword,
            }));
            expect(result).toEqual(savedUser);
        });

        it("should throw validation error if schema invalid", async () => {
            const joiError = {details: [{message: "Email is required", path: ["email"]}]};
            createUserSchema.validate.mockReturnValue({error: joiError});
            const errorObj = new Error("Validation failed");
            handleJoiErrorMessage.mockReturnValue(errorObj);

            await expect(userService.createUser({})).rejects.toThrow("Validation failed");
            expect(handleJoiErrorMessage).toHaveBeenCalledWith(joiError);
        });
    });

    // 🧩 GET ALL USERS
    describe("getAllUsers", () => {
        it("should return all users", async () => {
            const users = [{id: 1}, {id: 2}];
            userRepository.findAll.mockResolvedValue(users);

            const result = await userService.getAllUsers();

            expect(result).toEqual(users);
            expect(userRepository.findAll).toHaveBeenCalledTimes(1);
        });
    });

    // 🧩 GET USER BY ID
    describe("getUserById", () => {
        it("should return user when found", async () => {
            const user = {id: 1, username: "john"};
            userRepository.findById.mockResolvedValue(user);

            const result = await userService.getUserById(1);
            expect(result).toEqual(user);
        });

        it("should throw error if user not found", async () => {
            userRepository.findById.mockResolvedValue(null);
            await expect(userService.getUserById(999)).rejects.toThrow("User not found");
        });
    });

    // 🧩 UPDATE USER
    describe("updateUser", () => {
        it("should update user successfully", async () => {
            const dummyData = {full_name: "Updated Name"};
            const updatedUser = {id: 1, full_name: "Updated Name"};

            updateUserSchema.validate.mockReturnValue({error: null, value: dummyData});
            userRepository.update.mockResolvedValue(updatedUser);

            const result = await userService.updateUser(1, dummyData);

            expect(updateUserSchema.validate).toHaveBeenCalledWith(dummyData);
            expect(userRepository.update).toHaveBeenCalledWith(1, dummyData);
            expect(result).toEqual(updatedUser);
        });

        it("should throw if user not found on update", async () => {
            updateUserSchema.validate.mockReturnValue({error: null, value: {}});
            userRepository.update.mockResolvedValue(null);
            await expect(userService.updateUser(99, {})).rejects.toThrow("User not found");
        });
    });

    // 🧩 DELETE USER
    describe("deleteUser", () => {
        it("should delete user successfully", async () => {
            userRepository.delete.mockResolvedValue(true);
            const result = await userService.deleteUser(1);
            expect(result).toBe(true);
        });

        it("should throw if user not found", async () => {
            userRepository.delete.mockResolvedValue(null);
            await expect(userService.deleteUser(123)).rejects.toThrow("User not found");
        });
    });
});
