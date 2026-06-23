import api from "./api";

export const getAllCustomers = async () => {
  const res = await api.get("/users");
  return res.data;
};
