import CategoryService from '../services/category.service';

const resolver = {
  Query: {
    categories: () => CategoryService.getCategories(),
  },
  Mutation: {
    createCategory: (_: any, args: { name: string }) => CategoryService.createCategory(args),
    updateCategory: (_: any, args: { id: string; name: string }) => CategoryService.updateCategory(args),
    deleteCategory: (_: any, args: { id: string }) => CategoryService.deleteCategory(args),
  },
};

export default resolver;
