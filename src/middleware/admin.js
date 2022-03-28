import { useAuthStore } from "../store/auth";

export default function admin({ next }) {
  const authStore = useAuthStore();
  if (authStore.isAdmin) next.next();
  else next.next({ name: "notFound" });
}
