import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../../services/postService";
import { createLike } from "../../services/likesService";

export const PostDetails = ({ currentUser }) => {
  const [clickedPost, setClickedPost] = useState({});
  const [date, setDate] = useState(new Date());
  const { id } = useParams();

  const getAndSetPost = () => {
    getPostById(id).then((data) => {
      const p = data;
      setClickedPost(p);
    });
  };
  useEffect(() => {
    getAndSetPost();
  }, [id]);

  const likes = () => {
    if (clickedPost.likes?.length > 1) {
      return <div>{clickedPost.likes?.length} Likes</div>;
    } else if (clickedPost.likes?.length === 1) {
      return <div>{clickedPost.likes?.length} Like</div>;
    }
  };

  useEffect(() => {
    if (clickedPost.created) {
      const createdDate = new Date(clickedPost.created);
      const formatted = Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }).format(createdDate);
      setDate(formatted);
    }
  }, [clickedPost]);

  const handleLike = (e) => {
    const likedPost = {
      postId: parseInt(e.target.value),
      userId: currentUser.id,
    };
    createLike(likedPost).then(() => {
      getAndSetPost();
    });
  };
  return (
    <section key={clickedPost.id}>
      <div>
        <h2 className="title">{clickedPost?.title}</h2>
      </div>
      <div>
        <div className="date">{date.toString()}</div>
      </div>
      <div>
        <span></span>
      </div>
      <div className="image">
        <img src={clickedPost.img_src} alt="" />
      </div>
      <div className="body">
        <div>{clickedPost.body} </div>
      </div>
      <div>
        <button onClick={handleLike} value={clickedPost.id}>
          Like
        </button>
      </div>
      <div>
        <div className="likes">{likes()}</div>
      </div>
    </section>
  );
};
