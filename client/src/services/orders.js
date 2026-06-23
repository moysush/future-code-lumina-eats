import api from "./api";

export const getAllOrders = async () => {
  const res = await api.get("/orders");  
  return res.data;
};

export const updateOrderStatus = async (id, orderStatus) => {
  const res = await api.patch(`/orders/${id}`, { orderStatus });
  return res.data;
};
