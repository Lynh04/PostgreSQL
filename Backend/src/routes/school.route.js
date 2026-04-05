import express from "express";
import {
    createUserHandler,
    createCourseHandler,
    enrollHandler,
    getUserTranscriptHandler,
    deleteCourseHandler,
} from "../controllers/school.controller.js";

const router = express.Router();

router.post("/users", createUserHandler);
router.post("/courses", createCourseHandler);

// Đăng ký: POST /api/school/enroll
// Body: { "userId": 1, "courseId": 10 }
router.post("/enroll", enrollHandler);

// Xem thời khóa biểu: GET /api/school/users/1
router.get("/users/:id", getUserTranscriptHandler);

router.delete("/courses/:id", deleteCourseHandler);

export default router;