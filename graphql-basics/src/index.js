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

const posts = [{
    id: '1',
    title: 'Title 1',
    body: 'This is the body of post 1',
    published: true,
    author: '1',
    comments: '1'
}, {
    id: '2',
    title: 'Title 2',
    body: 'This is the body of post 2',
    published: true,
    author: '2',
    comments: '2'
}, {
    id: '3',
    title: 'Title 3',
    body: 'This is the body of post 3',
    published: false,
    author: '1',
    comments: '1'
}]

const comments = [{
    id: '1',
    text: 'Ths is comment 1',
    author: '1',
    post: '1'
}, {
    id: '2',
    text: 'Ths is comment 2',
    author: '2',
    post: '2'
}, {
    id: '3',
    text: 'Ths is comment 3',
    author: '1',
    post: '3'
}, {
    id: '4',
    text: 'Ths is comment 4',
    author: '1',
    post: '3'
}]
// Type definitions (schema)

const typeDefs = `
type Query {
    users(query: String): [User!]!
    greeting(name: String, position: String): String!
    me: User!
    post: Post!
    add(numbers: [Float!]!): Float!
    grades: [Int!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
}

type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
}

type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
}

type Comment {
    id: ID!
    text: String!
    author: User!
    post: [Post!]!
}
`

// Resolvers //a set of functions

const resolvers = {
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        comments(parent, ags, ctx, info) {
            return comments.filter((comment) => {
                return comment.post === parent.id
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id
            })
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        post(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.id === parent.post
            })
        }
    },
    Query: {
        comments(parent, args, ctx, info) {
            return comments
        },
        posts(parent, args, ctx, info) {
            if(!args.query) {
                return posts
            } else {
                return posts.filter((post) => {
                    const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                    const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())

                    return isTitleMatch || isBodyMatch
                })
            }
        },
        users(parent, args, ctx, info) {
            if(!args.query) {
                return users
            } else {
                return users.filter((user) => {
                    return user.name.toLowerCase().includes(args.query.toLowerCase())
                })
            }
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