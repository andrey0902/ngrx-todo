export class CategoryModel {
  public id: string;
  public name: string;
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
  }
}
