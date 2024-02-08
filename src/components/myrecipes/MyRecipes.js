import { useEffect, useState } from "react";
import { deletePost, getMyPosts } from "../../services/postService";
import { getAllCategories } from "../../services/categoryService";
import { useNavigate } from "react-router-dom";
import { PostFilterBar } from "../posts/PostFilterBar";
import { Post } from "../posts/Post";

export const MyRecipes = ({ currentUser }) => {
  const [myPosts, setMyPosts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [showChosenCategoryOnly, setChosenCategoryOnly] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const privateLabel = (postObj) => {
    if (postObj.isPrivate === true) {
      return (
        <div>
          <label>Private</label>
        </div>
      );
    }
  };
  const testingLabel = (postObj) => {
    if (postObj.isTesting === true) {
      return (
        <div>
          <label>Testing</label>
        </div>
      );
    }
  };

  const getAndSetPosts = () => {
    getMyPosts(currentUser.id).then((myPostsArr) => {
      setMyPosts(myPostsArr);
    });
  };

  useEffect(() => {
    getAndSetPosts();
  }, [currentUser.id]);

  useEffect(() => {
    getAllCategories().then((allCategoriesArr) => {
      setAllCategories(allCategoriesArr);
    });
  }, []);

  useEffect(() => {
    if (showChosenCategoryOnly === "0") {
      setFilteredPosts(myPosts);
    } else if (showChosenCategoryOnly) {
      const filteredPosts = myPosts.filter(
        (post) => post.categoryId === parseInt(showChosenCategoryOnly)
      );
      setFilteredPosts(filteredPosts);
    } else {
      setFilteredPosts(myPosts);
    }
  }, [myPosts, showChosenCategoryOnly]);

  useEffect(() => {
    const foundPosts = myPosts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
    setFilteredPosts(foundPosts);
  }, [searchTerm, myPosts]);

  const handleDelete = (e) => {
    deletePost(e.target.value).then(() => {
      getAndSetPosts();
    });
  };

  const handleEdit = (e) => {
    navigate(`/posts/edit/${e.target.value}`);
  };

  return (
    <div>
      <button
        className="create-btn"
        onClick={() => {
          navigate("/newpost");
        }}
      >
        Create Recipe
      </button>
      <PostFilterBar
        setChosenCategoryOnly={setChosenCategoryOnly}
        setSearchTerm={setSearchTerm}
        allCategories={allCategories}
      />
      <div className="posts-container">
        <article className="posts">
          {filteredPosts.map((postObj) => {
            return (
              <div className="post-card" key={postObj.id}>
                <Post post={postObj} currentUser={currentUser}></Post>
                {privateLabel(postObj)}
                {testingLabel(postObj)}
                <button
                  className="edit-btn"
                  onClick={handleEdit}
                  value={postObj.id}
                >
                  Edit
                </button>
                <div className="btn-container">
                  <button
                    className="delete-btn"
                    value={postObj.id}
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </article>
      </div>
    </div>
  );
};
