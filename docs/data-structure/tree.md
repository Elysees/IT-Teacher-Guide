# 树形结构

## 目录
1. [二叉树](#1-二叉树)
2. [二叉搜索树](#2-二叉搜索树)
3. [平衡树](#3-平衡树)
4. [堆](#4-堆)
5. [树的应用](#5-树的应用)
6. [性能对比](#6-性能对比)

---

## 1. 二叉树

### 基本特性
- **定义**: 每个节点最多有两个子节点的树结构
- **特点**: 左子树、右子树、根节点
- **遍历**: 前序、中序、后序、层序

### 基本结构

#### Python实现

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class BinaryTree:
    def __init__(self):
        self.root = None
    
    def preorder_traversal(self, node):
        """前序遍历：根 -> 左 -> 右"""
        if not node:
            return []
        
        result = []
        result.append(node.val)
        result.extend(self.preorder_traversal(node.left))
        result.extend(self.preorder_traversal(node.right))
        return result
    
    def inorder_traversal(self, node):
        """中序遍历：左 -> 根 -> 右"""
        if not node:
            return []
        
        result = []
        result.extend(self.inorder_traversal(node.left))
        result.append(node.val)
        result.extend(self.inorder_traversal(node.right))
        return result
    
    def postorder_traversal(self, node):
        """后序遍历：左 -> 右 -> 根"""
        if not node:
            return []
        
        result = []
        result.extend(self.postorder_traversal(node.left))
        result.extend(self.postorder_traversal(node.right))
        result.append(node.val)
        return result
    
    def level_order_traversal(self, root):
        """层序遍历：逐层从左到右"""
        if not root:
            return []
        
        from collections import deque
        queue = deque([root])
        result = []
        
        while queue:
            node = queue.popleft()
            result.append(node.val)
            
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        
        return result
    
    def height(self, node):
        """计算树的高度"""
        if not node:
            return 0
        
        left_height = self.height(node.left)
        right_height = self.height(node.right)
        
        return max(left_height, right_height) + 1

# 使用示例
#       1
#      / \
#     2   3
#    / \
#   4   5
root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
root.left.left = TreeNode(4)
root.left.right = TreeNode(5)

tree = BinaryTree()
print("前序:", tree.preorder_traversal(root))   # [1, 2, 4, 5, 3]
print("中序:", tree.inorder_traversal(root))    # [4, 2, 5, 1, 3]
print("后序:", tree.postorder_traversal(root))  # [4, 5, 2, 3, 1]
print("层序:", tree.level_order_traversal(root)) # [1, 2, 3, 4, 5]
```

#### C++实现

```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class BinaryTree {
public:
    // 前序遍历：根 -> 左 -> 右
    vector<int> preorderTraversal(TreeNode* root) {
        vector<int> result;
        preorderHelper(root, result);
        return result;
    }
    
    // 中序遍历：左 -> 根 -> 右
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> result;
        inorderHelper(root, result);
        return result;
    }
    
    // 后序遍历：左 -> 右 -> 根
    vector<int> postorderTraversal(TreeNode* root) {
        vector<int> result;
        postorderHelper(root, result);
        return result;
    }
    
    // 层序遍历
    vector<int> levelOrderTraversal(TreeNode* root) {
        vector<int> result;
        if (!root) return result;
        
        queue<TreeNode*> q;
        q.push(root);
        
        while (!q.empty()) {
            TreeNode* node = q.front();
            q.pop();
            result.push_back(node->val);
            
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        
        return result;
    }
    
    // 计算树的高度
    int height(TreeNode* root) {
        if (!root) return 0;
        
        int leftHeight = height(root->left);
        int rightHeight = height(root->right);
        
        return max(leftHeight, rightHeight) + 1;
    }

private:
    void preorderHelper(TreeNode* node, vector<int>& result) {
        if (!node) return;
        result.push_back(node->val);
        preorderHelper(node->left, result);
        preorderHelper(node->right, result);
    }
    
    void inorderHelper(TreeNode* node, vector<int>& result) {
        if (!node) return;
        inorderHelper(node->left, result);
        result.push_back(node->val);
        inorderHelper(node->right, result);
    }
    
    void postorderHelper(TreeNode* node, vector<int>& result) {
        if (!node) return;
        postorderHelper(node->left, result);
        postorderHelper(node->right, result);
        result.push_back(node->val);
    }
};
```

---

## 2. 二叉搜索树

### 基本特性
- **性质**: 左子树 < 根节点 < 右子树
- **时间复杂度**: 平均O(log n)，最坏O(n)
- **应用**: 快速查找、插入、删除

### Python实现

```python
class BSTNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class BinarySearchTree:
    def __init__(self):
        self.root = None
    
    def insert(self, val):
        """插入节点"""
        self.root = self._insert_recursive(self.root, val)
    
    def _insert_recursive(self, node, val):
        if not node:
            return BSTNode(val)
        
        if val < node.val:
            node.left = self._insert_recursive(node.left, val)
        elif val > node.val:
            node.right = self._insert_recursive(node.right, val)
        
        return node
    
    def search(self, val):
        """查找节点"""
        return self._search_recursive(self.root, val)
    
    def _search_recursive(self, node, val):
        if not node or node.val == val:
            return node
        
        if val < node.val:
            return self._search_recursive(node.left, val)
        else:
            return self._search_recursive(node.right, val)
    
    def delete(self, val):
        """删除节点"""
        self.root = self._delete_recursive(self.root, val)
    
    def _delete_recursive(self, node, val):
        if not node:
            return node
        
        if val < node.val:
            node.left = self._delete_recursive(node.left, val)
        elif val > node.val:
            node.right = self._delete_recursive(node.right, val)
        else:
            # 找到要删除的节点
            if not node.left:
                return node.right
            elif not node.right:
                return node.left
            
            # 节点有两个子节点：找到右子树的最小值
            min_node = self._find_min(node.right)
            node.val = min_node.val
            node.right = self._delete_recursive(node.right, min_node.val)
        
        return node
    
    def _find_min(self, node):
        """找到最小值节点"""
        while node.left:
            node = node.left
        return node
    
    def inorder(self):
        """中序遍历（有序输出）"""
        result = []
        self._inorder_recursive(self.root, result)
        return result
    
    def _inorder_recursive(self, node, result):
        if node:
            self._inorder_recursive(node.left, result)
            result.append(node.val)
            self._inorder_recursive(node.right, result)

# 使用示例
bst = BinarySearchTree()
values = [50, 30, 70, 20, 40, 60, 80]

for val in values:
    bst.insert(val)

print("中序遍历:", bst.inorder())  # [20, 30, 40, 50, 60, 70, 80]
print("查找40:", bst.search(40) is not None)  # True
bst.delete(30)
print("删除30后:", bst.inorder())  # [20, 40, 50, 60, 70, 80]
```

### C++实现

```cpp
#include <iostream>
#include <vector>
using namespace std;

struct BSTNode {
    int val;
    BSTNode* left;
    BSTNode* right;
    BSTNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class BinarySearchTree {
private:
    BSTNode* root;
    
    BSTNode* insertRecursive(BSTNode* node, int val) {
        if (!node) {
            return new BSTNode(val);
        }
        
        if (val < node->val) {
            node->left = insertRecursive(node->left, val);
        } else if (val > node->val) {
            node->right = insertRecursive(node->right, val);
        }
        
        return node;
    }
    
    BSTNode* searchRecursive(BSTNode* node, int val) {
        if (!node || node->val == val) {
            return node;
        }
        
        if (val < node->val) {
            return searchRecursive(node->left, val);
        } else {
            return searchRecursive(node->right, val);
        }
    }
    
    BSTNode* deleteRecursive(BSTNode* node, int val) {
        if (!node) return node;
        
        if (val < node->val) {
            node->left = deleteRecursive(node->left, val);
        } else if (val > node->val) {
            node->right = deleteRecursive(node->right, val);
        } else {
            if (!node->left) {
                BSTNode* temp = node->right;
                delete node;
                return temp;
            } else if (!node->right) {
                BSTNode* temp = node->left;
                delete node;
                return temp;
            }
            
            BSTNode* temp = findMin(node->right);
            node->val = temp->val;
            node->right = deleteRecursive(node->right, temp->val);
        }
        
        return node;
    }
    
    BSTNode* findMin(BSTNode* node) {
        while (node->left) {
            node = node->left;
        }
        return node;
    }
    
    void inorderRecursive(BSTNode* node, vector<int>& result) {
        if (node) {
            inorderRecursive(node->left, result);
            result.push_back(node->val);
            inorderRecursive(node->right, result);
        }
    }

public:
    BinarySearchTree() : root(nullptr) {}
    
    void insert(int val) {
        root = insertRecursive(root, val);
    }
    
    bool search(int val) {
        return searchRecursive(root, val) != nullptr;
    }
    
    void deleteNode(int val) {
        root = deleteRecursive(root, val);
    }
    
    vector<int> inorder() {
        vector<int> result;
        inorderRecursive(root, result);
        return result;
    }
};
```

---

## 3. 平衡树

### AVL树

#### 基本特性
- **平衡因子**: 左右子树高度差不超过1
- **时间复杂度**: O(log n) 查找、插入、删除
- **旋转操作**: LL、RR、LR、RL

#### Python实现

```python
class AVLNode:
    def __init__(self, val=0):
        self.val = val
        self.left = None
        self.right = None
        self.height = 1

class AVLTree:
    def get_height(self, node):
        if not node:
            return 0
        return node.height
    
    def get_balance(self, node):
        if not node:
            return 0
        return self.get_height(node.left) - self.get_height(node.right)
    
    def update_height(self, node):
        if node:
            node.height = 1 + max(self.get_height(node.left), 
                                  self.get_height(node.right))
    
    def rotate_right(self, y):
        """右旋转"""
        x = y.left
        T2 = x.right
        
        # 旋转
        x.right = y
        y.left = T2
        
        # 更新高度
        self.update_height(y)
        self.update_height(x)
        
        return x
    
    def rotate_left(self, x):
        """左旋转"""
        y = x.right
        T2 = y.left
        
        # 旋转
        y.left = x
        x.right = T2
        
        # 更新高度
        self.update_height(x)
        self.update_height(y)
        
        return y
    
    def insert(self, root, val):
        # 1. 正常BST插入
        if not root:
            return AVLNode(val)
        
        if val < root.val:
            root.left = self.insert(root.left, val)
        elif val > root.val:
            root.right = self.insert(root.right, val)
        else:
            return root  # 重复值不插入
        
        # 2. 更新高度
        self.update_height(root)
        
        # 3. 获取平衡因子
        balance = self.get_balance(root)
        
        # 4. 如果不平衡，进行旋转
        # LL情况
        if balance > 1 and val < root.left.val:
            return self.rotate_right(root)
        
        # RR情况
        if balance < -1 and val > root.right.val:
            return self.rotate_left(root)
        
        # LR情况
        if balance > 1 and val > root.left.val:
            root.left = self.rotate_left(root.left)
            return self.rotate_right(root)
        
        # RL情况
        if balance < -1 and val < root.right.val:
            root.right = self.rotate_right(root.right)
            return self.rotate_left(root)
        
        return root
```

### 红黑树特性

| 性质 | 描述 |
|------|------|
| 1 | 每个节点要么是红色，要么是黑色 |
| 2 | 根节点是黑色 |
| 3 | 所有叶子节点（NIL）是黑色 |
| 4 | 红色节点的子节点必须是黑色 |
| 5 | 从任一节点到其叶子节点的路径包含相同数量的黑色节点 |

---

## 4. 堆

### 基本特性
- **完全二叉树**: 除最后一层外都是满的
- **堆性质**: 大顶堆（父≥子）或小顶堆（父≤子）
- **应用**: 优先队列、堆排序

### Python实现

```python
class MaxHeap:
    def __init__(self):
        self.heap = []
    
    def parent(self, i):
        return (i - 1) // 2
    
    def left_child(self, i):
        return 2 * i + 1
    
    def right_child(self, i):
        return 2 * i + 2
    
    def swap(self, i, j):
        self.heap[i], self.heap[j] = self.heap[j], self.heap[i]
    
    def insert(self, val):
        """插入元素"""
        self.heap.append(val)
        self._heapify_up(len(self.heap) - 1)
    
    def _heapify_up(self, i):
        """向上调整"""
        while i > 0 and self.heap[i] > self.heap[self.parent(i)]:
            self.swap(i, self.parent(i))
            i = self.parent(i)
    
    def extract_max(self):
        """提取最大值"""
        if not self.heap:
            return None
        
        if len(self.heap) == 1:
            return self.heap.pop()
        
        max_val = self.heap[0]
        self.heap[0] = self.heap.pop()
        self._heapify_down(0)
        
        return max_val
    
    def _heapify_down(self, i):
        """向下调整"""
        largest = i
        left = self.left_child(i)
        right = self.right_child(i)
        
        if (left < len(self.heap) and 
            self.heap[left] > self.heap[largest]):
            largest = left
        
        if (right < len(self.heap) and 
            self.heap[right] > self.heap[largest]):
            largest = right
        
        if largest != i:
            self.swap(i, largest)
            self._heapify_down(largest)
    
    def peek(self):
        """查看堆顶"""
        return self.heap[0] if self.heap else None
    
    def size(self):
        return len(self.heap)

# 使用示例
heap = MaxHeap()
values = [10, 20, 15, 30, 40]

for val in values:
    heap.insert(val)

print("堆顶:", heap.peek())  # 40
print("提取:", heap.extract_max())  # 40
print("新堆顶:", heap.peek())  # 30
```

### C++实现

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class MaxHeap {
private:
    vector<int> heap;
    
    int parent(int i) { return (i - 1) / 2; }
    int leftChild(int i) { return 2 * i + 1; }
    int rightChild(int i) { return 2 * i + 2; }
    
    void heapifyUp(int i) {
        while (i > 0 && heap[i] > heap[parent(i)]) {
            swap(heap[i], heap[parent(i)]);
            i = parent(i);
        }
    }
    
    void heapifyDown(int i) {
        int largest = i;
        int left = leftChild(i);
        int right = rightChild(i);
        
        if (left < heap.size() && heap[left] > heap[largest]) {
            largest = left;
        }
        
        if (right < heap.size() && heap[right] > heap[largest]) {
            largest = right;
        }
        
        if (largest != i) {
            swap(heap[i], heap[largest]);
            heapifyDown(largest);
        }
    }

public:
    void insert(int val) {
        heap.push_back(val);
        heapifyUp(heap.size() - 1);
    }
    
    int extractMax() {
        if (heap.empty()) {
            throw runtime_error("Heap is empty");
        }
        
        if (heap.size() == 1) {
            int max_val = heap[0];
            heap.pop_back();
            return max_val;
        }
        
        int max_val = heap[0];
        heap[0] = heap.back();
        heap.pop_back();
        heapifyDown(0);
        
        return max_val;
    }
    
    int peek() {
        if (heap.empty()) {
            throw runtime_error("Heap is empty");
        }
        return heap[0];
    }
    
    int size() {
        return heap.size();
    }
    
    bool empty() {
        return heap.empty();
    }
};
```

---

## 5. 树的应用

### 表达式树

```python
class ExprNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def build_expression_tree(postfix):
    """根据后缀表达式构建表达式树"""
    stack = []
    operators = {'+', '-', '*', '/'}
    
    for token in postfix:
        node = ExprNode(token)
        
        if token in operators:
            node.right = stack.pop()
            node.left = stack.pop()
        
        stack.append(node)
    
    return stack[0]

def evaluate_expression_tree(root):
    """计算表达式树的值"""
    if not root:
        return 0
    
    if root.val.isdigit():
        return int(root.val)
    
    left_val = evaluate_expression_tree(root.left)
    right_val = evaluate_expression_tree(root.right)
    
    if root.val == '+':
        return left_val + right_val
    elif root.val == '-':
        return left_val - right_val
    elif root.val == '*':
        return left_val * right_val
    elif root.val == '/':
        return left_val / right_val

# 使用示例：后缀表达式 "23*4+"
postfix = ['2', '3', '*', '4', '+']
root = build_expression_tree(postfix)
result = evaluate_expression_tree(root)
print(f"表达式结果: {result}")  # 10
```

### 哈夫曼树

```python
import heapq
from collections import defaultdict, Counter

class HuffmanNode:
    def __init__(self, char, freq):
        self.char = char
        self.freq = freq
        self.left = None
        self.right = None
    
    def __lt__(self, other):
        return self.freq < other.freq

def build_huffman_tree(text):
    """构建哈夫曼树"""
    # 统计字符频率
    freq = Counter(text)
    
    # 创建优先队列
    heap = [HuffmanNode(char, f) for char, f in freq.items()]
    heapq.heapify(heap)
    
    # 构建哈夫曼树
    while len(heap) > 1:
        left = heapq.heappop(heap)
        right = heapq.heappop(heap)
        
        merged = HuffmanNode(None, left.freq + right.freq)
        merged.left = left
        merged.right = right
        
        heapq.heappush(heap, merged)
    
    return heap[0]

def generate_codes(root):
    """生成哈夫曼编码"""
    if not root:
        return {}
    
    codes = {}
    
    def dfs(node, code):
        if node.char is not None:  # 叶子节点
            codes[node.char] = code
            return
        
        if node.left:
            dfs(node.left, code + '0')
        if node.right:
            dfs(node.right, code + '1')
    
    dfs(root, '')
    return codes

# 使用示例
text = "hello world"
root = build_huffman_tree(text)
codes = generate_codes(root)
print("哈夫曼编码:", codes)
```

---

## 6. 性能对比

### 时间复杂度对比

| 操作 | 二叉树 | BST(平均) | BST(最坏) | AVL树 | 红黑树 | 堆 |
|------|--------|-----------|-----------|-------|--------|-----|
| 查找 | O(n) | O(log n) | O(n) | O(log n) | O(log n) | O(n) |
| 插入 | O(n) | O(log n) | O(n) | O(log n) | O(log n) | O(log n) |
| 删除 | O(n) | O(log n) | O(n) | O(log n) | O(log n) | O(log n) |
| 最值 | O(n) | O(log n) | O(n) | O(log n) | O(log n) | O(1) |

### 空间复杂度

| 数据结构 | 空间复杂度 | 额外开销 |
|----------|------------|----------|
| 二叉树 | O(n) | 指针 |
| BST | O(n) | 指针 |
| AVL树 | O(n) | 指针+高度 |
| 红黑树 | O(n) | 指针+颜色 |
| 堆 | O(n) | 数组实现无额外开销 |

### 使用场景

| 需求 | 推荐结构 | 原因 |
|------|----------|------|
| 有序遍历 | BST | 中序遍历有序 |
| 频繁插入删除 | AVL树/红黑树 | 自动平衡 |
| 优先队列 | 堆 | O(1)取最值 |
| 表达式求值 | 表达式树 | 自然表示 |
| 数据压缩 | 哈夫曼树 | 最优编码 |

---

## 总结

树形结构是非线性数据结构的重要代表：

1. **二叉树**：基础树结构，支持多种遍历方式
2. **二叉搜索树**：有序性质，支持快速查找
3. **平衡树**：自动维护平衡，保证性能
4. **堆**：完全二叉树，优先队列的理想实现
5. **应用树**：解决特定问题的专用树结构

选择合适的树结构可以大大提升算法效率！
