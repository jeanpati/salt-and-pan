import { useEffect, useState } from "react";
import { getMyPosts } from "../../services/postService";
import { getAllCategories } from "../../services/categoryService";
import { Link } from "react-router-dom";
import { PostFilterBar } from "../posts/PostFilterBar";
import { Post } from "../posts/Post";

export const MyRecipes = ({ currentUser }) => {
  const [myPosts, setMyPosts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [showChosenCategoryOnly, setChosenCategoryOnly] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMyPosts(currentUser.id).then((myPostsArr) => {
      setMyPosts(myPostsArr);
    });
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

  return (
    <div>
      <PostFilterBar
        setChosenCategoryOnly={setChosenCategoryOnly}
        setSearchTerm={setSearchTerm}
        allCategories={allCategories}
      />
      <div className="posts-container">
        <article className="posts">
          {filteredPosts.map((postObj) => {
            return (
              <Link to={`/posts/${postObj.id}`} key={postObj.id}>
                <Post post={postObj} />
              </Link>
            );
          })}
        </article>
      </div>
    </div>
  );
};
