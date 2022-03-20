export default function auth({to, next, store}) {
    const loginQuery = {path: "/login", query: {redirect: to.fullPath}};

    if (!store.getters["auth/authUser"]) {
        store.dispatch("auth/getAuthUser").then(() => {
            if (!store.getters["auth/authUser"]) next.next(loginQuery);
            else next.next();
        });
    } else {
        next.next();
    }
}
