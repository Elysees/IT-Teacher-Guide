# 哈希表

## 目录
1. [哈希表基本概念](#1-哈希表基本概念)
2. [哈希函数](#2-哈希函数)
3. [冲突处理方法](#3-冲突处理方法)
4. [哈希表实现](#4-哈希表实现)
5. [哈希表应用](#5-哈希表应用)
6. [性能分析](#6-性能分析)

---

## 1. 哈希表基本概念

### 基本特性
- **时间复杂度**: 平均O(1)查找、插入、删除
- **空间复杂度**: O(n)
- **核心思想**: 通过哈希函数将键映射到数组索引
- **别名**: 散列表、Hash Map、Dictionary

### 基本原理

```
键(Key) → 哈希函数 → 索引(Index) → 值(Value)
```

### 主要组成部分

| 组件 | 作用 | 要求 |
|------|------|------|
| **哈希函数** | 将键转换为索引 | 均匀分布、计算快速 |
| **桶数组** | 存储键值对 | 合适的大小 |
| **冲突处理** | 处理索引冲突 | 高效的解决方案 |
| **动态扩容** | 维持负载因子 | 自动调整大小 |

---

## 2. 哈希函数

### 好的哈希函数特性
1. **确定性**: 相同输入产生相同输出
2. **均匀分布**: 输出均匀分布在哈希表中
3. **快速计算**: 计算复杂度低
4. **雪崩效应**: 输入微小变化导致输出大幅变化

### 常见哈希函数

#### 除法散列法

```python
def division_hash(key, table_size):
    """除法散列法"""
    return key % table_size

# 使用示例
table_size = 11  # 通常选择质数
keys = [10, 22, 31, 4, 15, 28, 17, 88, 59]
for key in keys:
    index = division_hash(key, table_size)
    print(f"key={key}, index={index}")
```

#### 乘法散列法

```python
def multiplication_hash(key, table_size):
    """乘法散列法"""
    A = 0.6180339887  # (√5 - 1) / 2，黄金比例
    return int(table_size * ((key * A) % 1))

# 使用示例
for key in keys:
    index = multiplication_hash(key, table_size)
    print(f"key={key}, index={index}")
```

#### 字符串哈希函数

```python
def string_hash_simple(s, table_size):
    """简单字符串哈希"""
    hash_value = 0
    for char in s:
        hash_value += ord(char)
    return hash_value % table_size

def string_hash_djb2(s, table_size):
    """DJB2哈希算法"""
    hash_value = 5381
    for char in s:
        hash_value = ((hash_value << 5) + hash_value) + ord(char)
    return hash_value % table_size

def string_hash_polynomial(s, table_size):
    """多项式哈希"""
    hash_value = 0
    base = 31
    for char in s:
        hash_value = (hash_value * base + ord(char)) % table_size
    return hash_value

# 使用示例
strings = ["hello", "world", "python", "hash", "table"]
for s in strings:
    print(f"'{s}': simple={string_hash_simple(s, 101)}, "
          f"djb2={string_hash_djb2(s, 101)}, "
          f"poly={string_hash_polynomial(s, 101)}")
```

---

## 3. 冲突处理方法

### 链表法（拉链法）

#### 特点
- **原理**: 每个桶维护一个链表
- **优点**: 实现简单，删除容易
- **缺点**: 额外指针开销，缓存性能差

#### Python实现

```python
class HashTableChaining:
    def __init__(self, initial_size=8):
        self.size = initial_size
        self.count = 0
        self.buckets = [[] for _ in range(self.size)]
    
    def _hash(self, key):
        """哈希函数"""
        if isinstance(key, str):
            return string_hash_djb2(key, self.size)
        return hash(key) % self.size
    
    def _resize(self):
        """动态扩容"""
        if self.count >= self.size * 0.75:  # 负载因子超过0.75
            old_buckets = self.buckets
            self.size *= 2
            self.count = 0
            self.buckets = [[] for _ in range(self.size)]
            
            # 重新插入所有元素
            for bucket in old_buckets:
                for key, value in bucket:
                    self.put(key, value)
    
    def put(self, key, value):
        """插入键值对"""
        index = self._hash(key)
        bucket = self.buckets[index]
        
        # 检查是否已存在
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)  # 更新值
                return
        
        # 新增键值对
        bucket.append((key, value))
        self.count += 1
        self._resize()
    
    def get(self, key):
        """获取值"""
        index = self._hash(key)
        bucket = self.buckets[index]
        
        for k, v in bucket:
            if k == key:
                return v
        
        raise KeyError(f"Key '{key}' not found")
    
    def delete(self, key):
        """删除键值对"""
        index = self._hash(key)
        bucket = self.buckets[index]
        
        for i, (k, v) in enumerate(bucket):
            if k == key:
                del bucket[i]
                self.count -= 1
                return v
        
        raise KeyError(f"Key '{key}' not found")
    
    def contains(self, key):
        """检查是否包含键"""
        try:
            self.get(key)
            return True
        except KeyError:
            return False
    
    def display(self):
        """显示哈希表状态"""
        print(f"Size: {self.size}, Count: {self.count}")
        for i, bucket in enumerate(self.buckets):
            if bucket:
                print(f"Bucket {i}: {bucket}")

# 使用示例
ht = HashTableChaining()
ht.put("apple", 5)
ht.put("banana", 3)
ht.put("orange", 8)
ht.put(42, "answer")

print("apple:", ht.get("apple"))
print("contains banana:", ht.contains("banana"))
ht.display()
```

#### C++实现

```cpp
#include <iostream>
#include <vector>
#include <list>
#include <string>
using namespace std;

template<typename K, typename V>
class HashTableChaining {
private:
    vector<list<pair<K, V>>> buckets;
    int size;
    int count;
    
    int hash(const K& key) {
        return std::hash<K>{}(key) % size;
    }
    
    void resize() {
        if (count >= size * 0.75) {
            vector<list<pair<K, V>>> oldBuckets = buckets;
            size *= 2;
            count = 0;
            buckets.clear();
            buckets.resize(size);
            
            for (auto& bucket : oldBuckets) {
                for (auto& pair : bucket) {
                    put(pair.first, pair.second);
                }
            }
        }
    }

public:
    HashTableChaining(int initialSize = 8) : size(initialSize), count(0) {
        buckets.resize(size);
    }
    
    void put(const K& key, const V& value) {
        int index = hash(key);
        auto& bucket = buckets[index];
        
        // 检查是否已存在
        for (auto& pair : bucket) {
            if (pair.first == key) {
                pair.second = value;
                return;
            }
        }
        
        // 新增
        bucket.push_back({key, value});
        count++;
        resize();
    }
    
    V get(const K& key) {
        int index = hash(key);
        auto& bucket = buckets[index];
        
        for (auto& pair : bucket) {
            if (pair.first == key) {
                return pair.second;
            }
        }
        
        throw runtime_error("Key not found");
    }
    
    bool contains(const K& key) {
        try {
            get(key);
            return true;
        } catch (const runtime_error&) {
            return false;
        }
    }
    
    void remove(const K& key) {
        int index = hash(key);
        auto& bucket = buckets[index];
        
        for (auto it = bucket.begin(); it != bucket.end(); ++it) {
            if (it->first == key) {
                bucket.erase(it);
                count--;
                return;
            }
        }
        
        throw runtime_error("Key not found");
    }
};
```

### 开放寻址法

#### 线性探测

```python
class HashTableLinearProbing:
    def __init__(self, initial_size=8):
        self.size = initial_size
        self.count = 0
        self.keys = [None] * self.size
        self.values = [None] * self.size
        self.deleted = [False] * self.size
    
    def _hash(self, key):
        """哈希函数"""
        return hash(key) % self.size
    
    def _find_slot(self, key):
        """线性探测找到合适的槽位"""
        index = self._hash(key)
        original_index = index
        
        while (self.keys[index] is not None and 
               self.keys[index] != key and 
               not self.deleted[index]):
            index = (index + 1) % self.size
            
            # 检查是否回到起始位置（表满）
            if index == original_index:
                raise Exception("Hash table is full")
        
        return index
    
    def _resize(self):
        """动态扩容"""
        if self.count >= self.size * 0.5:  # 负载因子超过0.5
            old_keys = self.keys
            old_values = self.values
            old_deleted = self.deleted
            
            self.size *= 2
            self.count = 0
            self.keys = [None] * self.size
            self.values = [None] * self.size
            self.deleted = [False] * self.size
            
            # 重新插入所有元素
            for i in range(len(old_keys)):
                if old_keys[i] is not None and not old_deleted[i]:
                    self.put(old_keys[i], old_values[i])
    
    def put(self, key, value):
        """插入键值对"""
        index = self._find_slot(key)
        
        if self.keys[index] is None or self.deleted[index]:
            self.count += 1
        
        self.keys[index] = key
        self.values[index] = value
        self.deleted[index] = False
        
        self._resize()
    
    def get(self, key):
        """获取值"""
        index = self._hash(key)
        original_index = index
        
        while self.keys[index] is not None:
            if (self.keys[index] == key and not self.deleted[index]):
                return self.values[index]
            
            index = (index + 1) % self.size
            
            if index == original_index:
                break
        
        raise KeyError(f"Key '{key}' not found")
    
    def delete(self, key):
        """删除键值对（懒惰删除）"""
        index = self._hash(key)
        original_index = index
        
        while self.keys[index] is not None:
            if (self.keys[index] == key and not self.deleted[index]):
                self.deleted[index] = True
                self.count -= 1
                return self.values[index]
            
            index = (index + 1) % self.size
            
            if index == original_index:
                break
        
        raise KeyError(f"Key '{key}' not found")
    
    def display(self):
        """显示哈希表状态"""
        print(f"Size: {self.size}, Count: {self.count}")
        for i in range(self.size):
            if self.keys[i] is not None and not self.deleted[i]:
                print(f"Index {i}: {self.keys[i]} -> {self.values[i]}")

# 使用示例
ht = HashTableLinearProbing()
ht.put("apple", 5)
ht.put("banana", 3)
ht.put("orange", 8)

print("apple:", ht.get("apple"))
ht.display()
```

#### 二次探测

```python
class HashTableQuadraticProbing:
    def __init__(self, initial_size=8):
        self.size = initial_size
        self.count = 0
        self.keys = [None] * self.size
        self.values = [None] * self.size
    
    def _hash(self, key):
        return hash(key) % self.size
    
    def _find_slot(self, key):
        """二次探测"""
        index = self._hash(key)
        i = 0
        
        while i < self.size:
            probe_index = (index + i * i) % self.size
            
            if (self.keys[probe_index] is None or 
                self.keys[probe_index] == key):
                return probe_index
            
            i += 1
        
        raise Exception("Hash table is full")
    
    def put(self, key, value):
        """插入键值对"""
        if self.count >= self.size * 0.5:
            self._resize()
        
        index = self._find_slot(key)
        
        if self.keys[index] is None:
            self.count += 1
        
        self.keys[index] = key
        self.values[index] = value
    
    def _resize(self):
        """扩容"""
        old_keys = self.keys
        old_values = self.values
        
        self.size *= 2
        self.count = 0
        self.keys = [None] * self.size
        self.values = [None] * self.size
        
        for i in range(len(old_keys)):
            if old_keys[i] is not None:
                self.put(old_keys[i], old_values[i])
```

---

## 4. 哈希表实现

### 完整的哈希表实现

```python
class HashTable:
    """完整的哈希表实现"""
    
    def __init__(self, initial_capacity=16, load_factor=0.75):
        self.capacity = initial_capacity
        self.size = 0
        self.load_factor = load_factor
        self.buckets = [[] for _ in range(self.capacity)]
    
    def _hash(self, key):
        """改进的哈希函数"""
        if isinstance(key, str):
            hash_value = 0
            for char in key:
                hash_value = (hash_value * 31 + ord(char)) % self.capacity
            return hash_value
        return hash(key) % self.capacity
    
    def _resize(self):
        """动态调整大小"""
        old_buckets = self.buckets
        old_capacity = self.capacity
        
        self.capacity *= 2
        self.size = 0
        self.buckets = [[] for _ in range(self.capacity)]
        
        # 重新哈希所有元素
        for bucket in old_buckets:
            for key, value in bucket:
                self[key] = value
    
    def __setitem__(self, key, value):
        """设置键值对 - 支持 ht[key] = value 语法"""
        # 检查是否需要扩容
        if self.size >= self.capacity * self.load_factor:
            self._resize()
        
        index = self._hash(key)
        bucket = self.buckets[index]
        
        # 检查键是否已存在
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return
        
        # 添加新键值对
        bucket.append((key, value))
        self.size += 1
    
    def __getitem__(self, key):
        """获取值 - 支持 ht[key] 语法"""
        index = self._hash(key)
        bucket = self.buckets[index]
        
        for k, v in bucket:
            if k == key:
                return v
        
        raise KeyError(key)
    
    def __delitem__(self, key):
        """删除键值对 - 支持 del ht[key] 语法"""
        index = self._hash(key)
        bucket = self.buckets[index]
        
        for i, (k, v) in enumerate(bucket):
            if k == key:
                del bucket[i]
                self.size -= 1
                return
        
        raise KeyError(key)
    
    def __contains__(self, key):
        """检查键是否存在 - 支持 key in ht 语法"""
        try:
            self[key]
            return True
        except KeyError:
            return False
    
    def __len__(self):
        """返回大小 - 支持 len(ht) 语法"""
        return self.size
    
    def __iter__(self):
        """迭代器 - 支持 for key in ht 语法"""
        for bucket in self.buckets:
            for key, _ in bucket:
                yield key
    
    def keys(self):
        """返回所有键"""
        return list(self)
    
    def values(self):
        """返回所有值"""
        result = []
        for bucket in self.buckets:
            for _, value in bucket:
                result.append(value)
        return result
    
    def items(self):
        """返回所有键值对"""
        result = []
        for bucket in self.buckets:
            for key, value in bucket:
                result.append((key, value))
        return result
    
    def get(self, key, default=None):
        """安全获取值"""
        try:
            return self[key]
        except KeyError:
            return default
    
    def pop(self, key, default=None):
        """弹出键值对"""
        try:
            value = self[key]
            del self[key]
            return value
        except KeyError:
            if default is not None:
                return default
            raise
    
    def clear(self):
        """清空哈希表"""
        self.buckets = [[] for _ in range(self.capacity)]
        self.size = 0
    
    def load_factor_current(self):
        """当前负载因子"""
        return self.size / self.capacity
    
    def stats(self):
        """统计信息"""
        non_empty_buckets = sum(1 for bucket in self.buckets if bucket)
        max_bucket_size = max(len(bucket) for bucket in self.buckets)
        avg_bucket_size = self.size / non_empty_buckets if non_empty_buckets > 0 else 0
        
        return {
            'size': self.size,
            'capacity': self.capacity,
            'load_factor': self.load_factor_current(),
            'non_empty_buckets': non_empty_buckets,
            'max_bucket_size': max_bucket_size,
            'avg_bucket_size': avg_bucket_size
        }

# 使用示例
ht = HashTable()

# 基本操作
ht['name'] = 'Alice'
ht['age'] = 25
ht['city'] = 'Beijing'

print("Name:", ht['name'])
print("Age in ht:", 'age' in ht)
print("Size:", len(ht))

# 迭代
print("Keys:", list(ht.keys()))
print("Values:", ht.values())
print("Items:", ht.items())

# 统计信息
print("Stats:", ht.stats())
```

---

## 5. 哈希表应用

### 快速查找

```python
def find_duplicates(arr):
    """查找数组中的重复元素"""
    seen = HashTable()
    duplicates = []
    
    for item in arr:
        if item in seen:
            if seen[item] == 1:  # 第一次发现重复
                duplicates.append(item)
            seen[item] += 1
        else:
            seen[item] = 1
    
    return duplicates

# 使用示例
numbers = [1, 2, 3, 2, 4, 5, 3, 6, 1]
print("重复元素:", find_duplicates(numbers))
```

### 字符统计

```python
def character_frequency(text):
    """统计字符频率"""
    freq = HashTable()
    
    for char in text:
        freq[char] = freq.get(char, 0) + 1
    
    return freq

# 使用示例
text = "hello world"
freq = character_frequency(text)
print("字符频率:")
for char, count in freq.items():
    print(f"'{char}': {count}")
```

### 两数之和

```python
def two_sum(nums, target):
    """两数之和问题"""
    num_map = HashTable()
    
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    
    return None

# 使用示例
nums = [2, 7, 11, 15]
target = 9
result = two_sum(nums, target)
print(f"两数之和索引: {result}")  # [0, 1]
```

### LRU缓存

```python
class LRUCache:
    """LRU缓存实现"""
    
    class Node:
        def __init__(self, key=0, value=0):
            self.key = key
            self.value = value
            self.prev = None
            self.next = None
    
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = HashTable()
        
        # 创建虚拟头尾节点
        self.head = self.Node()
        self.tail = self.Node()
        self.head.next = self.tail
        self.tail.prev = self.head
    
    def _add_node(self, node):
        """在头部添加节点"""
        node.prev = self.head
        node.next = self.head.next
        
        self.head.next.prev = node
        self.head.next = node
    
    def _remove_node(self, node):
        """移除节点"""
        prev_node = node.prev
        next_node = node.next
        
        prev_node.next = next_node
        next_node.prev = prev_node
    
    def _move_to_head(self, node):
        """移动节点到头部"""
        self._remove_node(node)
        self._add_node(node)
    
    def _pop_tail(self):
        """弹出尾部节点"""
        last_node = self.tail.prev
        self._remove_node(last_node)
        return last_node
    
    def get(self, key):
        """获取值"""
        if key in self.cache:
            node = self.cache[key]
            # 移动到头部（最近使用）
            self._move_to_head(node)
            return node.value
        return -1
    
    def put(self, key, value):
        """设置值"""
        if key in self.cache:
            # 更新现有节点
            node = self.cache[key]
            node.value = value
            self._move_to_head(node)
        else:
            # 添加新节点
            new_node = self.Node(key, value)
            
            if len(self.cache) >= self.capacity:
                # 移除最久未使用的节点
                tail = self._pop_tail()
                del self.cache[tail.key]
            
            self.cache[key] = new_node
            self._add_node(new_node)

# 使用示例
lru = LRUCache(2)
lru.put(1, 1)
lru.put(2, 2)
print(lru.get(1))  # 1
lru.put(3, 3)      # 移除key=2
print(lru.get(2))  # -1 (未找到)
```

---

## 6. 性能分析

### 时间复杂度

| 操作 | 平均情况 | 最坏情况 | 说明 |
|------|----------|----------|------|
| 查找 | O(1) | O(n) | 取决于冲突处理 |
| 插入 | O(1) | O(n) | 可能需要扩容 |
| 删除 | O(1) | O(n) | 链表法需要遍历 |
| 扩容 | O(n) | O(n) | 重新哈希所有元素 |

### 空间复杂度

| 实现方式 | 空间复杂度 | 额外开销 |
|----------|------------|----------|
| 链表法 | O(n) | 指针开销 |
| 开放寻址 | O(n) | 删除标记 |
| 动态扩容 | O(n) | 临时空间 |

### 负载因子影响

```python
def analyze_load_factor():
    """分析负载因子对性能的影响"""
    import time
    import random
    
    def test_performance(load_factor, num_operations=10000):
        ht = HashTable(initial_capacity=16, load_factor=load_factor)
        
        # 插入测试
        start_time = time.time()
        for i in range(int(num_operations * load_factor)):
            ht[f"key_{i}"] = f"value_{i}"
        insert_time = time.time() - start_time
        
        # 查找测试
        start_time = time.time()
        for i in range(1000):
            key = f"key_{random.randint(0, int(num_operations * load_factor) - 1)}"
            _ = ht.get(key)
        search_time = time.time() - start_time
        
        stats = ht.stats()
        return {
            'load_factor': load_factor,
            'insert_time': insert_time,
            'search_time': search_time,
            'avg_bucket_size': stats['avg_bucket_size'],
            'max_bucket_size': stats['max_bucket_size']
        }
    
    # 测试不同负载因子
    load_factors = [0.5, 0.75, 1.0, 1.5, 2.0]
    
    print("负载因子性能分析:")
    print("负载因子\t插入时间\t查找时间\t平均桶大小\t最大桶大小")
    print("-" * 60)
    
    for lf in load_factors:
        result = test_performance(lf)
        print(f"{result['load_factor']:.1f}\t\t"
              f"{result['insert_time']:.4f}s\t"
              f"{result['search_time']:.4f}s\t"
              f"{result['avg_bucket_size']:.2f}\t\t"
              f"{result['max_bucket_size']}")

# 运行性能分析
# analyze_load_factor()
```

### 哈希函数质量评估

```python
def evaluate_hash_function(hash_func, keys, table_size):
    """评估哈希函数质量"""
    distribution = [0] * table_size
    
    # 统计分布
    for key in keys:
        index = hash_func(key, table_size)
        distribution[index] += 1
    
    # 计算统计指标
    non_empty = sum(1 for count in distribution if count > 0)
    max_collision = max(distribution)
    avg_collision = sum(distribution) / non_empty if non_empty > 0 else 0
    
    # 计算方差（衡量均匀性）
    variance = sum((count - avg_collision) ** 2 for count in distribution) / table_size
    
    return {
        'non_empty_slots': non_empty,
        'max_collisions': max_collision,
        'avg_collisions': avg_collision,
        'variance': variance,
        'distribution': distribution
    }

# 测试不同哈希函数
keys = [f"key_{i}" for i in range(1000)]
table_size = 101

functions = {
    'Simple': string_hash_simple,
    'DJB2': string_hash_djb2,
    'Polynomial': string_hash_polynomial
}

print("哈希函数质量评估:")
for name, func in functions.items():
    result = evaluate_hash_function(func, keys, table_size)
    print(f"{name}: 非空槽={result['non_empty_slots']}, "
          f"最大冲突={result['max_collisions']}, "
          f"方差={result['variance']:.2f}")
```

---

## 总结

哈希表是最重要的数据结构之一：

### 核心优势
1. **O(1)平均时间复杂度**：查找、插入、删除都非常快速
2. **灵活的键类型**：支持各种数据类型作为键
3. **动态扩容**：自动调整大小维持性能
4. **广泛应用**：数据库索引、缓存、去重等

### 设计要点
1. **好的哈希函数**：均匀分布、快速计算
2. **合适的冲突处理**：链表法 vs 开放寻址
3. **适当的负载因子**：平衡空间和时间效率
4. **动态调整**：根据使用情况扩容或缩容

### 应用场景
- **快速查找**：字典、符号表、数据库索引
- **去重统计**：集合操作、频率统计
- **缓存系统**：LRU缓存、内存缓存
- **算法优化**：两数之和、字符串匹配

哈希表的高效性使其成为现代计算机系统的基础组件！
