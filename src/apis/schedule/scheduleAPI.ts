import { apiCall } from "../apiCall";

export const createSchedule = async (data) => {
  const res = await apiCall(`/schedule-create`, "POST", data, true);
  alert(res.message);
  return res;
};

export const editSchedule = async (data) => {
  const res = await apiCall(`/user/schedule/update`, "PUT", data, true);
  alert(res.message);
  return res;
};

export const deleteSchedule = async (scheduleId) => {
  const res = await apiCall(`/user/schedule/delete?eventId=${scheduleId}`, "DELETE", null, true);
  alert(res.message);
  return res;
};
