const grid = document.getElementById("grid");
const gridDensitySlider = document.getElementById("gridDensity");
const themeButtons = document.querySelectorAll(".theme-button");

let gridWidth = 15; // Default grid width (columns)
let gridHeight = 15; // Default grid height (rows)
let isMouseDown = false;

const themes = {
  carbon: {
    backgroundColor: "#2E2E2E", // Dark carbon background
    gridColor: "#FF5722", // Blood orange for grid
    activeColor: "#ffffff", // White for active cells
  },
  vaporwave: {
    backgroundColor: "#ff4dd2", // Soft pink background
    gridColor: "#5cc9a3", // Seafoam green
    activeColor: "#b28eeb", // Lavender for active cells
  },
  cyber: {
    backgroundColor: "#000000", // Black background
    gridColor: "#999999", // Neutral gray grid
    activeColor: "#00FF00", // Neon green for active cells
  },
  neon: {
    backgroundColor: "#111111", // Very dark background
    gridColor: "#F60D9B", // Neon pink
    activeColor: "#00FFFF", // Neon cyan for active cells
  },
  print: {
    backgroundColor: "#F5F5F5", // Soft off-white
    gridColor: "#B0BEC5", // Muted gray grid
    activeColor: "#1E2A47", // Dark blue for active cells
  },
  ocean: {
    backgroundColor: "#1E2A47", // Deep ocean blue
    gridColor: "#3C4C74", // Muted ocean blue
    activeColor: "#1E88E5", // Light blue for active cells
  },
};

// Default theme is now Carbon
let currentTheme = themes.carbon;

function generateGrid() {
  grid.innerHTML = "";
  grid.style.gridTemplateColumns = `repeat(${gridWidth}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${gridHeight}, 1fr)`;

  for (let i = 0; i < gridWidth * gridHeight; i++) {
    const div = document.createElement("div");
    div.addEventListener("click", () => changeColor(div));
    div.addEventListener("mouseenter", () => {
      if (isMouseDown) changeColor(div);
    });
    grid.appendChild(div);
  }
}

function changeColor(div) {
  div.style.backgroundColor = currentTheme.activeColor;
}

function resetGridColors() {
  const gridDivs = grid.querySelectorAll("div");
  gridDivs.forEach((div) => {
    div.style.backgroundColor = currentTheme.gridColor;
  });
}

function applyTheme(theme) {
  currentTheme = theme;
  document.body.style.backgroundColor = theme.backgroundColor;
  resetGridColors();
}

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const theme = themes[button.id];
    applyTheme(theme);
  });
});

gridDensitySlider.addEventListener("input", () => {
  const density = gridDensitySlider.value;
  gridWidth = Math.max(5, density); // Ensure a minimum grid width
  gridHeight = Math.max(5, Math.floor(density * 0.5)); // Adjust grid height proportionally
  generateGrid();
  resetGridColors();
});

document.body.addEventListener("mousedown", () => {
  isMouseDown = true;
});

document.body.addEventListener("mouseup", () => {
  isMouseDown = false;
});

generateGrid();
applyTheme(currentTheme);
