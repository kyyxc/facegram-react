import axios from "axios";

const ax = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    Accept: "application/json",
  },
});

const token = localStorage.getItem("token");

export const AddPost = async (data, call, navigate, username) => {
  try {
    await ax.post("/v1/posts", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    navigate(`/profile/${username}`);
  } catch (err) {
    call(err.response.data);
  }
};

export const getPost = async (page, size, setPost, setLoading) => {
  try {
    setLoading(true);
    const res = await ax.get(`v1/posts?page=${page}&size=${size}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    setPost((prev) => [...prev, ...res.data.posts]);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};
