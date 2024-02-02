export const getAllPosts = () => {
  return fetch(`http://localhost:8088/posts`).then((res) => res.json());
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
