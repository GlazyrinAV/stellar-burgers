describe('Проверка слайса Auth', () => {
  describe('Проверка Login c Fullfiled', () => {
    test('Проверка loginUser.fulfilled', () => {});
  });
  describe('Проверка Login c Pending', () => {
    test('Проверка loginUser.pending', () => {});
  });
  describe('Проверка Login c Rejected', () => {
    test('Проверка loginUser.rejected', () => {
      const error = new Error('Ошибка');
    });
  });

  describe('Проверка Register User c Fullfiled', () => {
    test('Проверка registerUser.fulfilled', () => {});
  });
  describe('Проверка Register User c Pending', () => {
    test('Проверка registerUser.pending', () => {});
  });
  describe('Проверка Register User c Rejected', () => {
    test('Проверка registerUser.rejected', () => {
      const error = new Error('Ошибка');
    });
  });

  describe('Проверка Update User c Fullfiled', () => {
    test('Проверка updateUser.fulfilled', () => {});
  });
  describe('Проверка Update User c Pending', () => {
    test('Проверка updateUser.pending', () => {});
  });
  describe('Проверка Update User c Rejected', () => {
    test('Проверка updateUser.rejected', () => {
      const error = new Error('Ошибка');
    });
  });

  describe('Проверка Logout User c Fullfiled', () => {
    test('Проверка logoutUser.fulfilled', () => {});
  });
  describe('Проверка Logout User c Pending', () => {
    test('Проверка logoutUser.pending', () => {});
  });
  describe('Проверка Logout User c Rejected', () => {
    test('Проверка logoutUser.rejected', () => {
      const error = new Error('Ошибка');
    });
  });

  describe('Проверка получения User c Fullfiled', () => {
    test('Проверка getUser.fulfilled', () => {});
  });
  describe('Проверка получения User c Pending', () => {
    test('Проверка getUser.pending', () => {});
  });
  describe('Проверка получения User c Rejected', () => {
    test('Проверка getUser.rejected', () => {
      const error = new Error('Ошибка');
    });
  });
});
