/**
 * @copyright 2024 @ Clinic Management System
 * @author assistant
 * @create 2024/04/10 12:00
 * @update 2024/04/10 12:00
 * @file api/services/ErrorService.ts
 */
'use strict';

export const ErrorService = {
  // SYSTEM
  SYSTEM_ERROR: { code: 'SYS001', message: 'Lỗi hệ thống' },
  SYSTEM_SESSION_EXPIRED: { code: 'SYS002', message: 'Phiên làm việc đã hết hạn.' },
  SYSTEM_TOKEN_REQUIRED: { code: 'SYS003', message: 'Mã xác thực là trường bắt buộc.' },
  SYSTEM_TOKEN_INVALID: { code: 'SYS004', message: 'Mã xác thực không hợp lệ.' },
  SYSTEM_CONNECTION_ERROR: { code: 'SYS005', message: 'Lỗi kết nối.' },

  // USER
  USER_NOT_FOUND: { code: 'USER001', message: 'Không tìm thấy người dùng.' },
  USER_INVALID_PASSWORD: { code: 'USER002', message: 'Mật khẩu không đúng.' },
  USER_ACCOUNT_LOCKED: { code: 'USER003', message: 'Tài khoản đã bị khóa.' },
  USER_EMAIL_EXISTS: { code: 'USER004', message: 'Email đã tồn tại.' },
  USER_PHONE_EXISTS: { code: 'USER005', message: 'Số điện thoại đã tồn tại.' },
  USER_NO_PERMISSION: { code: 'USER006', message: 'Không có quyền truy cập.' },

  // PATIENT
  PATIENT_NOT_FOUND: { code: 'PAT001', message: 'Không tìm thấy bệnh nhân.' },
  PATIENT_INFO_INCOMPLETE: { code: 'PAT002', message: 'Thông tin bệnh nhân không đầy đủ.' },
  PATIENT_DUPLICATE: { code: 'PAT003', message: 'Hồ sơ bệnh nhân bị trùng lặp.' },

  // APPOINTMENT
  APPOINTMENT_NOT_FOUND: { code: 'APT001', message: 'Không tìm thấy lịch hẹn.' },
  APPOINTMENT_INVALID_TIME: { code: 'APT002', message: 'Thời gian hẹn không hợp lệ.' },
  APPOINTMENT_CONFLICT: { code: 'APT003', message: 'Lịch hẹn bị trùng.' },

  // EXAMINATION
  EXAM_RESULT_NOT_FOUND: { code: 'EXM001', message: 'Không tìm thấy kết quả khám.' },
  EXAM_INFO_INCOMPLETE: { code: 'EXM002', message: 'Thiếu thông tin đợt khám.' },
  EXAM_CREATE_ERROR: { code: 'EXM003', message: 'Lỗi khi tạo phiếu khám.' },

  // PAYMENT
  PAYMENT_PROCESSING_ERROR: { code: 'PAY001', message: 'Lỗi xử lý thanh toán.' },
  PAYMENT_INVOICE_NOT_FOUND: { code: 'PAY002', message: 'Không tìm thấy hóa đơn.' },
  PAYMENT_METHOD_INVALID: { code: 'PAY003', message: 'Phương thức thanh toán không hợp lệ.' },

  // MEDICATION
  MED_NOT_FOUND: { code: 'MED001', message: 'Thuốc không tồn tại trong kho.' },
  MED_INSUFFICIENT: { code: 'MED002', message: 'Số lượng thuốc không đủ.' },
  MED_UPDATE_ERROR: { code: 'MED003', message: 'Lỗi cập nhật tồn kho thuốc.' },

  // STAFF
  STAFF_SHIFT_ERROR: { code: 'STF001', message: 'Lỗi phân ca làm việc.' },
  STAFF_SHIFT_CONFLICT: { code: 'STF002', message: 'Trùng lặp ca trực.' },
  STAFF_DEPARTMENT_MISMATCH: { code: 'STF003', message: 'Nhân viên không thuộc phòng ban.' },

  // EQUIPMENT
  EQUIP_NOT_FOUND: { code: 'EQP001', message: 'Thiết bị không tồn tại.' },
  EQUIP_CODE_EXISTS: { code: 'EQP002', message: 'Mã thiết bị đã tồn tại.' },
  EQUIP_UPDATE_ERROR: { code: 'EQP003', message: 'Lỗi cập nhật trạng thái thiết bị.' },

  // REPORT
  REPORT_DATA_INCOMPLETE: { code: 'RPT001', message: 'Dữ liệu báo cáo không đầy đủ.' },
  REPORT_GENERATE_ERROR: { code: 'RPT002', message: 'Lỗi tạo báo cáo.' },
  REPORT_INVALID_DATE_RANGE: { code: 'RPT003', message: 'Thời gian thống kê không hợp lệ.' },

  // DOCUMENT
  DOC_NOT_FOUND: { code: 'DOC001', message: 'Tài liệu không tìm thấy.' },
  DOC_UPLOAD_ERROR: { code: 'DOC002', message: 'Lỗi tải lên tài liệu.' },
  DOC_FORMAT_UNSUPPORTED: { code: 'DOC003', message: 'Định dạng tài liệu không hỗ trợ.' },

  // ACCESS CONTROL
  ACCESS_ROLE_NOT_FOUND: { code: 'ACS001', message: 'Vai trò không tồn tại.' },
  ACCESS_INSUFFICIENT_PERMISSION: { code: 'ACS002', message: 'Không đủ quyền để thực hiện hành động.' },
  ACCESS_UPDATE_ERROR: { code: 'ACS003', message: 'Lỗi cập nhật quyền truy cập.' },

  // DEPARTMENT
  DEPT_NOT_FOUND: { code: 'DPT001', message: 'Phòng/khoa không tồn tại.' },
  DEPT_CODE_EXISTS: { code: 'DPT002', message: 'Mã phòng/khoa đã tồn tại.' },
  DEPT_STAFF_ASSIGN_ERROR: { code: 'DPT003', message: 'Lỗi phân bổ nhân viên vào phòng/khoa.' },

  // SERVICE
  SERVICE_NOT_FOUND: { code: 'SRV001', message: 'Dịch vụ không tồn tại.' },
  SERVICE_CODE_EXISTS: { code: 'SRV002', message: 'Mã dịch vụ đã tồn tại.' },
  SERVICE_PRICE_UPDATE_ERROR: { code: 'SRV003', message: 'Lỗi cập nhật giá dịch vụ.' },

  // COMMUNICATION
  COMM_NOTIFICATION_ERROR: { code: 'COM001', message: 'Lỗi gửi thông báo.' },
  COMM_EMAIL_ERROR: { code: 'COM002', message: 'Lỗi gửi email.' },
  COMM_SMS_ERROR: { code: 'COM003', message: 'Lỗi gửi SMS.' },
};

export default ErrorService;