import { createContext, useContext, useState } from 'react'
import axios from 'axios'

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/auth`,
    withCredentials: true,
})

const AuthContext = createContext(null)

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('authUser'))
        } catch {
            return null
        }
    })

    async function login(credentials) {
        const { data } = await api.post('/login', credentials)
        const authenticatedUser = { name: data.name, email: data.email, token: data.token }
        localStorage.setItem('authUser', JSON.stringify(authenticatedUser))
        setUser(authenticatedUser)
        return data
    }

    async function register(details) {
        const { data } = await api.post('/register', details)
        return data
    }

    return (
        <AuthContext.Provider value={{ user, login, register }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}
