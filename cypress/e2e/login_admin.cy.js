const selectors = require ('../selectors/login.json');

// Валидные сценарии

describe('Проверка авторизации: валидные данные', () => {
  beforeEach(function () {
    cy.fixture('login-admin').then((login) => {
      this.login = login;
    });
    cy.visit("http://qamid.tmweb.ru/admin/");
  });

  it('Валидные данные', function () {
    cy.login(this.login.validEmail, this.login.validPassword);
    cy.contains("Управление залами").should("be.visible");
  });
});

// Невалидные сценарии

describe('Проверка авторизации: невалидные данные', () => {
  beforeEach(function () {
    cy.fixture('login-admin').then((login) => {
      this.login = login;
    });
    cy.visit("http://qamid.tmweb.ru/admin/");
  });

  it('Невалидный логин, валидный пароль', function () {
    cy.login(this.login.invalidEmail, this.login.validPassword);
    cy.contains("Ошибка авторизации").should("be.visible");
  });

  it('Валидный логин, невалидный пароль', function () {
    cy.login(this.login.validEmail, this.login.invalidPassword);
    cy.contains("Ошибка авторизации").should("be.visible");
  });

  it('Невалидный логин и невалидный пароль', function () {
    cy.login(this.login.invalidEmail, this.login.invalidPassword);
    cy.contains("Ошибка авторизации").should("be.visible");
  });

  it('Валидный логин и пустое поле пароля', function () {
    cy.get(selectors.emailInput).type(this.login.validEmail);
    cy.get(selectors.passwordInput).clear();
    cy.get(selectors.submitButton).click();
    cy.get(selectors.passwordInput)
      .then(($input) => {
        expect($input[0].validationMessage).to.eq('Заполните это поле.');
      });
  });

  it('Пустое поле логин и валидный пароль', function () {
    cy.get(selectors.emailInput).clear();
    cy.get(selectors.passwordInput).type(this.login.validPassword);
    cy.get(selectors.submitButton).click();
    cy.get(selectors.emailInput)
      .then(($input) => {
        expect($input[0].validationMessage).to.eq('Заполните это поле.');
      });
  });
});