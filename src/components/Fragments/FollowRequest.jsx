const FollowRequest = ({ followers, handleClick }) => {
  const not_accepted = followers.filter((item) => item.is_requested == true);

  return (
    <div className="request-follow mb-4">
      <h6 className="mb-3">Follow Requests</h6>
      <div className="request-follow-list">
        {not_accepted.map((follower) => {
          return (
            <div className="card mb-2" key={follower.id}>
              <div className="card-body d-flex align-items-center justify-content-between p-2">
                <a href={`/profile/${follower.username}`}>@{follower.username}</a>
                <a onClick={() => handleClick(follower.username)} className="btn btn-primary btn-sm">
                  Confirm
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


export default FollowRequest