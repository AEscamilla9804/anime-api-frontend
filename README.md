📌 Anime Explorer — Frontend

This is the frontend for the Anime Explorer application. It allows users to browse anime titles, mark favorites, manage their profile, and interact with the backend API.
Built with React and Tailwind CSS, it uses Context API for state management.

🌟 Features

Pages

'/' — Homepage
    - Browse anime with filters and pagination
    - Mark or unmark anime as favorites
    - Modal view for detailed information
    - Toast notifications for actions (favorites, errors, etc.)

'/openid' — Authentication
    - Create an account (available only in development mode)
    - Account confirmation via token verification (available only in development mode)
    - Login with email and password
    - Recover password via email
    - Toast notification for error / success handling

'/admin' — Favorites & Profile
    - View all favorited anime
    - Edit profile information           
    - Change account password

State Management

The application uses three Context Providers:

- Results Context — Stores search results, filters, and pagination data.
- Favorites Context — Manages favorite anime list and syncs with the backend.
- Authentication Context — Handles login state, user data, and profile updates.

Tech Stack

- React 18
- Tailwind CSS for styling
- Context API for global state management
- React Router DOM for navigation
- Axios for API requests

📂 Project Structure

frontend/
│
├── src/
│   ├── components/         # Reusable UI components (Modal, Toast, Pagination, etc.)
│   ├── context/            # ResultsContext, FavoritesContext, AuthContext
│   ├── pages/              # Route pages (Home, OpenID, Admin)
│   ├── hooks/              # Custom hooks for context and API usage
│   ├── layout/             # General structure for UI using outlet
│   ├── index.css           # Tailwind CSS and global styles
│   └── App.jsx             # Main app with routes
│
├── config/              
│   └── axios.jsx           # Base URL setup
├── public/                 # Public assets
├── .env                    # Example environment variables
├── package.json
└── README.md


⚙️ Installation & Setup

1. Clone the repository

git clone https://github.com/yourusername/anime-explorer-frontend.git
cd anime-explorer-frontend

2. Install dependencies

npm install

3. Configure environment variables

Create a .env file in the root directory and add:
VITE_BACKEND_URL=http://localhost:4000

4. Run the development server

npm run dev

🧪 Testing with Demo Accounts

For testing purposes, you can log in using:

- Email: demo@example.com | Password: Demo123#
- Email: demo2@example.com | Password: Demo123#

📜 License

This project is licensed under the MIT License.