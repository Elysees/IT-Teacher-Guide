# 速查手册

## 目录
1. [Python语法速查](#python语法速查)
2. [C++语法速查](#c语法速查)
3. [算法复杂度速查](#算法复杂度速查)
4. [常用数据结构操作](#常用数据结构操作)
5. [编程技巧速查](#编程技巧速查)

---

## Python语法速查

### 基本语法

| 概念 | 语法 | 示例 |
|------|------|------|
| 变量赋值 | `variable = value` | `x = 10` |
| 多变量赋值 | `a, b = 1, 2` | `x, y = 10, 20` |
| 常量定义 | `CONSTANT = value` | `PI = 3.14159` |
| 注释 | `# comment` | `# 这是注释` |
| 多行注释 | `"""..."""` | `"""多行注释"""` |

### 数据类型

| 类型 | 说明 | 示例 |
|------|------|------|
| 整数 | `int` | `x = 42` |
| 浮点数 | `float` | `y = 3.14` |
| 字符串 | `str` | `s = "Hello"` |
| 布尔值 | `bool` | `flag = True` |
| 列表 | `list` | `lst = [1, 2, 3]` |
| 元组 | `tuple` | `tup = (1, 2, 3)` |
| 字典 | `dict` | `d = {"key": "value"}` |
| 集合 | `set` | `s = {1, 2, 3}` |

### 运算符

| 类型 | 运算符 | 说明 |
|------|--------|------|
| 算术 | `+`, `-`, `*`, `/`, `//`, `%`, `**` | 加减乘除、整除、取余、幂 |
| 比较 | `==`, `!=`, `<`, `>`, `<=`, `>=` | 等于、不等于、大小比较 |
| 逻辑 | `and`, `or`, `not` | 与、或、非 |
| 位运算 | `&`, `\|`, `^`, `~`, `<<`, `>>` | 与、或、异或、取反、移位 |
| 身份 | `is`, `is not` | 对象身份比较 |
| 成员 | `in`, `not in` | 成员关系测试 |

### 控制流

```python
# if语句
if condition:
    statement
elif condition:
    statement
else:
    statement

# for循环
for item in iterable:
    statement

# while循环
while condition:
    statement

# break和continue
for i in range(10):
    if i == 5:
        break      # 跳出循环
    if i % 2 == 0:
        continue   # 跳过本次迭代
```

### 函数定义

```python
# 基本函数
def function_name(parameters):
    """函数文档字符串"""
    return value

# 带默认参数的函数
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

# 可变参数
def func(*args, **kwargs):
    # *args: 位置参数元组
    # **kwargs: 关键字参数字典
    pass

# Lambda函数
square = lambda x: x ** 2
```

### 列表操作

```python
# 创建列表
lst = [1, 2, 3, 4, 5]

# 基本操作
lst.append(6)          # 添加元素
lst.extend([7, 8])     # 扩展列表
lst.insert(0, 0)       # 在指定位置插入
lst.remove(3)          # 删除指定值
lst.pop()              # 删除并返回最后一个元素
lst.pop(0)             # 删除并返回指定位置元素
lst.index(4)           # 查找元素索引
lst.count(2)           # 计算元素出现次数
lst.sort()             # 排序
lst.reverse()          # 反转
len(lst)               # 列表长度

# 列表切片
lst[1:4]      # 索引1到3的元素
lst[:3]       # 前3个元素
lst[2:]       # 从索引2开始的所有元素
lst[::2]      # 步长为2的元素
lst[::-1]     # 反转列表
```

### 字典操作

```python
# 创建字典
d = {"key1": "value1", "key2": "value2"}

# 基本操作
d["key3"] = "value3"    # 添加/修改键值对
d.get("key1")           # 获取值，不存在返回None
d.get("key1", "default") # 获取值，不存在返回默认值
d.keys()                # 获取所有键
d.values()              # 获取所有值
d.items()               # 获取所有键值对
d.pop("key1")           # 删除键值对
d.update({"key4": "value4"})  # 更新字典
len(d)                  # 字典长度
```

### 字符串操作

```python
# 基本操作
s = "Hello, World!"

s.upper()           # 转大写
s.lower()           # 转小写
s.capitalize()      # 首字母大写
s.title()           # 每个单词首字母大写
s.strip()           # 去除首尾空白
s.replace("old", "new")  # 替换
s.split(",")        # 分割
",".join(["a", "b", "c"])  # 连接

# 格式化
name = "Alice"
age = 25
"Hello, {}!".format(name)           # format方法
f"Hello, {name}! You are {age}."    # f-string (推荐)
"Hello, %s!" % name                 # %格式化
```

### 异常处理

```python
try:
    # 可能出错的代码
    risky_operation()
except SpecificException as e:
    # 处理特定异常
    print(f"错误: {e}")
except (Exception1, Exception2) as e:
    # 处理多种异常
    print(f"错误: {e}")
except Exception as e:
    # 处理所有异常
    print(f"未知错误: {e}")
else:
    # 没有异常时执行
    print("操作成功")
finally:
    # 无论是否有异常都执行
    cleanup_operation()
```

---

## C++语法速查

### 基本语法

```cpp
#include <iostream>      // 预处理指令
#include <vector>
using namespace std;     // 使用标准命名空间

int main() {             // 主函数
    // 语句
    return 0;            // 返回值
}
```

### 数据类型

| 类型 | 说明 | 示例 |
|------|------|------|
| `bool` | 布尔值 | `bool flag = true;` |
| `char` | 字符 | `char c = 'A';` |
| `int` | 整数 | `int x = 10;` |
| `float` | 单精度浮点 | `float f = 3.14f;` |
| `double` | 双精度浮点 | `double d = 3.14159;` |
| `void` | 无类型 | 用于函数返回值 |

### 变量声明

```cpp
// 基本声明
int x = 10;
const int y = 20;        // 常量
int* ptr = &x;           // 指针
int& ref = x;            // 引用

// 类型推导
auto var = 42;           // 自动推导类型
decltype(x) y2 = x;      // 推导表达式类型
```

### 运算符

| 类型 | 运算符 |
|------|--------|
| 算术 | `+`, `-`, `*`, `/`, `%`, `++`, `--` |
| 关系 | `==`, `!=`, `<`, `>`, `<=`, `>=` |
| 逻辑 | `&&`, `||`, `!` |
| 位运算 | `&`, `|`, `^`, `~`, `<<`, `>>` |
| 赋值 | `=`, `+=`, `-=`, `*=`, `/=`, `%=` |
| 其他 | `?:` (三元运算符), `sizeof`, `.` (成员访问) |

### 控制流

```cpp
// if语句
if (condition) {
    statement;
} else if (condition) {
    statement;
} else {
    statement;
}

// switch语句
switch (value) {
    case 1:
        statement;
        break;
    case 2:
        statement;
        break;
    default:
        statement;
}

// for循环
for (int i = 0; i < 10; i++) {
    statement;
}

// 范围for循环 (C++11)
vector<int> vec = {1, 2, 3};
for (const auto& item : vec) {
    cout << item << endl;
}

// while循环
while (condition) {
    statement;
}

// do-while循环
do {
    statement;
} while (condition);
```

### 函数

```cpp
// 函数声明
int add(int a, int b);

// 函数定义
int add(int a, int b) {
    return a + b;
}

// 默认参数
int func(int a, int b = 10) {
    return a + b;
}

// 函数重载
int max(int a, int b) { return a > b ? a : b; }
double max(double a, double b) { return a > b ? a : b; }

// 内联函数
inline int square(int x) { return x * x; }

// Lambda表达式
auto lambda = [](int x, int y) -> int {
    return x + y;
};
```

### 指针和引用

```cpp
int x = 10;
int* ptr = &x;        // 指针指向x的地址
int& ref = x;         // 引用x

// 指针操作
int value = *ptr;     // 解引用
ptr = nullptr;        // 空指针

// 动态内存分配
int* dynamic = new int(42);  // 分配内存
delete dynamic;              // 释放内存
int* arr = new int[10];      // 分配数组
delete[] arr;                // 释放数组
```

### 类和对象

```cpp
class MyClass {
private:
    int privateVar;           // 私有成员

protected:
    int protectedVar;         // 保护成员

public:
    int publicVar;            // 公有成员

    // 构造函数
    MyClass(int val) : privateVar(val) {}

    // 拷贝构造函数
    MyClass(const MyClass& other) {
        privateVar = other.privateVar;
    }

    // 析构函数
    ~MyClass() {}

    // 成员函数
    void method() {
        // 方法实现
    }

    // 常量成员函数
    int getValue() const {
        return privateVar;
    }

    // 运算符重载
    MyClass operator+(const MyClass& other) {
        return MyClass(privateVar + other.privateVar);
    }
};
```

### STL容器

#### vector (动态数组)

```cpp
#include <vector>

vector<int> vec;              // 空vector
vector<int> vec2(5);          // 5个0
vector<int> vec3(5, 10);      // 5个10
vector<int> vec4 = {1,2,3};   // 初始化列表

// 基本操作
vec.push_back(42);            // 添加元素
vec.pop_back();               // 删除最后一个元素
vec.size();                   // 大小
vec.empty();                  // 是否为空
vec[0];                       // 访问元素
vec.at(0);                    // 访问元素(带边界检查)
vec.front();                  // 第一个元素
vec.back();                   // 最后一个元素
vec.clear();                  // 清空
```

#### string (字符串)

```cpp
#include <string>

string str = "Hello";
string str2("World");

// 基本操作
str + str2;                   // 连接
str.length();                 // 长度
str.size();                   // 大小
str.empty();                  // 是否为空
str[0];                       // 访问字符
str.substr(0, 3);             // 子字符串
str.find("ll");               // 查找
str.replace(0, 2, "He");      // 替换
str.insert(5, " ");           // 插入
str.erase(0, 2);              // 删除
```

#### map (映射)

```cpp
#include <map>

map<string, int> m;
m["key"] = 100;               // 插入/修改
m.insert({"key2", 200});      // 插入
m.size();                     // 大小
m.count("key");               // 是否存在
m.find("key");                // 查找
m.erase("key");               // 删除
m.clear();                    // 清空

// 遍历
for (const auto& pair : m) {
    cout << pair.first << " -> " << pair.second << endl;
}
```

---

## 算法复杂度速查

### 时间复杂度

| 复杂度 | 名称 | 示例 |
|--------|------|------|
| O(1) | 常数时间 | 数组访问、哈希表查找 |
| O(log n) | 对数时间 | 二分搜索、平衡树操作 |
| O(n) | 线性时间 | 线性搜索、遍历数组 |
| O(n log n) | 线性对数时间 | 快速排序、归并排序 |
| O(n²) | 平方时间 | 冒泡排序、选择排序 |
| O(2ⁿ) | 指数时间 | 递归计算斐波那契数列 |

### 排序算法复杂度

| 算法 | 最好 | 平均 | 最坏 | 空间 | 稳定性 |
|------|------|------|------|------|--------|
| 冒泡排序 | O(n) | O(n²) | O(n²) | O(1) | 稳定 |
| 选择排序 | O(n²) | O(n²) | O(n²) | O(1) | 不稳定 |
| 插入排序 | O(n) | O(n²) | O(n²) | O(1) | 稳定 |
| 快速排序 | O(n log n) | O(n log n) | O(n²) | O(log n) | 不稳定 |
| 归并排序 | O(n log n) | O(n log n) | O(n log n) | O(n) | 稳定 |
| 堆排序 | O(n log n) | O(n log n) | O(n log n) | O(1) | 不稳定 |
| 计数排序 | O(n+k) | O(n+k) | O(n+k) | O(k) | 稳定 |

### 搜索算法复杂度

| 算法 | 最好 | 平均 | 最坏 | 空间 | 数据要求 |
|------|------|------|------|------|----------|
| 线性搜索 | O(1) | O(n) | O(n) | O(1) | 无 |
| 二分搜索 | O(1) | O(log n) | O(log n) | O(1) | 已排序 |
| 插值搜索 | O(1) | O(log log n) | O(n) | O(1) | 已排序、均匀分布 |

### 数据结构操作复杂度

#### 数组

| 操作 | 时间复杂度 |
|------|------------|
| 访问 | O(1) |
| 搜索 | O(n) |
| 插入 | O(n) |
| 删除 | O(n) |

#### 链表

| 操作 | 时间复杂度 |
|------|------------|
| 访问 | O(n) |
| 搜索 | O(n) |
| 插入(已知位置) | O(1) |
| 删除(已知位置) | O(1) |

#### 哈希表

| 操作 | 平均 | 最坏 |
|------|------|------|
| 访问 | N/A | N/A |
| 搜索 | O(1) | O(n) |
| 插入 | O(1) | O(n) |
| 删除 | O(1) | O(n) |

#### 二叉搜索树

| 操作 | 平均 | 最坏 |
|------|------|------|
| 搜索 | O(log n) | O(n) |
| 插入 | O(log n) | O(n) |
| 删除 | O(log n) | O(n) |

---

## 常用数据结构操作

### Python常用操作

```python
# 列表操作
lst = [1, 2, 3, 4, 5]
lst.append(6)           # O(1) - 末尾添加
lst.insert(0, 0)        # O(n) - 指定位置插入
lst.pop()               # O(1) - 末尾删除
lst.pop(0)              # O(n) - 指定位置删除
lst.index(3)            # O(n) - 查找索引
lst.sort()              # O(n log n) - 排序

# 字典操作
d = {"a": 1, "b": 2}
d["c"] = 3              # O(1) - 添加
d.get("a")              # O(1) - 获取
del d["a"]              # O(1) - 删除
list(d.keys())          # O(n) - 获取所有键

# 集合操作
s = {1, 2, 3}
s.add(4)                # O(1) - 添加
s.remove(1)             # O(1) - 删除
s.union({4, 5})         # O(len(s)+len(other)) - 并集
s.intersection({2, 3})  # O(min(len(s), len(other))) - 交集
```

### C++ STL操作

```cpp
#include <vector>
#include <unordered_map>
#include <set>

// vector操作
vector<int> vec = {1, 2, 3};
vec.push_back(4);       // O(1) amortized - 末尾添加
vec.insert(vec.begin(), 0);  // O(n) - 指定位置插入
vec.pop_back();         // O(1) - 末尾删除
vec.size();             // O(1) - 大小
vec[0];                 // O(1) - 随机访问

// unordered_map操作
unordered_map<string, int> umap;
umap["key"] = 1;        // O(1) average - 插入
umap["key"];            // O(1) average - 访问
umap.count("key");      // O(1) average - 检查存在
umap.erase("key");      // O(1) average - 删除

// set操作
set<int> s = {3, 1, 2};
s.insert(4);            // O(log n) - 插入
s.erase(1);             // O(log n) - 删除
s.count(2);             // O(log n) - 检查存在
s.find(2);              // O(log n) - 查找
```

### 算法库函数

#### Python算法函数

```python
import bisect
import heapq
from collections import deque

# 二分搜索
arr = [1, 3, 5, 7, 9]
pos = bisect.bisect_left(arr, 5)  # 左边界
pos = bisect.bisect_right(arr, 5) # 右边界

# 堆操作
heap = [3, 1, 4, 1, 5]
heapq.heapify(heap)     # O(n) - 构建堆
heapq.heappush(heap, 2) # O(log n) - 插入
smallest = heapq.heappop(heap)  # O(log n) - 弹出最小值

# 双端队列
dq = deque([1, 2, 3])
dq.appendleft(0)        # O(1) - 左端添加
dq.append(4)            # O(1) - 右端添加
dq.popleft()            # O(1) - 左端弹出
dq.pop()                # O(1) - 右端弹出
```

#### C++算法函数

```cpp
#include <algorithm>
#include <numeric>

vector<int> arr = {3, 1, 4, 1, 5, 9, 2, 6};

// 排序
sort(arr.begin(), arr.end());           // O(n log n)
stable_sort(arr.begin(), arr.end());    // O(n log n) - 稳定排序

// 查找
find(arr.begin(), arr.end(), 5);        // O(n) - 查找
binary_search(arr.begin(), arr.end(), 5); // O(log n) - 二分查找

// 计算
int sum = accumulate(arr.begin(), arr.end(), 0);  // O(n) - 求和
int max_val = *max_element(arr.begin(), arr.end()); // O(n) - 最大值

// 比较
is_sorted(arr.begin(), arr.end());      // O(n) - 是否已排序
next_permutation(arr.begin(), arr.end()); // O(n) - 下一个排列
```

---

## 编程技巧速查

### Python编程技巧

```python
# 1. 列表推导式
squares = [x**2 for x in range(10)]
even_squares = [x**2 for x in range(10) if x % 2 == 0]

# 2. 字典推导式
squares_dict = {x: x**2 for x in range(5)}

# 3. 集合推导式
unique_lengths = {len(word) for word in ["hello", "world", "python"]}

# 4. 生成器表达式
sum_of_squares = sum(x**2 for x in range(10))

# 5. 解包
a, b, *rest = [1, 2, 3, 4, 5]  # a=1, b=2, rest=[3,4,5]

# 6. 交换变量
a, b = b, a

# 7. 链式比较
if 0 <= x <= 100:  # 等价于 0 <= x and x <= 100
    pass

# 8. 条件赋值
value = "positive" if x > 0 else "non-positive"

# 9. 使用enumerate
for i, value in enumerate(['a', 'b', 'c']):
    print(f"{i}: {value}")

# 10. 使用zip
list1 = [1, 2, 3]
list2 = ['a', 'b', 'c']
for num, char in zip(list1, list2):
    print(f"{num}: {char}")

# 11. 使用any/all
numbers = [1, 2, 3, 4, 5]
has_even = any(x % 2 == 0 for x in numbers)
all_positive = all(x > 0 for x in numbers)

# 12. 上下文管理器
with open('file.txt', 'r') as f:
    content = f.read()

# 13. 装饰器
def timer(func):
    def wrapper(*args, **kwargs):
        import time
        start = time.time()
        result = func(*args, **kwargs)
        print(f"{func.__name__} took {time.time() - start:.2f}s")
        return result
    return wrapper

@timer
def slow_function():
    import time
    time.sleep(1)
```

### C++编程技巧

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <functional>

using namespace std;

// 1. 使用auto简化类型声明
vector<int> numbers = {1, 2, 3, 4, 5};
for (const auto& num : numbers) {  // 避免写vector<int>::const_iterator
    cout << num << " ";
}

// 2. 使用初始化列表
vector<int> v1{1, 2, 3, 4, 5};     // 统一初始化语法
vector<int> v2 = {1, 2, 3, 4, 5};  // 等价写法

// 3. 使用算法库
vector<int> nums = {5, 2, 8, 1, 9};
sort(nums.begin(), nums.end());     // 排序
reverse(nums.begin(), nums.end());  // 反转
auto max_it = max_element(nums.begin(), nums.end()); // 最大元素迭代器

// 4. Lambda表达式
vector<int> data = {1, 2, 3, 4, 5};
// 过滤偶数
vector<int> evens;
copy_if(data.begin(), data.end(), back_inserter(evens),
        [](int n) { return n % 2 == 0; });

// 5. 智能指针
#include <memory>
unique_ptr<int> ptr = make_unique<int>(42);  // 自动内存管理
shared_ptr<int> sp1 = make_shared<int>(100);
shared_ptr<int> sp2 = sp1;  // 引用计数增加

// 6. 移动语义
vector<int> create_vector() {
    vector<int> temp = {1, 2, 3, 4, 5};
    return temp;  // 自动使用移动语义
}
vector<int> v = create_vector();  // 高效，避免拷贝

// 7. 常量表达式
constexpr int square(int n) {
    return n * n;
}
constexpr int result = square(5);  // 编译时计算

// 8. 范围检查
vector<int> vec = {1, 2, 3};
// 安全访问
if (!vec.empty()) {
    cout << vec.at(0) << endl;  // 带边界检查
}

// 9. 函数对象
struct GreaterThan {
    int threshold;
    GreaterThan(int t) : threshold(t) {}
    bool operator()(int value) const {
        return value > threshold;
    }
};
// 使用
vector<int> values = {1, 5, 3, 9, 2};
int count = count_if(values.begin(), values.end(), GreaterThan(4));
```

### 算法技巧

```python
# 1. 双指针技巧 - 两数之和
def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        current = arr[left] + arr[right]
        if current == target:
            return left, right
        elif current < target:
            left += 1
        else:
            right -= 1
    return None

# 2. 滑动窗口 - 最大子数组和
def max_subarray_sum(arr, k):
    if len(arr) < k:
        return None
    
    window_sum = sum(arr[:k])
    max_sum = window_sum
    
    for i in range(k, len(arr)):
        window_sum = window_sum - arr[i-k] + arr[i]
        max_sum = max(max_sum, window_sum)
    
    return max_sum

# 3. 前缀和
def range_sum_query(arr):
    # 构建前缀和数组
    prefix = [0]
    for num in arr:
        prefix.append(prefix[-1] + num)
    
    # 查询区间和 [left, right]
    def query(left, right):
        return prefix[right + 1] - prefix[left]
    
    return query

# 4. 位运算技巧
def is_power_of_two(n):
    return n > 0 and (n & (n - 1)) == 0

def count_bits(n):
    count = 0
    while n:
        count += n & 1
        n >>= 1
    return count

# 5. 递归转迭代（使用栈）
def factorial_iterative(n):
    if n <= 1:
        return 1
    
    stack = []
    result = 1
    
    while n > 1:
        stack.append(n)
        n -= 1
    
    while stack:
        result *= stack.pop()
    
    return result
```

```cpp
#include <stack>
#include <queue>

// 1. 双指针 - 移除元素
int removeElement(vector<int>& nums, int val) {
    int slow = 0;
    for (int fast = 0; fast < nums.size(); fast++) {
        if (nums[fast] != val) {
            nums[slow++] = nums[fast];
        }
    }
    return slow;
}

// 2. 滑动窗口 - 最小覆盖子串
string minWindow(string s, string t) {
    if (s.empty() || t.empty()) return "";
    
    unordered_map<char, int> dict_t;
    for (char c : t) dict_t[c]++;
    
    int required = dict_t.size();
    int l = 0, r = 0, formed = 0;
    unordered_map<char, int> window_counts;
    int ans[3] = {-1, 0, 0}; // length, left, right
    
    while (r < s.length()) {
        char c = s[r];
        window_counts[c]++;
        
        if (dict_t.count(c) && window_counts[c] == dict_t[c]) {
            formed++;
        }
        
        while (l <= r && formed == required) {
            c = s[l];
            
            if (ans[0] == -1 || r - l + 1 < ans[0]) {
                ans[0] = r - l + 1;
                ans[1] = l;
                ans[2] = r;
            }
            
            window_counts[c]--;
            if (dict_t.count(c) && window_counts[c] < dict_t[c]) {
                formed--;
            }
            l++;
        }
        r++;
    }
    
    return ans[0] == -1 ? "" : s.substr(ans[1], ans[0]);
}

// 3. BFS模板
int bfs(vector<vector<int>>& grid, int start_x, int start_y) {
    int rows = grid.size(), cols = grid[0].size();
    queue<pair<int, int>> q;
    vector<vector<bool>> visited(rows, vector<bool>(cols, false));
    
    q.push({start_x, start_y});
    visited[start_x][start_y] = true;
    
    int directions[4][2] = {% raw %}{{0,1}, {1,0}, {0,-1}, {-1,0}}{% endraw %};
    
    while (!q.empty()) {
        auto [x, y] = q.front(); q.pop();
        
        for (auto& dir : directions) {
            int nx = x + dir[0], ny = y + dir[1];
            if (nx >= 0 && nx < rows && ny >= 0 && ny < cols 
                && !visited[nx][ny] && grid[nx][ny] == 0) {
                visited[nx][ny] = true;
                q.push({nx, ny});
            }
        }
    }
    
    return 0; // 根据具体问题返回相应值
}

// 4. DFS模板
void dfs(vector<vector<int>>& graph, int node, vector<bool>& visited) {
    visited[node] = true;
    
    for (int neighbor : graph[node]) {
        if (!visited[neighbor]) {
            dfs(graph, neighbor, visited);
        }
    }
}
```

### 常用算法模板

```python
# 1. 二分搜索模板
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1

# 2. 快速排序模板
def quicksort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quicksort(arr, low, pi - 1)
        quicksort(arr, pi + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

# 3. 归并排序模板
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result
```

```cpp
// 1. 二分搜索模板
int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;  // 防止溢出
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

// 2. 快速排序模板
void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

// 3. 最长公共子序列
int lcs(string str1, string str2) {
    int m = str1.length(), n = str2.length();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (str1[i-1] == str2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    
    return dp[m][n];
}
```

---

## 调试技巧

### Python调试

```python
# 1. 使用print调试
def my_function(x, y):
    print(f"输入: x={x}, y={y}")  # 调试信息
    result = x + y
    print(f"结果: {result}")      # 调试信息
    return result

# 2. 使用logging
import logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

def calculate(a, b):
    logger.debug(f"计算 {a} + {b}")
    result = a + b
    logger.info(f"结果: {result}")
    return result

# 3. 使用pdb调试器
import pdb

def problematic_function():
    x = 10
    y = 20
    pdb.set_trace()  # 设置断点
    result = x * y
    return result

# 4. 异常处理和调试
try:
    risky_operation()
except Exception as e:
    import traceback
    traceback.print_exc()  # 打印完整错误栈
```

### C++调试

```cpp
// 1. 使用宏进行调试输出
#ifdef DEBUG
#define DBG(x) cout << #x << " = " << x << endl
#else
#define DBG(x)
#endif

void debug_function() {
    int x = 42;
    DBG(x);  // 只在DEBUG模式下输出
}

// 2. 使用assert进行断言
#include <cassert>

void safe_divide(int a, int b) {
    assert(b != 0);  // 确保除数不为0
    int result = a / b;
}

// 3. 调试宏
#define DEBUG_PRINT(x) do { \
    if (DEBUG_MODE) { \
        cout << __FILE__ << ":" << __LINE__ << " - " << #x << " = " << x << endl; \
    } \
} while(0)
```

### 常见错误模式

| 语言 | 常见错误 | 解决方法 |
|------|----------|----------|
| Python | `IndexError` | 检查索引范围，使用`len()`验证 |
| Python | `KeyError` | 使用`.get()`或`in`操作符检查 |
| Python | `TypeError` | 检查变量类型，使用`isinstance()` |
| C++ | 数组越界 | 使用`.at()`进行边界检查 |
| C++ | 空指针解引用 | 使用前检查`ptr != nullptr` |
| C++ | 内存泄漏 | 使用智能指针或RAII |
| 通用 | 无限循环 | 检查循环条件和更新语句 |
| 通用 | 整数溢出 | 使用更大类型或检查边界 |
