import { create } from 'zustand';
// import { persist } from 'zustand/middleware';


interface AuthState {
    isLoggedIn: boolean;
    token: string;
}

interface AuthActions {

    logout: () => Promise<void>;
    setToken: (token: AuthState["token"]) => void;
    setIsLoggedIn: (isLoggedIn: AuthState["isLoggedIn"]) => void;
    resetAuthStore: () => void
}

const initialState: AuthState = {
    isLoggedIn: false,
    token: "",
}
const useAuthStore = create<AuthState & AuthActions>()((set) => ({
    ...initialState,

    logout: async () => {
        set({ isLoggedIn: false, token: '' });

        // localStorage.clear();
    },
    setToken: (token: AuthState["token"]) => { set({ token: token }) },
    setIsLoggedIn: (isLoggedIn: AuthState["isLoggedIn"]) => { set({ isLoggedIn: isLoggedIn }) },
    resetAuthStore: () => { set(initialState) }

}))
    ;


export default useAuthStore;