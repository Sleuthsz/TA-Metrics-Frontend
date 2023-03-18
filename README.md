# TA Metrics

## Getting Started

Disable checking SSL errors in the
browser for local
development: https://stackoverflow.com/questions/49661488/how-to-turn-off-ssl-check-on-chrome-and-firefox-for-localhost

To install dependencies:

```bash
npm install
```

Create a `.env` with the following variables:

```dotenv
NEXT_PUBLIC_BACKEND_BASE_URL=<YOUR_BASE_URL>
```

To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Resources

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

Don't forget to check out our back end repo for further API functionality. 

- [TA Metrics Back End](https://github.com/Sleuthsz/TA-Metrics-Backend/blob/stage/README.md)

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Links

Updating context: https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component

## Version

*Version 1.0* Created team agreement, Trello board, README - March 6, 2023.

*Version 1.2* Initial creation of NextJS and all components - March 7,2023.

*Version 1.3* Tailwinds initial creation in component files - March 10, 2023.

*Version 1.4* Created API link for data to populate TA ticket View - March 11, 2023.

*Version 1.5* Added Additional Tailwind styling, refactored component files and added conditionals for style rendering,
updated README.md - March 13, 2023.

*Version 1.6* Added more Tailwind styling, refactored component files and added Admin chart, updated README.md - March 14, 2023.

*Version 1.7* Finalizing Styling, updated README, linked all auth components and files, added TAView chart - March 15, 2023.

*Version 1.8* TA View functionality refactored - March 16, 2023. 

*Version 1.9* Final TA view functionality created, finalize styling - March 17, 2023.

*Version 2* Final touch up styling and updated README.md - March 18, 2023
