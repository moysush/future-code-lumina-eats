import api from "./api";

export const getFood = async () => {
  const res = await api.get("/foods");
  return res.data;
};

export const createFood = async (foodData) => {
  const res = await api.post("/foods", foodData);
  return res.data;
};

export const updateFood = async (id, foodData) => {
  const res = await api.put(`/foods/${id}`, foodData);
  return res.data;
};

export const deleteFood = async (id) => {
  const res = await api.delete(`/foods/${id}`);
  return res.data;
};
