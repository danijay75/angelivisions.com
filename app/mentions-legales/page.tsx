import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales – Angeli Visions",
}

export default function MentionsLegalesPage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-12 prose prose-invert">
      <h1>Mentions Légales – Angeli Visions</h1>

      <h2>Éditeur du site</h2>
      <p>
        Angeli Visions – SIRET : 898 018 221 00017<br />
        Siège social : 79, rue du Général Leclerc, 78400 Chatou, France<br />
        E-mail : <a href="mailto:contact@angelivisions.com">contact@angelivisions.com</a><br />
        Directeur de la publication : Dani JELASSI
      </p>

      <h2>Hébergeur</h2>
      <p>
        OVH SAS, filiale d’OVH Groupe SA<br />
        2, rue Kellermann – 59100 Roubaix, France<br />
        RCS Lille Métropole : 424 761 419 00045 – Code APE : 2620Z – TVA : FR 22 424 761 419<br />
        Site web : <a href="https://www.ovhcloud.com" target="_blank" rel="noopener noreferrer">ovhcloud.com</a>
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        Tous les éléments publiés sur www.angelivisions.com (textes, images, logos, vidéos, etc.) sont protégés par le Code de la propriété intellectuelle. Leur utilisation sans autorisation est interdite.
      </p>

      <h2>Responsabilité</h2>
      <p>
        Angeli Visions ne pourra être tenue responsable des dommages directs ou indirects résultant de l’accès ou de l’utilisation du site, y compris l’inaccessibilité, la perte de données, ou la présence de virus.
      </p>
    </main>
  )
}
