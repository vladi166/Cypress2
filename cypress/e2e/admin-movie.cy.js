describe('Admin tickets test', () => {
	let movieTitle;
	const login = require('../fixtures/login-admin.json');
	const selectors = require('../selectors/booking.json');
	const seats = require('../fixtures/seats.json');
	//Разделим тест на 2 части для лучшей читаемости
	before(() => {
		cy.visit('http://qamid.tmweb.ru/admin/')
			.login(login.validEmail, login.validPassword);
		cy.get(selectors.movieTitleById133)
			.invoke('text')
			.then((title) => {
				movieTitle = title;
				cy.visit('http://qamid.tmweb.ru/');
				cy.get(selectors.movie)
					.contains(movieTitle)
					.should('be.visible')
					.parents(selectors.movie)
					.within(() => {
						cy.contains('22:00').click();
					});
				seats.forEach((seat) => {
					cy.get(
						`.buying-scheme__wrapper > :nth-child(${seat.row}) > :nth-child(${seat.seat})`
					).click();
				});
				cy.get(selectors.button).click();
				cy.contains('Вы выбрали билеты:').should('be.visible');
			});
	});

	it('Проверка информации о бронировании', () => {
		// Проверка названия фильма
		cy.get(':nth-child(1) > .ticket__details').should('contain', movieTitle);
		// Проверка времени сеанса
		cy.get(':nth-child(5) > .ticket__details').should('contain', '22:00');
		// Проверка выбранных мест
		seats.forEach((seat) => {
			cy.get(':nth-child(2) > .ticket__details').should('contain', `${seat.row}/${seat.seat}`);
		});
		// Проверка даты
		cy.get(':nth-child(4) > .ticket__details').should('contain', '27-06-2025');
	});
})