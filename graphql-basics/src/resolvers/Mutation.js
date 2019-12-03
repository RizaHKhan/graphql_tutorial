const Mutation = {    
    deleteComment(parent, args, { db }, info) {
        const commentIndex = db.comments.findIndex((comment) => comment.id === args.id)

        if(commentIndex === -1) {
            throw new Error('Comment not found')
        }

        const deletedComment = db.comments.splice(commentIndex, 1)

        return deletedComment[0]
    },
    deletePost(parent, args, { db }, info) {
        const postIndex = db.posts.findIndex((post) => post.id === args.id)

        if(postIndex === -1) {
            throw new Error ('Post no found')
        }

        const deletedPosts = db.posts.splice(postIndex, 1)

        db.comments = db.comments.filter((comment) => comment.post != args.id)

        return deletedPosts[0]
    },
    deleteUser(parent, args, { db }, info) {
        const userIndex = db.users.findIndex((user) => user.id === args.id)

        if(userIndex === -1) {
            throw new Error('User not found')
        }

        const deletedUsers = users.splice(userIndex, 1)

        db.posts = db.posts.filter((post) => {
            const match = post.author === args.id

            if(match) {
                db.comments = db.comments.filter((comment) => comment.post != post.id)
            }

            return !match
        })

        db.comments = db.comments.filter((comment) => comment.authoer !== args.id)

        return deletedUsers[0]

    },
    createUser(parent, args, { db }, info) {
        const emailTaken = db.users.some((user) => user.email === args.data.email)

        if (emailTaken) {
            throw new Error('Email is already in use')
        }

        const user = {
            id: uuidv4(),
            ...args.data
        }

        db.users.push(user)

        return user
    },
    createPost(parent, args, { db }, info) {
        const userExists = db.users.some((user) => user.id === args.data.author)  

        if(!userExists) {
            throw new Error('User not found')
        }

        const post = {
            id: uuidv4(),
            ...args.data
        }

        db.posts.push(post)

        return post
    },
    createComment(parent, args, { db }, info) {
        const userExists = db.users.some((user) => user.id === args.data.author)
        const postExists = sb.posts.some((post) => post.id === args.data.post && post.published === true)
        
        if(!userExists || !postExists) {
            throw new Error('Sorry cannot post comment')
        }
        
        const comment = {
            ...args.data
        }

        db.comments.push(comment)

        return comment
    },
    updateUser(parent, {id, data}, { db }, info) {
        const user = db.users.find((user) => user.id === id)

        if (!user) {
            throw new Error('User not found')
        }

        if (typeof data.email === 'string') {
            const emailTaken = db.users.some((user) => user.email === data.email)

            if (emailTaken) {
                throw new Error('')
            }

            user.email = data.email
        }

        if (typeof data.name === 'string') {
            user.name = data.name
        }

        if (typeof data.age !== 'undefined') {
            user.age = data.age
        }

        return user
    },
    updatePost(parent, {id, data}, { db }, info) {
        const post = db.posts.find(post => post.id === id)

        if (!post) {
            throw new Error('Post not found')
        }

        if(typeof data.title === 'string') {
            post.title = data.title
        }    

        if(typeof data.body === 'string') {
            post.body = data.body
        }

        if(typeof data.published === 'boolean') {
            post.published = data.published
        }

        return post
    },
    updateComment(parent, {id, data}, { db }, info) {
        const comment = db.comments.find(comment => comment.id === id)

        if(!comment) {
            throw new Error('Comment was not found')
        }

        if(typeof data.text === 'string') {
            comment.text = data.text
        }

        return comment
    }

}


export { Mutation as default }