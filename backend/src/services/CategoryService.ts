import { CategoryRepository } from '../repositories/CategoryRepository';

export class CategoryService {
  async getAllCategories() {
    return await new CategoryRepository().getAllCategories();
  }

  async getCategoryById(id: number) {
    const category = await new CategoryRepository().getCategoryById(id);
    if (!category) {
      throw new Error('Categoria não encontrada');
    }
    return category;
  }
}
