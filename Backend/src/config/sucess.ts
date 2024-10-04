/**
 * @copyright 2023 @ YourCompany Team
 * @author assistant
 * @create 2023/10/04 12:00
 * @update 2023/10/04 12:30
 * @file api/services/SuccessService.js
 */
'use strict';
export const SuccessService = {
  // SERVER
  SERVER_SUCCESS: { code: 'SERVER_SUCCESS', message: 'Operation completed successfully' },

  SYSTEM_SESSION_VALID: { code: 'SYSTEM_SESSION_VALID', message: 'Session is valid.' },
  SYSTEM_SUCCESS: { code: 'SYS001', message: 'System operation successful' },
  SYSTEM_TOKEN_VALID: { code: 'SYS002', message: "Mã xác thực hợp lệ." },
  SYSTEM_TOKEN_UPDATED: { code: 'SYS006', message: "Cập nhật token thành công." },
  SYSTEM_SOCKET_CONNECTED: { code: 'SYS007', message: "Kết nối socket thành công." },
  SYSTEM_JSON_FORMAT_VALID: { code: 'SYS008', message: "Định dạng JSON hợp lệ." },
  SYSTEM_ENUM_VALUE_VALID: { code: 'SYS009', message: "Giá trị enum hợp lệ." },
  SYSTEM_INTEGER_VALID: { code: 'SYS010', message: "Dữ liệu định dạng số nguyên hợp lệ." },
  SYSTEM_LOGIN_SUCCESS: { code: 'SYS011', message: "Đăng nhập thành công." },
  ID_VALID: { code: 'ID001', message: "ID hợp lệ." },
  SYSTEM_METHOD_ALLOWED: { code: 'SYSTEM_METHOD_ALLOWED', message: "Phương thức được phép." },
  VALID_DATE: { code: 'VALID_DATE', message: "Ngày hợp lệ." },

  // SETTINGS
  SETTINGS_KEY_VALID: { code: 'SETTINGS_KEY_VALID', message: 'Khóa cài đặt hợp lệ.' },
  SETTINGS_STUDENT_MOVING_PROCESS_ACTIVE: { code: 'SETTINGS_STUDENT_MOVING_PROCESS_ACTIVE', message: 'Quá trình di chuyển nhân viên đang hoạt động.' },

  // AUTH
  AUTH_LOGIN_SUCCESS: { code: 'AUTH_LOGIN_SUCCESS', message: "Đăng nhập thành công." },
  AUTH_ACCOUNT_READY: { code: 'AUTH_ACCOUNT_READY', message: "Tài khoản sẵn sàng để hoạt động." },
  AUTH_ACCOUNT_HAS_PERMISSION: { code: 'AUTH_ACCOUNT_HAS_PERMISSION', message: "Tài khoản có quyền truy cập hành động này." },
  AUTH_SECRET_VALID: { code: 'AUTH_SECRET_VALID', message: "Bí mật hợp lệ." },
  AUTH_CODE_VERIFY_VALID: { code: 'AUTH_CODE_VERIFY_VALID', message: "Mã xác minh hợp lệ." },
  AUTH_SYSTEM_TOKEN_VALID: { code: 'AUTH_SYSTEM_TOKEN_VALID', message: "System Token hợp lệ." },
  AUTH_TOKEN_FOUND: { code: 'AUTH_TOKEN_FOUND', message: "Token được tìm thấy." },
  ACTIVE_TOKEN: { code: 'ACTIVE_TOKEN', message: "Token đang hoạt động." },

  // USER
  USER_ADD_SUCCESS: { code: 'USER_ADD_SUCCESS', message: "Thêm user thành công" },
  USER_EDIT_SUCCESS: { code: 'USER_EDIT_SUCCESS', message: "Sửa user thành công" },
  USER_DEL_SUCCESS: { code: 'USER_DEL_SUCCESS', message: "Xóa user thành công" },
  USER_FOUND: { code: 'USER_FOUND', message: "Tìm thấy user" },
  USER_ACTIVE: { code: 'USER_ACTIVE', message: "Tài khoản đang hoạt động" },
  USER_HAS_PERMISSION: { code: 'USER_HAS_PERMISSION', message: "Có quyền đăng nhập" },
  USER_ID_VALID: { code: 'USER_ID_VALID', message: "ID hợp lệ" },
  USER_EMAIL_VALID: { code: 'USER_EMAIL_VALID', message: "E-mail người dùng hợp lệ" },
  USER_VALID: { code: 'USER_VALID', message: "Tài khoản người dùng hợp lệ" },
  USER_PHONE_VALID: { code: 'USER_PHONE_VALID', message: "Số điện thoại người dùng hợp lệ" },
  USER_PASSWORD_VALID: { code: 'USER_PASSWORD_VALID', message: "Mật khẩu hợp lệ" },
  USER_FIRST_NAME_VALID: { code: 'USER_FIRST_NAME_VALID', message: "First name hợp lệ." },
  USER_LAST_NAME_VALID: { code: 'USER_LAST_NAME_VALID', message: "Last name hợp lệ." },
  USER_FULL_NAME_VALID: { code: 'USER_FULL_NAME_VALID', message: "Full name hợp lệ." },
  USER_CREATED: { code: 'USER_CREATED', message: "Tài khoản người dùng đã được tạo" },
  PHONE_AVAILABLE: { code: 'PHONE_AVAILABLE', message: "Số điện thoại người dùng có sẵn" },

  USER_EMAIL_AVAILABLE: { code: 'USER_EMAIL_AVAILABLE', message: "E-mail có sẵn." },
  USER_UNLOCKED: { code: 'USER_UNLOCKED', message: 'Tài khoản đã được mở khóa.' },
  IMEI_IS_CORRECT: { code: 'IMEI_IS_CORRECT', message: "Bạn đã đăng nhập với thiết bị đã đăng ký" },
  USER_IMEI_VALID: { code: 'USER_IMEI_VALID', message: "IMEI hợp lệ." },
  USER_CODE_VALID: { code: 'USER_CODE_VALID', message: 'Mã nhân viên hợp lệ.' },
  CODE_AVAILABLE: { code: 'CODE_AVAILABLE', message: 'Mã nhân viên có sẵn.' },
  USER_PHONE_AVAILABLE: { code: 'USER_PHONE_AVAILABLE', message: 'Số điện thoại có sẵn.' },
  USER_CODE_AVAILABLE: { code: 'USER_CODE_AVAILABLE', message: 'Mã nhân viên có sẵn.' },
  USER_EMAIL_REGISTERED: { code: 'USER_EMAIL_REGISTERED', message: 'E-mail nhân viên đã được đăng ký.' },
  CURRENT_PASSWORD_VALID: { code: 'CURRENT_PASSWORD_VALID', message: "Mật khẩu hiện tại hợp lệ." },
  NEW_PASSWORD_VALID: { code: 'NEW_PASSWORD_VALID', message: "Mật khẩu mới hợp lệ." },
  PASSWORD_MATCH: { code: 'PASSWORD_MATCH', message: "Mật khẩu trùng khớp." },
  PASSWORD_CORRECT: { code: 'PASSWORD_CORRECT', message: "Mật khẩu đúng." },

  // STAFF
  STAFF_FIRSTNAME_VALID: { code: 'STAFF_FIRSTNAME_VALID', message: "Họ hợp lệ" },
  STAFF_LASTNAME_VALID: { code: 'STAFF_LASTNAME_VALID', message: "Tên hợp lệ" },
  STAFF_IMEI_UNIQUE: { code: 'STAFF_IMEI_UNIQUE', message: 'Imei nhân viên duy nhất' },
  STAFF_PASSWORD_MATCH: { code: 'STAFF_PASSWORD_MATCH', message: 'Mật khẩu khớp' },
  STAFF_ID_VALID: { code: 'STAFF_ID_VALID', message: 'Mã nhân viên hợp lệ' },
  STAFF_FOUND: { code: 'STAFF_FOUND', message: 'Tìm thấy nhân viên' },

  // BOOKING
  BOOKING_ID_VALID: { code: 'BOOKING_ID_VALID', message: "ID hợp lệ." },
  BOOKING_FOUND: { code: 'BOOKING_FOUND', message: "Đặt hẹn được tìm thấy." },

  // MEDIA
  MEDIA_ID_VALID: { code: 'MEDIA_ID_VALID', message: "ID hợp lệ." },
  MEDIA_TITLE_VALID: { code: 'MEDIA_TITLE_VALID', message: "Tiêu đề media hợp lệ." },
  MEDIA_OBJECT_FOUND: { code: 'MEDIA_OBJECT_FOUND', message: "Media được tìm thấy." },
  MEDIA_UPLOAD_SUCCESS: { code: 'MEDIA_UPLOAD_SUCCESS', message: "Tải lên media thành công." },

  // TAXONOMY
  TAXONOMY_ID_VALID: { code: 'TAXONOMY_ID_VALID', message: "ID hợp lệ." },
  TAXONOMY_TITLE_VALID: { code: 'TAXONOMY_TITLE_VALID', message: "Tiêu đề hợp lệ." },
  TAXONOMY_OBJECT_FOUND: { code: 'TAXONOMY_OBJECT_FOUND', message: "Đối tượng phân loại được tìm thấy." },
  TAXONOMY_FOUND: { code: 'TAXONOMY_FOUND', message: "Phân loại được tìm thấy." },

  // POST
  POST_ID_VALID: { code: 'POST_ID_VALID', message: "ID bài viết hợp lệ." },
  POST_TITLE_VALID: { code: 'POST_TITLE_VALID', message: "Tiêu đề bài viết hợp lệ." },
  POST_DESCRIPTION_VALID: { code: 'POST_DESCRIPTION_VALID', message: "Nội dung bài viết hợp lệ" },
  POST_OBJECT_FOUND: { code: 'POST_OBJECT_FOUND', message: "Đối tượng bài viết được tìm thấy." },

  // OTHER
  DATE_USE_VALID: { code: 'DATE_USE_VALID', message: "Ngày sử dụng hợp lệ." },

  // ROLE
  ROLE_ADD_SUCCESS: { code: 'ROLE_ADD_SUCCESS', message: "Thêm vai trò thành công." },
  ROLE_EDIT_SUCCESS: { code: 'ROLE_EDIT_SUCCESS', message: "Cập nhật vai trò thành công." },
  ROLE_UPDATE_SUCCESS: { code: 'ROLE_UPDATE_SUCCESS', message: "Cập nhật vai trò thành công." },
  ROLE_RECORD_CREATED: { code: 'ROLE_RECORD_CREATED', message: "Vai trò đã được tạo." },
  ROLE_FOUND: { code: 'ROLE_FOUND', message: "Vai trò được tìm thấy." },
  ROLE_ID_VALID: { code: 'ROLE_ID_VALID', message: "ID Vai trò hợp lệ." },
  ROLE_TITLE_VALID: { code: 'ROLE_TITLE_VALID', message: "Tiêu đề hợp lệ." },
  ROLE_PERMISSION_VALID: { code: 'ROLE_PERMISSION_VALID', message: "Quyền hợp lệ." },
  ROLE_NAME_VALID: { code: 'ROLE_NAME_VALID', message: "Tên vai trò hợp lệ." },

  // CURRENCY
  CURRENCY_ID_VALID: { code: 'CURRENCY_ID_VALID', message: "ID hợp lệ." },
  CURRENCY_TITLE_VALID: { code: 'CURRENCY_TITLE_VALID', message: "Tiêu đề tiền tệ hợp lệ." },
  CURRENCY_CODE_VALID: { code: 'CURRENCY_CODE_VALID', message: "Mã tiền tệ hợp lệ." },
  CURRENCY_FOUND: { code: 'CURRENCY_FOUND', message: "Tiền tệ được tìm thấy." },
  CURRENCY_CODE_UNIQUE: { code: 'CURRENCY_CODE_UNIQUE', message: "Mã tiền tệ là duy nhất." },
  DEFAULT_CURRENCY_EXISTED: { code: 'DEFAULT_CURRENCY_EXISTED', message: "Tiền tệ mặc định tồn tại." },
  DEFAULT_CURRENCY_FOUND: { code: 'DEFAULT_CURRENCY_FOUND', message: "Tiền tệ mặc định được tìm thấy." },
  DEFAULT_CURRENCY_ALLOW: { code: 'DEFAULT_CURRENCY_ALLOW', message: "Tiền tệ mặc định được phép thay đổi trạng thái." },

  // AGENCY
  AGENCY_FOUND: { code: 'AGENCY_FOUND', message: "Agency được tìm thấy." },
  AGENCY_ID_VALID: { code: 'AGENCY_ID_VALID', message: "Agency ID hợp lệ." },
  AGENCY_PASSWORD_VALID: { code: 'AGENCY_PASSWORD_VALID', message: "Agency password hợp lệ." },
  AGENCY_CODE_VALID: { code: 'AGENCY_CODE_VALID', message: "Agency code hợp lệ." },
  AGENCY_EMAIL_VALID: { code: 'AGENCY_EMAIL_VALID', message: "Agency email hợp lệ." },
}