const HOST_API = "http://10.0.0.12:3001/v1"

export const api = {
    HOST : "http://10.0.0.12:3000",
    HOST_API : HOST_API,
    USERS : {
        SIGN_IN : `${HOST_API}/users/sign-in`,
        SIGN_UP : `${HOST_API}/users/sign-up`
    },
    MODULES : {
        ADD : `${HOST_API}/modules/module`,
        GET : `${HOST_API}/modules/module`,
        ADD_ACTION : `${HOST_API}/modules/action`
    },
    CATALOGS : {
        ADD : `${HOST_API}/catalogs/catalog`,
        GET : `${HOST_API}/catalogs/catalog`
    },
    END_POINT : "http://10.0.0.12:3001",
    NAME_APP : 'BSL System'
}
// const HOST_API = "http://192.168.0.4:3001/v1"

// export const api = {
//     HOST : "http://192.168.0.4:3000",
//     HOST_API : HOST_API,
//     USERS : {
//         SIGN_IN : `${HOST_API}/users/sign-in`
//     },
//     END_POINT : "http://192.168.0.4:3001",
//     NAME_APP : 'BSL System'
// }