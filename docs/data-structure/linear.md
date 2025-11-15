# 线性结构

[← 返回首页](../index.md) | [下一章: 树形结构 →](tree.md)

## 目录
1. [数组](#1-数组)
2. [链表](#2-链表)
3. [栈](#3-栈)
4. [队列](#4-队列)
5. [双端队列](#5-双端队列)
6. [性能对比](#6-性能对比)

---

## 1. 数组

### 基本特性
- **时间复杂度**: O(1)查找，O(n)插删
- **空间复杂度**: O(n)
- **特点**: 连续内存，随机访问

### Python实现

```python
# 数组基本操作
class Array:
    def __init__(self, capacity):
        self.data = [None] * capacity
        self.size = 0
        self.capacity = capacity
    
    def get(self, index):
        """O(1) 查找"""
        if 0 <= index < self.size:
            return self.data[index]
        raise IndexError("Index out of range")
    
    def set(self, index, value):
        """O(1) 修改"""
        if 0 <= index < self.size:
            self.data[index] = value
        else:
            raise IndexError("Index out of range")
    
    def insert(self, index, value):
        """O(n) 插入"""
        if self.size >= self.capacity:
            raise OverflowError("Array is full")
        
        # 后移元素
        for i in range(self.size, index, -1):
            self.data[i] = self.data[i-1]
        
        self.data[index] = value
        self.size += 1
    
    def delete(self, index):
        """O(n) 删除"""
        if index < 0 or index >= self.size:
            raise IndexError("Index out of range")
        
        # 前移元素
        for i in range(index, self.size - 1):
            self.data[i] = self.data[i+1]
        
        self.size -= 1
        return self.data[index]

# 使用示例
arr = Array(10)
arr.insert(0, 1)
arr.insert(1, 2)
arr.insert(2, 3)
print(f"arr[1] = {arr.get(1)}")  # 2
```

### C++实现

```cpp
#include <iostream>
#include <stdexcept>
using namespace std;

template<typename T>
class Array {
private:
    T* data;
    int size;
    int capacity;

public:
    Array(int cap) : capacity(cap), size(0) {
        data = new T[capacity];
    }
    
    ~Array() {
        delete[] data;
    }
    
    // O(1) 查找
    T get(int index) {
        if (index < 0 || index >= size) {
            throw out_of_range("Index out of range");
        }
        return data[index];
    }
    
    // O(1) 修改
    void set(int index, T value) {
        if (index < 0 || index >= size) {
            throw out_of_range("Index out of range");
        }
        data[index] = value;
    }
    
    // O(n) 插入
    void insert(int index, T value) {
        if (size >= capacity) {
            throw overflow_error("Array is full");
        }
        
        // 后移元素
        for (int i = size; i > index; i--) {
            data[i] = data[i-1];
        }
        
        data[index] = value;
        size++;
    }
    
    // O(n) 删除
    T remove(int index) {
        if (index < 0 || index >= size) {
            throw out_of_range("Index out of range");
        }
        
        T removed = data[index];
        
        // 前移元素
        for (int i = index; i < size - 1; i++) {
            data[i] = data[i+1];
        }
        
        size--;
        return removed;
    }
    
    int getSize() { return size; }
};
```

---

## 2. 链表

### 基本特性
- **时间复杂度**: O(n)查找，O(1)插删
- **空间复杂度**: O(n)
- **特点**: 非连续内存，动态大小

### 单向链表

#### Python实现

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class LinkedList:
    def __init__(self):
        self.head = None
        self.size = 0
    
    def insert_at_head(self, val):
        """O(1) 头部插入"""
        new_node = ListNode(val)
        new_node.next = self.head
        self.head = new_node
        self.size += 1
    
    def insert_at_tail(self, val):
        """O(n) 尾部插入"""
        new_node = ListNode(val)
        if not self.head:
            self.head = new_node
        else:
            current = self.head
            while current.next:
                current = current.next
            current.next = new_node
        self.size += 1
    
    def delete(self, val):
        """O(n) 删除节点"""
        if not self.head:
            return False
        
        if self.head.val == val:
            self.head = self.head.next
            self.size -= 1
            return True
        
        current = self.head
        while current.next:
            if current.next.val == val:
                current.next = current.next.next
                self.size -= 1
                return True
            current = current.next
        
        return False
    
    def find(self, val):
        """O(n) 查找"""
        current = self.head
        index = 0
        while current:
            if current.val == val:
                return index
            current = current.next
            index += 1
        return -1
    
    def display(self):
        """显示链表"""
        result = []
        current = self.head
        while current:
            result.append(current.val)
            current = current.next
        return result

# 使用示例
ll = LinkedList()
ll.insert_at_head(1)
ll.insert_at_head(2)
ll.insert_at_tail(3)
print(ll.display())  # [2, 1, 3]
```

#### C++实现

```cpp
#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class LinkedList {
private:
    ListNode* head;
    int size;

public:
    LinkedList() : head(nullptr), size(0) {}
    
    ~LinkedList() {
        while (head) {
            ListNode* temp = head;
            head = head->next;
            delete temp;
        }
    }
    
    // O(1) 头部插入
    void insertAtHead(int val) {
        ListNode* newNode = new ListNode(val);
        newNode->next = head;
        head = newNode;
        size++;
    }
    
    // O(n) 尾部插入
    void insertAtTail(int val) {
        ListNode* newNode = new ListNode(val);
        if (!head) {
            head = newNode;
        } else {
            ListNode* current = head;
            while (current->next) {
                current = current->next;
            }
            current->next = newNode;
        }
        size++;
    }
    
    // O(n) 删除节点
    bool deleteNode(int val) {
        if (!head) return false;
        
        if (head->val == val) {
            ListNode* temp = head;
            head = head->next;
            delete temp;
            size--;
            return true;
        }
        
        ListNode* current = head;
        while (current->next) {
            if (current->next->val == val) {
                ListNode* temp = current->next;
                current->next = current->next->next;
                delete temp;
                size--;
                return true;
            }
            current = current->next;
        }
        
        return false;
    }
    
    // O(n) 查找
    int find(int val) {
        ListNode* current = head;
        int index = 0;
        while (current) {
            if (current->val == val) {
                return index;
            }
            current = current->next;
            index++;
        }
        return -1;
    }
    
    void display() {
        ListNode* current = head;
        while (current) {
            cout << current->val << " -> ";
            current = current->next;
        }
        cout << "NULL" << endl;
    }
};
```

---

## 3. 栈

### 基本特性
- **原理**: 后入先出(LIFO - Last In First Out)
- **时间复杂度**: O(1) 入栈、出栈、查看栈顶
- **应用**: 函数调用、表达式求值、括号匹配

### Python实现

```python
class Stack:
    def __init__(self):
        self.items = []
    
    def push(self, item):
        """O(1) 入栈"""
        self.items.append(item)
    
    def pop(self):
        """O(1) 出栈"""
        if self.is_empty():
            raise IndexError("Stack is empty")
        return self.items.pop()
    
    def peek(self):
        """O(1) 查看栈顶"""
        if self.is_empty():
            raise IndexError("Stack is empty")
        return self.items[-1]
    
    def is_empty(self):
        """检查是否为空"""
        return len(self.items) == 0
    
    def size(self):
        """获取栈大小"""
        return len(self.items)

# 应用示例：括号匹配
def is_valid_parentheses(s):
    stack = Stack()
    mapping = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in mapping:
            if stack.is_empty() or stack.pop() != mapping[char]:
                return False
        else:
            stack.push(char)
    
    return stack.is_empty()

# 测试
print(is_valid_parentheses("()[]{}"))  # True
print(is_valid_parentheses("([)]"))    # False
```

### C++实现

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>
using namespace std;

template<typename T>
class Stack {
private:
    vector<T> items;

public:
    // O(1) 入栈
    void push(T item) {
        items.push_back(item);
    }
    
    // O(1) 出栈
    T pop() {
        if (isEmpty()) {
            throw runtime_error("Stack is empty");
        }
        T item = items.back();
        items.pop_back();
        return item;
    }
    
    // O(1) 查看栈顶
    T peek() {
        if (isEmpty()) {
            throw runtime_error("Stack is empty");
        }
        return items.back();
    }
    
    bool isEmpty() {
        return items.empty();
    }
    
    int size() {
        return items.size();
    }
};

// 应用示例：括号匹配
bool isValidParentheses(string s) {
    Stack<char> stack;
    unordered_map<char, char> mapping = {
        {')', '('}, {'}', '{'}, {']', '['}
    };
    
    for (char c : s) {
        if (mapping.count(c)) {
            if (stack.isEmpty() || stack.pop() != mapping[c]) {
                return false;
            }
        } else {
            stack.push(c);
        }
    }
    
    return stack.isEmpty();
}
```

---

## 4. 队列

### 基本特性
- **原理**: 先入先出(FIFO - First In First Out)
- **时间复杂度**: O(1) 入队、出队
- **应用**: BFS、任务调度、缓冲区

### Python实现

```python
from collections import deque

class Queue:
    def __init__(self):
        self.items = deque()
    
    def enqueue(self, item):
        """O(1) 入队"""
        self.items.append(item)
    
    def dequeue(self):
        """O(1) 出队"""
        if self.is_empty():
            raise IndexError("Queue is empty")
        return self.items.popleft()
    
    def front(self):
        """O(1) 查看队首"""
        if self.is_empty():
            raise IndexError("Queue is empty")
        return self.items[0]
    
    def is_empty(self):
        return len(self.items) == 0
    
    def size(self):
        return len(self.items)

# 应用示例：BFS遍历
def bfs_tree(root):
    if not root:
        return []
    
    result = []
    queue = Queue()
    queue.enqueue(root)
    
    while not queue.is_empty():
        node = queue.dequeue()
        result.append(node.val)
        
        if node.left:
            queue.enqueue(node.left)
        if node.right:
            queue.enqueue(node.right)
    
    return result
```

### C++实现

```cpp
#include <iostream>
#include <queue>
using namespace std;

template<typename T>
class Queue {
private:
    queue<T> items;

public:
    // O(1) 入队
    void enqueue(T item) {
        items.push(item);
    }
    
    // O(1) 出队
    T dequeue() {
        if (isEmpty()) {
            throw runtime_error("Queue is empty");
        }
        T item = items.front();
        items.pop();
        return item;
    }
    
    // O(1) 查看队首
    T front() {
        if (isEmpty()) {
            throw runtime_error("Queue is empty");
        }
        return items.front();
    }
    
    bool isEmpty() {
        return items.empty();
    }
    
    int size() {
        return items.size();
    }
};
```

---

## 5. 双端队列

### 基本特性
- **原理**: 两端都可以进行插入和删除操作
- **时间复杂度**: O(1) 两端插入、删除
- **应用**: 滑动窗口、回文检测

### Python实现

```python
from collections import deque

class Deque:
    def __init__(self):
        self.items = deque()
    
    def add_front(self, item):
        """O(1) 前端添加"""
        self.items.appendleft(item)
    
    def add_rear(self, item):
        """O(1) 后端添加"""
        self.items.append(item)
    
    def remove_front(self):
        """O(1) 前端删除"""
        if self.is_empty():
            raise IndexError("Deque is empty")
        return self.items.popleft()
    
    def remove_rear(self):
        """O(1) 后端删除"""
        if self.is_empty():
            raise IndexError("Deque is empty")
        return self.items.pop()
    
    def is_empty(self):
        return len(self.items) == 0
    
    def size(self):
        return len(self.items)

# 应用示例：回文检测
def is_palindrome(s):
    dq = Deque()
    
    # 只保留字母数字字符并转为小写
    for char in s:
        if char.isalnum():
            dq.add_rear(char.lower())
    
    # 从两端比较
    while dq.size() > 1:
        if dq.remove_front() != dq.remove_rear():
            return False
    
    return True

# 测试
print(is_palindrome("A man a plan a canal Panama"))  # True
```

---

## 6. 性能对比

### 时间复杂度对比表

| 操作 | 数组 | 链表 | 栈 | 队列 | 双端队列 |
|------|------|------|----|----- |----------|
| 访问 | O(1) | O(n) | O(n) | O(n) | O(n) |
| 搜索 | O(n) | O(n) | O(n) | O(n) | O(n) |
| 插入 | O(n) | O(1)* | O(1) | O(1) | O(1) |
| 删除 | O(n) | O(1)* | O(1) | O(1) | O(1) |

*注：链表的O(1)插入删除是指已知节点位置的情况

### 空间复杂度对比

| 数据结构 | 空间复杂度 | 额外空间 |
|----------|------------|----------|
| 数组 | O(n) | 无 |
| 链表 | O(n) | 指针开销 |
| 栈 | O(n) | 取决于实现 |
| 队列 | O(n) | 取决于实现 |
| 双端队列 | O(n) | 取决于实现 |

### 使用场景选择

| 需求 | 推荐数据结构 | 原因 |
|------|-------------|------|
| 频繁随机访问 | 数组 | O(1)访问时间 |
| 频繁插入删除 | 链表 | O(1)插入删除 |
| 函数调用管理 | 栈 | LIFO特性 |
| 任务队列 | 队列 | FIFO特性 |
| 滑动窗口 | 双端队列 | 两端操作 |

---

## 总结

线性结构是最基础的数据结构，理解它们的特性和适用场景对于算法设计至关重要：

1. **数组**：适合需要频繁随机访问的场景
2. **链表**：适合需要频繁插入删除的场景  
3. **栈**：适合需要后进先出的场景
4. **队列**：适合需要先进先出的场景
5. **双端队列**：适合需要两端操作的场景

选择合适的数据结构是算法优化的第一步！
