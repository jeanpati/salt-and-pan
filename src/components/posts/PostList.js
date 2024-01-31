import { useEffect, useState } from "react";
import { getAllPosts } from "../../services/postService";
import { Post } from "./Post";
import { getAllCategories } from "../../services/categoryService";
import { PostFilterBar } from "./PostFilterBar";

export const PostList = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [showChosenCategoryOnly, setChosenCategoryOnly] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllPosts().then((allPostsArr) => {
      setAllPosts(allPostsArr);
    });
  }, []);

  useEffect(() => {
    getAllCategories().then((allCategoriesArr) => {
      setAllCategories(allCategoriesArr);
    });
  }, []);

  useEffect(() => {
    if (showChosenCategoryOnly === "0") {
      setFilteredPosts(allPosts);
    } else if (showChosenCategoryOnly) {
      const filteredPosts = allPosts.filter(
        (post) => post.categoryId === parseInt(showChosenCategoryOnly)
      );
      setFilteredPosts(filteredPosts);
    } else {
      setFilteredPosts(allPosts);
    }
  }, [allPosts, showChosenCategoryOnly]);

  useEffect(() => {
    const foundPosts = allPosts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
    setFilteredPosts(foundPosts);
  }, [searchTerm, allPosts]);

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
            return <Post post={postObj} key={postObj.id} />;
          })}
        </article>
      </div>
    </div>
  );
};
