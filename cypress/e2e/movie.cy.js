describe('Отображение главной страницы', () => {
  it('passes', () => {
    cy.visit('/')
    cy
      .get('.page-header__title')
      .should('be.visible')
    
    cy
    .get('nav.page-nav > a')
    .should('have.length', 7)

    cy.fixture('movies').then((data) => {
      data.movies.forEach((title) => {
        cy.contains('.movie__title', title).should('be.visible')
      })
    })
  })
})