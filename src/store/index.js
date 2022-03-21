import vuex from 'vuex'
import * as auth from './modules/auth'
import * as authorization from './modules/authorization'

export default new vuex.Store({
    strict: true,
    modules: {
        auth,
        authorization,
    }
})