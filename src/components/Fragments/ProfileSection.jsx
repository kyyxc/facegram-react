import { FollowButton } from "./Follow.";
import { ProfileDropdown } from "./ProfileDropdown";

export const ProfileSection = ({
  user,
  followers,
  following,
  username,
  status,
  setStatus,
  isMyAccount
}) => {
  return (
    <div className="px-5 py-4 bg-light mb-4 d-flex align-items-center justify-content-between">
      <div>
        <div className="d-flex align-items-center gap-2 mb-1">
          <h5 className="mb-0">{user.full_name}</h5>
          <span>@{user.username}</span>
        </div>
        <small className="mb-0 text-muted">{user.bio}</small>
      </div>
      <div>
        {user && (
          <FollowButton
            is_my_account={user.is_your_account}
            username={username}
            status={status}
            setStatus={setStatus}
            isMyAccount={isMyAccount}
          ></FollowButton>
        )}

        <div className="d-flex gap-3">
          <div>
            <div className="profile-label">
              <b>{user.posts_count}</b> posts
            </div>
          </div>
          <ProfileDropdown user={user} followers={followers} />
          <ProfileDropdown user={user} following={following} />
        </div>
      </div>
    </div>
  );
};
