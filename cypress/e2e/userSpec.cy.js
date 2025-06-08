describe('List all users', () => {
    it('List all users', () => {
        cy.api_get('/users')
        .then(response => {
            expect(response.status).to.equal(200)
            expect(response.body).to.not.null
        })
    })
})

describe('Fetch user by ID', () => {
    let userId
    let userIdNotFound = 1251532
    before('Create new user', () => {
        cy.fixture("createUser")
        .then(jsonOption => {
            cy.api_post('/users', jsonOption)
            .then(response => {
                userId = response.body.id
                expect(response.status).to.equal(201)
            })
        })
    })
    it('Fetching user by ID', () => {
        cy.api_get('/users' + `/${userId}`)
        .then(response => {
            expect(response.status).to.equal(200)
            expect(response.body).to.not.null
        })
    })
    it('Fetching user with ID not found', () => {
        cy.api_get('/users' + `/${userIdNotFound}`)
        .then(response => {
            expect(response.status).to.equal(404)
            expect(response.body.error).equals("User not found.")
        })
    })
    after('Delete created user', () => {
        cy.api_delete('/users' + `/${userId}`)
        .then(response => {
            expect(response.status).to.equal(200)
        })
    })
})


describe('Create new user', () => {
    let userId
    before('Create new user successfully', () => {
        cy.fixture("createUser")
        .then(jsonOption => {
            cy.api_post('/users', jsonOption)
            .then(response => {
                userId = response.body.id
                expect(response.status).to.equal(201)
                expect(response.body).to.not.null
            })
        })
    })
    it('Create duplicated user', () => {
        cy.fixture("createUser")
        .then(jsonOption => {
            cy.api_post('/users', jsonOption)
            .then(response => {
                expect(response.status).to.equal(409)
                expect(response.body.error).equals("A user with this name or email already exists.")
            })
        })
    })
    after('Delete created user', () => {
        cy.api_delete('/users' + `/${userId}`)
        .then(response => {
            expect(response.status).to.equal(200)
        })
    })
})

describe('Update user data', () => {
    let userId
    let userIdNotFound = 1251532
    before('Create user', () => {
        cy.fixture("createUser")
        .then(jsonOption => {
            cy.api_post('/users', jsonOption)
            .then(response => {
                userId = response.body.id
            })
        })
    })
    it('Update user successfully', () => {
        cy.fixture("createUser")
        .then(jsonOption => {
            cy.api_put('/users' + `/${userId}`, jsonOption)
            .then(response => {
                expect(response.status).to.equal(200)
                expect(response.body.message).equals("User updated successfully.")
            })
        })
    })
    it('Update user not found', () => {
        cy.fixture("createUser")
        .then(jsonOption => {
            cy.api_put('/users' + `/${userIdNotFound}`, jsonOption)
            .then(response => {
                expect(response.status).to.equal(404)
                expect(response.body.error).equals("User not found.")
            })
        })
    })
    after('Delete created user', () => {
        cy.api_delete('/users' + `/${userId}`)
        .then(response => {
            expect(response.status).to.equal(200)
        })
    })
})

describe('Delete user', () => {
    let userId
    let userIdInvalid = 1251532    
    before('Create user', () => {
        cy.fixture("createUser")
        .then(jsonOption => {
            cy.api_post('/users', jsonOption)
            .then(response => {
                userId = response.body.id
            })
        })
    })
    it('Delete user successfully', () => {
        cy.api_delete('/users' + `/${userId}`)
        .then(response => {
            expect(response.status).to.equal(200)
            expect(response.body.message).equals("User deleted successfully.")
        })
    })
    it('Delete user not found', () => {
        cy.api_delete('/users' + `/${userIdInvalid}`)
        .then(response => {
            expect(response.status).to.equal(404)
            expect(response.body.error).equals("User not found.")
        })
    })
})
