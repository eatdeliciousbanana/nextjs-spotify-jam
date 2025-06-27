# nextjs-spotify-jam
This is a Spotify Jam clone built using Next.js. Users can listen and add songs to the queue together with friends using one Spotify account. This app works in local system and on Vercel.

## Tech Stack

* [Next.js 15](https://nextjs.org)
* [Auth.js](https://authjs.dev)
* [TailAdmin](https://tailadmin.com)
* [Upstash Redis](https://github.com/upstash/redis-js)
* [Spotify Web API](https://developer.spotify.com/documentation/web-api)

## Requirement

* One Spotify Premium Account

## Run Locally

Clone the project

```bash
git clone https://github.com/eatdeliciousbanana/nextjs-spotify-jam.git
cd nextjs-spotify-jam
```

Install dependencies

```bash
npm install
```

Start the redis server

```bash
docker compose up -d
```

Start the app server

```bash
npm run dev
```

## Environment Variables

Copy and paste `.env.example` and rename it to `.env`  
Add the following environment variables:

`SPOTIFY_CLIENT_ID`  

`SPOTIFY_CLIENT_SECRET`  

`AUTH_SECRET`  

`AUTH_PASSWORD`

#### Spotify API credentials

* **Step1**: Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) and login with your Spotify account.

* **Step2**: Go to [your Dashboard](https://developer.spotify.com/dashboard), click on the `Create app` button and enter the following information:

  **App name**: Your app name

  **App description**: Your app description

  **Redirect URIs**: If running app locally, set this to provided as follows:

  `http://127.0.0.1:3000/api/spotify/callback`

  When deploying to Vercel, add another redirect URL as follows:

  `https://xyz.vercel.app/api/spotify/callback`

* **Step3**: After creating app, copy the **Client ID** and **Client secret** and paste it into the `.env`.

#### AUTH_SECRET

Set this to a random string. Run `openssl rand -base64 32` and copy the value generated to the `.env`.

#### AUTH_PASSWORD

Set your password to enter the application. Only those who know this can join the jam.

