import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Politique cookies",
  description: "Politique cookies – Angeli Visions",
}

export default function PolitiqueCookiesPage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-12 prose prose-invert">
      <h1>Politique Cookies – Angeli Visions</h1>
      <h2>1. Qu’est-ce qu’un cookie ?</h2>
      <p>Un cookie est un petit fichier texte déposé sur votre appareil lors de la visite de notre site.</p>
      <h2>2. Types de cookies utilisés</h2>
      <ul>
        <li>Cookies nécessaires</li>
        <li>Cookies fonctionnels</li>
        <li>Cookies analytiques</li>
        <li>Cookies tiers</li>
      </ul>
      <h2>3. Gestion des cookies</h2>
      <p>Vous pouvez gérer vos préférences via le bandeau cookies ou les paramètres de votre navigateur.</p>
      <h2>4. Durée de conservation</h2>
      <p>Les cookies sont conservés pour une durée maximale de 13 mois.</p>
      <h2>5. Contact</h2>
      <p>Pour toute question relative aux cookies : <a href="mailto:contact@angelivisions.com">contact@angelivisions.com</a></p>
    </main>
  )
}
