import { PostList } from "../posts/PostList";

import("./Home.css");

export const GeneralHome = () => {
  return (
    <section className="home-container">
      <h1>
        <span>Salt and Pan</span>
      </h1>
      <h2>Popular Posts</h2>
      <PostList />
      <h2>Featured Posts</h2>
    </section>
  );
};
