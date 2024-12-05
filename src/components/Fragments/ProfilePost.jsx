export const ProfilePost = ({user}) => {
  
  if (
    (!user.is_your_account) ||
    (user.is_private && user.following_status == "requested") ||
    (user.is_private && user.following_status == "not-following" && user.is_your_account == false) 
  ) {
    return (
      <div className="card py-4">
        <div className="card-body text-center">
          &#128274; This account is private
        </div>
      </div>
    );
  } else {
    return (
      <div className="row justify-content-center">
        {user &&
          user.posts.map((post, index) => {
            return (
              <div className="col-md-4" key={`${post.id}-${index}`}>
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="card-images mb-2">
                      {post.attachments.map((item, index) => {
                        return (
                          <img
                            src={`http://127.0.0.1:8000/storage/${item.storage_path}`}
                            key={`${item.id}-${index}`}
                            alt="image"
                            className="w-100"
                          />
                        );
                      })}
                    </div>
                    <p className="mb-0 text-muted">{post.caption}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
};
