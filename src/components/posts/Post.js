import { Link } from "react-router-dom";

export const Post = ({ post }) => {
  const likes = () => {
    if (post.likes?.length > 1) {
      return <div>{post.likes?.length} Likes</div>;
    } else if (post.likes?.length === 1) {
      return <div>{post.likes?.length} Like</div>;
    }
  };
  return (
    <section key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
      <div className="image">
        <img src={post.img_src} alt="" />
      </div>
      <div className="likes">{likes()}</div>
    </section>
  );
};
