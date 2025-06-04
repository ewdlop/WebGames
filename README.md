# WebGames - React App with Routing and Layout

A modern React application built with Vite, featuring React Router for navigation and a clean layout structure.

## Features

- ⚡ **Vite** - Fast build tool and development server
- ⚛️ **React 18** - Latest React with modern features
- 🚦 **React Router** - Client-side routing with layout support
- 🎨 **Modern UI** - Clean, responsive design with dark/light theme support
- 📱 **Mobile Friendly** - Responsive design that works on all devices
- 🎮 **Game-themed** - Built for a web games platform

## Project Structure

```
src/
├── components/
│   ├── Layout.jsx          # Main layout wrapper
│   ├── Header.jsx          # Navigation header
│   └── Footer.jsx          # Footer component
├── pages/
│   ├── Home.jsx            # Landing page
│   ├── Games.jsx           # Games catalog
│   ├── About.jsx           # About page
│   ├── Contact.jsx         # Contact form
│   └── NotFound.jsx        # 404 page
├── App.jsx                 # Main app with routing
└── main.jsx               # React entry point
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Routing Structure

The app uses React Router with a nested routing structure:

- `/` - Home page
- `/games` - Games catalog
- `/about` - About page
- `/contact` - Contact form
- `/*` - 404 Not Found page

All routes use the shared `Layout` component which includes:
- Header with navigation
- Main content area (using `<Outlet>`)
- Footer

## Layout System

The layout system is implemented using React Router's outlet pattern:

1. **Layout Component** - Wraps all pages with consistent header/footer
2. **Header Component** - Navigation with active link highlighting
3. **Footer Component** - Simple footer with copyright
4. **Responsive Design** - Mobile-first approach with breakpoints

## Styling

- CSS modules approach with component-specific stylesheets
- Modern CSS features (Grid, Flexbox, Custom Properties)
- Dark/light theme support using `prefers-color-scheme`
- Responsive design with mobile-first approach

## Technologies Used

- **React** - UI library
- **React Router DOM** - Client-side routing
- **Vite** - Build tool and development server
- **ESLint** - Code linting
- **CSS3** - Modern styling with custom properties

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License. 