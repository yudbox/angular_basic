export class IngredientsModel {
  //   public name: string;
  //   public amount: number;

  // если в конструкторе добавить свойства передаваемым аргументам
  // то Ангуляр автоматически создадут переменные в создаваемой сущности класса и присвоит
  //    им аргументы передаваемые в конструктор

  constructor(public name: string, public amount: number) {
    // this.name = name;
    // this.amount = amount;
  }
}
