---
description: how to set up a new Tienda Nube store integration from scratch
---

# Tienda Nube Integration Setup

This workflow configures a Next.js project to pull live products, orders and stock from a Tienda Nube store via their REST API.

## Prerequisites
- A Tienda Nube Partner account at https://partners.tiendanube.com
- An app created in the partner panel (you get a CLIENT_ID and CLIENT_SECRET)
- The app must be **installed** on the target store

---

## Step 1 — Configure `.env.local`

Copy `.env.local.example` to `.env.local` and fill in the values:

```env
TIENDANUBE_CLIENT_ID="<your app id from partner panel>"
TIENDANUBE_CLIENT_SECRET="<your client secret>"
TIENDANUBE_STORE_ID=""          # filled in step 3
TIENDANUBE_ACCESS_TOKEN=""      # filled in step 3
NEXT_PUBLIC_TIENDANUBE_STORE_URL="https://<storename>.mitiendanube.com"
```

> **IMPORTANT**: Leave STORE_ID and ACCESS_TOKEN empty for now — they come from the OAuth flow below.

---

## Step 2 — Start the dev server

// turbo
```
npm run dev
```

The server must be running at `http://localhost:3000` so the OAuth callback works.

---

## Step 3 — Get the Access Token via OAuth

> ⚠️ CRITICAL: You must be logged in to Tienda Nube as the **store owner** (not the partner account, not a demo/test store). Open a private/incognito window if needed.

1. Log in to https://www.tiendanube.com as the store owner account
2. Navigate to this URL (replace `<CLIENT_ID>` with your app's CLIENT_ID):
   ```
   https://www.tiendanube.com/apps/<CLIENT_ID>/authorize
   ```
3. Click "Autorizar" / "Instalar" on the permissions screen
4. You'll be redirected to `http://localhost:3000/api/auth/callback`
5. A green page will show your `access_token` and `user_id`

> The `user_id` in the response **is your STORE_ID**. Copy both values.

---

## Step 4 — Update `.env.local`

Set the values you got from the OAuth callback:

```env
TIENDANUBE_STORE_ID="<user_id from the callback>"
TIENDANUBE_ACCESS_TOKEN="<access_token from the callback>"
```

The dev server detects env changes automatically (`Reload env: .env.local` in logs). No restart needed.

---

## Step 5 — Verify

Navigate to `http://localhost:3000` and check that products load from the live store. You should see the actual products from the Tienda Nube admin panel.

If you still see 401 errors, check:
- [ ] You are using the store owner's account (not the partner/demo account)
- [ ] The `STORE_ID` matches the `user_id` in the OAuth response
- [ ] The app is **installed** on that store (visible in Partners → Aplicaciones → Instalaciones)

---

## How the code works

| File | Purpose |
|------|---------|
| `lib/tiendanube.ts` | API client. All fetch calls go here. Uses `Authentication: bearer <token>` header (NOT `Authorization`) |
| `app/api/tiendanube/products/route.ts` | REST endpoint for client-side fetching |
| `app/api/auth/callback/route.ts` | OAuth callback — exchanges code for access token |
| `components/products-grid.tsx` | Server Component — fetches products directly at render time |
| `components/products-grid-client.tsx` | Client Component — handles category filters and pagination |
| `components/product-card.tsx` | Displays a single `TiendaNubeProduct` |
| `components/product-detail.tsx` | Full product page using `TiendaNubeProduct` |

## Reusing for a new store / project

1. Copy `lib/tiendanube.ts`, `app/api/tiendanube/`, `app/api/auth/callback/` to the new project
2. Fill `.env.local` with the new store's credentials (repeat the OAuth flow)
3. The store owner must authorize the app from **their own** Tienda Nube account
