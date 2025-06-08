Cypress.Commands.add('api_post', (parameter, jsonOption) => {

    cy.request({
        method: 'POST',
        url: parameter,
        failOnStatusCode: false,
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonOption
    })
})

Cypress.Commands.add('api_get', (parameter) => {
    cy.request({
        method: 'GET',
        url: parameter,
        failOnStatusCode: false,
        headers: {
            'Content-Type': 'application/json'
        },
    })
})

Cypress.Commands.add('api_put', (parameter, jsonOption) => {

    cy.request({
        method: 'PUT',
        url: parameter,
        failOnStatusCode: false,
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonOption
    })
})

Cypress.Commands.add('api_delete', (parameter) => {

    cy.request({
        method: 'DELETE',
        url: parameter,
        failOnStatusCode: false,
        headers: {
            'Content-Type': 'application/json'
        },
    })
})