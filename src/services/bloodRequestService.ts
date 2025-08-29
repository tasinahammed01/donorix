import api from "../api";

export interface BloodRequest {
  _id?: string;
  requesterId: string;
  bloodType: string;
  units: number;
  urgency: "low" | "medium" | "high" | "critical";
  hospital: string;
  city: string;
  contactNumber: string;
  additionalNotes?: string;
  status: "pending" | "accepted" | "completed" | "cancelled";
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBloodRequestData {
  bloodType: string;
  units: number;
  urgency: "low" | "medium" | "high" | "critical";
  hospital: string;
  city: string;
  contactNumber: string;
  additionalNotes?: string;
}

/**
 * Create a new blood request
 */
export const createBloodRequest = async (requestData: CreateBloodRequestData): Promise<BloodRequest> => {
  const response = await api.post("/blood-requests", requestData);
  return response.data;
};

/**
 * Get all blood requests (for admin or based on user role)
 */
export const getBloodRequests = async (): Promise<BloodRequest[]> => {
  const response = await api.get("/blood-requests");
  return response.data;
};

/**
 * Get blood requests by user ID
 */
export const getUserBloodRequests = async (userId: string): Promise<BloodRequest[]> => {
  const response = await api.get(`/blood-requests/user/${userId}`);
  return response.data;
};

/**
 * Update blood request status
 */
export const updateBloodRequestStatus = async (
  requestId: string, 
  status: BloodRequest["status"]
): Promise<BloodRequest> => {
  const response = await api.patch(`/blood-requests/${requestId}/status`, { status });
  return response.data;
};

/**
 * Delete a blood request
 */
export const deleteBloodRequest = async (requestId: string): Promise<void> => {
  await api.delete(`/blood-requests/${requestId}`);
}; 