export const PostFilterBar = ({
  setChosenCategoryOnly,
  setSearchTerm,
  allCategories,
}) => {
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
    </div>
  );
};
