// Stockage temporaire partagé pour les codes 2FA
class TempStorage {
  private codes = new Map<string, { code: string; expires: number }>()

  set(email: string, data: { code: string; expires: number }) {
    this.codes.set(email, data)
    console.log(`💾 Code stocké pour ${email}: ${data.code}`)
  }

  get(email: string) {
    const data = this.codes.get(email)
    console.log(
      `🔍 Récupération code pour ${email}:`,
      data ? `${data.code} (expire: ${new Date(data.expires).toLocaleTimeString()})` : "non trouvé",
    )
    return data
  }

  delete(email: string) {
    const deleted = this.codes.delete(email)
    console.log(`🗑️ Code supprimé pour ${email}:`, deleted)
    return deleted
  }

  cleanup() {
    const now = Date.now()
    for (const [email, data] of this.codes.entries()) {
      if (now > data.expires) {
        this.codes.delete(email)
        console.log(`🧹 Code expiré supprimé pour ${email}`)
      }
    }
  }
}

// Instance singleton
const tempStorage = new TempStorage()

// Nettoyage automatique toutes les minutes
setInterval(() => {
  tempStorage.cleanup()
}, 60000)

export default tempStorage
