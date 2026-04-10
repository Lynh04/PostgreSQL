import { prisma } from "../config/prisma/client.js";

export const getStatsController = async (req, res) => {
    try {
        const [totalUsers, totalCourses, enrollCount, recentUsers] = await Promise.all([
            prisma.user.count(),
            prisma.course.count(),
            prisma.user.findMany({ select: { courses: { select: { id: true } } } }),
            prisma.user.findMany({
                orderBy: { createdAt: "desc" },
                take: 5,
                select: { id: true, name: true, email: true, createdAt: true },
            }),
        ]);

        const totalEnrollments = enrollCount.reduce(
            (sum, u) => sum + u.courses.length,
            0
        );

        res.status(200).json({
            totalUsers,
            totalCourses,
            totalEnrollments,
            recentUsers,
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
