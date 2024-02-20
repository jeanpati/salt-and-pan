import { useEffect, useState } from "react";
import { getAllPosts } from "../../services/postService";
import { Post } from "./Post";
import { getAllCategories } from "../../services/categoryService";
import { PostFilterBar } from "./PostFilterBar";
import { createLike } from "../../services/likesService";
import "./Posts.css";
export const PostList = ({ currentUser }) => {
  const [allPosts, setAllPosts] = useState([]);
  const [publicPosts, setPublicPosts] = useState([]);
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
    const p = allPosts.filter((post) => post.isPrivate === false);
    setPublicPosts(p);
  }, [allPosts]);

  useEffect(() => {
    getAllCategories().then((allCategoriesArr) => {
      setAllCategories(allCategoriesArr);
    });
  }, []);

  useEffect(() => {
    if (showChosenCategoryOnly === "0") {
      setFilteredPosts(publicPosts);
    } else if (showChosenCategoryOnly) {
      const filteredPosts = publicPosts.filter(
        (post) => post.categoryId === parseInt(showChosenCategoryOnly)
      );
      setFilteredPosts(filteredPosts);
    } else {
      setFilteredPosts(publicPosts);
    }
  }, [publicPosts, showChosenCategoryOnly]);

  useEffect(() => {
    const foundPosts = publicPosts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
    setFilteredPosts(foundPosts);
  }, [searchTerm, publicPosts]);

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
      for (const like of postObj.likes) {
        if (parseInt(like?.userId) === parseInt(currentUser.id)) {
          return <button className="liked-btn">Liked!</button>;
        }
      }
      return (
        <button className="like-btn" onClick={handleLike} value={postObj.id}>
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
              <div className="post-card" key={postObj.id}>
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
