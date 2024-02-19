import { useEffect, useState } from "react";
import { deletePost, getMyPosts } from "../../services/postService";
import { getAllCategories } from "../../services/categoryService";
import { useNavigate } from "react-router-dom";
import { PostFilterBar } from "../posts/PostFilterBar";
import { Post } from "../posts/Post";
import "./MyRecipes.css";
import logo from "/Users/jean/workspace/salt-and-pan/src/assets/saltandpanlogo.png";

export const MyRecipes = ({ currentUser }) => {
  const [myPosts, setMyPosts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [showChosenCategoryOnly, setChosenCategoryOnly] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const privateLabel = (postObj) => {
    if (postObj.isPrivate === true) {
      return <label className="label">Private</label>;
    }
  };
  const testingLabel = (postObj) => {
    if (postObj.isTesting === true) {
      return <label className="label">Testing</label>;
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
    if (window.confirm("Are you sure?")) {
      deletePost(e.target.value).then(() => {
        getAndSetPosts();
      });
    }
  };

  const handleEdit = (e) => {
    navigate(`/posts/edit/${e.target.value}`);
  };

  return (
    <div className="myrecipes-container">
      <div className="myrecipes-header">
        <h1>My Recipes</h1>
        <img className="myrecipes-logo" src={logo} alt="" />
      </div>
      <PostFilterBar
        setChosenCategoryOnly={setChosenCategoryOnly}
        setSearchTerm={setSearchTerm}
        allCategories={allCategories}
      />
      <div className="posts-container">
        <div className="create-btn-container">
          <button
            className="create-btn"
            onClick={() => {
              navigate("/newpost");
            }}
          >
            Create Recipe
          </button>
        </div>
        <article className="posts">
          {filteredPosts.map((postObj) => {
            return (
              <div className="post-card" key={postObj.id}>
                <Post post={postObj} currentUser={currentUser}></Post>
                <div className="label-container">
                  {testingLabel(postObj)}
                  {privateLabel(postObj)}
                </div>
                <div className="btn-container">
                  <button
                    className="edit-btn"
                    onClick={handleEdit}
                    value={postObj.id}
                  >
                    Edit
                  </button>
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
