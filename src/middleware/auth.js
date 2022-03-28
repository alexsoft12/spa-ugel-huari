import { useAuthStore } from "../store/auth";
export default function auth({ to, next }) {
  const loginQuery = { path: "/login", query: { redirect: to.fullPath } };
  const authStore = useAuthStore();

  if (!authStore.authUser) {
    authStore.getAuthUser().then(() => {
      if (!authStore.authUser) next.next(loginQuery);
      else next.next();
    });
  } else {
    next.next();
  }
}
