const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;

// Player character
const player = {
  x: 5,
  y: 5,
  size: 20,
  color: "blue",
};

// Grid size
const gridSize = 40;

// Draw grid
function drawGrid() {
  ctx?.clearRect(0, 0, canvas.width, canvas.height);
  for (let x = 0; x < canvas.width; x += gridSize) {
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx?.strokeRect(x, y, gridSize, gridSize);
    }
  }
}

// Draw player character
function drawPlayer() {
  ctx?.beginPath();
  ctx?.arc(
    player.x * gridSize + gridSize / 2,
    player.y * gridSize + gridSize / 2,
    player.size / 2,
    0,
    Math.PI * 2
  );
  ctx!.fillStyle = player.color;
  ctx?.fill();
}

// Update game display
function updateDisplay() {
  drawGrid();
  drawPlayer();
}

// Handle commands from the terminal
function handleCommand(command: string) {
  switch (command) {
    case "up":
      if (player.y > 0) player.y--;
      break;
    case "down":
      if (player.y < canvas.height / gridSize - 1) player.y++;
      break;
    case "left":
      if (player.x > 0) player.x--;
      break;
    case "right":
      if (player.x < canvas.width / gridSize - 1) player.x++;
      break;
    default:
      console.log("Unknown command");
      break;
  }
  updateDisplay();
}

// Listen for commands in the terminal
const commandInput = document.getElementById(
  "commandInput"
) as HTMLInputElement;
commandInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    handleCommand(commandInput.value.toLowerCase());
    commandInput.value = "";
  }
});

// Initial draw
updateDisplay();
