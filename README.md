# VR Cafe TodoList

Een moderne Todo-app gebouwd met Astro en React, inclusief dark mode, categoriefilters, lokaal opgeslagen taken en vloeiende animaties.

<details>
  <summary>Inhoud</summary>
  <ol>
    <li><a href="#about-the-project">Over dit project</a></li>
    <li><a href="#features">Functies</a></li>
    <li><a href="#built-with">Gebouwd met</a></li>
    <li><a href="#getting-started">Aan de slag</a></li>
    <li><a href="#usage">Gebruik</a></li>
  </ol>
</details>

## Over dit project

Dit project is een Todo-lijstapplicatie gebouwd met Astro en React. Het bevat:

- een responsieve interface met Tailwind CSS
- vloeiende lijstanimaties met `@formkit/auto-animate`
- categorie-filters voor `Werk`, `School` en `Prive`
- taken die lokaal worden opgeslagen met `localStorage`
- dark mode ondersteuning met voorkeur opgeslagen in `localStorage`
- een thema-schakelaar in de footer

## Functies

- Todo's toevoegen en verwijderen
- Todo's markeren als gedaan / ongedaan
- Filteren op categorie of alles tonen
- Gescheiden secties voor actieve en voltooide taken
- Soepele lijstanimaties bij toevoegen, verwijderen en verplaatsen
- Dark mode die rekening houdt met opgeslagen voorkeur en systeemkleurenschema

## Gebouwd met

- [Astro](https://astro.build/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [@formkit/auto-animate](https://auto-animate.formkit.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

## Aan de slag

### Vereisten

Zorg dat Node.js is geïnstalleerd (bij voorkeur Node 22+).

### Installatie

1. clone de repository:
   ```sh
   git clone
   cd Todo_App
   ```
2. Installeer de dependencies:
   ```sh
   npm install
   ```
3. Start de development server:
   ```sh
   npm run dev
   ```
4. Open de lokale URL die in de terminal verschijnt.

## Gebruik

- Gebruik de plusknop om een nieuwe todo toe te voegen
- Kies een categorie en voer de taaktekst in
- Zet het vinkje aan om een taak als voltooid te markeren
- Verwijder taken met het prullenbak-icoon
- Wissel van theme met de knop in de footer
- De themavoorkeur wordt automatisch opgeslagen in `localStorage`

## Aantekeningen

- De app start standaard in dark mode als er geen gebruikersvoorkeur is opgeslagen
- Als er geen opgeslagen voorkeur is, volgt de app het systeemkleurenschema via `window.matchMedia("(prefers-color-scheme: dark)")`
- Todo's worden lokaal opgeslagen in de browser en blijven bewaard na opnieuw laden
- Ik heb aria‑labels toegevoegd zodat de website beter toegankelijk is voor alle gebruikers

<p align="right">(<a href="#vr-cafe-todolist">terug naar boven</a>)</p>
