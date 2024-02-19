import { useEffect, useState } from "react";
import { getAllCategories } from "../services/categoryService";
import { editPost, getPostById } from "../services/postService";
import { useNavigate, useParams } from "react-router-dom";
import "./Form.css";

export const EditPostForm = ({ currentUser }) => {
  const [post, setPost] = useState({});
  const [allCategories, setAllCategories] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getPostById(id).then((data) => {
      const p = data;
      setPost(p);
    });
  }, [id]);

  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories().then((allCategoriesArr) => {
      setAllCategories(allCategoriesArr);
    });
  }, []);

  const handleSave = (e) => {
    e.preventDefault();

    if (post.title && post.body && post.categoryId && post.img_src) {
      const editedPost = {
        id: id,
        title: post?.title,
        body: post.body,
        isTesting: post.isTesting,
        isPrivate: post.isPrivate,
        img_src: post.img_src,
        created: post.created,
        lastEdited: new Date(),
        userId: currentUser.id,
        categoryId: parseInt(post.categoryId),
      };
      editPost(editedPost).then(navigate("/myrecipes"));
    } else {
      window.alert("Please make sure all fields are completed");
    }
  };

  const handleInputChange = (e) => {
    const stateCopy = { ...post };
    stateCopy[e.target.name] = e.target.value;
    setPost(stateCopy);
  };

  const handleCheckbox = (e) => {
    const stateCopy = { ...post };
    stateCopy[e.target.name] = e.target.checked;
    setPost(stateCopy);
  };

  return (
    <form className="form-wrapper">
      <h2>Edit Recipe</h2>
      <fieldset>
        <div className="form-group">
          <select
            className="form-control"
            name="categoryId"
            onChange={handleInputChange}
            value={post?.categoryId ? post.categoryId : ""}
            required
          >
            <option value="0">Set category</option>$
            {allCategories.map((catObj) => {
              return (
                <option key={catObj.id} value={catObj.id}>
                  {catObj.name}
                </option>
              );
            })}
          </select>
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            placeholder="Enter Title"
            onChange={handleInputChange}
            value={post?.title ? post.title : ""}
            required
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label>Image Link</label>
          <input
            type="text"
            className="form-control"
            name="img_src"
            placeholder="Enter link to image"
            onChange={handleInputChange}
            value={post?.img_src ? post.img_src : ""}
            required
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label>Body</label>
          <textarea
            type="text"
            className="form-control body"
            name="body"
            placeholder="Enter your recipe"
            onChange={handleInputChange}
            value={post?.body ? post.body : ""}
            required
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label>
            Make Private :
            <input
              type="checkbox"
              className="form-control"
              name="isPrivate"
              checked={post?.isPrivate ? post.isPrivate : ""}
              onChange={handleCheckbox}
            />
          </label>
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label>
            Mark As Testing :
            <input
              type="checkbox"
              className="form-control"
              name="isTesting"
              checked={post?.isTesting ? post.isTesting : ""}
              onChange={handleCheckbox}
            />
          </label>
        </div>
      </fieldset>

      <fieldset>
        <div className="form-btn-container">
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </fieldset>
    </form>
  );
};
