"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect, type ReactNode } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

type AuthContextType = {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is already logged in
    const checkLoginStatus = async () => {
      try {
        const value = await AsyncStorage.getItem("@auth_token")
        if (value !== null) {
          setIsAuthenticated(true)
        }
      } catch (e) {
        console.error("Error reading auth token", e)
      }
    }

    checkLoginStatus()
  }, [])

  const login = async (email: string, password: string) => {
    // This is a simple mock login
    // In a real app, you would verify credentials with an API
    if (email.trim() && password.trim()) {
      try {
        // Store some auth data in AsyncStorage
        await AsyncStorage.setItem("@auth_token", "dummy_token")
        setIsAuthenticated(true)
        return true
      } catch (e) {
        console.error("Error storing auth token", e)
        return false
      }
    }
    return false
  }

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("@auth_token")
      setIsAuthenticated(false)
    } catch (e) {
      console.error("Error removing auth token", e)
    }
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
