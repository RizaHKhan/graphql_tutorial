import { GraphQLServer } from 'graphql-yoga'

// Five Scalar types in GraphQL
// String, Boolean, Int (whole numbers), Float (decimals), ID

// Demo user data
const users = [{
    id: '1',
    name: 'Riza',
    email: 'riza@email.com',
    age: 34
}, {
    id: '2',
    name: 'Liz',
    email: 'liz@email.com',
    age: 21
}]

// Type definitions (schema)

const typeDefs = `
type Query {
    users: [User!]!
    greeting(name: String, position: String): String!
    me: User!
    post: Post!
    add(numbers: [Float!]!): Float!
    grades: [Int!]!
}

type User {
    id: ID!
    name: String!
    email: String!
    age: Int
}

type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
}
`

// Resolvers //a set of functions

const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            return  users
        },
        add(parent, args, ctx, info) {
            if(args.numbers.length === 0) {
                return 0
            } else {
                return args.numbers.reduce((accumulator, currentValue)=> {
                    return accumulator + currentValue
                })
            }
        },
        me() {
            return {
                id: '123098',
                name: 'Mike',
                email: 'mike@example.com',
                age: 28
            }
        },
        post() {
            return {
                id: 'qwerty',
                title: 'Shades of Grey',
                body: 'This is a post body',
                published: true
            }
        },

        // four arugments get passed all resolver functions
        // parent, args, ctx, info 
        greeting(parent, args, ctx, info) {
            
            if(args.name && args.position) {
                return `Hello, ${args.name}! You are in position ${args.position}`
            } else {
                return 'Hello!'
            }
            
        },
        grades(parents, args, ctx, info) {
            return [1, 2, 3, 4]
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up!')
})