# 🤖 AI Uninformed Search Assignment  
 Assignment implementation of **Breadth-First Search (BFS)**, **Depth-First Search (DFS)**, and **Uniform Cost Search (UCS)** for AI pathfinding problems.

![Python](https://img.shields.io/badge/Python-3.10+-blue?logo=python)
![AI](https://img.shields.io/badge/Artificial%20Intelligence-AI-orange)
![License](https://img.shields.io/badge/License-MIT-green)


## 🧩 Overview

This project demonstrates **uninformed search algorithms** for finding the shortest path between cities.  
We modeled a **graph of cities with weighted edges** and used BFS, DFS, and UCS to compute the optimal route.

**Key Points:**
- Each **city** is represented as a node.  
- Connections between cities have **values/costs** representing distances.  
- The algorithms explore the graph to find **shortest paths** from a start city to a goal city.

## 🎯 Algorithms Implemented

### 1️⃣ Breadth-First Search (BFS)
- Explores nodes **level by level**  
- Guarantees **shortest path** for unweighted graphs  
- Useful when all edges have equal cost  

### 2️⃣ Depth-First Search (DFS)
- Explores nodes **deepest first**  
- Not guaranteed to find the shortest path  
- Useful for **path existence checks**  

### 3️⃣ Uniform Cost Search (UCS)
- Explores nodes based on **path cost (lowest first)**  
- Guarantees **shortest path in weighted graphs**  
- Uses **priority queue** for optimal selection  

## 🏗️ How It Works

1. Define **cities as nodes** and **distances as edge values**.  
2. Choose a **start city** and a **goal city**.  
3. Run BFS, DFS, or UCS to explore the graph:  
   - BFS and DFS use a **queue or stack** respectively.  
   - UCS uses a **priority queue** based on cumulative cost.  
4. Output the **best/shortest path** and its total cost.  

📈 Example Output
Start City: A
Goal City: G

BFS Path: A → B → D → G
DFS Path: A → C → F → G
UCS Path: A → B → E → G (Shortest path with total cost = 12)

🔮 Future Enhancements
Add graph visualization for better understanding

Implement bidirectional search for efficiency

Extend to informed search with heuristics (A*, Greedy)

🤝 Contributing
Contributions are welcome! Fork the repo and create pull requests.
Please open an issue for any bugs or feature requests.

📜 License
This project is licensed under MIT License  see the LICENSE file for details.

👨‍💻 Author
Muhammad Behram Hassan
📧 muhammadbehramhassan@gmail.com
🌐 GitHub

⭐ If this project helps you, please give it a star on GitHub!









