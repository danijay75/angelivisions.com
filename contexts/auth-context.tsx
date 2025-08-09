"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
  twoFactorEnabled: boolean
}

interface AuthContextType {
  user: User | null
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; requiresTwoFactor?: boolean; message?: string; demoCode?: string }>
  verifyTwoFactor: (code: string) => Promise<{ success: boolean; message?: string }>
  logout: () => void
  resetPassword: (email: string) => Promise<{ success: boolean; message: string }>
  isLoading: boolean
  pendingUser: User | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [pendingUser, setPendingUser] = useState<User | null>(null)

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem("admin_user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Erreur parsing user data:", error)
        localStorage.removeItem("admin_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      console.log(`🔐 Tentative de connexion pour ${email}`)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Demo credentials
      if (email === "contact@angelivisions.com" && password === "admin123") {
        const userData = {
          id: "1",
          email: "contact@angelivisions.com",
          name: "Administrateur",
          twoFactorEnabled: true,
        }

        console.log(`✅ Identifiants valides pour ${email}`)

        if (userData.twoFactorEnabled) {
          setPendingUser(userData)

          console.log(`📧 Envoi du code 2FA pour ${email}`)

          // Send 2FA code via API
          try {
            const response = await fetch("/api/auth/send-2fa", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: userData.email }),
            })

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`)
            }

            const result = await response.json()
            console.log("📧 Réponse API 2FA:", result)

            setIsLoading(false)

            if (result.success) {
              return {
                success: true,
                requiresTwoFactor: true,
                message: result.message,
                demoCode: result.demoCode, // Only for demo
              }
            } else {
              return {
                success: false,
                message: result.message || "Erreur lors de l'envoi du code 2FA",
              }
            }
          } catch (error) {
            console.error("❌ Erreur API 2FA:", error)
            setIsLoading(false)
            return {
              success: false,
              message: "Erreur de connexion à l'API",
            }
          }
        } else {
          setUser(userData)
          localStorage.setItem("admin_user", JSON.stringify(userData))
          setIsLoading(false)
          return { success: true }
        }
      }

      console.log(`❌ Identifiants incorrects pour ${email}`)
      setIsLoading(false)
      return { success: false, message: "Identifiants incorrects" }
    } catch (error) {
      console.error("❌ Erreur de connexion:", error)
      setIsLoading(false)
      return { success: false, message: "Erreur de connexion" }
    }
  }

  const verifyTwoFactor = async (code: string) => {
    if (!pendingUser) {
      return { success: false, message: "Session expirée" }
    }

    setIsLoading(true)

    try {
      console.log(`🔍 Vérification du code 2FA: ${code}`)

      const response = await fetch("/api/auth/verify-2fa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: pendingUser.email,
          code: code,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log("🔍 Réponse vérification 2FA:", result)

      if (result.success) {
        console.log(`✅ Code 2FA vérifié avec succès`)
        setUser(pendingUser)
        localStorage.setItem("admin_user", JSON.stringify(pendingUser))
        setPendingUser(null)
        setIsLoading(false)
        return { success: true, message: result.message }
      } else {
        console.log(`❌ Code 2FA incorrect`)
        setIsLoading(false)
        return { success: false, message: result.message }
      }
    } catch (error) {
      console.error("❌ Erreur vérification 2FA:", error)
      setIsLoading(false)
      return { success: false, message: "Erreur de vérification" }
    }
  }

  const logout = () => {
    console.log("🚪 Déconnexion")
    setUser(null)
    setPendingUser(null)
    localStorage.removeItem("admin_user")
  }

  const resetPassword = async (email: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email === "contact@angelivisions.com") {
      return {
        success: true,
        message: "Un email de réinitialisation a été envoyé à votre adresse.",
      }
    }

    return {
      success: false,
      message: "Aucun compte trouvé avec cette adresse email.",
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        verifyTwoFactor,
        logout,
        resetPassword,
        isLoading,
        pendingUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
