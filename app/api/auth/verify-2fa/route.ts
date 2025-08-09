import { type NextRequest, NextResponse } from "next/server"
import tempStorage from "@/lib/temp-storage"

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json()

    if (!email || !code) {
      return NextResponse.json({ success: false, message: "Email et code requis" }, { status: 400 })
    }

    console.log(`🔍 Vérification du code ${code} pour ${email}`)

    // Simulate verification delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Get stored code using shared storage
    const storedData = tempStorage.get(email)

    if (!storedData) {
      console.log(`❌ Aucun code trouvé pour ${email}`)
      return NextResponse.json(
        {
          success: false,
          message: "Aucun code trouvé. Veuillez demander un nouveau code.",
        },
        { status: 400 },
      )
    }

    // Check if code is expired
    if (Date.now() > storedData.expires) {
      tempStorage.delete(email)
      console.log(`⏰ Code expiré pour ${email}`)
      return NextResponse.json(
        {
          success: false,
          message: "Code expiré. Veuillez demander un nouveau code.",
        },
        { status: 400 },
      )
    }

    // Verify code
    if (storedData.code === code) {
      // Clean up the used code
      tempStorage.delete(email)
      console.log(`✅ Code vérifié avec succès pour ${email}`)

      return NextResponse.json({
        success: true,
        message: "Code vérifié avec succès",
      })
    } else {
      console.log(`❌ Code incorrect pour ${email}. Attendu: ${storedData.code}, Reçu: ${code}`)
      return NextResponse.json(
        {
          success: false,
          message: "Code incorrect",
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("Erreur lors de la vérification 2FA:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la vérification",
      },
      { status: 500 },
    )
  }
}
