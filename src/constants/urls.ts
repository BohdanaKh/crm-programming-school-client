const baseURL = 'http://localhost:3000/api'

const auth = '/login'
const users = '/users'
const orders = '/orders'
const groups = '/groups'
const adminPanel = '/adminPanel'
const comments = '/comments'
const urls = {
    auth: {
        login: auth,
        refresh: `${auth}/refresh`,
        me: `${auth}/me`
    },
    users: {
        users,
        byId: (id:number): string => `${users}/{id}`
    },
    orders: {
        orders,
        byId: (id:number): string => `${orders}/{id}`
    },
    groups: {
        groups
    },
    adminPanel: {
        adminPanel
    },
    comments: {
        comments
    }


}


export {
    baseURL,
    urls
}