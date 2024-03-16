import { CreateCategoryDto } from "@/store/api/gen/category";
import { categoryApi } from "@/store/enhancedApi";
import { handleErrors } from "@/utils/error";

export const useCategoryApi = () => {
  const [create] = categoryApi.useCategoryControllerCreateMutation();
  const [edit] = categoryApi.useCategoryControllerEditMutation();
  const [deleteCategory] =
    categoryApi.useCategoryControllerDeleteCategoryMutation();

  const {
    isFetching: isFetchingCategory,
    data: categories,
    isError,
  } = categoryApi.useCategoryControllerFindAllQuery();

  const handleCreateCategory = async (payload: CreateCategoryDto) => {
    try {
      const response = await create({ createCategoryDto: payload });

      handleErrors(response);
    } catch (err) {
      throw err;
    }
  };

  const handleEditCategory = async (id: number, payload: CreateCategoryDto) => {
    try {
      const response = await edit({ id, createCategoryDto: payload });
      handleErrors(response);
    } catch (err) {
      throw err;
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      const response = await deleteCategory({ id });
      handleErrors(response);
    } catch (err) {
      throw err;
    }
  };

  return {
    handleCreateCategory,
    isFetchingCategory,
    categories,
    isError,
    handleEditCategory,
    handleDeleteCategory,
  };
};
