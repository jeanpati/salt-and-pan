import { useNavigate } from "react-router-dom";
export const PostFilterBar = ({
  setChosenCategoryOnly,
  setSearchTerm,
  allCategories,
}) => {
  const navigate = useNavigate();
  return (
    <div className="filter-bar">
      <select
        className="category-dropdown"
        onChange={(e) => {
          setChosenCategoryOnly(e.target.value);
        }}
      >
        <option value="0">Filter by category</option>$
        {allCategories.map((catObj) => {
          return (
            <option key={catObj.id} value={catObj.id}>
              {catObj.name}
            </option>
          );
        })}
      </select>
      <input
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        type="text"
        placeholder="Search Posts By Title"
        className="post-search"
      ></input>
      <button
        className="create-btn"
        onClick={() => {
          navigate("/newpost");
        }}
      >
        Create Recipe
      </button>
    </div>
  );
};
