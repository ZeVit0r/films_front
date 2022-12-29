import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { tstapi } from "../services/api";

interface AuthProvider {
    children: ReactNode;
}

interface AuthResponse {
    user: {
        token: string;
        email: string;
        name: string;
    }
}

interface User {
    email: string;
    name: string;
}

interface AuthContextData {
    user: User | null;
    signOut: () => void;
    signIn: (email:string, password:string) => void;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider( props: AuthProvider){
    const [user, setUser] = useState<User | null>(null)

    async function signIn(emailLogin: string, password: string) {
        const response = await tstapi.post<AuthResponse>('/auth/signin', {
            email: emailLogin,
            password: password
        })

        const { token, email, name } = response.data.user

        localStorage.setItem('@tst:token', token)

        tstapi.defaults.headers.common.authorization = `Bearer ${token}`

        setUser({email: email, name: name})
    }

    function signOut() {
        setUser(null)
        localStorage.removeItem('@tst:token')
    }

    useEffect( () => {
        const token = localStorage.getItem('@tst:token')
        if(token){
            tstapi.defaults.headers.common.authorization = `Bearer ${token}`

            tstapi.get<User>('/auth/me').then(response => {
                setUser(response.data)
            })
        }
    }, [])

    return (
        <AuthContext.Provider value={{signIn, user, signOut}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}