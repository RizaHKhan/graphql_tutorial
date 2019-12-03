const Query = {
    comments(parent, args, { db }, info) {
        return db.comments
    },
    posts(parent, args, { db }, info) {
        if(!args.query) {
            return db.posts
        } else {
            return db.posts.filter((post) => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())

                return isTitleMatch || isBodyMatch
            })
        }
    },
    users(parent, args, { db }, info) {
        if(!args.query) {
            return db.users
        } else {
            return db.users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        }
    },
    add(parent, args, { db }, info) {
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

export { Query as default }