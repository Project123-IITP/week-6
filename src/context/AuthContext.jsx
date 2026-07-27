import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'

const AuthContext = createContext(null)
const STORAGE_KEY = 'shopzone_auth'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : null
    } catch (error) {
      console.error('Failed to read auth state from storage:', error)
      return null
    }
  })

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      } else {
        localStorage.removeItem(STORAGE_KEY)
      }
    } catch (error) {
      console.error('Failed to persist auth state:', error)
    }
  }, [user])

  const loginAsGuest = useCallback(() => {
    setUser({
      name: 'Guest Shopper',
      email: 'guest@shopzone.com',
      role: 'guest',
      loggedInAt: new Date().toISOString(),
    })
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      loginAsGuest,
      logout,
    }),
    [user, loginAsGuest, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
