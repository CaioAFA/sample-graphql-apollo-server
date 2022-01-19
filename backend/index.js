require('dotenv').config()

const { ApolloServer } = require('apollo-server')
const { importSchema } = require('graphql-import')
const resolvers = require('./resolvers')
const context = require('./config/context')
const simulateLoggedUser = require('./config/simulateLoggedUser')

const schemaPath = './schema/index.graphql'
const server = new ApolloServer({
    typeDefs: importSchema(schemaPath),
    resolvers,
    context
})

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`)

    if(simulateLoggedUser.shouldSimulateLoggedAdminUser()){
        console.log('Simulating logged admin user')
    }
    else if(simulateLoggedUser.shouldSimulateLoggedUser()){
        console.log('Simulating logged user')
    }
})