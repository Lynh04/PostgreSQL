import { prisma } from "../config/prisma/client.js";

// 1. Tạo khóa học
export const createCourse = async (data) => {
    const { users, ...restData } = data;
    const courseData = { ...restData };
    
    // Nếu có truyền users kèm theo, format lại cho đúng chuẩn connect của Prisma
    if (users && users.length > 0) {
        courseData.users = {
            connect: users.map(user => ({ id: Number(user.id) }))
        };
    }
    
    return await prisma.course.create({ data: courseData, include: { users: true } });
};

// 2. Đăng ký khóa học (Dùng userId)
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

// 3.5. Xóa khóa học của User (Hủy đăng ký)
export const unenrollUserFromCourse = async (userId, courseId) => {
    return await prisma.user.update({
        where: { id: Number(userId) },
        data: {
            courses: {
                disconnect: { id: Number(courseId) }
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

// 6. Lấy tất cả khóa học
export const getAllCourses = async () => {
    return await prisma.course.findMany({
        include: { users: true }
    });
};

// 7. Lấy chi tiết khóa học kèm danh sách HV
export const getCourseWithUsers = async (courseId) => {
    return await prisma.course.findUnique({
        where: { id: Number(courseId) },
        include: { users: true }
    });
};

// 8. Cập nhật khóa học
export const updateCourse = async (courseId, data) => {
    return await prisma.course.update({
        where: { id: Number(courseId) },
        data,
    });
};