import express from "express";
import {
    createCourseHandler,
    enrollHandler,
    unenrollHandler,
    getUserTranscriptHandler,
    deleteCourseHandler,
    getAllCoursesHandler,
    getCourseDetailHandler,
} from "../controllers/school.controller.js";

const router = express.Router();

router.post("/courses", createCourseHandler);

// Đăng ký: POST /api/school/enroll
// Body: { "userId": 1, "courseId": 10 }
router.post("/enroll", enrollHandler);

// Hủy đăng ký: POST /api/school/unenroll
// Body: { "userId": 1, "courseId": 10 }
router.post("/unenroll", unenrollHandler);

// Xem thời khóa biểu: GET /api/school/users/1
router.get("/users/:id", getUserTranscriptHandler);

router.get("/courses", getAllCoursesHandler);
router.get("/courses/:id", getCourseDetailHandler);
router.delete("/courses/:id", deleteCourseHandler);

export default router;