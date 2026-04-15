describe('проверяем доступность приложения', function () {
  it('сервис должен быть доступен по адресу localhost:4000', function () {
    cy.intercept('GET', 'https://norma.education-services.ru/api/ingredients', {
      fixture: 'ingredients'
    });
    cy.visit('http://localhost:4000');
    cy.contains('Краторная булка N-200i').should('be.visible');
  });
});

describe('добавление ингредиента из списка в конструктор', function () {
  it('добавление ингредиента из списка в конструктор', function () {
    cy.intercept('GET', 'https://norma.education-services.ru/api/ingredients', {
      fixture: 'ingredients'
    });
    cy.visit('http://localhost:4000');
    const addBunButton = cy.get(`[data-cy=${1}]`).contains('Добавить');
    addBunButton.click();
    const addMainButton = cy.get(`[data-cy=${2}]`).contains('Добавить');
    addMainButton.click();
    const addSauceButton = cy.get(`[data-cy=${3}]`).contains('Добавить');
    addSauceButton.click();
    cy.get(`[data-cy=${'burger-constructor'}]`)
      .contains('Краторная булка N-200i')
      .should('be.visible');
    cy.get(`[data-cy=${'burger-constructor'}]`)
      .contains('Биокотлета из марсианской Магнолии')
      .should('be.visible');
    cy.get(`[data-cy=${'burger-constructor'}]`)
      .contains('Соус Spicy-X')
      .should('be.visible');
  });
});

describe('работа модальных окон', function () {
  describe('открытие модального окна ингредиента', function () {
    it('открытие модального окна ингредиента', function () {
      cy.intercept(
        'GET',
        'https://norma.education-services.ru/api/ingredients',
        {
          fixture: 'ingredients'
        }
      );
      cy.visit('http://localhost:4000');
      cy.get(`[data-cy=${1}]`).click();
      const modal = cy.get('#modals');
      modal.contains('Детали ингридиента').should('be.visible');
    });
  });
  describe('закрытие по клику на крестик', function () {
    it('закрытие по клику на крестик', function () {
      cy.intercept(
        'GET',
        'https://norma.education-services.ru/api/ingredients',
        {
          fixture: 'ingredients'
        }
      );
      cy.visit('http://localhost:4000');
      cy.get(`[data-cy=${1}]`).click();
      cy.get('#modals').find('button').click();
      cy.get('#modals').should('not.be.visible');
    });
  });
  describe('закрытие по клику на оверлей', function () {
    it('закрытие по клику на оверлей', function () {
      cy.intercept(
        'GET',
        'https://norma.education-services.ru/api/ingredients',
        {
          fixture: 'ingredients'
        }
      );
      cy.visit('http://localhost:4000');
      cy.get(`[data-cy=${1}]`).click();
      cy.get(`[data-cy="overlay"]`).click('topLeft', { force: true });
      cy.get('#modals').should('not.be.visible');
    });
  });
});

// describe('создание заказа', function () {
//   describe('cозданы моковые данные ответа на запрос данных пользователя');
//   describe('cозданы моковые данные ответа на запрос создания заказа');
//   describe('подставляются моковые токены авторизации');
//   describe('собирается бургер');
//   describe('вызывается клик по кнопке «Оформить заказ»');
//   describe('проверяется, что модальное окно открылось и номер заказа верный.');
//   describe('закрывается модальное окно и проверяется успешность закрытия.');
//   describe('проверяется, что конструктор пуст.');
// });
