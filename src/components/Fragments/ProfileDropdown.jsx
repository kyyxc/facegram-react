import { ProfileList } from "./ProfileList";

export const ProfileDropdown = ({ user, followers, following }) => {
  if (followers) {
    return (
      <div className="profile-dropdown">
        <div className="profile-label">
          <p>
            <b>{user.followers_count}</b> followers
          </p>
        </div>
        <ProfileList follow={followers}></ProfileList>
      </div>
    );
  } else if (following) {
    return (
      <div className="profile-dropdown">
        <div className="profile-label">
          <p>
            <b>{user.following_count}</b> following
          </p>
        </div>
        <ProfileList follow={following}></ProfileList>
      </div>
    );
  }
};
