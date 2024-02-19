import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../../services/postService";
import { createLike, getLikesByPostId } from "../../services/likesService";
import "./Posts.css";

export const PostDetails = ({ currentUser }) => {
  const [clickedPost, setClickedPost] = useState({});
  const [postLikes, setPostLikes] = useState([]);
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

  useEffect(() => {
    getLikesByPostId(clickedPost?.id).then((data) => {
      const l = data;
      setPostLikes(l);
    });
  }, [clickedPost]);

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

  const likeButton = (clickedPost) => {
    if (currentUser?.id) {
      for (const like of postLikes) {
        if (parseInt(like?.userId) === parseInt(currentUser.id)) {
          return (
            <button className="liked-btn" value={clickedPost.id}>
              Liked!
            </button>
          );
        }
      }
      return (
        <button
          className="like-btn"
          onClick={handleLike}
          value={clickedPost.id}
        >
          Like
        </button>
      );
    } else {
      return "";
    }
  };

  const testingLabel = (postObj) => {
    if (postObj?.isTesting === true) {
      return <label className="label">Testing</label>;
    }
  };

  const privateLabel = (postObj) => {
    if (postObj.isPrivate === true) {
      return <label className="label">Private</label>;
    }
  };

  return (
    <section className="details-card" key={clickedPost.id}>
      <div className="details-item">
        <h2 className="title">{clickedPost?.title}</h2>
      </div>
      <div className="date-bar">
        <div className="details-item">
          <div className="date">{date.toString()}</div>
        </div>
        <div className="details-item testing">{testingLabel(clickedPost)}</div>
        <div className="details-item private">{privateLabel(clickedPost)}</div>
      </div>
      <div className="details-item">
        <img src={clickedPost.img_src} alt="" />
      </div>
      <div className="details-item">
        <p className="body">{clickedPost.body}</p>
      </div>
      <div className="likes-bar">
        <div className="details-item likes">{likes()}</div>
        <div className="details-item">{likeButton(clickedPost)}</div>
      </div>
    </section>
  );
};
