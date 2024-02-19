import { useEffect, useState } from "react";
import { getAllPosts } from "../../services/postService";
import { Post } from "../posts/Post";
import("./Home.css");

export const Carousel = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getAndSetPosts = () => {
    getAllPosts().then((allPostsArr) => {
      setAllPosts(allPostsArr);
    });
  };

  const infiniteScroll = () => {
    if (currentIndex === popularPosts.length - 1) {
      return setCurrentIndex(0);
    }
    return setCurrentIndex(currentIndex + 1);
  };

  const next = () => {
    if (currentIndex < popularPosts.length - 1) {
      setCurrentIndex((index) => index + 1);
    }
  };
  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((index) => index - 1);
    }
  };

  useEffect(() => {
    getAndSetPosts();
  }, []);

  useEffect(() => {
    const popular = allPosts.filter((post) => post.likes.length > 3);
    setPopularPosts(popular);
  }, [allPosts]);

  useEffect(() => {
    const interval = setInterval(() => {
      infiniteScroll();
    }, 8000);

    return () => clearInterval(interval);
  });

  return (
    <div className="carousel-wrapper">
      <button className="btn-secondary left-arrow" onClick={prev}>
        &lt;
      </button>
      <div className="carousel-container">
        {popularPosts.map((post, index) => {
          return (
            <div
              className="carousel-item"
              style={{ transform: `translate(-${currentIndex * 100}%)` }}
              key={index}
            >
              <Post post={post} />
            </div>
          );
        })}
      </div>
      <button className="btn-secondary right-arrow" onClick={next}>
        &gt;
      </button>
    </div>
  );
};
