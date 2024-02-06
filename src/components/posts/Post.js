export const Post = ({ post }) => {
  return (
    <section key={post.id}>
      <div>
        <div className="title">{post.title}</div>
      </div>
      <div className="image">
        <img src={post.img_src} alt="" />
      </div>
      <div className="likes">
        <div>Likes</div>
      </div>
    </section>
  );
};
