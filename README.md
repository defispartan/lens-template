## Lens Chain Template

This project uses [pnpm](https://pnpm.io) for package management. Ensure you have it installed before proceeding.

### Setup

1. Copy the `.env.example` file to `.env` and fill in environment variables:
- `NEXT_PUBLIC_WALLETCONNECT_ID` used for WalletConnect connection support, can be obtained from [Reown Cloud](https://cloud.reown.com)
- `NEXT_PUBLIC_THIRDWEB_CLIENT_ID` / `NEXT_PUBLIC_THIRDWEB_SECRET_KEY` used for thirdweb widget integrations, clientId can be obtained from [thirdweb](https://thirdweb.com)
- `NEXT_PUBLIC_HALLIDAY_API_KEY` used for Halliday widget integrations, clientId can be obtained from [Halliday](https://dashboard.halliday.xyz/keys)
- `NEXT_PUBLIC_LENS_APP_ADDRESS` used to identify app for Lens transactions, obtained by creating app and pasting app address from [Lens Developer Dashboard](https://developer.lens.xyz/apps)


2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
 pnpm dev
```

Open http://localhost:3000 in your browser.

### Editing the Project

Modify `app/page.tsx` to update the main page. Changes are applied automatically.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). For further details, refer to the official [Next.js Documentation](https://nextjs.org/docs).
