describe('Create new ticket', () => {
    let ticketId
    it('Create ticket successfully', () => {
        cy.fixture("createTicket")
        .then(jsonOption => {
            cy.api_post('/tickets', jsonOption)
            .then(response => {
                ticketId = response.body.id
                expect(response.status).to.equal(201)
                expect(response.body.status).equals("Open")
            })
        })
    })
    it('Create invalid ticket', () => {
        cy.fixture("invalidTicket")
        .then(jsonOption => {
            cy.api_post('/tickets', jsonOption)
            .then(response => {
                expect(response.status).to.equal(400)
                expect(response.body.error).equals("The fields userId and description are required.")
            })
        })
    })
    after('Delete created ticket', () => {
        cy.api_delete('/tickets'+ `/${ticketId}`)
        .then(response => {
            expect(response.status).to.equal(200)
        })
    })
})

describe('Delete ticket', () => {
    let ticketId
    let ticketIdNotFound = 123541
    before('Create Ticket', () =>{
        cy.fixture("createTicket")
        .then(jsonOption => {
            cy.api_post('/tickets', jsonOption)
            .then(response => {
                ticketId = response.body.id                
            })
        })
    })
    it('Delete ticket successfully', () => {
        cy.api_delete('/tickets'+ `/${ticketId}`)
        .then(response => {
            expect(response.status).to.equal(200)
            expect(response.body.message).equals("Ticket deleted successfully.")
        })
    })
    it('Delete ticket with id not found', () => {
        cy.api_delete('/tickets'+ `/${ticketIdNotFound}`)
        .then(response => {
            expect(response.status).to.equal(404)
            expect(response.body.error).equals("Ticket not found.")
        })
    })
})

describe('Fetch ticket by ID', () => {
    let ticketId
    let ticketIdNotFound = 123541
    before('Create Ticket', () =>{
        cy.fixture("createTicket")
        .then(jsonOption => {
            cy.api_post('/tickets', jsonOption)
            .then(response => {
                ticketId = response.body.id                
            })
        })
    })
    it('Fetch ticket successfully', () => {
        cy.api_get('/tickets'+ `/${ticketId}`)
        .then(response => {
            expect(response.status).to.equal(200)
            expect(response.body.status).equals("Open")
        })
    })
    it('Fetch ticket with id not found', () => {
        cy.api_get('/tickets'+ `/${ticketIdNotFound}`)
        .then(response => {
            expect(response.status).to.equal(404)
            expect(response.body.error).equals("Ticket not found.")
        })
    })
    after('Delete created ticket', () => {
        cy.api_delete('/tickets'+ `/${ticketId}`)
        .then(response => {
            expect(response.status).to.equal(200)
        })
    })
})

describe('Update ticket status', () => {
    let ticketId
    let ticketIdNotFound = 123541
    before('Create Ticket', () =>{
        cy.fixture("createTicket")
        .then(jsonOption => {
            cy.api_post('/tickets', jsonOption)
            .then(response => {
                ticketId = response.body.id                
            })
        })
    })
    it('Update ticket status', () => {
        cy.fixture("statusTicket")
        .then(jsonOption=> {
            cy.api_put('/tickets'+ `/${ticketId}` + '/status', jsonOption)
            .then(response => {
                expect(response.status).to.equal(200)
                expect(response.body.ticket.status).equals("In Progress")
                expect(response.body.message).equals("Ticket status updated successfully.")
            })
        })
    })
    it('Update ticket status not found', () => {
        cy.fixture("statusTicket")
        .then(jsonOption=> {
            cy.api_put('/tickets'+ `/${ticketIdNotFound}` + '/status', jsonOption)
            .then(response => {
                expect(response.status).to.equal(404)
                expect(response.body.error).equals("Ticket not found.")
            })
        })
    })
    after('Delete created ticket', () => {
        cy.api_delete('/tickets'+ `/${ticketId}`)
        .then(response => {
            expect(response.status).to.equal(200)
        })
    })
})