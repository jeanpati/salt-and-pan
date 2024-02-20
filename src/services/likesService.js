export const getLikesByUserId = (userId) => {
  return fetch(
    `http://localhost:8088/likes?userId=${userId}&_expand=post&_expand=user`
  ).then((res) => res.json());
};

export const getLikesByPostId = (postId) => {
  return fetch(
    `http://localhost:8088/likes?postId=${postId}&_expand=user`
  ).then((res) => res.json());
};

export const deleteLike = (likeId) => {
  return fetch(`http://localhost:8088/likes/${likeId}`, {
    method: "DELETE",
  });
};

export const createLike = (like) => {
  return fetch(`http://localhost:8088/likes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(like),
  });
};
