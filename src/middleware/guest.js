import { useAuthStore } from "../store/auth";

export default function guest({ next }) {
  const storageItem = localStorage.getItem("guest");
  const authStore = useAuthStore();

  //console.log(store.authUser)
  if (storageItem === "isNotGuest" && !authStore.authUser) {
    authStore.getAuthUser().then(() => {
      if (authStore.authUser) {
        next.next({ name: "dashboard" });
      } else {
        authStore.setGuest({ value: "isGuest" });
        next.next();
      }
    });
  } else {
    next.next();
  }
}
