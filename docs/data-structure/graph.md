# 图结构

## 目录
1. [图的基本概念](#1-图的基本概念)
2. [图的表示方法](#2-图的表示方法)
3. [深度优先搜索](#3-深度优先搜索)
4. [广度优先搜索](#4-广度优先搜索)
5. [最短路径算法](#5-最短路径算法)
6. [图的应用](#6-图的应用)

---

## 1. 图的基本概念

### 图的分类

| 类型 | 特点 | 应用场景 |
|------|------|----------|
| **无向图** | 边没有方向 | 社交网络、道路网络 |
| **有向图** | 边有方向 | 网页链接、依赖关系 |
| **加权图** | 边有权重 | 最短路径、网络流 |
| **无权图** | 边无权重 | 连通性判断 |

### 基本术语

- **顶点(Vertex)**: 图中的节点
- **边(Edge)**: 连接两个顶点的线
- **度(Degree)**: 顶点连接的边数
- **路径(Path)**: 顶点间的连接序列
- **环(Cycle)**: 起点和终点相同的路径
- **连通图**: 任意两顶点间都有路径

---

## 2. 图的表示方法

### 邻接矩阵

#### 特点
- **空间复杂度**: O(V²)
- **查询边**: O(1)
- **适用**: 稠密图

#### Python实现

```python
class GraphMatrix:
    def __init__(self, num_vertices):
        self.num_vertices = num_vertices
        self.matrix = [[0] * num_vertices for _ in range(num_vertices)]
    
    def add_edge(self, u, v, weight=1):
        """添加边"""
        self.matrix[u][v] = weight
        # 无向图需要添加反向边
        # self.matrix[v][u] = weight
    
    def remove_edge(self, u, v):
        """删除边"""
        self.matrix[u][v] = 0
        # self.matrix[v][u] = 0  # 无向图
    
    def has_edge(self, u, v):
        """检查是否存在边"""
        return self.matrix[u][v] != 0
    
    def get_neighbors(self, vertex):
        """获取邻居节点"""
        neighbors = []
        for i in range(self.num_vertices):
            if self.matrix[vertex][i] != 0:
                neighbors.append(i)
        return neighbors
    
    def display(self):
        """显示邻接矩阵"""
        for row in self.matrix:
            print(row)

# 使用示例
graph = GraphMatrix(4)
graph.add_edge(0, 1)
graph.add_edge(0, 2)
graph.add_edge(1, 2)
graph.add_edge(2, 3)

print("邻接矩阵:")
graph.display()
print("节点0的邻居:", graph.get_neighbors(0))
```

#### C++实现

```cpp
#include <iostream>
#include <vector>
using namespace std;

class GraphMatrix {
private:
    int numVertices;
    vector<vector<int>> matrix;

public:
    GraphMatrix(int vertices) : numVertices(vertices) {
        matrix.resize(vertices, vector<int>(vertices, 0));
    }
    
    void addEdge(int u, int v, int weight = 1) {
        matrix[u][v] = weight;
        // 无向图: matrix[v][u] = weight;
    }
    
    void removeEdge(int u, int v) {
        matrix[u][v] = 0;
        // 无向图: matrix[v][u] = 0;
    }
    
    bool hasEdge(int u, int v) {
        return matrix[u][v] != 0;
    }
    
    vector<int> getNeighbors(int vertex) {
        vector<int> neighbors;
        for (int i = 0; i < numVertices; i++) {
            if (matrix[vertex][i] != 0) {
                neighbors.push_back(i);
            }
        }
        return neighbors;
    }
    
    void display() {
        for (int i = 0; i < numVertices; i++) {
            for (int j = 0; j < numVertices; j++) {
                cout << matrix[i][j] << " ";
            }
            cout << endl;
        }
    }
};
```

### 邻接表

#### 特点
- **空间复杂度**: O(V + E)
- **查询边**: O(度数)
- **适用**: 稀疏图

#### Python实现

```python
from collections import defaultdict

class GraphList:
    def __init__(self):
        self.graph = defaultdict(list)
    
    def add_edge(self, u, v, weight=1):
        """添加边"""
        self.graph[u].append((v, weight))
        # 无向图需要添加反向边
        # self.graph[v].append((u, weight))
    
    def remove_edge(self, u, v):
        """删除边"""
        self.graph[u] = [(vertex, weight) for vertex, weight in self.graph[u] 
                         if vertex != v]
    
    def has_edge(self, u, v):
        """检查是否存在边"""
        for vertex, _ in self.graph[u]:
            if vertex == v:
                return True
        return False
    
    def get_neighbors(self, vertex):
        """获取邻居节点"""
        return [v for v, _ in self.graph[vertex]]
    
    def get_vertices(self):
        """获取所有顶点"""
        vertices = set()
        for u in self.graph:
            vertices.add(u)
            for v, _ in self.graph[u]:
                vertices.add(v)
        return list(vertices)
    
    def display(self):
        """显示邻接表"""
        for vertex in self.graph:
            print(f"{vertex}: {self.graph[vertex]}")

# 使用示例
graph = GraphList()
graph.add_edge(0, 1)
graph.add_edge(0, 2)
graph.add_edge(1, 2)
graph.add_edge(2, 3)

print("邻接表:")
graph.display()
print("节点0的邻居:", graph.get_neighbors(0))
```

#### C++实现

```cpp
#include <iostream>
#include <vector>
#include <list>
#include <unordered_map>
using namespace std;

class GraphList {
private:
    unordered_map<int, list<pair<int, int>>> adjList;

public:
    void addEdge(int u, int v, int weight = 1) {
        adjList[u].push_back({v, weight});
        // 无向图: adjList[v].push_back({u, weight});
    }
    
    void removeEdge(int u, int v) {
        adjList[u].remove_if([v](const pair<int, int>& p) {
            return p.first == v;
        });
    }
    
    bool hasEdge(int u, int v) {
        for (auto& edge : adjList[u]) {
            if (edge.first == v) {
                return true;
            }
        }
        return false;
    }
    
    vector<int> getNeighbors(int vertex) {
        vector<int> neighbors;
        for (auto& edge : adjList[vertex]) {
            neighbors.push_back(edge.first);
        }
        return neighbors;
    }
    
    void display() {
        for (auto& vertex : adjList) {
            cout << vertex.first << ": ";
            for (auto& edge : vertex.second) {
                cout << "(" << edge.first << "," << edge.second << ") ";
            }
            cout << endl;
        }
    }
};
```

---

## 3. 深度优先搜索

### 基本特性
- **策略**: 尽可能深入，然后回溯
- **时间复杂度**: O(V + E)
- **空间复杂度**: O(V)
- **应用**: 拓扑排序、连通性检测、环检测

### Python实现

```python
def dfs_recursive(graph, start, visited=None):
    """递归DFS"""
    if visited is None:
        visited = set()
    
    visited.add(start)
    result = [start]
    
    for neighbor in graph.get_neighbors(start):
        if neighbor not in visited:
            result.extend(dfs_recursive(graph, neighbor, visited))
    
    return result

def dfs_iterative(graph, start):
    """迭代DFS"""
    visited = set()
    stack = [start]
    result = []
    
    while stack:
        vertex = stack.pop()
        
        if vertex not in visited:
            visited.add(vertex)
            result.append(vertex)
            
            # 将邻居加入栈（逆序以保持顺序）
            neighbors = graph.get_neighbors(vertex)
            for neighbor in reversed(neighbors):
                if neighbor not in visited:
                    stack.append(neighbor)
    
    return result

def has_cycle_directed(graph):
    """检测有向图中的环"""
    WHITE, GRAY, BLACK = 0, 1, 2
    color = {}
    
    def dfs(vertex):
        if vertex in color:
            return color[vertex] == GRAY  # 发现后向边，存在环
        
        color[vertex] = GRAY
        
        for neighbor in graph.get_neighbors(vertex):
            if dfs(neighbor):
                return True
        
        color[vertex] = BLACK
        return False
    
    for vertex in graph.get_vertices():
        if vertex not in color:
            if dfs(vertex):
                return True
    
    return False

# 使用示例
graph = GraphList()
graph.add_edge(0, 1)
graph.add_edge(0, 2)
graph.add_edge(1, 3)
graph.add_edge(2, 3)

print("DFS递归:", dfs_recursive(graph, 0))
print("DFS迭代:", dfs_iterative(graph, 0))
```

### C++实现

```cpp
#include <iostream>
#include <vector>
#include <stack>
#include <unordered_set>
using namespace std;

class DFS {
public:
    // 递归DFS
    vector<int> dfsRecursive(GraphList& graph, int start) {
        vector<int> result;
        unordered_set<int> visited;
        dfsRecursiveHelper(graph, start, visited, result);
        return result;
    }
    
    // 迭代DFS
    vector<int> dfsIterative(GraphList& graph, int start) {
        vector<int> result;
        unordered_set<int> visited;
        stack<int> stk;
        
        stk.push(start);
        
        while (!stk.empty()) {
            int vertex = stk.top();
            stk.pop();
            
            if (visited.find(vertex) == visited.end()) {
                visited.insert(vertex);
                result.push_back(vertex);
                
                vector<int> neighbors = graph.getNeighbors(vertex);
                for (int i = neighbors.size() - 1; i >= 0; i--) {
                    if (visited.find(neighbors[i]) == visited.end()) {
                        stk.push(neighbors[i]);
                    }
                }
            }
        }
        
        return result;
    }

private:
    void dfsRecursiveHelper(GraphList& graph, int vertex, 
                           unordered_set<int>& visited, 
                           vector<int>& result) {
        visited.insert(vertex);
        result.push_back(vertex);
        
        for (int neighbor : graph.getNeighbors(vertex)) {
            if (visited.find(neighbor) == visited.end()) {
                dfsRecursiveHelper(graph, neighbor, visited, result);
            }
        }
    }
};
```

---

## 4. 广度优先搜索

### 基本特性
- **策略**: 逐层扩展
- **时间复杂度**: O(V + E)
- **空间复杂度**: O(V)
- **应用**: 最短路径、层次遍历

### Python实现

```python
from collections import deque

def bfs(graph, start):
    """广度优先搜索"""
    visited = set()
    queue = deque([start])
    result = []
    
    visited.add(start)
    
    while queue:
        vertex = queue.popleft()
        result.append(vertex)
        
        for neighbor in graph.get_neighbors(vertex):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return result

def bfs_shortest_path(graph, start, end):
    """BFS求最短路径"""
    if start == end:
        return [start]
    
    visited = set()
    queue = deque([(start, [start])])
    visited.add(start)
    
    while queue:
        vertex, path = queue.popleft()
        
        for neighbor in graph.get_neighbors(vertex):
            if neighbor == end:
                return path + [neighbor]
            
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))
    
    return None  # 无路径

def bfs_levels(graph, start):
    """BFS按层遍历"""
    visited = set()
    queue = deque([(start, 0)])
    levels = {}
    
    visited.add(start)
    
    while queue:
        vertex, level = queue.popleft()
        
        if level not in levels:
            levels[level] = []
        levels[level].append(vertex)
        
        for neighbor in graph.get_neighbors(vertex):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, level + 1))
    
    return levels

# 使用示例
graph = GraphList()
graph.add_edge(0, 1)
graph.add_edge(0, 2)
graph.add_edge(1, 3)
graph.add_edge(2, 3)
graph.add_edge(3, 4)

print("BFS遍历:", bfs(graph, 0))
print("最短路径 0->4:", bfs_shortest_path(graph, 0, 4))
print("按层遍历:", bfs_levels(graph, 0))
```

### C++实现

```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <unordered_set>
#include <unordered_map>
using namespace std;

class BFS {
public:
    vector<int> bfs(GraphList& graph, int start) {
        vector<int> result;
        unordered_set<int> visited;
        queue<int> q;
        
        q.push(start);
        visited.insert(start);
        
        while (!q.empty()) {
            int vertex = q.front();
            q.pop();
            result.push_back(vertex);
            
            for (int neighbor : graph.getNeighbors(vertex)) {
                if (visited.find(neighbor) == visited.end()) {
                    visited.insert(neighbor);
                    q.push(neighbor);
                }
            }
        }
        
        return result;
    }
    
    vector<int> shortestPath(GraphList& graph, int start, int end) {
        if (start == end) {
            return {start};
        }
        
        unordered_set<int> visited;
        queue<pair<int, vector<int>>> q;
        
        q.push({start, {start}});
        visited.insert(start);
        
        while (!q.empty()) {
            auto [vertex, path] = q.front();
            q.pop();
            
            for (int neighbor : graph.getNeighbors(vertex)) {
                if (neighbor == end) {
                    vector<int> result = path;
                    result.push_back(neighbor);
                    return result;
                }
                
                if (visited.find(neighbor) == visited.end()) {
                    visited.insert(neighbor);
                    vector<int> newPath = path;
                    newPath.push_back(neighbor);
                    q.push({neighbor, newPath});
                }
            }
        }
        
        return {}; // 无路径
    }
};
```

---

## 5. 最短路径算法

### Dijkstra算法

#### 特点
- **适用**: 非负权重图
- **时间复杂度**: O((V + E) log V)
- **策略**: 贪心算法

#### Python实现

```python
import heapq
from collections import defaultdict

def dijkstra(graph, start):
    """Dijkstra最短路径算法"""
    distances = defaultdict(lambda: float('inf'))
    distances[start] = 0
    previous = {}
    pq = [(0, start)]
    visited = set()
    
    while pq:
        current_dist, current = heapq.heappop(pq)
        
        if current in visited:
            continue
        
        visited.add(current)
        
        # 检查所有邻居
        for neighbor, weight in graph.graph[current]:
            if neighbor not in visited:
                new_dist = current_dist + weight
                
                if new_dist < distances[neighbor]:
                    distances[neighbor] = new_dist
                    previous[neighbor] = current
                    heapq.heappush(pq, (new_dist, neighbor))
    
    return dict(distances), previous

def get_shortest_path(previous, start, end):
    """根据previous数组重构路径"""
    path = []
    current = end
    
    while current is not None:
        path.append(current)
        current = previous.get(current)
    
    path.reverse()
    
    if path[0] == start:
        return path
    else:
        return None  # 无路径

# 使用示例
graph = GraphList()
graph.add_edge(0, 1, 4)
graph.add_edge(0, 2, 2)
graph.add_edge(1, 2, 1)
graph.add_edge(1, 3, 5)
graph.add_edge(2, 3, 8)
graph.add_edge(2, 4, 10)
graph.add_edge(3, 4, 2)

distances, previous = dijkstra(graph, 0)
print("从节点0的最短距离:", dict(distances))
print("到节点4的最短路径:", get_shortest_path(previous, 0, 4))
```

### Floyd-Warshall算法

#### 特点
- **适用**: 所有顶点对最短路径
- **时间复杂度**: O(V³)
- **可处理**: 负权边（但不能有负权环）

#### Python实现

```python
def floyd_warshall(graph_matrix):
    """Floyd-Warshall算法"""
    n = len(graph_matrix)
    
    # 初始化距离矩阵
    dist = [[float('inf')] * n for _ in range(n)]
    
    # 设置直接边的距离
    for i in range(n):
        for j in range(n):
            if i == j:
                dist[i][j] = 0
            elif graph_matrix[i][j] != 0:
                dist[i][j] = graph_matrix[i][j]
    
    # Floyd-Warshall核心算法
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
    
    return dist

# 使用示例
# 邻接矩阵表示图
matrix = [
    [0, 3, 0, 7],
    [8, 0, 2, 0],
    [5, 0, 0, 1],
    [2, 0, 0, 0]
]

result = floyd_warshall(matrix)
print("所有顶点对最短距离:")
for i, row in enumerate(result):
    print(f"从节点{i}: {row}")
```

---

## 6. 图的应用

### 拓扑排序

```python
def topological_sort(graph):
    """拓扑排序（Kahn算法）"""
    # 计算入度
    in_degree = defaultdict(int)
    vertices = graph.get_vertices()
    
    for vertex in vertices:
        in_degree[vertex] = 0
    
    for vertex in vertices:
        for neighbor in graph.get_neighbors(vertex):
            in_degree[neighbor] += 1
    
    # 找到所有入度为0的节点
    queue = deque()
    for vertex in vertices:
        if in_degree[vertex] == 0:
            queue.append(vertex)
    
    result = []
    
    while queue:
        vertex = queue.popleft()
        result.append(vertex)
        
        # 减少邻居的入度
        for neighbor in graph.get_neighbors(vertex):
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # 检查是否存在环
    if len(result) != len(vertices):
        return None  # 存在环，无法拓扑排序
    
    return result
```

### 最小生成树（Kruskal算法）

```python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
    
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
    
    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return False
        
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        
        self.parent[py] = px
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1
        
        return True

def kruskal_mst(edges, num_vertices):
    """Kruskal最小生成树算法"""
    # 按权重排序
    edges.sort(key=lambda x: x[2])
    
    uf = UnionFind(num_vertices)
    mst = []
    total_weight = 0
    
    for u, v, weight in edges:
        if uf.union(u, v):
            mst.append((u, v, weight))
            total_weight += weight
            
            if len(mst) == num_vertices - 1:
                break
    
    return mst, total_weight

# 使用示例
edges = [
    (0, 1, 4), (0, 2, 2), (1, 2, 1),
    (1, 3, 5), (2, 3, 8), (2, 4, 10), (3, 4, 2)
]

mst, weight = kruskal_mst(edges, 5)
print("最小生成树:", mst)
print("总权重:", weight)
```

---

## 总结

图结构是处理复杂关系的强大工具：

### 表示方法选择
- **邻接矩阵**：适合稠密图，查询快速
- **邻接表**：适合稀疏图，空间效率高

### 遍历算法
- **DFS**：深入探索，适合路径搜索、环检测
- **BFS**：逐层扩展，适合最短路径、层次遍历

### 最短路径
- **Dijkstra**：单源最短路径，不能处理负权边
- **Floyd-Warshall**：所有顶点对最短路径，可处理负权边

### 应用场景
- **社交网络**：好友关系、影响力传播
- **交通网络**：路径规划、导航系统
- **依赖关系**：任务调度、编译顺序
- **网络拓扑**：网络设计、故障检测

选择合适的图算法是解决实际问题的关键！
