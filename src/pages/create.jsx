import { useEffect, useState } from "react";
import { LayoutPage } from "../components/Layout/LayoutPage";
import { AddPost } from "../api/post";
import { useNavigate } from "react-router-dom";

export const CreatePostPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [images, setImage] = useState();
  const formData = new FormData();
  const [failedCaption, setFailedCaption] = useState();
  const [failedData, setFailedData] = useState();
  const navigate = useNavigate()

  useEffect(() => {
    console.log(images);
  }, [images]);

  const handleFileUpload = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      setImage([...selectedFiles]);
    }

    formData.append("attachments", images);
  };

  const handleAddPost = (e) => {
    e.preventDefault();
    setFailedData("");
    setFailedCaption("");

    const data = {
      caption: e.target.caption.value,
      attachments: images,
    };

    AddPost(data, (res) => {
      console.log(res);

      if (res?.errors) {
        if (res?.errors?.caption) setFailedCaption(res.errors.caption[0]);
      } else {
        setFailedData(res.message);
      }
    }, navigate, user.username);
  };

  return (
    <LayoutPage user={user}>
      <main className="mt-5">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-5">
              <div className="card">
                <div className="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                  <h5 className="mb-0">Create new post</h5>
                </div>
                <div className="card-body">
                  <form encType="multipart/form-data" onSubmit={handleAddPost}>
                    <div className="mb-2">
                      <label htmlFor="caption">Caption</label>
                      <textarea
                        className="form-control"
                        name="caption"
                        id="caption"
                        cols="30"
                        rows="3"
                      ></textarea>
                    </div>
                    {failedCaption && <p>{failedCaption}</p>}
                    <div className="mb-3">
                      <label htmlFor="attachments">Image(s)</label>
                      <input
                        type="file"
                        className="form-control"
                        id="attachments"
                        name="attachments"
                        multiple
                        onChange={handleFileUpload}
                      />
                    </div>
                    {failedData && <p>{failedData}</p>}
                    <button type="submit" className="btn btn-primary w-100">
                      Share
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutPage>
  );
};
