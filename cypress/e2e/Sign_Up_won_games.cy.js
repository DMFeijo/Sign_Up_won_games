beforeEach(() => {

  cy.visit('https://wongames.willianjusten.com.br/sign-up')
  cy.url().should('include', '/sign-up')

});
describe('Formulario de cadastro', () => {
  it('verifica se todos os campos obrigatórios estão presentes', () => {

    cy.get('[name=username]').should('exist')
    cy.get('[name=email]').should('exist')
    cy.get('[name=password]').should('exist')
    cy.get('[name=confirm_password]').should('exist')

  })
  it('realizar o cadastro sem preencher nenhum campo, devera ser exibida mensagem de erro', () => {

    cy.get('[type=submit]').click()

    cy.get(':nth-child(1) > .styles__Error-hb95e4-4')
      .should('contain.text', '"username" is not allowed to be empty')
    cy.get(':nth-child(2) > .styles__Error-hb95e4-4')
      .should('contain.text', '"email" is not allowed to be empty')
    cy.get(':nth-child(3) > .styles__Error-hb95e4-4')
      .should('contain.text', '"password" is not allowed to be empty')
    cy.get(':nth-child(4) > .styles__Error-hb95e4-4')
      .should('contain.text', '"confirm_password" is required')

  });
  it('Tentar realizar o cadastro com uma senha fraca', () => {

    cy.get('[name=username]').type('Teste Cypress')
    cy.get('[name=email]').type('teste@cypress.com')
    cy.get('[name=password]').type('123')
    cy.get('[name=confirm_password]').type('123')
    cy.get('[type=submit]').click()
    cy.get('[data-cy="form-error"]')
      .should('contain.text', 'A senha deve ter pelo menos 8 caracteres, uma letra maiúscula e um número')

  });
  it('Tentar realizar o cadastro com uma senha diferente da confirmação de senha', () => {

    cy.get('[name=username]').type('Teste Cypress')
    cy.get('[name=email]').type('teste@cypress.com')
    cy.get('[name=password]').type('123456')
    cy.get('[name=confirm_password]').type('1234567')
    cy.get('[type=submit]').click()
    cy.get('.styles__Error-hb95e4-4')
      .should('contain.text', 'confirm password does not match with password')
  });
  it.only('Preencher todos os campos corretamente e verificar se o cadastro é realizado com sucesso', () => {

    cy.get('[name=username]').type('Teste Cypress')
    cy.get('[name=email]').type('teste@cypress.com')
    cy.get('[name=password]').type('123456Bc.')
    cy.get('[name=confirm_password]').type('123456Bc.')
    cy.get('[type=submit]').click()

  });
})