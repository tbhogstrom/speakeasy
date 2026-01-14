# SpeakEasy

A web-based task management and data tracking tool designed specifically for Speech-Language Pathologists (SLPs).

## Features

- **Student Management** - Manage your caseload with detailed student profiles
- **Session Data Entry** - Quick data logging with automatic accuracy calculations
- **Progress Monitoring** - Visual charts and progress tracking for IEP goals
- **Progress Reports** - Auto-generated quarterly reports with data aggregation
- **Privacy Mode** - Hide all PII with a single click for screen sharing
- **Evaluations** - Track evaluation timelines and compliance
- **IEPs** - Manage IEP meetings and service delivery
- **Billing** - Track billable time for Medicaid-eligible students

## Data Security

🔒 **Your data is completely private and secure:**
- All student data is stored locally in your browser (IndexedDB)
- No data is transmitted to servers or the cloud
- No backend database or API calls
- Static web application with no data collection
- HIPAA/FERPA friendly architecture

While the app is hosted on the web, all your student information remains solely in your browser.

## Getting Started

1. Visit the deployed app URL
2. Click "Add Student" to add students to your caseload
3. Navigate to a student's detail page to log session data
4. Generate progress reports from the Progress Reports tab

See the **Training** page in the app for detailed usage instructions.

## Development

This is a React + TypeScript + Vite application.

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Deployment

This app is designed to be deployed as a static site. It works perfectly with:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting provider

## Tech Stack

- React 18
- TypeScript
- Vite
- TailwindCSS
- shadcn/ui components
- Recharts for data visualization
- date-fns for date handling
- IndexedDB for local storage

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## Support

For questions or support, please open an issue on GitHub.
