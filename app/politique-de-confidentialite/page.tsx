import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité – Angeli Visions (RGPD)",
}

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-12 prose prose-invert">
      <h1>Politique de Confidentialité – Angeli Visions</h1>
      <p><em>Dernière mise à jour : août 2025</em></p>
      <h2>1. Responsable du traitement</h2>
      <p>
        Angeli Visions – 79, rue du Général Leclerc, 78400 Chatou, France<br />
        SIRET : 898 018 221 00017<br />
        E-mail : <a href="mailto:contact@angelivisions.com">contact@angelivisions.com</a>
      </p>
      <p>
        Nous sommes responsables du traitement de vos données personnelles collectées via notre site
        <Link href="https://www.angelivisions.com"> www.angelivisions.com</Link>, conformément au RGPD et à la Loi Informatique et Libertés.
      </p>
      <h2>2. Données collectées</h2>
      <ul>
        <li>Identification : nom, prénom, e-mail, téléphone (optionnel)</li>
        <li>Connexion : adresse IP, données de navigation, cookies</li>
        <li>Transaction NFT / contrats : informations liées au portefeuille crypto et données contractuelles</li>
        <li>Communication : contenu de vos messages et pièces jointes</li>
      </ul>
      <h2>3. Finalités et bases légales</h2>
      <p>Vos données sont utilisées pour :</p>
      <ul>
        <li>Gestion de compte et services : exécution d’un contrat ou mesures précontractuelles</li>
        <li>Envoi d’informations et prospection : consentement explicite</li>
        <li>Sécurité du site et prévention des fraudes : intérêt légitime</li>
        <li>Obligations légales et fiscales : respect de la législation en vigueur</li>
      </ul>
      <h2>4. Cookies</h2>
      <p>
        Nous utilisons des cookies techniques, fonctionnels et de mesure d’audience. Vous pouvez gérer vos préférences depuis le bandeau cookies ou via les paramètres de votre navigateur.
      </p>
      <h2>5. Destinataires</h2>
      <ul>
        <li>Équipes internes habilitées d’Angeli Visions</li>
        <li>Prestataires techniques et partenaires contractuellement tenus à la confidentialité</li>
        <li>Autorités compétentes si la loi l’exige</li>
      </ul>
      <h2>6. Transferts hors UE</h2>
      <p>Si un transfert de données hors EEE est nécessaire, il sera encadré par des garanties appropriées.</p>
      <h2>7. Durée de conservation</h2>
      <ul>
        <li>Données clients/prospects : 3 ans après le dernier contact</li>
        <li>Données contractuelles et facturation : 10 ans (obligation légale)</li>
        <li>Cookies : 13 mois maximum</li>
      </ul>
      <h2>8. Vos droits</h2>
      <p>
        Accès, rectification, effacement, limitation, opposition, portabilité. Pour exercer ces droits :
        <a href="mailto:contact@angelivisions.com"> contact@angelivisions.com</a> ou courrier à Angeli Visions – 79, rue du Général Leclerc, 78400 Chatou.
      </p>
      <h2>9. Sécurité</h2>
      <p>Mesures techniques et organisationnelles adaptées pour protéger vos données.</p>
      <h2>10. Modifications</h2>
      <p>Cette politique peut être modifiée à tout moment. Toute mise à jour sera publiée sur cette page.</p>
    </main>
  )
}
