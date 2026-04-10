// src/controllers/user.controller.js
import { createUser, getAllUsers, deleteUser, updateUser } from "../services/user.service.js";

export const createUserController = async (req, res) => {
    try {
        const user = req.body;
        // Tạm thời bỏ qua validation middleware ở đây, giả định đã qua.
        const newUser = await createUser(user);
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        // Trả về lỗi 400 nếu là lỗi từ Database (ví dụ: email đã tồn tại)
        const statusCode = error.code === 'P2002' ? 409 : 500;
        res.status(statusCode).json({ error: error.message });
    }
};

export const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error getting users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteUserController = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteUser(id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        if (error.code === 'P2025') {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const updated = await updateUser(id, { name, email });
        res.status(200).json(updated);
    } catch (error) {
        console.error("Error updating user:", error);
        if (error.code === 'P2025') {
            return res.status(404).json({ error: "User not found" });
        }
        const statusCode = error.code === 'P2002' ? 409 : 500;
        res.status(statusCode).json({ error: error.message });
    }
};