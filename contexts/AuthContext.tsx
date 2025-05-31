"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect, type ReactNode } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

type User = {
  id: number
  name: string
  email: string
  role: string
  permissions: string[]
  position: string | null
}

type AuthContextType = {
  isAuthenticated: boolean
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check if user is already logged in
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("@auth_token")
        const userData = await AsyncStorage.getItem("@user_data")
        if (token !== null && userData !== null) {
          setIsAuthenticated(true)
          setUser(JSON.parse(userData))
        }
      } catch (e) {
        console.error("Error reading auth data", e)
      }
    }

    checkLoginStatus()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("https://qpa-api.starlightwebsolutions.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.success) {
        // Store auth data
        await AsyncStorage.setItem("@auth_token", data.data.token)
        await AsyncStorage.setItem("@user_data", JSON.stringify(data.data.user))
        setIsAuthenticated(true)
        setUser(data.data.user)
        return true
      }
      return false
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error during login:", error.message)
      } else {
        console.error("Unknown error during login")
      }
      return false
    }
  }

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("@auth_token")
      await AsyncStorage.removeItem("@user_data")
      setIsAuthenticated(false)
      setUser(null)
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error during logout:", error.message)
      } else {
        console.error("Unknown error during logout")
      }
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
