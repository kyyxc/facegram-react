import axios from "axios";

const ax = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

const token = localStorage.getItem("token");

export const GetUserProfile = async (username, setUser) => {
  try {
    const res = await ax.get(`/v1/users/${username}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setUser(res.data.data);
  } catch (err) {
    console.log(err);
  }
};

export const ExplorePeople = async (setUser) => {
  try {
    const res = await ax.get("/v1/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUser(res.data.users);
  } catch (err) {
    console.log(err);
  }
};

export const getFollowers = async (username, setFollowers) => {
  try {
    const res = await ax.get(`/v1/users/${username}/followers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setFollowers(res.data.followers);
  } catch (err) {
    console.log(err);
  }
};

export const getFollowing = async (username, setFollowing) => {
  try {
    const res = await ax.get(`/v1/users/${username}/following`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setFollowing(res.data.following);
  } catch (err) {
    console.log(err);
  }
};

export const AcceptFollowers = async (username) => {
  try {
    await ax.put(
      `/v1/users/${username}/accept`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    // setPeople(prev => prev.filter(item => {}));
  } catch (err) {
    console.log(err);
  }
};

export const Follow = async (username, setStatus, setFollowersCount) => {
  try {
    const res = await ax.post(
      `/v1/users/${username}/follow`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setStatus(res.data.status);
    if (res.data.status == "following") {
      setFollowersCount((prev) => prev + 1);
    }
  } catch (err) {
    console.log(err);
  }
};

export const Unfollow = async (
  username,
  setStatus,
  setFollowersCount,
  status
) => {
  try {
    await ax.delete(`v1/users/${username}/unfollow`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setStatus("not-following");
    if (status != "requested") {
      setFollowersCount((prev) => prev - 1);
    }
  } catch (err) {
    console.log(err);
  }
};
