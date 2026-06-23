import api from "./api";

export const getAllCustomers = async () => {
  const res = await api.get("/users");
  console.log(res.data);

  return res.data;
};
