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

