/**
 * @file Business constants & interfaces
 * @module constants/biz
 */

export enum Gender {
  FEMALE = 0,
  MALE = 1,
}

export enum UserStatus {
  INACTIVE = 0,
  ACTIVE = 1,
  SUSPENDED = 2,
}

export enum UserRole {
  PATIENT = 0,
  ADMIN = 1,
  DOCTOR = 2,
  RECEPTIONIST = 3
}

// ... (Các enum và const khác từ mẫu của bạn)

// config/constants.ts
type SizeConfig = {
  width: number | 'auto';
  height: number | 'auto';
  name: string;
  type: string;
};

export const UPLOAD: {
  EXTENSION: string[];
  AVATAR: {
    width: number;
    height: number;
    name: string;
  };
  SIZES: SizeConfig[];
  PATH_FOLDER: string;
} = {
  EXTENSION: [".png", ".jpg", ".jpeg", ".gif"],
  AVATAR: {
    width: 250,
    height: 250,
    name: "avatar",
  },
  SIZES: [
    {
      width: 1280,
      height: 'auto',
      name: "origin",
      type: "origin",
    },
    {
      width: 300,
      height: 300,
      name: "300x300",
      type: "thumbnail",
    },
    // ... other sizes
  ],
  PATH_FOLDER: process.env.PATH_FOLDER || "./assets/uploads/",
};

