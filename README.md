# viaintern - Modern Svelte Application with Firebase Auth

A beautiful, modern, and responsive Svelte application featuring Google Firebase Authentication with a sleek yellow and grey design theme.

## Features

- 🎨 **Modern Design**: Clean, responsive interface with yellow and soft grey color scheme
- 🔐 **Firebase Authentication**: Google login integration with demo functionality
- 📱 **Responsive Layout**: Works perfectly on all devices
- ✨ **Smooth Animations**: Fly-in effects and smooth transitions
- 📊 **Dashboard**: User dashboard with dummy data and statistics
- 🎭 **Demo Mode**: Test authentication without real Firebase setup

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd viaintern
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Firebase Setup (Optional)

The application includes dummy Firebase configuration for demonstration purposes. To use real Firebase authentication:

1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)

2. Enable Google Authentication in the Firebase console

3. Update the Firebase configuration in `src/lib/firebase.js`:
```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## Demo Authentication

You can test the authentication flow without setting up Firebase:

1. Click "Get Started" button
2. In the login modal, click "Try Demo Login"
3. This will simulate a successful login with dummy user data

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── LoginModal.svelte    # Authentication modal
│   │   └── Dashboard.svelte     # User dashboard
│   ├── firebase.js              # Firebase configuration and auth
│   └── assets/
├── routes/
│   ├── +layout.svelte          # Global layout and styles
│   └── +page.svelte            # Main landing page
└── app.html                    # HTML template
```

## Technologies Used

- **Svelte**: Modern frontend framework
- **SvelteKit**: Full-stack Svelte framework
- **Firebase**: Authentication and backend services
- **CSS3**: Modern styling with custom properties
- **Google Fonts**: Inter font family

## Design Features

- **Color Palette**: 
  - Primary Yellow: `#ffd60a`
  - Secondary Yellow: `#ffbe0b`
  - Dark Yellow: `#fb8500`
  - Soft Grey: `#6c757d`
  - Light Grey: `#f8f9fa`

- **Typography**: Inter font family with various weights
- **Animations**: CSS transitions and keyframe animations
- **Responsive**: Mobile-first design approach

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

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

This project is licensed under the MIT License.

## Support

For support or questions, please create an issue in the repository.
