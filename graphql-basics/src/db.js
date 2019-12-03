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
}, {
    id: '3',
    name: 'Mack',
    email: 'fag@email.com',
    age: 50
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

const db = {
    users, 
    posts,
    comments
}

export { db as default }