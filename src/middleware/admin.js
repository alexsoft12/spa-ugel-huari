export default function admin({next, store}) {
    if (store.getters["auth/isAdmin"]) next.next();
    else next.next({name: "notFound"});
}
