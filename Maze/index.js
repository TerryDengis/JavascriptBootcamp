const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;
const cellsHorizontal = 14;
const cellsVertical = 10;

const width = window.innerWidth;
const height = window.innerHeight;

const unitLengthX = width / cellsHorizontal;
const unitLengthY = height / cellsVertical;
// set up matter
const engine = Engine.create();
const { world } = engine;
engine.world.gravity.y = 0;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: false,
    width: width,
    height: height
  }
});
Render.run(render);
Runner.run(Runner.create(), engine);

// Walls
const walls = [
  Bodies.rectangle(width / 2, 0, width, 2, { isStatic: true }),
  Bodies.rectangle(width / 2, height, width, 2, { isStatic: true }),
  Bodies.rectangle(0, height / 2, 2, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, 2, height, { isStatic: true })
];
World.add(world, walls);

// Maze generation
const shuffle = arr => {
  let counter = arr.length;
  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    counter--;
    const temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }
  return arr;
};

const grid = Array(cellsVertical)
  .fill(null)
  .map(() => Array(cellsHorizontal).fill(false));

const verticals = Array(cellsVertical)
  .fill(null)
  .map(() => Array(cellsHorizontal - 1).fill(false));

const horizontals = Array(cellsVertical - 1)
  .fill(null)
  .map(() => Array(cellsHorizontal).fill(false));

const startRow = Math.floor(Math.random() * cellsVertical);
const startColumn = Math.floor(Math.random() * cellsHorizontal);

const setupMaze = (row, column) => {
  // if I have visited this cell then return
  if (grid[row][column]) {
    return;
  }
  // mark cell as being visited
  grid[row][column] = true;

  // Assemble randomly-ordered neighbor list
  const neighbors = shuffle([
    [row - 1, column, 'up'],
    [row, column + 1, 'right'],
    [row + 1, column, 'down'],
    [row, column - 1, 'left']
  ]);

  //for each neighbor ...
  for (let neighbor of neighbors) {
    const [nextRow, nextColumn, direction] = neighbor;

    // see if that neighbor is out of bounds
    if (
      nextRow < 0 ||
      nextRow >= cellsVertical ||
      nextColumn < 0 ||
      nextColumn >= cellsHorizontal
    ) {
      continue;
    }
    // if we have visited it, continue to next neighbor
    if (grid[nextRow][nextColumn]) {
      continue;
    }

    // remove wall from the appropriate wall array
    switch (direction) {
      case 'left':
        verticals[row][column - 1] = true;
        break;

      case 'right':
        verticals[row][column] = true;
        break;

      case 'up':
        horizontals[row - 1][column] = true;
        break;

      case 'down':
        horizontals[row][column] = true;
        break;

      default:
        break;
    }
    // visit next cell
    setupMaze(nextRow, nextColumn);
  }
};

setupMaze(startRow, startColumn);

// horizontal walls inside the maze
horizontals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) {
      return;
    }
    const wall = Bodies.rectangle(
      columnIndex * unitLengthX + unitLengthX / 2,
      rowIndex * unitLengthY + unitLengthY,
      unitLengthX,
      5,
      { label: 'wall', isStatic: true, render: { fillStyle: 'red' } }
    );
    World.add(world, wall);
  });
});

// vertical lines inside the maze
verticals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) {
      return;
    }
    const wall = Bodies.rectangle(
      columnIndex * unitLengthX + unitLengthX,
      rowIndex * unitLengthY + unitLengthY / 2,
      5,
      unitLengthY,
      { label: 'wall', isStatic: true, render: { fillStyle: 'red' } }
    );
    World.add(world, wall);
  });
});

// set the goal
const goal = Bodies.rectangle(
  width - unitLengthX / 2,
  height - unitLengthY / 2,
  unitLengthX * 0.7,
  unitLengthY * 0.7,
  { isStatic: true, label: 'goal', render: { fillStyle: 'green' } }
);
World.add(world, goal);

// add the ball
const ballRadius = Math.min(unitLengthX, unitLengthY) / 4;
const ball = Bodies.circle(unitLengthX / 2, unitLengthY / 2, ballRadius, {
  label: 'ball',
  render: { fillStyle: 'blue' }
});
World.add(world, ball);

document.addEventListener('keydown', event => {
  const { x, y } = ball.velocity;

  if (event.keyCode === 87) {
    Body.setVelocity(ball, { x, y: y - 5 });
  }
  if (event.keyCode === 68) {
    Body.setVelocity(ball, { x: x + 5, y });
  }
  if (event.keyCode === 83) {
    Body.setVelocity(ball, { x, y: y + 5 });
  }
  if (event.keyCode === 65) {
    Body.setVelocity(ball, { x: x - 5, y });
  }
});

// win condition, i.e ball hits goal

Events.on(engine, 'collisionStart', event => {
  event.pairs.forEach(collision => {
    const labels = ['ball', 'goal'];
    if (labels.includes(collision.bodyA.label) && labels.includes(collision.bodyB.label)) {
      document.querySelector('.winner').classList.remove('hidden');
      world.gravity.y = 1;
      world.bodies.forEach(shape => {
        if (shape.label === 'wall') {
          Body.setStatic(shape, false);
        }
      });
    }
  });
});
