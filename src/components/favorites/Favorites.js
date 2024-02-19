import { useEffect, useState } from "react";
import { deleteLike, getLikesByUserId } from "../../services/likesService";
import { getAllCategories } from "../../services/categoryService";
import { PostFilterBar } from "../posts/PostFilterBar";
import { Post } from "../posts/Post";
import "./Favorites.css";
import logo from "/Users/jean/workspace/salt-and-pan/src/assets/saltandpanlogo.png";

export const Favorites = ({ currentUser }) => {
  const [favoritePosts, setFavoritePosts] = useState([]);
  const [likes, setLikes] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [showChosenCategoryOnly, setChosenCategoryOnly] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getLikesByUserId(currentUser.id).then((favoritesArr) => {
      setFavoritePosts(favoritesArr.map((f) => f.post));
    });
  }, [currentUser, likes]);

  const getAndSetLikes = () => {
    getLikesByUserId(currentUser.id).then((likes) => {
      setLikes(likes);
    });
  };

  useEffect(() => {
    getAndSetLikes();
  }, [currentUser]);

  useEffect(() => {
    getAllCategories().then((allCategoriesArr) => {
      setAllCategories(allCategoriesArr);
    });
  }, []);

  useEffect(() => {
    if (showChosenCategoryOnly === "0") {
      setFilteredPosts(favoritePosts);
    } else if (showChosenCategoryOnly) {
      const filteredPosts = favoritePosts.filter(
        (post) => post.categoryId === parseInt(showChosenCategoryOnly)
      );
      setFilteredPosts(filteredPosts);
    }
  }, [favoritePosts, showChosenCategoryOnly]);

  useEffect(() => {
    const foundPosts = favoritePosts.filter((post) =>
      post.title?.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
    setFilteredPosts(foundPosts);
  }, [searchTerm, favoritePosts]);

  const handleRemove = (e) => {
    if (window.confirm("Are you sure?")) {
      for (const like of likes) {
        if (like.postId === parseInt(e.target.value)) {
          deleteLike(like.id).then(() => {
            getAndSetLikes();
          });
        }
      }
    }
  };

  return (
    <div>
      <div className="favorites-header">
        <h1>Favorites</h1>
        <img className="favorites-logo" src={logo} alt="" />
      </div>
      <PostFilterBar
        setChosenCategoryOnly={setChosenCategoryOnly}
        setSearchTerm={setSearchTerm}
        allCategories={allCategories}
      />
      <div className="posts-container">
        <article className="posts">
          {filteredPosts.map((postObj) => {
            return (
              <div className="post-card" key={postObj.id} post={postObj}>
                <Post post={postObj}></Post>
                <div className="btn-container">
                  <button
                    className="remove-btn"
                    value={postObj.id}
                    onClick={handleRemove}
                  >
                    Remove
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
