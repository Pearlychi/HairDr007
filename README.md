# 信桑雲端髮型診所 - 小飛客服 (Xiao Fei Chatbot)

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-informational?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-social?logo=tailwindcss)](https://tailwindcss.com/)
[![Gemini API](https://img.shields.io/badge/Gemini_API-success?logo=google&logoColor=white)](https://ai.google.dev/docs/gemini_api_overview)
[![Vercel](https://img.shields.io/badge/Deploy_with-Vercel-black?logo=vercel)](https://vercel.com)

**小飛 (Xiao Fei)** is a friendly and helpful AI chatbot for **信桑雲端髮型診所 (Hair Dr. 007)**. Powered by Google's Gemini API, Xiao Fei is designed to assist customers with their inquiries in a polite, natural, and warm Taiwanese conversational style.

## ✨ Features

*   **Interactive Chat Interface:** Clean, responsive, and user-friendly chat UI.
*   **Taiwanese Conversational Style:** Xiao Fei communicates with a local, friendly tone, using common Taiwanese colloquialisms.
*   **Comprehensive Salon Information:** Answers questions about:
    *   Services (haircuts, coloring, perms, scalp treatments)
    *   Pricing details and examples
    *   Online appointment booking process (monthly openings, confirmation, modifications)
    *   Contact information and salon location
    *   Payment methods
*   **Contextual Understanding:** Leverages Gemini API for natural language understanding.
*   **Streaming Responses:** Provides dynamic and engaging real-time message updates.
*   **Graceful Handling of Multiple Questions:** Politely asks users to ask one question at a time for clarity.
*   **Error Handling:** Manages API errors and issues with API key validation.
*   **Responsive Design:** Adapts to various screen sizes for a seamless experience on desktop and mobile.

## 🛠️ Tech Stack

*   **Frontend:** React 19, TypeScript
*   **Styling:** Tailwind CSS
*   **AI Model:** Google Gemini API (`@google/genai`)
*   **Deployment:** Vercel (intended)

## 📋 Prerequisites

*   Node.js (LTS version recommended: e.g., 18.x or 20.x)
*   npm or yarn (for managing dependencies if you add a `package.json`)
*   A valid Google Gemini API Key

## 🔑 Environment Variables

The application requires a Google Gemini API Key to interact with the Gemini models. This key must be available as `import.meta.env.VITE_API_KEY` in the JavaScript execution context.

*   **For Vercel Deployment (Recommended):**
    Set the `API_KEY` in your Vercel project's "Settings" > "Environment Variables". Vercel will securely inject this into your application's environment.

*   **For Local Development:**
    The `App.tsx` component attempts to read `import.meta.env.VITE_API_KEY`.
    1.  If you are using a development server like Vite, Next.js, or Parcel, these tools typically support loading variables from a `.env` file. Create a `.env` file in the project root (add this file to your `.gitignore`):
        ```env
        # For Vite, you would typically use VITE_API_KEY=YOUR_KEY and access it via VITE_API_KEY import.meta.env.VITE_API_KEY
        # For Next.js or other Node.js-based dev servers that read .env directly:
        API_KEY="YOUR_GEMINI_API_KEY"
        ```
        Replace `YOUR_GEMINI_API_KEY` with your actual key. Ensure your development setup correctly makes this variable accessible as `import.meta.env.VITE_API_KEY` (or adapt `App.tsx` if your tool uses a different mechanism like `import.meta.env`).
    2.  **If running `index.html` directly in a browser without a dev server:** `import.meta.env.VITE_API_KEY` will be `undefined`. For local testing in this specific scenario, you might temporarily modify `App.tsx` to use the API key string directly:
        ```javascript
        // In App.tsx, for local testing ONLY:
        // const apiKey = "YOUR_ACTUAL_GEMINI_API_KEY";
        // REMEMBER TO REMOVE THIS BEFORE COMMITTING OR DEPLOYING!
        ```
        A more robust approach for local development is to use a simple HTTP server (see "Running Locally").

## 🚀 Getting Started & Local Development

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies (if applicable):**
    This project uses ES modules imported directly via `esm.sh` in `index.html` for React and `@google/genai`. If you decide to manage these or other packages using `npm` or `yarn`, you would initialize a `package.json` (`npm init -y`) and then install them (`npm install react react-dom @google/genai`). Currently, this step is not strictly required to run the provided files.

3.  **Set up Environment Variable for API Key:**
    Follow the instructions in the "Environment Variables" section for local development.

4.  **Run the application locally:**
    Since this is a client-side application, you need to serve `index.html` using a local HTTP server.
    *   One common way is using the `http-server` package (if you don't have it, install globally: `npm install -g http-server`):
        ```bash
        http-server .
        ```
        Then, open the URL provided (usually `http://localhost:8080`) in your browser.
    *   Alternatively, many code editors (like VS Code with the "Live Server" extension) provide options to serve HTML files.

## ☁️ Deployment to Vercel

1.  **Push your project to a GitHub repository.**
2.  **Connect your GitHub repository to Vercel:**
    *   Sign up or log in to [Vercel](https://vercel.com/).
    *   Click "Add New..." > "Project".
    *   Import your Git Repository.
3.  **Configure Project Settings:**
    *   Vercel will likely detect this as a static project. No special build command or output directory is needed if you're serving the files as-is.
    *   **Crucially, set the Environment Variable:**
        *   Go to your project settings in Vercel.
        *   Navigate to "Settings" > "Environment Variables".
        *   Add a variable with the name `API_KEY` and your Google Gemini API Key as its value.
4.  **Deploy.** Vercel will build (if applicable) and deploy your application, making it accessible via a public URL.

## 📁 Project Structure

```
.
├── index.html          # Main HTML entry point, loads Tailwind CSS and React app
├── index.tsx           # React application root, mounts App component
├── App.tsx             # Main application component (UI, chat logic, API interaction)
├── components/         # Reusable UI Components
│   ├── ChatMessage.tsx # Renders individual chat messages (user and bot)
│   ├── ChatInput.tsx   # Handles user text input and send functionality
│   └── LoadingSpinner.tsx# Displays a loading indicator
├── constants.ts        # Contains Gemini model name and Xiao Fei's system instruction (personality, knowledge base)
├── types.ts            # TypeScript type definitions for messages, etc.
├── metadata.json       # Application metadata (name, description)
└── README.md           # This file
```

## ⚙️ Key Files & Customization

*   **`App.tsx`**: This is the heart of the application. It manages the chat state, message history, loading indicators, error handling, and all interactions with the Gemini API via the `Chat` object.
*   **`constants.ts`**:
    *   `GEMINI_MODEL_NAME`: Specifies the Gemini model to be used.
    *   `XIAO_FEI_SYSTEM_INSTRUCTION`: This is the **critical part for customizing Xiao Fei's behavior**. It's a detailed prompt that defines:
        *   Xiao Fei's persona (friendly, Taiwanese style).
        *   His knowledge base (salon services, pricing, booking procedures, contact info, FAQs based on the provided "知識庫").
        *   Specific rules for interaction (e.g., how to handle multiple questions, what to say in certain scenarios).
        *   **To update salon information or change how Xiao Fei responds, you will primarily edit this string.**
*   **`components/ChatMessage.tsx`**: Styles and renders each message in the chat log.
*   **`components/ChatInput.tsx`**: Manages the text area for user input and the send button.

## 🛡️ API Key Security

*   **Never commit your `API_KEY` directly into your source code that is pushed to public repositories like GitHub.**
*   Always use environment variables for managing your API key:
    *   Through Vercel's dashboard for deployed environments.
    *   Via a `.env` file (added to `.gitignore`) for local development when using dev servers that support it.
*   The Google Gemini API key used on the client-side should ideally be restricted in the Google Cloud Console (e.g., by HTTP referrers if supported for this API version/type) to limit its use to your authorized domains. This helps mitigate potential misuse if the key were inadvertently exposed.

## 🤝 Contributing (Example)

If you plan to have others contribute:

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License (Example - Choose one if desired)

This project is licensed under the MIT License - see the `LICENSE.md` file for details (if you add one).

---

Remember to replace `<your-repository-url>` and `<repository-name>` with your actual repository details. Good luck with your deployment!
