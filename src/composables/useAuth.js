import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

export function useAuth() {
  const userStore = useUserStore();
  const router = useRouter();

  const handleLogout = async () => {
    await userStore.logoutUser();
    router.push("/");
  };

  return {
    userStore,
    handleLogout,
  };
}
