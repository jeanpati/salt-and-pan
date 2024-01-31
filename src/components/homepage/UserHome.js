import { UserNav } from "../nav/UserNav";
import { PostList } from "../posts/PostList";

import("./Home.css");

export const UserHome = () => {
  return (
    <section className="home-container">
      <UserNav />
      <h1>
        <span>Salt and Pan</span>
      </h1>
      <h2>Popular Posts</h2>
      <PostList />
      <h2>Featured Posts</h2>
    </section>
  );
};
