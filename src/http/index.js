import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:3000/api/todo`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const getTodo = () => api.get();
export const createTodo = (data) => api.post("", data);
export const putTodo = (data) => api.put("", data,console.log(data));
export const delTodo = (id) =>
  api.delete("", {
    data: { id },
  });
