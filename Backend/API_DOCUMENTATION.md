# Backend API Documentation

Hệ thống API cho ứng dụng quản lý người dùng và khóa học (PostgreSQL + Prisma).

**Base URL**: `http://localhost:5000`

---

## 1. Quản lý Người dùng (User Management)
**Base Path**: `/users`

### Lấy danh sách người dùng
*   **Endpoint**: `GET /users`
*   **Chức năng**: Trả về danh sách tất cả học viên trong hệ thống.
*   **Response**: `200 OK`
    ```json
    [
      {
        "id": 1,
        "name": "Ethan Caldwell",
        "email": "e.caldwell@atelier.edu",
        "createdAt": "2024-03-22T09:00:00Z"
      }
    ]
    ```

### Tạo người dùng mới
*   **Endpoint**: `POST /users`
*   **Chức năng**: Thêm một học viên mới.
*   **Body (JSON)**:
    ```json
    {
      "name": "Julian Sterling",
      "email": "j.sterling@atelier.edu"
    }
    ```
*   **Validation**:
    *   `name`: Không được để trống.
    *   `email`: Phải đúng định dạng email và là duy nhất.
*   **Response**: `201 Created` - Đối tượng user vừa tạo.

### Xóa người dùng
*   **Endpoint**: `DELETE /users/:id`
*   **Chức năng**: Xóa người dùng theo ID khỏi hệ thống.
*   **Response**: `200 OK` - `{ "message": "User deleted successfully" }`

---

## 2. Hệ thống Khóa học (School System)
**Base Path**: `/api`

### Quản lý Khóa học
#### Lấy danh sách các module
*   **Endpoint**: `GET /api/courses`
*   **Chức năng**: Trả về danh sách tất cả các khóa học hiện có.
*   **Response**: `200 OK`

#### Xem chi tiết khóa học
*   **Endpoint**: `GET /api/courses/:id`
*   **Chức năng**: Lấy thông tin chi tiết một khóa học và danh sách các học viên (User) đã ghi danh.

#### Tạo khóa học (Module) mới
*   **Endpoint**: `POST /api/courses`
*   **Chức năng**: Khởi tạo một module học tập mới.
*   **Body (JSON)**:
    ```json
    {
      "title": "Advanced Web Development",
      "code": "WD401"
    }
    ```
*   **Response**: `201 Created`.

#### Xóa khóa học
*   **Endpoint**: `DELETE /api/courses/:id`
*   **Chức năng**: Xóa module khỏi hệ thống registry.

### Quản lý Ghi danh (Enrollment)
#### Đăng ký khóa học cho học viên
*   **Endpoint**: `POST /api/enroll`
*   **Chức năng**: Ghi danh một học viên vào một module học tập.
*   **Body (JSON)**:
    ```json
    {
      "userId": 1,
      "courseId": 10
    }
    ```
*   **Response**: `200 OK` - `{ "message": "Enrolled successfully", "user": { ... } }`

#### Hủy đăng ký (Unenroll)
*   **Endpoint**: `POST /api/unenroll`
*   **Chức năng**: Xóa học viên khỏi danh sách tham gia của module.
*   **Body (JSON)**:
    ```json
    {
      "userId": 1,
      "courseId": 10
    }
    ```

#### Xem Transcript/Thời khóa biểu của học viên
*   **Endpoint**: `GET /api/users/:id`
*   **Chức năng**: Trả về thông tin cá nhân và danh sách các module mà học viên đang theo học.

---

## Ghi chú Quan trọng
- **CORS**: Đã được kích hoạt cho tất cả các nguồn (có thể cấu hình lại trong `server.js`).
- **Database**: Sử dụng quan hệ Many-to-Many giữa `User` và `Course`.
- **Port**: Server hiện tại đang chạy tại cổng `5000` (Thay đổi trong file `.env`).
- **Logs**: Backend sử dụng `nodemon` để tự động restart khi code thay đổi.
