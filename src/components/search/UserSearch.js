import { PostList } from "../posts/PostList";
import logo from "/Users/jean/workspace/salt-and-pan/src/assets/saltandpanlogo.png";
import "./Search.css";

export const UserSearch = () => {
  return (
    <section className="search-page">
      <div className="search-header">
        <h1>Search</h1>
        <img className="search-logo" src={logo} alt="" />
      </div>
      <PostList />
    </section>
  );
};
