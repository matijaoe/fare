# 🫰🏻 FARE

> Application for tracking personal finances and attaining financial independence

## ✨ Key features
- Time-based navigation for every page (monthly and “all time” mode)
- Dashboard with net worth, asset allocation, investment growth, and FI date projections
- Transaction and category views with filtering, charts, and comparisons
- Cash & investment account tracking (with historical views)
- Nest egg planning and growth rate calculations- FI calculator with yearly projections and a custom goal slider
- Superb data synchronization all throughout, with instant optimistic UI updates
- 🌚 dark mode

<details><summary>
  <h2>💭 Full write-up (click to expand)</h2>
</summary>
  
This was a project I built as part of my college thesis, starting in the summer of 2023. During that period I really got into the idea of FIRE (Financial Independence, Retire Early), which was hardly surprising—I've been basically obsessed with Bitcoin for over 5 years at that point, and it always seemed like the perfect way to achieve exactly that: financial independence.

With this in mind, I thought it fitting to build an app about the topic I was obsessed with (as these things usually go).

I started by designing everything from scratch, including a custom component library. I prefer designing directly in code, skipping Figma, because it gives me faster feedback and more control. After a month of experimenting in my spare time, I implemented base components, locked in the layout and started building out the product.

The UI was built with Uno CSS (essentially more performant Tailwind CSS) and Headless UI for unstyled components. The stack: Nuxt 3 with Vue, Pinia, and TanStack Query on the frontend.  Backend was Node with Nuxt’s Nitro API layer, Prisma, and PlanetScale.

TanStack Query was a deliberate choice over Nuxt’s `useFetch`. After a bunch of experimentation with both, it became clear that TanStack Query lets me build a more powerful and performant experience by giving me full control over refetching and caching, so I can be completely confident the data is always up to date—crucial in a financial application. On top of this, I dove deep into ensuring optimistic updates, making the application feel snappy.

The application consists of these specific pages and functionality
- Login page with OAuth (Google, GitHub)
- Top header bar allowing you to navigate through time (providing a glimpse of your exact financial situation at that time)  
  - Current month shown on top, with controls to move between months 
  - “All time” mode  
- Dashboard page  
  - Charts showing current Net Worth and allocation between assets 
  - Balance in cash and nest egg  
  - Avg annual rate – calculated expected average growth rate of your investments  
  - Safe withdrawal fee – percentage of nest-egg funds you'd sell yearly to cover living expenses (conventionally 4 %)  
  - Time until your Financial Independence  
  - Each of these lead to its respective page for more detail
- Activity page  
  - List of transactions  
  - Selected-timeframe overview (month or full time) with net cash-flow, income, spending, and charts comparing states to previous months  
  - Clicking on a transaction takes you to its page with similar overview charts
- Category page  
  - List of all categories with net/expenses/spending for that period and a link to each category’s page with more details and charts
- Accounts page  
  - All cash accounts on various banking platforms, each with specific financial data and its own page  
  - Total shown at top plus the total at the specific amount if you're viewing a past date
- Nest Egg page  
  - Similar to Accounts but separated into categories (Stocks, ETF & Bonds / Crypto / Real Estate / custom)  
  - Option to add a new nest-egg account, defining predicted annual growth rate or fetching it automatically from historical data  
  - Automatically calculates total average expected growth rate
- Net Worth page  
  - Insights into total amount and allocation across groups at any time in the past
- FI Page  
  - Exact time until Financial Independence  
  - Graph showing growth of Cash, Nest Egg, and Total Net Worth  
  - Calculator with a Net Worth Goal slider and parameters (yearly income and expenditure, safe-withdrawal fee, yearly investments…)  
  - State of your accounts for every single year until your FI date, giving you a glimpse into the magic of  compound interest

On every page there’s a toolbar at the bottom right to quickly add an expense, income, or transfer. Transactions update instantly—something I spent a lot of time refining for both speed and UX polish.

That attention to detail paid off: I earned an A+, and the deep dive into Nuxt 3 (still in beta then) and TanStack Query helped me level up fast in the workplace.
</details>



## [📽️ Video demo](https://drive.google.com/file/d/1wXVZA9BZ6uKFFFENPc9nFdEQ6tPUGZ9g/view?usp=drive_link)

![image](https://user-images.githubusercontent.com/46557266/209006464-3c145f1f-9c7e-4636-bbde-05b4c1eb0969.png)
![image](https://user-images.githubusercontent.com/46557266/209006448-15a74861-0de2-46b2-8e82-a90c70425c3d.png)
![image](https://user-images.githubusercontent.com/46557266/209006391-62e3d8b6-9464-49b1-be68-ce2ba7771285.png)
![image](https://user-images.githubusercontent.com/46557266/209007578-23474e1a-b669-499a-839a-ce3b4102a605.png)
![image](https://user-images.githubusercontent.com/46557266/209006616-ba511829-3315-4590-85c5-18e2c524368e.png)
![image](https://user-images.githubusercontent.com/46557266/209006653-a83424cf-e6c6-44f4-b53e-56951a8233d9.png)
![image](https://user-images.githubusercontent.com/46557266/209006547-87872059-9826-412d-a2a8-6304e1351863.png)
![image](https://user-images.githubusercontent.com/46557266/209006574-d9702a91-c9b1-42d7-99f3-34111b84e0ff.png)
![image](https://user-images.githubusercontent.com/46557266/209008598-9e877154-1e59-4ee9-b8b3-8c07ca6d7172.png)
![image](https://user-images.githubusercontent.com/46557266/209007812-ba12ada9-769f-4dcd-a6a3-cf81fc905c30.png)
![image](https://user-images.githubusercontent.com/46557266/209007841-4a4731c9-59b9-4ebb-9be0-49decb8c16cf.png)
![image](https://user-images.githubusercontent.com/46557266/209007885-4cc2b6a0-586f-407f-a444-e372de89f86c.png)


#### Entity Relationship Diagram
![image](https://user-images.githubusercontent.com/46557266/209007745-9637b23e-1676-4e71-b7be-db6ecdae6b7f.png)


## 🛠️ Stack

- [Nuxt 3](https://nuxt.com/)
- [Vue](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TanStack Query](https://tanstack.com/query/v4)
- [VueUse](https://vueuse.org/)
- [UnoCSS](https://github.com/unocss/unocss)
- [Headless UI](https://headlessui.com/)
- [Pinia](https://pinia.vuejs.org/)
- [Chart.js](https://www.chartjs.org/)
- [Prisma](https://www.prisma.io/)
- [PlanetScale](https://planetscale.com/)

## Setup

Make sure to install the dependencies:

```bash
# pnpm (recommended)
pnpm install

# yarn
yarn install

# npm
npm install
```

## Development Server

Start the development server on [localhost:3000](http://localhost:3000)

```zsh
pnpm dev
```

## Production

Build the application for production:

```zsh
pnpm build
```

Locally preview production build:

```zsh
pnpm preview
```

