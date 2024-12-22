// Graph Data Structure
const graph = {};
const positions = {};

// Canvas Setup
const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');

// UI Elements
const addEdgeForm = document.getElementById('addEdgeForm');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const startNodeInput = document.getElementById('startNode');
const goalNodeInput = document.getElementById('goalNode');
const algorithmSelect = document.getElementById('algorithm');
const pathOutput = document.getElementById('pathOutput');
const costOutput = document.getElementById('costOutput');
const stepsOutput = document.getElementById('timeComplexityOutput');

// Helper Functions
function addEdge(from, to, cost) {
    if (!graph[from]) graph[from] = [];
    if (!positions[from]) positions[from] = randomPosition();
    if (!positions[to]) positions[to] = randomPosition();

    graph[from].push({ node: to, cost });
    drawGraph();
}

function randomPosition() {
    return { x: Math.random() * 700 + 50, y: Math.random() * 500 + 50 };
}

function drawGraph(highlightPath = [], visitedNodes = new Set()) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Edges
    for (const from in graph) {
        for (const edge of graph[from]) {
            const { node: to, cost } = edge;
            const start = positions[from];
            const end = positions[to];
            const edgeKey = `${from}-${to}`;

            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            ctx.strokeStyle = highlightPath.includes(edgeKey) ? 'red' : '#ccc';
            ctx.lineWidth = highlightPath.includes(edgeKey) ? 3 : 2;
            ctx.stroke();
            ctx.closePath();

            const midX = (start.x + end.x) / 2;
            const midY = (start.y + end.y) / 2;
            ctx.fillStyle = 'black';
            ctx.fillText(cost, midX, midY);
        }
    }

    // Draw Nodes
    for (const node in positions) {
        const { x, y } = positions[node];
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, 2 * Math.PI);
        ctx.fillStyle = visitedNodes.has(node) ? '#ffeb3b' : 'white';
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();

        ctx.fillStyle = 'black';
        ctx.fillText(node, x - 5, y + 5);
    }
}

async function visualizeSearch(steps, visitedNodes) {
    for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        visitedNodes.add(step);
        drawGraph([], visitedNodes);

        // Introduce a delay
        if ((i + 1) % 3 === 0) {
            // Extra delay after every 3 nodes
            await new Promise((resolve) => setTimeout(resolve, 1000));
        } else {
            // Regular delay between node visits
            await new Promise((resolve) => setTimeout(resolve, 500)); 
        }
    }
}


async function highlightBestPath(highlightPath) {
    const visitedNodes = new Set();
    for (let i = 0; i < highlightPath.length; i++) {
        const [from, to] = highlightPath[i].split('-');
        visitedNodes.add(from);
        visitedNodes.add(to);
        drawGraph(highlightPath.slice(0, i + 1), visitedNodes)
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }
}


function extractHighlightPath(path) {
    const edges = [];
    for (let i = 0; i < path.length - 1; i++) {
        edges.push(`${path[i]}-${path[i + 1]}`);
    }
    return edges;
}

// Breadth-First Search
async function breadthFirstSearch(start, goal) {
    const visited = new Set();
    const queue = [{ node: start, path: [start] }];
    const steps = [];

    while (queue.length > 0) {
        const current = queue.shift();
        steps.push(current.node);
        visited.add(current.node);

        if (current.node === goal) {
            await visualizeSearch(steps, visited);
            return { path: current.path, steps };
        }

        for (const neighbor of graph[current.node] || []) {
            if (!visited.has(neighbor.node)) {
                queue.push({
                    node: neighbor.node,
                    path: [...current.path, neighbor.node],
                });
            }
        }
    }

    await visualizeSearch(steps, visited);
    return { path: [], steps };
}

// Depth-First Search
async function depthFirstSearch(start, goal) {
    const visited = new Set();
    const stack = [{ node: start, path: [start] }];
    const steps = [];

    while (stack.length > 0) {
        const current = stack.pop();
        steps.push(current.node);
        visited.add(current.node);

        if (current.node === goal) {
            await visualizeSearch(steps, visited);
            return { path: current.path, steps };
        }

        for (const neighbor of graph[current.node] || []) {
            if (!visited.has(neighbor.node)) {
                stack.push({
                    node: neighbor.node,
                    path: [...current.path, neighbor.node],
                });
            }
        }
    }

    await visualizeSearch(steps, visited);
    return { path: [], steps };
}

// Uniform-Cost Search
async function uniformCostSearch(start, goal) {
    const visited = new Set();
    const queue = [{ node: start, path: [start], cost: 0 }];
    const steps = [];

    while (queue.length > 0) {
        queue.sort((a, b) => a.cost - b.cost);
        const current = queue.shift();
        steps.push(current.node);
        visited.add(current.node);

        if (current.node === goal) {
            await visualizeSearch(steps, visited);
            return { path: current.path, steps, cost: current.cost };
        }

        for (const neighbor of graph[current.node] || []) {
            if (!visited.has(neighbor.node)) {
                queue.push({
                    node: neighbor.node,
                    path: [...current.path, neighbor.node],
                    cost: current.cost + neighbor.cost,
                });
            }
        }
    }

    await visualizeSearch(steps, visited);
    return { path: [], steps, cost: 0 };
}

// Event Listeners
addEdgeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const from = document.getElementById('fromNode').value.toUpperCase();
    const to = document.getElementById('toNode').value.toUpperCase();
    const cost = parseInt(document.getElementById('cost').value, 10);

    if (!from || !to || isNaN(cost) || cost < 1) {
        alert('Please provide valid inputs.');
        return;
    }

    addEdge(from, to, cost);
    addEdgeForm.reset();
});

startButton.addEventListener('click', async () => {
    const startNode = startNodeInput.value.toUpperCase();
    const goalNode = goalNodeInput.value.toUpperCase();
    const algorithm = algorithmSelect.value;

    let result;
    if (algorithm === 'BFS') {
        result = await breadthFirstSearch(startNode, goalNode);
    } else if (algorithm === 'DFS') {
        result = await depthFirstSearch(startNode, goalNode);
    } else if (algorithm === 'UCS') {
        result = await uniformCostSearch(startNode, goalNode);
    }

    if (result) {
        const highlightPath = extractHighlightPath(result.path);
        pathOutput.textContent = result.path.join(' → ');
        stepsOutput.textContent = result.steps.length;
        costOutput.textContent = result.cost || 'N/A';
        await highlightBestPath(highlightPath);
    } else {
        alert('No path found.');
    }
});

resetButton.addEventListener('click', () => {
    Object.keys(graph).forEach((key) => delete graph[key]);
    Object.keys(positions).forEach((key) => delete positions[key]);
    drawGraph();
    pathOutput.textContent = 'N/A';
    costOutput.textContent = 'N/A';
    stepsOutput.textContent = 'N/A';
});

// Initialize Graph
drawGraph();
