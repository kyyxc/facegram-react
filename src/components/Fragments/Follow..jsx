import { Follow } from "../../api/user";

export const FollowButton = ({ status, is_my_account, username, setStatus }) => {
  console.log(is_my_account);
  
  const handleFollow = (username) => {
    Follow(username, setStatus);
    console.log(status);
  };
  if (is_my_account) {
    return (
      <a href="/create" className="btn btn-primary w-100 mb-2">
        + Create new post
      </a>
    );
  } else {
    if (status === "not-following") {
      return (
        <a className="btn btn-primary w-100 mb-2" onClick={() => handleFollow(username)}>
          Follow
        </a>
      );
    } else if (status == "requested") {
      return (
        <a
          href="user-profile-private.html"
          className="btn btn-secondary w-100 mb-2"
        >
          Requested
        </a>
      );
    } else if (status === "following") {
      return (
        <a href="user-profile.html" className="btn btn-secondary w-100 mb-2">
          Following
        </a>
      );
    }
  }
};
