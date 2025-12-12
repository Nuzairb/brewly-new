# Brewly Dashboard

A modern Next.js 16 dashboard application for managing coffee shop bundles, promotions, and in-store operations.

## ✨ Features

- 📊 Real-time analytics dashboard
- 🎁 Bundle creation and management
- 🤖 AI-suggested bundle recommendations
- 📈 Sales performance tracking
- 🌤️ Weather-based promotions
- 📅 Event management
- 📱 Fully responsive design (desktop + mobile)

## 🛠️ Tech Stack

- **Framework:** Next.js 16.0.4 (App Router, Turbopack)
- **React:** 19.2.0
- **TypeScript:** Full type safety
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui + Radix UI
- **Icons:** Lucide React
- **Fonts:** Lato, Inter, Poppins (Google Fonts)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Navigate to project directory
cd brewly

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎨 shadcn/ui Integration

This project uses **shadcn/ui** for UI components while **preserving the exact original design**:

### Installed Components:
- Button, Card, Badge, Avatar
- Dialog, Dropdown Menu
- Input, Label, Select, Tabs

### Documentation:
- **[SHADCN_USAGE.md](./SHADCN_USAGE.md)** - Complete usage guide
- **[INTEGRATION_SUMMARY.md](./INTEGRATION_SUMMARY.md)** - Integration details

### Quick Example:
```tsx
import { CreateBundleDialog } from '@/components/features';

// Use ready-made components
<CreateBundleDialog />
```

## 📁 Project Structure

```
brewly/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with fonts
│   │   ├── page.tsx            # Main dashboard page
│   │   └── globals.css         # Global styles + Tailwind
│   ├── components/
│   │   ├── features/           # Custom feature components
│   │   │   ├── CreateBundleDialog.tsx
│   │   │   ├── BrewlyButton.tsx
│   │   │   └── index.ts
│   │   ├── layout/             # Layout components
│   │   │   ├── Sidebar.tsx
│   │   │   ├── MainContent.tsx
│   │   │   └── ...
│   │   └── ui/                 # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── ...
│   └── lib/
│       ├── api/                # API client & services
│       │   ├── client.ts
│       │   └── services.ts
│       ├── hooks/              # Custom React hooks
│       │   ├── useApi.ts
│       │   └── useResponsive.ts
│       ├── types/              # TypeScript definitions
│       │   ├── api.types.ts
│       │   └── index.ts
│       ├── constants/          # App constants
│       │   └── index.ts
│       └── utils.ts            # Utility functions
├── public/
│   ├── icons/                  # SVG icons
│   └── logo.svg
└── ...config files
```

## 🎯 Key Features Explained

### 1. Dashboard Analytics
- Active bundles count
- Revenue metrics
- Slow-moving items tracking
- Sales performance graphs

### 2. AI-Powered Suggestions
- Weather-based bundle recommendations
- Smart automated promotions
- Performance comparison (AI vs Manual)

### 3. Responsive Design
- Desktop: Sidebar navigation
- Mobile: Bottom tab navigation
- Pixel-perfect implementation

### 4. API Architecture
- Centralized API client
- Service layer pattern
- Custom React hooks (useApi, useQuery, useMutation)
- Type-safe requests/responses

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=your_api_url_here
```

### Tailwind Configuration
Custom theme defined in `src/app/globals.css` with:
- Brand colors (#00674E, #00A57D)
- Custom fonts (Lato, Inter, Poppins)
- Border radius utilities

## 📝 Design System

### Colors
- Primary Green: `#00674E`, `#00A57D`
- Gradients: `linear-gradient(114.41deg, #007256 8.52%, #00A57D 91.48%)`
- Text: `#1E1E1E`, `#787777`
- Backgrounds: `#FAFAFA`, `#FFFFFF`

### Typography
- **Lato** - Primary UI text
- **Inter** - Weather widget, stats
- **Poppins** - Secondary text, labels

### Spacing
- Border Radius: 8px, 16px, 24px
- Component Heights: 48px (buttons), 53px (icons)
- Gaps: 8px, 12px, 16px, 24px, 32px

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
