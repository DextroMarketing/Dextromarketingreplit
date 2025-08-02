# Overview

Nexus Agency is a modern marketing agency website that specializes in web design and AI integration services. The application is built as a full-stack web platform showcasing the agency's portfolio, services, and capabilities through an interactive, engaging interface. The site demonstrates cutting-edge design trends with AI-powered features and focuses on lead generation, portfolio presentation, and establishing brand authority in the web design and AI space.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client-side is built with **React** and **TypeScript** using a modern component-based architecture. The application leverages **Vite** as the build tool for fast development and optimized production builds. Key architectural decisions include:

- **Routing**: Uses **Wouter** for lightweight client-side routing instead of React Router, providing a smaller bundle size and simpler API
- **Styling**: Implements **Tailwind CSS** with custom CSS variables for theming, supporting both light and dark modes
- **Component Library**: Built on **shadcn/ui** components with **Radix UI** primitives for accessible, customizable UI components
- **Animations**: Utilizes **Framer Motion** for smooth animations and micro-interactions throughout the interface
- **State Management**: Uses **TanStack Query** (React Query) for server state management and API data fetching
- **Form Handling**: Implements **React Hook Form** with **Zod** validation for type-safe form processing

## Backend Architecture
The server is built with **Express.js** and **TypeScript** in a simple but effective RESTful API structure:

- **API Design**: RESTful endpoints for contact form submissions and data retrieval
- **Data Validation**: Uses **Zod** schemas for runtime type checking and validation
- **Storage Pattern**: Implements an interface-based storage pattern with in-memory storage for development, designed to easily switch to database persistence
- **Error Handling**: Centralized error handling middleware for consistent API responses
- **Development Setup**: Integrated with Vite's development server for seamless full-stack development

## Data Storage Solutions
The application uses a flexible storage architecture:

- **Development Storage**: In-memory storage implementation for rapid development and testing
- **Database Schema**: Defined with **Drizzle ORM** using PostgreSQL dialect, ready for production database integration
- **Schema Management**: Type-safe database schemas with automatic TypeScript type generation
- **Migration Support**: Database migration system configured for schema versioning

## Component Organization
The frontend follows a well-structured component hierarchy:

- **Pages**: Top-level route components (Home, Services, Portfolio, About, Contact)
- **Sections**: Reusable page sections (Hero, Services, Portfolio, Testimonials, etc.)
- **UI Components**: Base design system components built on shadcn/ui
- **Shared Components**: Common components like Navigation and Footer
- **Custom Hooks**: Reusable logic for mobile detection and toast notifications

## Design System
The application implements a comprehensive design system:

- **Color Palette**: Navy blue, electric blue, and purple accent colors with full dark mode support
- **Typography**: Inter font family for modern, readable text
- **Animation Library**: Consistent animation patterns using Framer Motion
- **Responsive Design**: Mobile-first approach with Tailwind's responsive utilities
- **Theme System**: CSS custom properties for easy theme switching

# External Dependencies

## Frontend Dependencies
- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Type safety and enhanced developer experience
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation and gesture library
- **TanStack Query**: Server state management
- **React Hook Form**: Form state management and validation
- **Zod**: Runtime type validation
- **Wouter**: Lightweight routing library
- **shadcn/ui**: Component library built on Radix UI
- **Radix UI**: Unstyled, accessible UI primitives

## Backend Dependencies
- **Express.js**: Web application framework
- **Drizzle ORM**: Type-safe SQL ORM
- **Neon Database Serverless**: PostgreSQL database driver for serverless environments
- **TypeScript**: Type safety for server-side code

## Development Tools
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer
- **Drizzle Kit**: Database migration and schema management tools

## Third-Party Services
- **Replit Integration**: Development environment optimization
- **PostgreSQL**: Production database system (configured but not yet connected)
- **Font Services**: Google Fonts for Inter typography
- **Image Services**: Unsplash and Pixabay for placeholder images

The architecture is designed for scalability and maintainability, with clear separation of concerns between frontend presentation, backend API logic, and data persistence layers. The modular component structure and type-safe approach throughout the stack ensure reliable development and easy feature additions.