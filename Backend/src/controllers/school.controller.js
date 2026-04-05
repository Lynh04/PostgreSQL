import * as service from "../services/course.service.js";

export const createCourseHandler = async (req, res) => {
    try {
        const result = await service.createCourse(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Handler đăng ký: Dùng userId
export const enrollHandler = async (req, res) => {
    try {
        const { userId, courseId } = req.body; // Thống nhất dùng userId
        const result = await service.enrollUserToCourse(userId, courseId);
        res.json({ message: "Enrolled successfully", user: result });
    } catch (error) {
        res.status(500).json({ error: "Cannot enroll user" });
    }
};

// Handler hủy đăng ký: Xóa user khỏi khóa học
export const unenrollHandler = async (req, res) => {
    try {
        const { userId, courseId } = req.body;
        const result = await service.unenrollUserFromCourse(userId, courseId);
        res.json({ message: "Unenrolled successfully", user: result });
    } catch (error) {
        res.status(500).json({ error: "Cannot unenroll user" });
    }
};

export const getUserTranscriptHandler = async (req, res) => {
    try {
        const { id } = req.params; // id của User
        const result = await service.getUserWithCourses(id);
        if (!result) return res.status(404).json({ error: "User not found" });
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteCourseHandler = async (req, res) => {
    try {
        const { id } = req.params;
        await service.deleteCourse(id);
        res.json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllCoursesHandler = async (req, res) => {
    try {
        const result = await service.getAllCourses();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCourseDetailHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await service.getCourseWithUsers(id);
        if (!result) return res.status(404).json({ error: "Course not found" });
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};