export const ProfileList = ({follow}) => {
  const following = follow.filter(item => !item.is_requested)
  return (
    <div className="profile-list">
      <div className="card">
        <div className="card-body">
          {following &&
            following.map((follow, index) => (
              <div className="profile-user" key={`${follow.id}-${index}`}>
                <a href={`/profile/${follow.username}`}>
                  @{follow.username}
                </a>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
