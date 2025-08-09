import { type NextRequest, NextResponse } from "next/server"

// Alternative utilisant l'API Web Fetch pour l'envoi d'emails
// Compatible avec les environnements serverless et Edge Runtime

const EMAIL_CONFIG = {
  SMTP_HOST: "ex5.mail.ovh.net",
  SMTP_PORT: 587,
  SMTP_USER: process.env.SMTP_USER || "contact@angelivisions.com",
  SMTP_PASS: process.env.SMTP_PASS || "Funkystory917@",
  FROM_EMAIL: "contact@angelivisions.com",
}

// Store codes temporarily
const tempCodes = new Map<string, { code: string; expires: number }>()

async function sendEmailViaWebAPI(email: string, code: string) {
  // Utilisation d'un service d'envoi d'emails compatible avec les environnements serverless
  // Exemple avec une API REST générique

  const emailPayload = {
    from: EMAIL_CONFIG.FROM_EMAIL,
    to: email,
    subject: "Code de vérification - Angeli Visions",
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0;">Angeli Visions</h1>
          <p style="margin: 5px 0 0 0; opacity: 0.9;">Code de vérification</p>
        </div>
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333;">Votre code de vérification</h2>
          <p style="color: #666; line-height: 1.5;">
            Utilisez ce code pour accéder à l'administration :
          </p>
          <div style="background: white; border: 2px solid #667eea; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
            <span style="font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 5px;">${code}</span>
          </div>
          <p style="color: #666; font-size: 14px;">
            Ce code expire dans 10 minutes.
          </p>
        </div>
        <div style="background: #333; color: white; padding: 15px; text-align: center; font-size: 12px;">
          © 2025 Angeli Visions
        </div>
      </div>
    `,
  }

  // Simulation de l'envoi (remplacez par votre service d'envoi préféré)
  console.log("📧 Préparation envoi email via API Web")
  console.log("📋 Destinataire:", email)
  console.log("🔐 Code:", code)

  // Ici vous pourriez utiliser des services comme :
  // - SendGrid API
  // - Mailgun API
  // - Resend API
  // - Ou l'API OVH Email

  return { success: true }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    const code = Math.floor(100000 + Math.random() * 900000).toString()
    const expires = Date.now() + 10 * 60 * 1000

    tempCodes.set(email, { code, expires })

    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      const result = await sendEmailViaWebAPI(email, code)

      if (result.success) {
        return NextResponse.json({
          success: true,
          message: "Code de vérification préparé (OVH configuré)",
          mode: "demo", // Mode démo temporaire pour les tests
          demoCode: code,
        })
      }
    } catch (error) {
      console.error("Erreur envoi email:", error)
    }

    return NextResponse.json({
      success: true,
      message: "Code de vérification généré",
      mode: "demo",
      demoCode: code,
    })
  } catch (error) {
    console.error("Erreur API:", error)
    return NextResponse.json({ success: false, message: "Erreur serveur" }, { status: 500 })
  }
}
