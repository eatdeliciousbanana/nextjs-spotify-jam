# nextjs-spotify-jam

![img1](https://github.com/user-attachments/assets/e5d33b47-1e4b-4e82-bdb5-ad5865253f96)

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

Open http://127.0.0.1:3000 in your browser to see the app in action.

**Note** : `http://localhost:3000` is no longer usable due to Spotify's security policy update. Use http://127.0.0.1:3000 instead.

## Environment Variables

Copy and paste `.env.example` and rename it to `.env`  
Add the following environment variables:

`SPOTIFY_CLIENT_ID`  

`SPOTIFY_CLIENT_SECRET`  

`AUTH_SECRET`  

`AUTH_PASSWORD`

#### Spotify API credentials

* **Step1**: Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) and login with your Spotify account.

* **Step2**: Go to [your Dashboard](https://developer.spotify.com/dashboard), click on the **Create app** button and enter the following information:

  **App name**: Your app name

  **App description**: Your app description

  **Redirect URIs**: If running app locally, set to provided as follows:

  `http://127.0.0.1:3000/api/spotify/callback`

  When deploying to Vercel, add another redirect URL as follows:

  `https://xyz.vercel.app/api/spotify/callback`

* **Step3**: After creating app, copy the **Client ID** and **Client secret** and paste it into the `.env`

#### AUTH_SECRET

Set this to a random string. Run `openssl rand -base64 32` and copy the value generated to the `.env`

#### AUTH_PASSWORD

Set your password to enter the application. Only those who know this can join the jam.

## Deploy to Vercel

* **Step1**: Press the button below. Enter your repository name and create new project.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Featdeliciousbanana%2Fnextjs-spotify-jam)

* **Step2**: After deploying, go to project dashboard and click Storage tab. Select **Upstash for redis** and create database with free plan. After creating database, copy the env value **KV_REST_API_URL** and **KV_REST_API_TOKEN**.

* **Step3**: Go to Settings tab and click **Environment Variables**. Add the following environment variables:

  * `UPSTASH_REDIS_REST_URL`

    Set to **KV_REST_API_URL** in Step2.

  * `UPSTASH_REDIS_REST_TOKEN`

    Set to **KV_REST_API_TOKEN** in Step2.

  * `SPOTIFY_CLIENT_ID`

    Get from [Spotify API credentials](#spotify-api-credentials)

  * `SPOTIFY_CLIENT_SECRET`

    Get from [Spotify API credentials](#spotify-api-credentials)

  * `SPOTIFY_REDIRECT_URI`

    Set to `https://xyz.vercel.app/api/spotify/callback` according to your production domain.

  * `AUTH_URL`

    Set to `https://xyz.vercel.app` according to your production domain.

  * `AUTH_SECRET`

    Get from [AUTH_SECRET](#auth_secret)

  * `AUTH_PASSWORD`

    Get from [AUTH_PASSWORD](#auth_password)

* **Step4**: After saving environment variables and redeploy, go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) and open your app settings. Click Edit and add the same redirect URL as set in the **SPOTIFY_REDIRECT_URI** in Step3.

## Usage

Enter the password set in the `.env` to access the app.

![img2](https://github.com/user-attachments/assets/7665ae14-551e-49b6-bf13-9ed6284acf2a)

Go to Spotify Account page and login with your Spotify account.

![img3](https://github.com/user-attachments/assets/20eb0321-ff50-42e6-a5ed-37fb5047d5f2)

Go to Player page, turn on the device and start playback.

![img4](https://github.com/user-attachments/assets/11f7fc6a-a4d3-4d6b-a4dd-7f96690b0958)

Go to Search page and find track you want to request.

![img5](https://github.com/user-attachments/assets/c1caaa1e-f76f-44df-b503-b54d0d00e018)

Select a track and request.

![img6](https://github.com/user-attachments/assets/2ed1a1e8-6289-42a8-82cd-11adc0a1cf9d)

## License

Distributed under the MIT License. See `LICENSE.md` for more information.
