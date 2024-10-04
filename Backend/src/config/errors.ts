/**
 * @copyright 2017 @ ZiniMedia Team
 * @author thanhvo
 * @create 2017/07/05 11:51
 * @update 2017/07/05 16:54
 * @file api/services/ErrorService.js
 */
'use strict';
export const ErrorService = {
  //SERVER
  SERVER_ERROR: { code: 'SERVER_ERROR', message: 'Have error at server' },

  SYSTEM_SESSION_EXPIRED: { code: 'SYSTEM_SESSION_EXPIRED', message: 'Session expired.' },
  SYSTEM_ERROR: { code: 'SYS001', message: 'System error' },
  SYSTEM_TOKEN_REQUIRE: { code: 'SYS002', message: "Mã xác thực là trường bắt buộc." },
  SYSTEM_TOKEN_WRONG: { code: 'SYS003', message: "Mã xác thực thì không đúng." },
  SYSTEM_TOKEN_EXPIRED: { code: 'SYS004', message: "Mã xác thực hết hạn." },
  SYSTEM_REQUEST_TIMEOUT: { code: 'SYS005', message: "Lỗi xác thực hết thời gian yêu cầu." },
  SYSTEM_UPDATE_TOKEN_FAIL: { code: 'SYS006', message: "Cập nhật token lỗi." },
  SYSTEM_SOCKET_ERROR: { code: 'SYS007', message: "Lỗi socket." },
  SYSTEM_JSON_FORMAT_FAIL: { code: 'SYS008', message: "Định dạng JSON thì không hợp lệ." },
  SYSTEM_ENUME_VALUE_FAIL: { code: 'SYS009', message: "Giá trị enum không hợp lệ." },
  SYSTEM_NOT_INTEGER_FAIL: { code: 'SYS010', message: "Dữ liệu định dạng không phải là số nguyên." },
  SYSTEM_NOT_LOGIN: { code: 'SYS011', message: "Người dùng không đăng nhập." },
  ERR_ID_REQUIRED: { code: 'ID001', message: "ID là trường bắt buộc." },
  SYSTEM_METHOD_NOT_ALLOWED: { code: 'SYSTEM_METHOD_NOT_ALLOWED', message: "Phương thức không được phép." },
  INVALID_DATE: { code: 'INVALID_DATE', message: "Ngày không hợp lệ." },

  // SETTINGS
  SETTINGS_KEY_IS_REQUIRED: { code: 'SETTINGS_KEY_IS_REQUIRED', message: 'Cần có khóa cài đặt.' },
  SETTINGS_STUDENT_MOVING_PROCESS_NOT_ACTIVE: { code: 'SETTINGS_STUDENT_MOVING_PROCESS_NOT_ACTIVE', message: 'Quá trình di chuyển nhân viên không hoạt động.' },

  // AUTH
  AUTH_ERR_AUTH_NOT_LOGIN: { code: 'AUTH_ERR_AUTH_NOT_LOGIN', message: "Lỗi chưa đăng nhập." },
  AUTH_ERR_AUTH_ALREADY_LOGIN: { code: 'AUTH_ERR_AUTH_ALREADY_LOGIN', message: "Lỗi đã đăng nhập rồi." },
  AUTH_ERR_ACCOUNT_NOTREADY: { code: 'AUTH_ERR_ACCOUNT_NOTREADY', message: "Lỗi tài khoản chưa sẵn sàng để hoạt động." },
  AUTH_ERR_ACCOUNT_NOT_HAVE_PERMISSION: { code: 'AUTH_ERR_ACCOUNT_NOT_HAVE_PERMISSION', message: "Tài khoản này không có quyền truy cập hành động này." },
  AUTH_ERR_SECRET_NOT_VALID: { code: 'AUTH_ERR_SECRET_NOT_VALID', message: "Bí mật không hợp lệ." },
  AUTH_ERR_CODE_VERIFY_NOT_VALID: { code: 'AUTH_ERR_CODE_VERIFY_NOT_VALID', message: "Mã xác minh không hợp lệ." },
  AUTH_ERR_SYSTEM_TOKEN_REQUIRE: { code: 'AUTH_ERR_SYSTEM_TOKEN_REQUIRE', message: "System Token là trường bắt buộc." },
  AUTH_ERR_NOT_FOUND: { code: 'AUTH_ERR_NOT_FOUND', message: "Token không được tìm thấy." },
  INACTIVE_TOKEN: { code: 'INACTIVE_TOKEN', message: "Token không hoạt động." },

  //USER
  USER_ADD_FAIL: { code: 'USER_ADD_FAIL', message: "Thêm user thất bại" },
  USER_EDIT_FAIL: { code: 'USER_EDIT_FAIL', message: "Sửa user thất bại" },
  USER_DEL_FAIL: { code: 'USER_DEL_FAIL', message: "Xóa user thất bại" },
  USER_NOT_FOUND: { code: 'USER_NOT_FOUND', message: "Không tìm thấy user" },
  USER_NOT_ACTIVE: { code: 'USER_NOT_ACTIVE', message: "Tài khoản hiện không hoạt động" },
  USER_NOT_HAVE_PERMISSION: { code: 'USER_NOT_HAVE_PERMISSION', message: "Không có quyền đăng nhập" },
  USER_ID_REQUIRED: { code: 'USER_ID_REQUIRED', message: "Vui lòng truyền ID" },
  USER_EMAIL_REQUIRED: { code: 'USER_EMAIL_REQUIRED', message: "Vui lòng nhập e-mail người dùng" },
  USER_REQUIRED: { code: 'USER_REQUIRED', message: "Vui lòng nhập tài khoản người dùng" },
  USER_PHONE_REQUIRED: { code: 'USER_PHONE_REQUIRED', message: "Vui lòng nhập số điện thoại người dùng" },
  USER_PASSWORD_REQUIRED: { code: 'USER_PASSWORD_REQUIRED', message: "Vui lòng nhập mật khẩu" },
  USER_FIRST_NAME_REQUIRED: { code: 'USER_FIRST_NAME_REQUIRED', message: "First name là trường bắt buộc." },
  USER_LAST_NAME_REQUIRED: { code: 'USER_LAST_NAME_REQUIRED', message: "Last name là trường bắt buộc." },
  USER_FULL_NAME_REQUIRED: { code: 'USER_FULL_NAME_REQUIRED', message: "Full name là trường bắt buộc." },
  USER_IS_EXISTED: { code: 'USER_IS_EXISTED', message: "Tài khoản người dùng đã tồn tại" },
  PHONE_IS_EXISTED: { code: 'PHONE_IS_EXISTED', message: "Số điện thoại người dùng đã tồn tại" },

  USER_ERR_ADD_FAIL: { code: 'USER_ERR_ADD_FAIL', message: "Thêm người dùng thất bại." },
  USER_ERR_EDIT_FAIL: { code: 'USER_ERR_EDIT_FAIL', message: "Sửa người dùng thất bại." },
  USER_ERR_EMAIL_EXISTED: { code: 'USER_ERR_EMAIL_EXISTED', message: "E-mail đã tồn tại." },
  USER_ERR_ID_REQUIRED: { code: 'USER_ERR_ID_REQUIRED', message: "ID người dùng là trường bắt buộc." },
  USER_ERR_NOT_FOUND: { code: 'USER_ERR_NOT_FOUND', message: 'Tài khoản không tồn tại.' },
  USER_LOCKED: { code: 'USER_LOCKED', message: 'Tài khoản bị khóa tạm thời.' },
  IMEI_IS_WRONG: { code: 'IMEI_IS_WRONG', message: "Bạn phải đăng nhập với thiết bị đã đăng ký" },
  USER_IMEI_REQUIRED: { code: 'USER_IMEI_REQUIRED', message: "IMEI là trường bắt buộc." },
  // USER_EMAIL_REQUIRED: { code: 'USER_EMAIL_REQUIRED', message: "Vui lòng nhập e-mail" },
  USER_CODE_REQUIRED: { code: 'USER_CODE_REQUIRED', message: 'Vui lòng nhập mã nhân viên.' },
  CODE_HAS_BEEN_REGISTERED: { code: 'CODE_HAS_BEEN_REGISTERED', message: 'Mã nhân viên đã được đăng ký.' },
  USER_EMAIL_HAS_BEEN_REGISTERED: { code: 'USER_EMAIL_HAS_BEEN_REGISTERED', message: 'E-mail đã được đăng ký.' },
  USER_PHONE_HAS_BEEN_REGISTERED: { code: 'USER_PHONE_HAS_BEEN_REGISTERED', message: 'Số điện thoại đã được đăng ký.' },
  USER_CODE_HAS_BEEN_REGISTERED: { code: 'USER_CODE_HAS_BEEN_REGISTERED', message: 'Mã nhân viên đã được đăng ký.' },
  USER_EMAIL_HAS_NOT_BEEN_REGISTERED: { code: 'USER_EMAIL_HAS_NOT_BEEN_REGISTERED', message: 'E-mail nhân viên chưa được đăng ký.' },
  CURRENT_PASSWORD_IS_REQUIRED: { code: 'CURRENT_PASSWORD_IS_REQUIRED', message: "Vui lòng nhập mật khẩu hiện tại." },
  NEW_PASSWORD_IS_REQUIRED: { code: 'NEW_PASSWORD_IS_REQUIRED', message: "Vui lòng nhập mật khẩu mới." },
  PASSWORD_IS_NOT_MATCH: { code: 'PASSWORD_IS_NOT_MATCH', message: "Mật khẩu không trùng khớp." },
  PASSWORD_IS_NOT_TRUE: { code: 'PASSWORD_IS_NOT_TRUE', message: "Mật khẩu không đúng." },

  //STAFF
  STAFF_FIRSTNAME_REQUIRED: { code: 'STAFF_FIRSTNAME_REQUIRED', message: "Vui lòng nhập họ" },
  STAFF_LASTNAME_REQUIRED: { code: 'STAFF_LASTNAME_REQUIRED', message: "Vui lòng nhập tên" },
  STAFF_IMEI_DUPLICATED: { code: 'STAFF_IMEI_DUPLICATED', message: 'Imei nhân viên trùng khớp' },
  STAFF_PASSWORD_IS_NOT_MATCH: { code: 'STAFF_PASSWORD_IS_NOT_MATCH', message: 'Mật khẩu không khớp' },
  STAFF_ID_REQUIRED: { code: 'STAFF_ID_REQUIRED', message: 'Mã nhân viên là bắt buộc' },
  STAFF_NOT_FOUND: { code: 'STAFF_NOT_FOUND', message: 'Không tìm thấy nhân viên' },
  
  //BOOKING
  BOOKING_ID_REQUIRED: { code: 'BOOKING_ID_REQUIRED', message: "ID là trường bắt buộc." },
  BOOKING_NOT_FOUND: { code: 'BOOKING_NOT_FOUND', message: "Đặt hẹn không được tìm thấy." },

  //MEDIA
  MEDIA_ID_REQUIRED: { code: 'MEDIA_ID_REQUIRED', message: "ID là trường bắt buộc." },
  MEDIA_TITLE_REQUIRED: { code: 'MEDIA_TITLE_REQUIRED', message: "Tiêu đề media là trường bắt buộc." },
  MEDIA_OBJECT_NOT_FOUND: { code: 'MEDIA_OBJECT_NOT_FOUND', message: "Media không được tìm thấy." },
  MEDIA_UPLOAD_FAILDED: { code: 'MEDIA_UPLOAD_FAILDED', message: "Tải lên media thất bại." },

  //TAXONOMY
  TAXONOMY_ID_REQUIRED: { code: 'TAXONOMY_ID_REQUIRED', message: "ID là trường bắt buộc." },
  TAXONOMY_TITLE_REQUIRED: { code: 'TAXONOMY_TITLE_REQUIRED', message: "Tiêu đề là trường bắt buộc." },
  TAXONOMY_OBJECT_NOT_FOUND: { code: 'TAXONOMY_OBJECT_NOT_FOUND', message: "Đối tượng phân loại không được tìm thấy." },
  TAXONOMY_ERR_NOT_FOUND: { code: 'TAXONOMY_ERR_NOT_FOUND', message: "Phân loại không được tìm thấy." },

  //POST
  POST_ID_REQUIRED: { code: 'POST_ID_REQUIRED', message: "ID bài viết là trường bắt buộc." },
  POST_TITLE_REQUIRED: { code: 'POST_TITLE_REQUIRED', message: "Tiêu đề bài viết là trường bắt buộc." },
  POST_DESCRIPTION_REQUIRED: { code: 'POST_DESCRIPTION_REQUIRED', message: "Không được để trống nội dung bài viết" },
  POST_OBJECT_NOT_FOUND: { code: 'POST_OBJECT_NOT_FOUND', message: "Đối tượng bài viết không được tìm thấy." },

  // OTHER
  DATE_USE_REQUIRED: { code: 'DATE_USE_REQUIRED', message: "Ngày sử dụng là trường bắt buộc." },

  // ROLE
  ROLE_ERR_ADD_FAIL: { code: 'ROLE_ERR_ADD_FAIL', message: "Thêm vai trò thất bại." },
  ROLE_ERR_EDIT_FAIL: { code: 'ROLE_ERR_EDIT_FAIL', message: "Cập nhật vai trò thất bại." },
  ROLE_ERR_UPDATE_FAIL: { code: 'ROLE_ERR_UPDATE_FAIL', message: "Cập nhật vai trò thất bại." },
  ROLE_ERR_RECORD_EXISTED: { code: 'ROLE_ERR_RECORD_EXISTED', message: "Vai trò đã tồn tại." },
  ROLE_ERR_NOT_FOUND: { code: 'ROLE_ERR_NOT_FOUND', message: "Vai trò không được tìm thấy." },
  ROLE_ERR_ID_REQUIRED: { code: 'ROLE_ERR_ID_REQUIRED', message: "ID Vai trò là trường bắt buộc." },
  ROLE_ERR_TITLE_REQUIRED: { code: 'ROLE_ERR_TITLE_REQUIRED', message: "Tiêu đề là trường bắt buộc." },
  ROLE_ERR_PERMISSION_REQUIRED: { code: 'ROLE_ERR_PERMISSION_REQUIRED', message: "Quyền là trường bắt buộc." },
  ROLE_ID_REQUIRED: { code: 'ROLE_ID_REQUIRED', message: "ID vai trò là trường bắt buộc." },
  ROLE_NAME_REQUIRED: { code: 'ROLE_NAME_REQUIRED', message: "Tên vai trò là trường bắt buộc." },
  ROLE_NOT_FOUND: { code: 'ROLE_NOT_FOUND', message: "Vai trò không được tìm thấy." },

  //CURRENCY
  CURRENCY_ID_REQUIRED: { code: 'CURRENCY_ID_REQUIRED', message: "ID là trường bắt buộc." },
  CURRENCY_TITLE_REQUIRED: { code: 'CURRENCY_TITLE_REQUIRED', message: "Tiêu đề tiền tệ là trường bắt buộc." },
  CURRENCY_CODE_REQUIRED: { code: 'CURRENCY_CODE_REQUIRED', message: "Mã tiền tệ là trường bắt buộc." },
  CURRENCY_NOT_FOUND: { code: 'CURRENCY_NOT_FOUND', message: "Tiền tệ không được tìm thấy." },
  CURRENCY_CODE_DUPLICATED: { code: 'CURRENCY_CODE_DUPLICATED', message: "Mã tiền tệ đã tồn tại." },
  DEFAULT_CURRENCY_NOT_EXISTED: { code: 'DEFAULT_CURRENCY_NOT_EXISTED', message: "Tiền tệ mặc định không tồn tại." },
  DEFAULT_CURRENCY_EXISTED: { code: 'DEFAULT_CURRENCY_EXISTED', message: "Tiền tệ mặc định tồn tại." },
  DEFAULT_CURRENCY_NOT_FOUND: { code: 'DEFAULT_CURRENCY_NOT_FOUND', message: "Tiền tệ mặc định không được tìm thấy." },
  DEFAULT_CURRENCY_NOT_ALLOW: { code: 'DEFAULT_CURRENCY_NOT_ALLOW', message: "Tiền tệ mặc định không được phép thay đổi trạng thái." },

  //AGENCY
  AGENCY_NOT_FOUND: { code: 'AGENCY_NOT_FOUND', message: "Agency không được tìm thấy." },
  AGENCY_ID_REQUIRED: { code: 'AGENCY_ID_REQUIRED', message: "Agency ID là trường bắt buộc." },
  AGENCY_PASSWORD_REQUIRED: { code: 'AGENCY_PASSWORD_REQUIRED', message: "Agency password là trường bắt buộc." },
  AGENCY_CODE_REQUIRED: { code: 'AGENCY_CODE_REQUIRED', message: "Agency code là trường bắt buộc." },
  AGENCY_EMAIL_REQUIRED: { code: 'AGENCY_EMAIL_REQUIRED', message: "Agency email là trường bắt buộc." },
  AGENCY_NAME_REQUIRED: { code: 'AGENCY_NAME_REQUIRED', message: "Agency name là trường bắt buộc." },
  AGENCY_PHONE_REQUIRED: { code: 'AGENCY_PHONE_REQUIRED', message: "Agency phoe là trường bắt buộc." },
  AGENCY_CODE_HAS_BEEN_REGISTERED: { code: 'AGENCY_CODE_HAS_BEEN_REGISTERED', message: "Agency code đã được đăng ký." },
  AGENCY_EMAIL_HAS_BEEN_REGISTERED: { code: 'AGENCY_EMAIL_HAS_BEEN_REGISTERED', message: "Agency email đã được đăng ký." },
  AGENCY_NAME_HAS_BEEN_REGISTERED: { code: 'AGENCY_NAME_HAS_BEEN_REGISTERED', message: "Agency name đã được đăng ký." },
  AGENCY_PHONE_HAS_BEEN_REGISTERED: { code: 'AGENCY_PHONE_HAS_BEEN_REGISTERED', message: "Agency phone đã được đăng ký." },

  // DEVICE
  DEVICE_ID_REQUIRED: { code: 'DEVICE_ID_REQUIRED', message: "ID thiết bị là trường bắt buộc." },
  DEVICE_CODE_REQUIRED: { code: 'DEVICE_CODE_REQUIRED', message: "Mã thiết bị là trường bắt buộc." },
  DEVICE_TITLE_REQUIRED: { code: 'DEVICE_TITLE_REQUIRED', message: "Tên thiết bị là trường bắt buộc." },
  DEVICE_TEMPLATE_REQUIRED: { code: 'DEVICE_TEMPLATE_REQUIRED', message: "Template thiết bị là trường bắt buộc." },
  DEVICE_CODE_EXISTED: { code: 'DEVICE_CODE_EXISTED', message: "Mã thiết bị đã tồn tại." },
  DEVICE_NOT_FOUND: { code: 'DEVICE_NOT_FOUND', message: "Thiết bị thì không được tìm thấy." },
  DEVICE_DEFAULT_EXISTED: { code: 'DEVICE_DEFAULT_EXISTED', message: "Thiết bị mặc định đã tồn tại." },

  //DEPARTMENT
  DEPARTMENT_ID_REQUIRED: { code: 'DEPARTMENT_ID_REQUIRED', message: 'ID phòng là trường bắt buộc.' },
  DEPARTMENT_TITLE_REQUIRED: { code: 'DEPARTMENT_TITLE_REQUIRED', message: 'Tiêu đề phòng là trường bắt buộc.' },
  DEPARTMENT_CODE_REQUIRED: { code: 'DEPARTMENT_CODE_REQUIRED', message: 'Mã phòng ban là trường bắt buộc.' },
  DEPARTMENT_BRANCHS_REQUIRED: { code: 'DEPARTMENT_BRANCHS_REQUIRED', message: 'Danh sách chi nhánh là trường bắt buộc.' },
  DEPARTMENT_CODE_EXISTED: { code: 'DEPARTMENT_CODE_EXISTED', message: "Mã phòng đã tồn tại." },
  DEPARTMENT_NOT_FOUND: { code: 'DEPARTMENT_NOT_FOUND', message: "Phòng ban thì không được tìm thấy." },
  
  // SHIFT
  SHIFT_ID_REQUIRED: { code: 'SHIFT_ID_REQUIRED', message: "ID ca trực là trường bắt buộc." },
  SHIFT_NOT_FOUND: { code: 'SHIFT_NOT_FOUND', message: "Ca trực thì không được tìm thấy." },
  SHIFT_EXISTED: { code: 'SHIFT_EXISTED', message: "Ca trực đã tồn tại." },

  // EXAMINATION
  PATIENT_ID_REQUIRED: { code: 'PATIENT_ID_REQUIRED', message: "Mã bệnh nhân là trường bắt buộc." },
  PATIENT_DATA_REQUIRED: { code: 'PATIENT_DATA_REQUIRED', message: "Dữ liệu bệnh nhân là trường bắt buộc." },
  VISIT_ID_REQUIRED: { code: 'VISIT_ID_REQUIRED', message: "Mã đợt khám là trường bắt buộc." },
  VISIT_DATA_REQUIRED: { code: 'VISIT_DATA_REQUIRED', message: "Dữ liệu đợt khám là trường bắt buộc." },
  MEDIA_PDF_ID_REQUIRED: { code: 'MEDIA_PDF_ID_REQUIRED', message: "File PDF đính kèm là trường bắt buộc." },
  EXAMINATION_RESULT_NOT_FOUND: { code: 'EXAMINATION_RESULT_NOT_FOUND', message: "Kết quả khám bệnh không được tìm thấy." },

  // GROUP
  GROUP_ID_REQUIRED: { code: 'GROUP_ID_REQUIRED', message: "ID nhóm là trường bắt buộc." },
  GROUP_ARR_ID_REQUIRED: { code: 'GROUP_ARR_ID_REQUIRED', message: "Mảng ID nhóm là trường bắt buộc." },
  GROUP_ORDER_REQUIRED: { code: 'GROUP_ORDER_REQUIRED', message: "Thứ tự nhóm là trường bắt buộc." },
  GROUP_TITLE_REQUIRED: { code: 'GROUP_TITLE_REQUIRED', message: "Tên nhóm là trường bắt buộc." },
  GROUP_ORDER_EXISTED: { code: 'GROUP_ORDER_EXISTED', message: "Thứ tự nhóm đã tồn tại." },
  GROUP_NOT_FOUND: { code: 'GROUP_NOT_FOUND', message: "Nhóm thì không được tìm thấy." },
  GROUP_DEFAULT_EXISTED: { code: 'GROUP_DEFAULT_EXISTED', message: "Nhóm mặc định đã tồn tại." },

  // COUNTER
  COUNTER_ID_REQUIRED: { code: 'COUNTER_ID_REQUIRED', message: 'ID quầy là trường bắt buộc.' },
  CUSTOMER_ID_REQUIRED: { code: 'CUSTOMER_ID_REQUIRED', message: 'ID khách hàng là trường bắt buộc.' },
  // PATIENT_ID_REQUIRED: { code: 'PATIENT_ID_REQUIRED', message: 'Mã bệnh nhân là trường bắt buộc.' },
  FULLNAME_PATIENT_REQUIRED: { code: 'FULLNAME_PATIENT_REQUIRED', message: 'Họ tên bệnh nhân là trường bắt buộc.' },
  CUSTOMER_NOT_FOUND: { code: 'CUSTOMER_NOT_FOUND', message: 'Khách hàng không được tìm thấy.' },
  COUNTER_NOT_FOUND: { code: 'COUNTER_NOT_FOUND', message: 'Quầy không được tìm thấy.' },
  COUNTER_TITLE_REQUIRED: { code: 'COUNTER_TITLE_REQUIRED', message: 'Tiêu đề quầy là trường bắt buộc.' },
  COUNTER_CODE_REQUIRED: { code: 'COUNTER_CODE_REQUIRED', message: 'Mã quầy là trường bắt buộc.' },
  COUNTER_CODE_EXISTED: { code: 'COUNTER_CODE_EXISTED', message: "Mã quầy đã tồn tại." },
  // COUNTER_NOT_FOUND: { code: 'COUNTER_NOT_FOUND', message: "Quầy thì không được tìm thấy." },

  // SOUND
  AUDIO_NOT_CREATE: { code: 'AUDIO_NOT_CREATE', message: 'Không thể tạo audio.' },

};

export default ErrorService;
