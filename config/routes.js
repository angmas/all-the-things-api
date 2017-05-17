'use strict'

module.exports = require('lib/wiring/routes')

// create routes

// what to run for `GET /`
.root('root#root')

// standards RESTful routes
.resources('examples')
.get('/uploads/folder/:path/:owner', 'uploads#uploadsByFolder')
.resources('uploads')
.get('/folders/:id', 'uploads#folders')

// users of the app have special requirements
.get('/uploadowners', 'users#usersWithDocs')
.post('/sign-up', 'users#signup')
.post('/sign-in', 'users#signin')
.delete('/sign-out/:id', 'users#signout')
.patch('/change-password/:id', 'users#changepw')
.resources('users', { only: ['index', 'show'] })

// all routes created
