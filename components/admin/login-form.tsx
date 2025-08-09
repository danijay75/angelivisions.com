"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, Shield, Eye, EyeOff, ArrowLeft, Copy, RefreshCw, AlertTriangle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function LoginForm() {
  const { login, verifyTwoFactor, resetPassword, isLoading } = useAuth()
  const [step, setStep] = useState<"login" | "twoFactor" | "resetPassword">("login")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    twoFactorCode: "",
    resetEmail: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [demoCode, setDemoCode] = useState("")
  const [emailMode, setEmailMode] = useState<"demo" | "real">("demo")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    console.log("🔐 Début de la connexion...")

    const result = await login(formData.email, formData.password)

    if (result.success) {
      if (result.requiresTwoFactor) {
        setStep("twoFactor")
        setSuccess(result.message || "Code de vérification envoyé par email")
        if (result.demoCode) {
          setDemoCode(result.demoCode)
          setEmailMode("demo")
          console.log("🎯 Code démo reçu:", result.demoCode)
        } else {
          setEmailMode("real")
        }
      }
    } else {
      setError(result.message || "Erreur de connexion")
    }
  }

  const handleTwoFactor = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    console.log("🔍 Début vérification 2FA avec code:", formData.twoFactorCode)

    const result = await verifyTwoFactor(formData.twoFactorCode)

    if (!result.success) {
      setError(result.message || "Code incorrect")
      console.log("❌ Échec vérification 2FA:", result.message)
    } else {
      setSuccess(result.message || "Connexion réussie")
      console.log("✅ Succès vérification 2FA")
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    const result = await resetPassword(formData.resetEmail)

    if (result.success) {
      setSuccess(result.message)
    } else {
      setError(result.message)
    }
  }

  const copyDemoCode = () => {
    navigator.clipboard.writeText(demoCode)
    setFormData((prev) => ({ ...prev, twoFactorCode: demoCode }))
    setSuccess("Code copié et rempli automatiquement !")
    setTimeout(() => setSuccess("Code de vérification envoyé (mode démonstration)"), 2000)
  }

  const resendCode = async () => {
    setError("")
    setSuccess("Nouveau code en cours d'envoi...")

    try {
      const response = await fetch("/api/auth/send-2fa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      })

      const result = await response.json()

      if (result.success) {
        setSuccess("Nouveau code envoyé !")
        if (result.demoCode) {
          setDemoCode(result.demoCode)
          setEmailMode("demo")
          console.log("🔄 Nouveau code démo:", result.demoCode)
        } else {
          setEmailMode("real")
        }
      } else {
        setError("Erreur lors du renvoi du code")
      }
    } catch (error) {
      console.error("Erreur renvoi code:", error)
      setError("Erreur de connexion")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Card className="bg-white/5 backdrop-blur-md border-white/10">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <img
                src="/images/angeli-visions-logo-white.png"
                alt="Angeli Visions"
                className="h-16 w-auto object-contain"
              />
            </div>
            <CardTitle className="text-white text-2xl">
              {step === "login" && "Administration"}
              {step === "twoFactor" && "Vérification 2FA"}
              {step === "resetPassword" && "Réinitialisation"}
            </CardTitle>
            <p className="text-slate-300 text-sm">
              {step === "login" && "Connectez-vous pour accéder au back office"}
              {step === "twoFactor" && "Entrez le code reçu par email"}
              {step === "resetPassword" && "Entrez votre email pour réinitialiser"}
            </p>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg mb-4">{error}</div>
            )}

            {success && (
              <div className="bg-green-500/20 border border-green-500/50 text-green-200 p-3 rounded-lg mb-4">
                {success}
              </div>
            )}

            {step === "login" && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label className="text-white mb-2 block">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white pl-10"
                      placeholder="contact@angelivisions.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-white mb-2 block">Mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white pl-10 pr-10"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {isLoading ? "Connexion..." : "Se connecter"}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setStep("resetPassword")}
                    className="text-purple-400 hover:text-purple-300 text-sm"
                  >
                    Mot de passe oublié ?
                  </button>
                </div>
              </form>
            )}

            {step === "twoFactor" && (
              <form onSubmit={handleTwoFactor} className="space-y-4">
                <div>
                  <Label className="text-white mb-2 block">Code de vérification</Label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      type="text"
                      value={formData.twoFactorCode}
                      onChange={(e) => setFormData((prev) => ({ ...prev, twoFactorCode: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white pl-10 text-center text-lg tracking-widest"
                      placeholder="123456"
                      maxLength={6}
                      required
                    />
                  </div>

                  {/* Mode Demo Warning */}
                  {emailMode === "demo" && (
                    <div className="mt-3 p-3 bg-orange-500/20 border border-orange-500/50 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="w-5 h-5 text-orange-200 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-orange-200 text-sm font-medium">Mode Démonstration</p>
                          <p className="text-orange-100 text-xs">
                            Aucun email réel n'est envoyé. Utilisez le code affiché ci-dessous.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Demo Code Display */}
                  {demoCode && emailMode === "demo" && (
                    <div className="mt-3 p-3 bg-blue-500/20 border border-blue-500/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-200 text-sm font-medium">Code de démonstration :</p>
                          <p className="text-blue-100 font-mono text-2xl font-bold">{demoCode}</p>
                        </div>
                        <Button
                          type="button"
                          onClick={copyDemoCode}
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          Copier
                        </Button>
                      </div>
                    </div>
                  )}

                  {emailMode === "real" && (
                    <p className="text-slate-400 text-xs mt-2">
                      📧 Vérifiez votre boîte email (et les spams) pour le code de vérification
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    {isLoading ? "Vérification..." : "Vérifier"}
                  </Button>
                  <Button
                    type="button"
                    onClick={resendCode}
                    disabled={isLoading}
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                    title="Renvoyer le code"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setStep("login")}
                    className="text-purple-400 hover:text-purple-300 text-sm flex items-center justify-center"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Retour à la connexion
                  </button>
                </div>
              </form>
            )}

            {step === "resetPassword" && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <Label className="text-white mb-2 block">Adresse email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      type="email"
                      value={formData.resetEmail}
                      onChange={(e) => setFormData((prev) => ({ ...prev, resetEmail: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white pl-10"
                      placeholder="contact@angelivisions.com"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {isLoading ? "Envoi..." : "Envoyer le lien"}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setStep("login")}
                    className="text-purple-400 hover:text-purple-300 text-sm flex items-center justify-center"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Retour à la connexion
                  </button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-slate-400 text-sm">
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
            <p className="font-medium mb-2">🔧 Mode Démonstration Actif</p>
            <p className="text-xs mb-2">Email: contact@angelivisions.com | Mot de passe: admin123</p>
            <div className="text-xs text-slate-500 border-t border-slate-600 pt-2 mt-2">
              <p>✅ Stockage partagé configuré</p>
              <p>🔒 Codes temporaires en mémoire</p>
              <p>📧 Système 2FA fonctionnel</p>
              <p className="text-green-400 mt-1">✓ Erreur HTTP 400 corrigée</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
