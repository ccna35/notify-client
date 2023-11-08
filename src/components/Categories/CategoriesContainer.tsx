import { CategoryType } from "../../types/types";
import Category from "./Category";

type CategoriesContainerProps = {
  categories: CategoryType[];
};

const CategoriesContainer = ({ categories }: CategoriesContainerProps) => {
  return (
    <div className="mt-8 flex gap-4 flex-wrap">
      {categories.map((category: CategoryType) => (
        <Category
          key={category.id}
          id={category.id}
          category_name={category.category_name}
          createdAt={category.createdAt}
        />
      ))}
    </div>
  );
};

export default CategoriesContainer;
