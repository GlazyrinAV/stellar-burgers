import constructorItemsSlice, {
  addIngredient,
  clearConstructor,
  moveDown,
  moveUp,
  removeIngredient
} from '../services/slice/burger-constructor/burger-constructor-slice';

const constructorItemsInitialState = {
  bun: null,
  ingredients: []
};

const ingredients = [
  {
    _id: '1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  },
  {
    _id: '2',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  },
  {
    _id: '3',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    __v: 0
  }
];

describe('Проверка слайса Burger-Constructor', () => {
  describe('Проверка добавления булки', () => {
    test('addBun', () => {
      const actualState = constructorItemsSlice(
        {
          ...constructorItemsInitialState
        },
        addIngredient({ ...ingredients[0] })
      );

      const expectedState = {
        bun: { ...ingredients[0] },
        ingredients: []
      };
      expect(actualState.bun?.name).toEqual(expectedState.bun.name);
    });
  });
  describe('Проверка добавления ингридиента', () => {
    test('addIngredient', () => {
      const actualState = constructorItemsSlice(
        {
          ...constructorItemsInitialState
        },
        addIngredient({ ...ingredients[1] })
      );

      const expectedState = {
        bun: null,
        ingredients: [{ ...ingredients[1] }]
      };
      expect(actualState.ingredients[0].name).toEqual(
        expectedState.ingredients[0].name
      );
    });
  });
  describe('Проверка перемещения ингридиента вниз', () => {
    test('moveDown', () => {
      const actualState = constructorItemsSlice(
        {
          bun: { ...ingredients[0], id: '0' },
          ingredients: [
            { ...ingredients[1], id: '1' },
            { ...ingredients[2], id: '2' }
          ]
        },
        moveDown(1)
      );
      const expectedState = {
        bun: { ...ingredients[0], id: '0' },
        ingredients: [
          { ...ingredients[2], id: '2' },
          { ...ingredients[1], id: '1' }
        ]
      };
    });
  });
  describe('Проверка перемещения ингридиента вверх', () => {
    test('moveUp', () => {
      const actualState = constructorItemsSlice(
        {
          bun: { ...ingredients[0], id: '0' },
          ingredients: [
            { ...ingredients[1], id: '1' },
            { ...ingredients[2], id: '2' }
          ]
        },
        moveUp(2)
      );
      const expectedState = {
        bun: { ...ingredients[0], id: '0' },
        ingredients: [
          { ...ingredients[2], id: '2' },
          { ...ingredients[1], id: '1' }
        ]
      };
    });
  });
  describe('Проверка удаления ингридиента', () => {
    test('removeIngredient', () => {
      const actualState = constructorItemsSlice(
        {
          bun: { ...ingredients[0], id: '0' },
          ingredients: [
            { ...ingredients[1], id: '1' },
            { ...ingredients[2], id: '2' }
          ]
        },
        removeIngredient('1')
      );
      const expectedState = {
        bun: { ...ingredients[0], id: '0' },
        ingredients: [{ ...ingredients[2], id: '2' }]
      };
      expect(actualState).toEqual(expectedState);
    });
  });
  describe('Проверка очистки конструктора', () => {
    test('clearConstructor', () => {
      const actualState = constructorItemsSlice(
        {
          bun: { ...ingredients[0], id: '0' },
          ingredients: [
            { ...ingredients[1], id: '1' },
            { ...ingredients[2], id: '2' }
          ]
        },
        clearConstructor()
      );
      expect(actualState).toEqual(constructorItemsInitialState);
    });
  });
});
