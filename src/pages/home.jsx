import { lazy, Suspense, useEffect, useState } from "react";
import { AcceptFollowers, ExplorePeople, getFollowers } from "../api/user";
import { LayoutPage } from "../components/Layout/LayoutPage";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Explore from "../components/Fragments/Explore";

const FollowRequest = lazy(() =>
  import("../components/Fragments/FollowRequest")
);

export const HomePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [people, setPeople] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getPost = async (page, size) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://127.0.0.1:8000/api/v1/posts?page=${page}&size=${size}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPosts((prev) =>
        page === 0 ? [...res.data.posts] : [...prev, ...res.data.posts]
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  useEffect(() => {
    if (user) {
      ExplorePeople(setPeople);
      getFollowers(user.username, setFollowers);
    }
  }, [user]);

  const handleAcceptFollowers = (username) => {
    AcceptFollowers(username);
  };

  useEffect(() => {
    page == 0 ? getPost(page, 10) : LoadMorePost();
  }, [page]);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  // useEffect(() => {
  //   LoadMorePost();
  // }, [page]);

  const LoadMorePost = async () => {
    if (loading) return;
    setLoading(true);
    await getPost(page, 7);
  };

  const handleScroll = () => {
    if (loading) return;
    const bottom =
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.scrollHeight;
    if (bottom) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <>
      {user && (
        <LayoutPage user={user}>
          <main className="mt-5">
            <div className="container py-5">
              <div className="row justify-content-between">
                <div className="col-md-8">
                  <h5 className="mb-3">News Feed</h5>
                  {/* {posts.length === 0 && <div>Loading posts...</div>} */}
                  {posts &&
                    posts.length > 0 &&
                    posts.map((post, index) => (
                      <div className="card mb-4" key={`${post.id}-${index}`}>
                        <div className="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                          <h6 className="mb-0">{post.user.full_name}</h6>
                          <small className="text-muted">
                            {post.created_at}
                          </small>
                        </div>
                        <div className="card-body">
                          <div className="card-images mb-2">
                            {post.attachments.map((item) => (
                              <img
                                key={item.id}
                                src={`http://127.0.0.1:8000/storage/${item.storage_path}`}
                                alt="image"
                                className="w-100"
                              />
                            ))}
                          </div>
                          <p className="mb-0 text-muted">
                            <b>
                              <Link to="user-profile.html">
                                {post.user.username}
                              </Link>
                            </b>{" "}
                            {post.caption}
                          </p>
                        </div>
                      </div>
                    ))}
                  {loading && <p>Loading...</p>}
                </div>
                <div className="col-md-4">
                  {followers && (
                    <Suspense fallback={<div>Loading</div>}>
                      <FollowRequest
                        followers={followers}
                        handleClick={handleAcceptFollowers}
                      ></FollowRequest>
                    </Suspense>
                  )}
                  <div className="explore-people">
                    <h6 className="mb-3">Explore People</h6>
                    <div className="explore-people-list">
                      {people.length === 0 && <div>Loading people...</div>}
                      {people &&
                        people.length > 0 &&
                        people.map((user, index) => (
                          <Explore
                            key={`${user.id}-${index}`}
                            username={user.username}
                          ></Explore>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </LayoutPage>
      )}
    </>
  );
};
