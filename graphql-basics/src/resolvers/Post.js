const Post = {
    author(parent, args, { db }, info) {
        return db.users.find((user) => {
            return user.id === parent.author
        })
    },
    comments(parent, ags, { db }, info) {
        return db.comments.filter((comment) => {
            return comment.post === parent.id
        })
    }
}

export { Post as default }