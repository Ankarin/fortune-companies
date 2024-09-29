# List of Fortune 1000 companies.
 Built with Nuxt.js 3

 Data is taken from [here](https://www.kaggle.com/datasets/jeannicolasduval/2024-fortune-1000-companies)

 [vue-shadcn](https://www.shadcn-vue.com/) for UI components and Tailwind for styling.

 Postgres with [Drizzle](https://orm.drizzle.team/), using Nuxt Server Engine with built-in [h3](https://h3.unjs.io/)

 Rate limiting with [Rate Limiter](https://nuxt-security.vercel.app/documentation/middleware/rate-limiter) from Nuxt Security Module using Redis.

## Environment Variables
In .env add DATABASE_URL  and REDIS_URL, if you don't want to use rate limiter - ignore REDIS_URL, and remove security module
```bash 
DATABASE_URL=
REDIS_URL=
```

```bash 
  security: {
    rateLimiter: {
      driver: {
        name: "redis",
        options: {
          url: process.env.REDIS_URL as string,
        },
      },
    },
  },
```


## Setup






Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```
