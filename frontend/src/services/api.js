import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const verifyIdentity = async (mosipId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/verify_identity`, {
      mosip_id: mosipId,
      credentials: "mock-credentials",
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const sendSms = async (phoneNumber) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/send_sms`, {
      phone_number: phoneNumber,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const prioritizeBeneficiaries = async (aidCenterLat, aidCenterLon, beneficiaries) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/prioritize_beneficiaries`, {
      aid_center_lat: aidCenterLat,
      aid_center_lon: aidCenterLon,
      beneficiaries: beneficiaries,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};