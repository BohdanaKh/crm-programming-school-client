const baseURL = 'http://localhost:5100'

const auth = '/login'
const users = '/users'
const orders = '/orders'
const groups = '/groups'
const adminPanel = '/adminPanel'
const comments = '/comments'
const urls = {
    auth: {
        login: auth,
        refresh: '/refresh',
    },
    users: {
        users,
        byId: (id:number): string => `${users}/${id}`,
        activate: (id:number): string => `${users}/activate/${id}`,
        ban: (id:number): string => `${users}/ban/${id}`,
        unban: (id:number): string => `${users}/unban/${id}`,
        activateAccount: (activationToken:string): string =>  `/activate/${activationToken}`,
    },
    orders: {
        orders,
        byId: (id:number): string => `${orders}/${id}`
    },
    groups: {
        groups
    },
    adminPanel: {
        adminPanel
    },
    comments: {
        comments,
        create: (orderId: number): string => `${comments}/${orderId}`,
    }


}


export {
    baseURL,
    urls
}