import { UserNav } from "../nav/GeneralNav";
import { PostList } from "../posts/PostList";

export const UserSearch = () => {
  return (
    <section className="search-page">
      <UserNav />;
      <PostList />;
    </section>
  );
};
