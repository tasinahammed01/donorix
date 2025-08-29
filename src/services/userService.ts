import api from "../api";

export interface UserProfile {
  _id?: string;
  name: string;
  email: string;
  role: "donor" | "recipient" | "admin";
  bloodType?: string;
  phoneNumber?: string;
  city?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateUserProfileData {
  name?: string;
  bloodType?: string;
  phoneNumber?: string;
  city?: string;
}

/**
 * Get user profile by ID
 */
export const getUserProfile = async (userId: string): Promise<UserProfile> => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

/**
 * Update user profile
 */
export const updateUserProfile = async (
  userId: string, 
  updateData: UpdateUserProfileData
): Promise<UserProfile> => {
  const response = await api.patch(`/users/${userId}`, updateData);
  return response.data;
};

/**
 * Get all users (admin only)
 */
export const getAllUsers = async (): Promise<UserProfile[]> => {
  const response = await api.get("/users");
  return response.data;
};

/**
 * Deactivate user account
 */
export const deactivateUser = async (userId: string): Promise<void> => {
  await api.patch(`/users/${userId}/deactivate`);
};

/**
 * Get users by role
 */
export const getUsersByRole = async (role: string): Promise<UserProfile[]> => {
  const response = await api.get(`/users/role/${role}`);
  return response.data;
}; 