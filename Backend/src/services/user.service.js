// src/services/user.service.js
import { prisma } from "../config/prisma/client.js";

/**
 * Tạo người dùng mới trong database.
 * @param {object} user - Đối tượng người dùng { name, email }.
 */
export const createUser = async (user) => {
    return await prisma.user.create({
        data: user,
    });
};

/**
 * Lấy tất cả người dùng từ database.
 */
export const getAllUsers = async () => {
    return await prisma.user.findMany();
};

/**
 * Xóa người dùng khỏi database.
 * @param {number} id - ID của người dùng.
 */
export const deleteUser = async (id) => {
    return await prisma.user.delete({
        where: { id: Number(id) }
    });
};

export const updateUser = async (id, data) => {
    return await prisma.user.update({
        where: { id: Number(id) },
        data,
    });
};