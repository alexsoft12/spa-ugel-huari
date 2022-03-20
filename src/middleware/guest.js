export default function guest({next, store}) {
    const storageItem = localStorage.getItem('guest');
    if (storageItem === 'isNotGuest' && !store.getters['auth/authUser']) {
        store.dispatch('auth/getAuthUser').then(() => {
            if (store.getters['auth/authUser']) {
                next.next({name: 'dashboard',});
            } else {
                store.dispatch('auth/setGuest', {value: 'isGuest'});
                next.next();
            }
        });
    } else {
        next.next();
    }
}