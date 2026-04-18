<img width="1887" height="1013" alt="image" src="https://github.com/user-attachments/assets/e740eb7d-c28d-4668-a98f-9958dcd75f0b" />
<br><br>
<img width="1900" height="1020" alt="image" src="https://github.com/user-attachments/assets/5f768864-691d-4656-aee5-2f794202261e" />

# Java Concepts Learning Platform

A lightweight, interactive Angular single-page application for learning and practicing Java programming concepts. This educational platform provides a structured way to explore fundamental programming concepts with examples and interactive features.

##  Project Description

**Java Concepts Learning Platform** is an Angular-based web application designed to help learners understand core Java programming concepts. The application provides:

- **Concept Management**: Browse through organized Java concepts (types, conditionals, loops, methods, OOP principles, etc.)
- **Detailed Explanations**: Each concept includes a comprehensive description with practical examples
- **Interactive Learning**: Engage with concepts through an integrated game component
- **Responsive Design**: Clean, modern interface that works seamlessly across devices
- **Data-Driven**: Concepts are managed through a structured JSON data format for easy extensibility

### Key Features

 **Learning Concepts**
- Explore a curated collection of Java programming fundamentals
- Each concept includes title, description, and code examples
- Organized by chapters for structured learning

 **Interactive Game**
- Practice and test your understanding through interactive gameplay

 **Concept Management**
- View detailed concept information
- Add new concepts through the concept form
- Delete concepts with confirmation dialog
- Real-time updates with smooth scroll animations

##  Technology Stack

- **Framework**: Angular 20.3.0
- **Language**: TypeScript 5.9.2
- **Styling**: CSS3
- **State Management**: RxJS
- **Testing**: Jasmine & Karma
- **Build Tool**: Angular CLI 20.3.5

##  Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.x or higher)
- **npm** (v9.x or higher)

You can verify your installation by running:

```bash
node --version
npm --version
```

##  Getting Started

### 1. Installation

Clone the repository and install dependencies:

```bash
npm install
```

This will install all required packages listed in `package.json`.

### 2. Running in Development Mode

Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:4200` (or the port shown in your console).

The development server includes:
- Hot module reloading - changes are reflected instantly
- Source maps for easier debugging
- Full error reporting in the browser console

### 3. Building for Production

Create an optimized production build:

```bash
npm run build
```

The compiled application will be in the `dist/` directory. These files can be deployed to a web server.

### 4. Running Tests

Execute the test suite:

```bash
npm test
```

This runs all unit tests using Karma and Jasmine. Test files are located alongside their respective components (`*.spec.ts`).

### 5. Watch Mode (Optional)

For continuous builds during development:

```bash
npm run watch
```

This builds the project in watch mode, automatically recompiling when files change.

##  Project Structure

```
src/
├── app/                          # Main application code
│   ├── models/
│   │   └── concept.ts           # Concept interface definition
│   ├── services/
│   │   ├── concept.service.ts   # Concept data management
│   │   └── scroll-animation.service.ts
│   ├── home/                    # Home page component
│   ├── game/                    # Interactive game component
│   ├── concept-list/            # Display list of concepts
│   ├── concept-details/         # Detailed view of a concept
│   ├── concept-form/            # Form for adding/editing concepts
│   └── delete-confirmation/     # Delete confirmation dialog
├── assets/
│   └── data/
│       └── concepts.json        # Concept data (Java topics)
└── index.html                   # Main HTML file
├── package.json                 # Project dependencies
├── angular.json                 # Angular CLI configuration
└── tsconfig.json               # TypeScript configuration
```

##  Usage

1. **View Concepts**: Navigate to the concept list to see all available Java topics
2. **Learn Details**: Click on a concept to view detailed explanation and examples
3. **Add Concept**: Use the concept form to add new learning concepts
4. **Play Game**: Test your knowledge with the interactive game component
5. **Delete Concept**: Remove concepts using the delete confirmation dialog

## 🔧 Development Tips

### Adding a New Concept

1. Edit `src/assets/data/concepts.json`
2. Add a new concept object with:
   - `id`: Unique identifier
   - `title`: Concept name
   - `description`: Brief overview
   - `blocks`: Code examples or key points
   - `chapterId`: Chapter grouping

### Creating New Components

Use Angular CLI to generate new components:

```bash
ng generate component component-name
```

### Debugging

- Open browser DevTools (F12 in most browsers)
- Check the Console tab for TypeScript compilation errors
- Use Chrome DevTools for DOM inspection and Network analysis


##  License

This project is part of an Angular learning initiative.

##  Contributing

To contribute improvements:

1. Make your changes
2. Run tests: `npm test`
3. Build: `npm run build`
4. Submit your improvements

---

**Happy Learning!** 
- Run unit tests:

```bash
npm test
```

- If linting/formatting scripts exist, run them before committing:

```bash
npm run lint
npm run format
```



## Contribution
- Fork the repository, create a feature branch (`feature/your-feature`), make changes and open a pull request.
- Follow existing code style and commit message conventions.

## License
Choose a license (e.g. MIT) and add a `LICENSE` file to the repository.

## Contact
Open an issue or contact the maintainer via their GitHub profile.

---
Generated for this Angular project — feel free to edit to fit your repo details.
