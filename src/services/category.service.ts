import sequelize from '../models';
import Cat from '../models/cat.model';
import Category from '../models/category.model';

class CategoryService {
  static getCategories() {
    return Category.findAll({
      include: [
        {
          model: Cat,
          as: 'cats',
        },
      ],
    });
  }

  static createCategory({ name }: { name: string }) {
    return sequelize.transaction((transaction) => Category.create({
      name,
    }, { transaction }));
  }

  static async updateCategory({ id, name }: { id: string; name: string }) {
    const data = await sequelize.transaction((transaction) => Category.update({
      name,
    }, {
      where: { id },
      returning: true,
      transaction,
    }));
    return JSON.parse(JSON.stringify(data[1]))[0];
  }

  static deleteCategory({ id }: { id: string }) {
    return sequelize.transaction((transaction) => Category.destroy({
      where: { id },
      transaction,
    }));
  }
}

export default CategoryService;
