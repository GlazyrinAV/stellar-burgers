describe('Проверка слайса Order-Burger', () => {
  describe('Проверка отправки заказа c Fullfiled', () => {
    test('Проверка makeOrder.fulfilled', () => {});
  });
  describe('Проверка отправки заказа c Pending', () => {
    test('Проверка makeOrder.pending', () => {});
  });
  describe('Проверка отправки заказа c Rejected', () => {
    test('Проверка makeOrder.rejected', () => {
      const error = new Error('Ошибка');
    });
  });
});
