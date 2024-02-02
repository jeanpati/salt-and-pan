import { UserNav } from "../nav/GeneralNav";
import { PostFilterBar } from "../posts/PostFilterBar";
import { PostList } from "../posts/PostList";

export const GeneralSearch = ({
  setChosenCategoryOnly,
  setSearchTerm,
  allCategories,
}) => {
  <UserNav />;
  <PostFilterBar
    setChosenCategoryOnly={setChosenCategoryOnly}
    setSearchTerm={setSearchTerm}
    allCategories={allCategories}
  />;
  <PostList />;
};
