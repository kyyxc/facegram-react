const Explore = ({username}) => {
  return (
    <div className="card mb-2">
      <div className="card-body p-2">
        <a href={`/profile/${username}`}>@{username}</a>
      </div>
    </div>
  );
};

export default Explore;
