beforeEach(() => {
  localStorage.setItem(
    'refreshToken',
    '903b1a2849700284daf6ea26f24ed1bdbce059da66a73101c34e491461fe5506e2bca1b4068e17c7"'
  );
  document.cookie =
    'access_token=Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YzhmZmZhYTY0MTc3MDAxYjMzMGQ2MCIsImlhdCI6MTc3NjMxNzgyMSwiZXhwIjoxNzc2MzE5MDIxfQ.waAhsv9vTXp6wpE836dImMtLIS2J35tSoNiG4r3SoFc';
  cy.intercept('GET', 'https://norma.education-services.ru/api/ingredients', {
    fixture: 'ingredients'
  });
  cy.intercept('GET', 'https://norma.education-services.ru/api/auth/user', {
    fixture: 'user'
  });
  cy.intercept('POST', 'https://norma.education-services.ru/api/orders', {
    fixture: 'order'
  });
});

afterEach(() => {
  localStorage.clear();
  document.cookie = 'access_token=';
});

describe('проверяем доступность приложения', function () {
  it('сервис должен быть доступен по адресу localhost:4000', function () {
    cy.visit('http://localhost:4000');
    cy.contains('Краторная булка N-200i').should('be.visible');
  });
});

describe('добавление ингредиента из списка в конструктор', function () {
  it('добавление ингредиента из списка в конструктор', function () {
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
      cy.visit('http://localhost:4000');
      cy.get(`[data-cy=${1}]`).click();
      const modal = cy.get('#modals');
      modal.contains('Детали ингридиента').should('be.visible');
    });
  });
  describe('закрытие по клику на крестик', function () {
    it('закрытие по клику на крестик', function () {
      cy.visit('http://localhost:4000');
      cy.get(`[data-cy=${1}]`).click();
      cy.get('#modals').find('button').click();
      cy.get('#modals').should('not.be.visible');
    });
  });
  describe('закрытие по клику на оверлей', function () {
    it('закрытие по клику на оверлей', function () {
      cy.visit('http://localhost:4000');
      cy.get(`[data-cy=${1}]`).click();
      cy.get(`[data-cy="overlay"]`).click('topLeft', { force: true });
      cy.get('#modals').should('not.be.visible');
    });
  });
});

describe('создание заказа', function () {
  it('создание заказа', function () {
    cy.visit('http://localhost:4000');
    const addBunButton = cy.get(`[data-cy=${1}]`).contains('Добавить');
    addBunButton.click();
    const addMainButton = cy.get(`[data-cy=${2}]`).contains('Добавить');
    addMainButton.click();
    const addSauceButton = cy.get(`[data-cy=${3}]`).contains('Добавить');
    addSauceButton.click();
    cy.get(`[data-cy=${'burger-constructor'}]`)
      .contains('Оформить заказ')
      .click();
    cy.get('#modals').contains('104125').should('be.visible');
    cy.get('#modals').find('button').click();
    cy.get('#modals').should('not.be.visible');
    cy.get(`[data-cy=${'burger-constructor'}]`)
      .contains('Выберите булки')
      .should('be.visible');
    cy.get(`[data-cy=${'burger-constructor'}]`)
      .contains('Выберите начинку')
      .should('be.visible');
  });
});
