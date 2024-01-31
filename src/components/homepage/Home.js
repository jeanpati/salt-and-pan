import { GeneralNav } from "../nav/GeneralNav";
import { PostList } from "../posts/PostList";

import("./Home.css");

export const Home = () => {
  return (
    <section className="home-container">
      <GeneralNav />
      <h1>
        <span>Salt and Pan</span>
      </h1>
      <h2>Popular Posts</h2>
      <PostList />
      <h2>Featured Posts</h2>
    </section>
  );
};
