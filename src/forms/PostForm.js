import { useEffect, useState } from "react";
import "./Form.css";
import { getAllCategories } from "../services/categoryService";
import { createPost } from "../services/postService";
import { useNavigate } from "react-router-dom";
export const PostForm = ({ currentUser }) => {
  const [post, setPost] = useState({
    title: "",
    body: "",
    isTesting: false,
    isPrivate: false,
    img_src: "",
    categoryId: 0,
  });
  const [allCategories, setAllCategories] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    getAllCategories().then((allCategoriesArr) => {
      setAllCategories(allCategoriesArr);
    });
  }, []);

  const handleSave = () => {
    if (post.title && post.body && post.categoryId && post.img_src) {
      const newPost = {
        title: post.title,
        body: post.body,
        isTesting: post.isTesting,
        isPrivate: post.isPrivate,
        img_src: post.img_src,
        created: new Date(),
        userId: currentUser.id,
        categoryId: post.categoryId,
      };
      createPost(newPost).then(navigate("/myrecipes"));
    } else {
      window.alert("Please complete all fields");
    }
  };

  return (
    <form>
      <h2>Create Recipe</h2>
      <fieldset>
        <div className="form-group">
          <select
            className="form-control"
            onChange={(e) => {
              const copy = { ...post };
              copy.categoryId = e.target.value;
              setPost(copy);
            }}
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
            placeholder="Enter Title"
            onChange={(e) => {
              const copy = { ...post };
              copy.title = e.target.value;
              setPost(copy);
            }}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label>Image Link</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter link to image"
            onChange={(e) => {
              const copy = { ...post };
              copy.img_src = e.target.value;
              setPost(copy);
            }}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label>Body</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your recipe"
            onChange={(e) => {
              const copy = { ...post };
              copy.body = e.target.value;
              setPost(copy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>
            Make Public :
            <input
              type="checkbox"
              className="form-control"
              onChange={(e) => {
                const copy = { ...post };
                copy.isPrivate = e.target.checked;
                setPost(copy);
              }}
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
              onChange={(e) => {
                const copy = { ...post };
                copy.isTesting = e.target.checked;
                setPost(copy);
              }}
            />
          </label>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <button onClick={handleSave}>Save</button>
        </div>
      </fieldset>
    </form>
  );
};
