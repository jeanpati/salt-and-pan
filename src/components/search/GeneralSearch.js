import { GeneralNav } from "../nav/GeneralNav";
import { PostList } from "../posts/PostList";

export const GeneralSearch = () => {
  return (
    <section className="search-page">
      <GeneralNav />;
      <PostList />;
    </section>
  );
};
