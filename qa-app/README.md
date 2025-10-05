# Modern Minimalist Q&A Platform

A single-page, no-auth Q&A application with admin and user views, built with React, Tailwind CSS, and local storage for data persistence.

## Features

### Admin View
- ✅ Add new questions with a textarea and button
- ✅ Dashboard listing all questions
- ✅ View all user-submitted answers nested under each question
- ✅ Delete questions with custom confirmation modal
- ✅ Keyboard shortcuts (Ctrl/Cmd + Enter to submit)

### User View
- ✅ Browse all questions in a beautiful card-based layout
- ✅ Submit answers with text input and submit button
- ✅ View answer count for each question
- ✅ Keyboard shortcuts (Ctrl/Cmd + Enter to submit)

## Design Features

- 🎨 Modern, minimalist aesthetic
- 🎨 Cool gray color palette with indigo accent
- 🎨 Inter font from Google Fonts
- 🎨 Generous spacing, rounded corners, subtle shadows
- 🎨 Smooth animations and transitions
- 🎨 Toast notifications for user feedback
- 🎨 Clear hover and focus states
- 📱 Fully responsive (mobile and desktop)

## Technical Stack

- **Framework**: React.js 18
- **Styling**: Tailwind CSS
- **Data Persistence**: Browser localStorage
- **File Structure**: Single self-contained App.jsx file

## How to Run

1. Open the `index.html` file in a modern web browser
2. That's it! No build process or dependencies to install

### Option 1: Direct File Opening
Simply double-click `index.html` or open it with your browser:
```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

### Option 2: Local Server (Recommended)
For better performance, serve the files through a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Usage

### For Administrators
1. Click the "Admin View" button in the header
2. Enter a question in the textarea
3. Click "Add Question" or press Ctrl/Cmd + Enter
4. View all questions and their answers in the dashboard
5. Click "Delete" to remove a question (confirmation required)

### For Users
1. Click the "User View" button in the header
2. Browse available questions in card format
3. Type your answer in the input field
4. Click "Submit Answer" or press Ctrl/Cmd + Enter
5. See success toast notification when submitted

## Data Persistence

All data is stored in browser localStorage:
- Questions and answers persist across page refreshes
- Data is browser-specific (not shared across devices)
- Clear browser data to reset the application

## Browser Compatibility

Works in all modern browsers that support:
- ES6+ JavaScript
- localStorage API
- CSS Grid and Flexbox

Tested in:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Keyboard Shortcuts

- **Ctrl/Cmd + Enter**: Submit question or answer (when focused on input/textarea)

## File Structure

```
qa-app/
├── index.html      # HTML entry point with CDN links
├── App.jsx         # Single-file React application
└── README.md       # This file
```

## Customization

### Change Accent Color
In `App.jsx`, find and replace `indigo` with your preferred color:
- `bg-indigo-600` → `bg-blue-600`
- `ring-indigo-500` → `ring-blue-500`
- etc.

### Change Font
In `index.html`, replace the Inter font link with your preferred Google Font.

### Modify Animations
Animation styles are defined at the bottom of `App.jsx` in the `style.textContent` section.

## License

Free to use for any purpose.

## Credits

Built with ❤️ using React, Tailwind CSS, and modern web standards.