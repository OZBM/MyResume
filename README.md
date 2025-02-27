# Omar Ben Mustapha - Resume Website

A modern, interactive resume website built with Next.js, featuring a Gemini-powered AI chatbot that can answer questions about Omar's professional experience.

## Features

- 🎨 Modern, responsive design with animations
- 📱 Mobile-friendly layout
- 🤖 AI-powered chatbot using Gemini 2.0 Flash
- 🌙 Light/dark mode support
- 🚀 Fast performance with Next.js

## Getting Started

### Prerequisites

- Node.js 18.x or later
- A Gemini API key from Google AI Studio

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/my-resume.git
cd my-resume
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env.local` file in the root directory with your Gemini API key:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Obtaining a Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Copy the API key to your `.env.local` file

## Security Note

The Gemini API key is server-side only and never exposed to the client. The API route acts as a secure proxy for all communications with the Gemini API.

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Google Generative AI](https://ai.google.dev/docs) - Gemini API for chatbot
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library

## Deployment

This site can be deployed to platforms like Vercel or Netlify. Make sure to add your Gemini API key to the environment variables in your deployment platform.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
