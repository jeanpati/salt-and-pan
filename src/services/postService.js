export const getAllPosts = () => {
  return fetch(`http://localhost:8088/posts?_expand=user&_embed=likes`).then(
    (res) => res.json()
  );
};

export const getMyPosts = (userId) => {
  return fetch(
    `http://localhost:8088/posts?userId=${userId}&_expand=user`
  ).then((res) => res.json());
};

export const createPost = (post) => {
  return fetch(`http://localhost:8088/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
};

export const getPostById = (postId) => {
  return fetch(
    `http://localhost:8088/posts/${postId}?_expand=user&_embed=likes`
  ).then((res) => res.json());
};

export const editPost = (post) => {
  return fetch(`http://localhost:8088/posts/${post.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
};

export const deletePost = (postId) => {
  return fetch(`http://localhost:8088/posts/${postId}`, {
    method: "DELETE",
  });
};
