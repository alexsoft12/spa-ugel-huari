import vuex from 'vuex'
import * as auth from './modules/auth'

export default new vuex.Store({
    strict: true,
    modules: {
        auth,
    }
})