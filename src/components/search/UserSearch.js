import { UserNav } from "../nav/UserNav";
import { PostList } from "../posts/PostList";

export const UserSearch = () => {
  return (
    <section className="search-page">
      <UserNav />;
      <PostList />;
    </section>
  );
};
