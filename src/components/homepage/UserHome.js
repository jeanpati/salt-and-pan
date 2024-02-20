import { useEffect, useState } from "react";
import { Carousel } from "./Carousel";
import logo from "/Users/jean/workspace/salt-and-pan/src/assets/saltandpanlogo.png";
import { getPostById } from "../../services/postService";
import { Post } from "../posts/Post";

import("./Home.css");

export const UserHome = ({ currentUser }) => {
  const [cocktailHighlight, setCocktailHighlight] = useState({});
  const [recipeHighlight, setRecipeHighlight] = useState({});

  useEffect(() => {
    getPostById(5).then((data) => {
      const p = data;
      setCocktailHighlight(p);
    });
  }, []);

  useEffect(() => {
    getPostById(9).then((data) => {
      const p = data;
      setRecipeHighlight(p);
    });
  }, []);

  return (
    <section className="home-container">
      <div className="header">
        <h1>Salt and Pan</h1>
        <img className="logo" src={logo} alt="" />
      </div>

      <article className="content-container">
        <div className="popular">
          <h2>Popular Posts</h2>
          <Carousel />
        </div>
        <article className="highlights">
          <div className="highlight-item">
            <h2>Recipe Highlight</h2>
            <Post post={recipeHighlight} />
          </div>
          <div className="highlight-item">
            <h2>Cocktail Highlight</h2>
            <Post post={cocktailHighlight} />
          </div>
        </article>
      </article>
    </section>
  );
};
