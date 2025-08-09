import { type NextRequest, NextResponse } from "next/server"
import tempStorage from "@/lib/temp-storage"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ success: false, message: "Email requis" }, { status: 400 })
    }

    // Generate a random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    const expires = Date.now() + 10 * 60 * 1000 // 10 minutes

    // Store the code using shared storage
    tempStorage.set(email, { code, expires })

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log(`📧 [MODE DEMO] Code généré pour ${email}: ${code}`)

    return NextResponse.json({
      success: true,
      message: "Code de vérification généré (mode démonstration)",
      mode: "demo",
      demoCode: code,
    })
  } catch (error) {
    console.error("Erreur lors de la génération du code 2FA:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la génération du code",
      },
      { status: 500 },
    )
  }
}
