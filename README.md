
# HealthProAssist - Healthcare Placement Platform

## Overview

HealthProAssist is a comprehensive healthcare placement platform designed to connect patients and families with appropriate healthcare facilities based on their needs and preferences. The platform features an AI assistant named Ava that helps users navigate through the placement process.

## Key Features

- **Personalized Assessment**: Complete a detailed healthcare needs assessment to receive tailored facility recommendations
- **Facility Map**: Interactive map showing healthcare facilities with filtering options
- **AI Assistant (Ava)**: Get instant help and guidance through the placement process
- **Provider Portal**: For healthcare providers to manage clients and facilities

## Technology Stack

This project is built with modern web technologies:

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Backend**: Supabase for authentication, database, and serverless functions
- **Mapping**: Google Maps integration for facility location visualization
- **Build Tool**: Vite for fast development and optimized production builds

## Project Structure

- `src/components`: UI components organized by feature
- `src/pages`: Individual page components
- `src/hooks`: Custom React hooks
- `src/services`: API and service layer
- `src/integrations`: Third-party service integrations
- `supabase/functions`: Serverless edge functions

## Development Setup

**Prerequisites:**
- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- Supabase account (for backend functionalities)

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Deployment

The project can be deployed through Lovable's built-in deployment pipeline by clicking on Share -> Publish. For custom domains, see the [Custom Domains](https://docs.lovable.dev/tips-tricks/custom-domain/) documentation.

## Contributing

When contributing to this project:

1. Create focused, small components
2. Follow the existing code style and patterns
3. Test thoroughly before submitting changes

## Project URL

**Lovable Project**: https://lovable.dev/projects/4ba37ae9-c637-42f1-a8bd-dc50f0855f5d

For any questions or support, please contact the project maintainers.
