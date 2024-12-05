export const ProfileList = ({follow}) => {
  return (
    <div className="profile-list">
      <div className="card">
        <div className="card-body">
          {follow &&
            follow.map((follow, index) => (
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
