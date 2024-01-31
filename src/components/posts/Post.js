export const Post = ({ post }) => {
  return (
    <section className="post-card" key={post.id}>
      <div className="topic-card">
        <div className="topic-name">{post.title}</div>
      </div>
      <div className="title-text">
        <img src={post.img_src} alt="" />
      </div>
      <div className="likes">
        <div>Likes</div>
      </div>
    </section>
  );
};
