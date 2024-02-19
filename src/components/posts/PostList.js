import { useEffect, useState } from "react";
import { getAllPosts } from "../../services/postService";
import { Post } from "./Post";
import { getAllCategories } from "../../services/categoryService";
import { PostFilterBar } from "./PostFilterBar";
import { createLike } from "../../services/likesService";
import "./Posts.css";
export const PostList = ({ currentUser }) => {
  const [allPosts, setAllPosts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [showChosenCategoryOnly, setChosenCategoryOnly] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const getAndSetPosts = () => {
    getAllPosts().then((allPostsArr) => {
      setAllPosts(allPostsArr);

      //   for (const post of allPosts) {
      //     if (post.isPrivate === true) {
      //       allPosts.splice(post);
      //     }
      //   }
    });
  };

  useEffect(() => {
    getAndSetPosts();
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

  const handleLike = (e) => {
    const likedPost = {
      postId: parseInt(e.target.value),
      userId: currentUser.id,
    };
    createLike(likedPost).then(() => {
      getAndSetPosts();
    });
  };

  const likeButton = (postObj) => {
    if (currentUser?.id) {
      return (
        <button onClick={handleLike} value={postObj.id}>
          Like
        </button>
      );
    } else {
      return "";
    }
  };

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
              <div key={postObj.id}>
                <Post post={postObj} currentUser={currentUser} />
                {likeButton(postObj)}
              </div>
            );
          })}
        </article>
      </div>
    </div>
  );
};
