MOBASHShera LOVE WEBSITE — FIREBASE SETUP
========================================

FILES
- index.html: login screen and romantic website
- style.css: light pink styling and sunset background
- script.js: Firebase Email/Password login, love letters, countdown, hearts and music toggle
- assets/romantic-background.png: clean sunset couple background (no text baked into image)
- assets/romantic.mp3: optional music file you add yourself

RUN LOCALLY
1. Extract this ZIP.
2. Open the folder in VS Code.
3. Use the Live Server extension and open index.html through Live Server.
   Do not rely on opening the file directly with file:// because Firebase module imports may fail.

CREATE USERNAMES / PASSWORDS (IMPORTANT)
This website uses Firebase Email/Password Authentication. It does not have a shared default password.
1. Open https://console.firebase.google.com/ and select project: mobasshera.
2. Go to Build > Authentication > Get started (if needed).
3. Open Sign-in method / Sign-in providers and enable Email/Password. Save.
4. Open Authentication > Users > Add user.
5. Add one email and a strong password for yourself. Add a separate email and password for Mobashshera.
6. Use those email addresses in the website's “Email / User ID” field, and the corresponding passwords in Password.
7. Store the passwords privately; do not put them in HTML/JavaScript or share them in public. If a password is lost, reset it in Firebase Authentication.

NOTE ABOUT USERNAME
Firebase Email/Password sign-in expects an email address, not a custom nickname or phone number. The “Email / User ID” label therefore means the registered email address. If you need true custom usernames, a separate backend mapping is required; do not store passwords yourself in localStorage or JavaScript.

FIREBASE CONFIG
The config you supplied for project mobasshera has been added to script.js. A Firebase web config/API key is normally intended to be present in client-side code; protect your data with Firebase Security Rules and authorized accounts. Never embed passwords or service-account keys in this website.

SECURITY NOTE
A login screen alone does not make static HTML/source files private. Do not put sensitive content directly in client-side HTML/JS. For genuinely private data, store it in Firestore and configure restrictive Security Rules.

WEDDING COUNTDOWN
The current countdown target is November 1, 2027. In script.js, edit: const weddingDate = new Date(2027, 10, 1, 0, 0, 0); Month is zero-based (10 = November). Update it to the actual date if needed.

MUSIC
Add an audio file you are allowed to use at assets/romantic.mp3. Music starts only when the user taps the Music button.
