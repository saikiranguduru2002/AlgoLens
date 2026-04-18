# AlgoLens

AlgoLens is an interactive algorithm visualizer built for learning and demonstration. It lets users see how algorithms execute step by step through animated visualizations, synchronized pseudocode highlighting, playback controls, and complexity explanations.

This MVP is built with:

- `Next.js` + `React` + `TypeScript` for the frontend
- `D3.js` for interactive visualizations
- `Node.js` + `Express` for the backend API
- `Tailwind CSS` for styling

## What This Project Does

AlgoLens helps users understand how classic algorithms work instead of just reading static code.

Users can:

- choose an algorithm
- generate random or manual input
- play, pause, step forward, and reset the animation
- adjust playback speed
- view pseudocode with the active line highlighted
- inspect time and space complexity
- switch between light and dark mode

## Supported Algorithms

### Sorting

- Bubble Sort
- Merge Sort
- Quick Sort

### Searching

- Binary Search

### Graph Traversal

- BFS
- DFS

### Bonus

- Fibonacci Tabulation

## Main Features

- interactive algorithm playback engine
- reusable step-based visualization architecture
- D3-based bar visualization for array algorithms
- graph visualization for BFS and DFS
- pseudocode learning panel
- time and space complexity display
- configurable input controls
- frontend fallback logic if backend execution is unavailable
- responsive dashboard layout

## Live Link

- Local running app: [http://localhost:3001](http://localhost:3001)
- Backend API health: [http://localhost:4000/health](http://localhost:4000/health)
- Public app: [https://algolenslab.vercel.app/](https://algolenslab.vercel.app/)

Deployment setup used for this project:

- frontend hosted on [Vercel](https://vercel.com/)
- backend hosted on [Render](https://render.com/)

## How To Use

### 1. Select an Algorithm

Use the left control panel to choose the algorithm you want to visualize.

### 2. Configure Input

Depending on the selected algorithm, you can:

- generate a random array
- enter your own comma-separated array manually
- set a target value for Binary Search
- set the Fibonacci count for the DP example

### 3. Generate Visualization

Click `Generate Visualization` to create the algorithm steps.

### 4. Control Playback

Use:

- `Play` to start animation
- `Pause` to stop animation
- `Step Forward` to move one step at a time
- `Reset` to return to the first step

### 5. Learn From the Right Panel

The right panel shows:

- a short algorithm explanation
- pseudocode
- active line highlighting
- time complexity
- space complexity
- step description

## Screens and Layout

The application uses a 3-panel learning layout:

- Left: controls and playback actions
- Center: visualization canvas
- Right: pseudocode and learning panel

This makes the tool useful both for self-learning and for teaching/demo sessions.

## Architecture

The project is organized as a small monorepo:

```text
AlgoLens/
  frontend/
    app/
    components/
    hooks/
    utils/
    visualizers/
  backend/
    src/
      algorithms/
      controllers/
      routes/
```

### Frontend Responsibilities

- render dashboard UI
- generate or fetch algorithm steps
- control playback state
- animate array, graph, and DP visualizations
- display pseudocode and complexity details

### Backend Responsibilities

- expose available algorithm metadata
- accept algorithm run requests
- return generated step arrays

## Important Design Idea

Each algorithm produces a `steps` array.

Each step describes what should happen next, for example:

- which elements are being compared
- which elements were swapped
- which nodes were visited
- which pseudocode line is active
- what explanation should be shown to the user

This makes the system reusable and easy to extend.

## API Endpoints

### `GET /algorithms`

Returns the list of supported algorithms and their metadata.

### `POST /run`

Accepts algorithm input and returns the generated step sequence.

Example request:

```json
{
  "algorithm": "bubble-sort",
  "input": {
    "array": [42, 19, 33, 8, 27]
  }
}
```

## Setup Instructions

## Prerequisites

- Node.js `18+` recommended
- npm `9+` recommended

## Install Dependencies

From the project root:

```bash
npm install
```

## Run in Development

Start frontend and backend together:

```bash
npm run dev
```

Or run them separately:

```bash
npm run dev:frontend
npm run dev:backend
```

## Local URLs

- Frontend: [http://localhost:3001](http://localhost:3001)
- Backend: [http://localhost:4000](http://localhost:4000)
- Health Check: [http://localhost:4000/health](http://localhost:4000/health)

Note:

- Next.js may use `3001` if `3000` is already occupied on your machine.

## Build for Production

```bash
npm run build
```

## Current MVP Scope

Fully demonstrated in the current build:

- reusable visualizer engine
- complete Bubble Sort interaction flow
- D3 array visualization
- algorithm metadata and backend execution route
- pseudocode synchronization
- dark/light theme toggle

Structured for extension:

- Merge Sort
- Quick Sort
- Binary Search
- BFS
- DFS
- Fibonacci Tabulation

## Extending the Project

To add a new algorithm later:

1. add metadata to the algorithm catalog
2. implement a step generator
3. define the pseudocode lines
4. connect the steps to an existing visualizer or create a new one
5. expose it through the backend API if needed

## Known Notes

- The frontend can run algorithms locally if the backend is unavailable.
- The current local frontend is running on port `3001` in this environment.
- Production app: [https://algolenslab.vercel.app/](https://algolenslab.vercel.app/)

## How To Publish This To GitHub

### 1. Create a New GitHub Repository

Go to GitHub and create a new empty repository, for example:

`algolens`

Do not add a README there, because this project already has one.

### 2. Initialize Git Locally

From the project root:

```bash
git init
git add .
git commit -m "Initial commit: AlgoLens MVP"
```

### 3. Add the GitHub Remote

Replace `<your-repo-url>` with your actual GitHub repo URL:

```bash
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

Example:

```bash
git remote add origin https://github.com/your-username/algolens.git
git push -u origin main
```

### 4. If Git Asks for Authentication

Use one of these:

- GitHub Desktop
- Git Credential Manager
- a personal access token over HTTPS
- SSH if already configured

## Recommended Next Step After GitHub

Once the code is on GitHub:

1. deploy the frontend
2. deploy the backend
3. add the public live link to this README
4. optionally add screenshots or a demo GIF

## License

Add a license if you want this repo to be reusable publicly, for example `MIT`.
