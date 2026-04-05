import { prisma } from "../config/prisma/client.js";

// 1. Tạo khóa học
export const createCourse = async (data) => {
    return await prisma.course.create({ data });
};

// 2. Tạo User
export const createUser = async (data) => {
    return await prisma.user.create({ data });
};

// 3. Đăng ký khóa học (Dùng userId)
export const enrollUserToCourse = async (userId, courseId) => {
    return await prisma.user.update({
        where: { id: Number(userId) },
        data: {
            courses: {
                connect: { id: Number(courseId) }
            }
        },
        include: { courses: true }
    });
};

// 4. Lấy thông tin User kèm các khóa học
export const getUserWithCourses = async (userId) => {
    return await prisma.user.findUnique({
        where: { id: Number(userId) },
        include: { courses: true }
    });
};

// 5. Xóa khóa học
export const deleteCourse = async (courseId) => {
    return await prisma.course.delete({
        where: { id: Number(courseId) }
    });
};