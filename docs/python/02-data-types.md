# Python 数据类型

[← 上一章: 基础入门](01-basics.md) | [下一章: 控制流 →](03-control-flow.md)

## 目录
1. [数据类型概览](#1-数据类型概览)
2. [数值类型](#2-数值类型)
3. [字符串](#3-字符串-str)
4. [列表](#4-列表-list)
5. [元组](#5-元组-tuple)
6. [字典](#6-字典-dict)
7. [集合](#7-集合-set)
8. [类型转换](#8-类型转换)
9. [深拷贝与浅拷贝](#9-深拷贝与浅拷贝)
10. [完整示例](#10-完整示例)

---

## 1. 数据类型概览

| 类型 | 说明 | 可变性 | 有序性 |
|------|------|--------|--------|
| `int` | 整数 | 不可变 | - |
| `float` | 浮点数 | 不可变 | - |
| `str` | 字符串 | 不可变 | 有序 |
| `list` | 列表 | 可变 | 有序 |
| `tuple` | 元组 | 不可变 | 有序 |
| `dict` | 字典 | 可变 | 有序(3.7+) |
| `set` | 集合 | 可变 | 无序 |
| `bool` | 布尔值 | 不可变 | - |

---

## 2. 数值类型

### 整数 int

```python
x = 42
y = -10
binary = 0b1010      # 二进制10
octal = 0o12         # 八进制10
hexadecimal = 0xA    # 十六进制10
big = 999999999999999999999999  # 无限制
```

### 浮点数 float

```python
pi = 3.14
e = 2.71828
sci = 3e8            # 科学计数法: 3×10^8
inf = float('inf')   # 无穷大
nan = float('nan')   # 非数字
```

### 数值函数

| 函数 | 说明 | 示例 |
|------|------|------|
| `abs(x)` | 绝对值 | `abs(-5)` → `5` |
| `pow(x,y)` | 幂运算 | `pow(2,3)` → `8` |
| `round(x,n)` | 四舍五入 | `round(3.14,1)` → `3.1` |
| `max()` | 最大值 | `max(1,5,3)` → `5` |
| `min()` | 最小值 | `min(1,5,3)` → `1` |

---

## 3. 字符串 (str)

### 创建与访问

```python
s = "Python"
print(s[0])      # 'P' 索引
print(s[-1])     # 'n' 负索引
print(s[1:4])    # 'yth' 切片
print(s[::-1])   # 'nohtyP' 反转
```

### 常用方法

| 方法 | 说明 | 示例 |
|------|------|------|
| `len(s)` | 长度 | `len("hi")` → `2` |
| `s.upper()` | 转大写 | `"hi".upper()` → `"HI"` |
| `s.lower()` | 转小写 | `"HI".lower()` → `"hi"` |
| `s.strip()` | 去空格 | `" hi ".strip()` → `"hi"` |
| `s.split()` | 分割 | `"a b".split()` → `['a','b']` |
| `s.replace(old,new)` | 替换 | `"hi".replace("i","o")` → `"ho"` |
| `s.find(sub)` | 查找 | `"hello".find("l")` → `2` |
| `s.count(sub)` | 计数 | `"hello".count("l")` → `2` |

### 格式化

```python
name, age = "Alice", 25

# f-string (推荐)
print(f"{name}今年{age}岁")

# format()
print("{}今年{}岁".format(name, age))

# % 格式化
print("%s今年%d岁" % (name, age))
```

---

## 4. 列表 (list)

### 创建与操作

```python
# 创建
lst = [1, 2, 3, 4, 5]
empty = []
mixed = [1, "hello", 3.14]

# 访问
print(lst[0])     # 1
print(lst[-1])    # 5
print(lst[1:4])   # [2,3,4]

# 修改
lst[0] = 10       # [10,2,3,4,5]
del lst[0]        # [2,3,4,5]
```

### 列表方法

| 方法 | 说明 | 示例 |
|------|------|------|
| `lst.append(x)` | 末尾添加 | `lst.append(6)` |
| `lst.insert(i,x)` | 插入 | `lst.insert(0,0)` |
| `lst.extend(lst2)` | 扩展 | `lst.extend([7,8])` |
| `lst.remove(x)` | 删除 | `lst.remove(3)` |
| `lst.pop()` | 弹出 | `lst.pop()` |
| `lst.sort()` | 排序 | `lst.sort()` |
| `lst.reverse()` | 反转 | `lst.reverse()` |
| `lst.index(x)` | 查找 | `lst.index(3)` |
| `lst.count(x)` | 计数 | `lst.count(2)` |

### 列表推导式

```python
# 基本形式
squares = [x**2 for x in range(5)]  # [0,1,4,9,16]

# 带条件
evens = [x for x in range(10) if x%2==0]  # [0,2,4,6,8]
```

---

## 5. 元组 (tuple)

### 特点与创建

```python
# 不可变序列
t = (1, 2, 3)
single = (1,)     # 单元素需要逗号
t2 = 1, 2, 3      # 可省略括号

# 元组解包
a, b, c = (1, 2, 3)
```

### 访问与方法

```python
t = (10, 20, 30, 20)

print(t[0])       # 10
print(t[1:3])     # (20,30)
print(t.count(20))  # 2
print(t.index(30))  # 2

# 不可修改
# t[0] = 100  # TypeError
```

---

## 6. 字典 (dict)

### 创建与访问

```python
# 创建
person = {"name": "Alice", "age": 25}
empty = {}
d = dict(name="Bob", age=30)

# 访问
print(person["name"])         # "Alice"
print(person.get("age"))      # 25
print(person.get("city","无"))  # "无"

# 修改
person["age"] = 26            # 修改
person["city"] = "Beijing"    # 添加
del person["city"]            # 删除
```

### 字典方法

| 方法 | 说明 | 示例 |
|------|------|------|
| `d.keys()` | 所有键 | `d.keys()` |
| `d.values()` | 所有值 | `d.values()` |
| `d.items()` | 键值对 | `d.items()` |
| `d.get(k,default)` | 获取值 | `d.get("age",0)` |
| `d.pop(k)` | 删除并返回 | `d.pop("age")` |
| `d.update(d2)` | 更新 | `d.update(d2)` |
| `k in d` | 判断存在 | `"age" in d` |

### 字典推导式

```python
# 基本形式
squares = {x: x**2 for x in range(5)}
# {0:0, 1:1, 2:4, 3:9, 4:16}

# 带条件
evens = {x: x**2 for x in range(10) if x%2==0}
```

---

## 7. 集合 (set)

### 特点与创建

```python
# 无序、唯一、可变
s = {1, 2, 3, 4, 5}
s2 = set([1, 2, 2, 3])  # {1,2,3} 自动去重
empty = set()           # 注意: {} 是空字典
```

### 集合操作

```python
s = {1, 2, 3}
s.add(4)        # 添加
s.remove(2)     # 删除(不存在会报错)
s.discard(5)    # 删除(不存在不报错)
```

### 集合运算

| 运算 | 符号 | 方法 | 说明 |
|------|------|------|------|
| 并集 | `\|` | `union()` | 所有元素 |
| 交集 | `&` | `intersection()` | 共有元素 |
| 差集 | `-` | `difference()` | A有B无 |
| 对称差 | `^` | `symmetric_difference()` | 不共有 |

```python
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

print(A | B)  # {1,2,3,4,5,6} 并集
print(A & B)  # {3,4} 交集
print(A - B)  # {1,2} 差集
print(A ^ B)  # {1,2,5,6} 对称差
```

---

## 8. 类型转换

### 转换函数表

| 函数 | 说明 | 示例 |
|------|------|------|
| `int(x)` | 转整数 | `int("42")` → `42` |
| `float(x)` | 转浮点 | `float(10)` → `10.0` |
| `str(x)` | 转字符串 | `str(42)` → `"42"` |
| `bool(x)` | 转布尔 | `bool(0)` → `False` |
| `list(x)` | 转列表 | `list((1,2))` → `[1,2]` |
| `tuple(x)` | 转元组 | `tuple([1,2])` → `(1,2)` |
| `set(x)` | 转集合 | `set([1,1,2])` → `{1,2}` |

### 常用转换

```python
# 数值转换
int(3.14)       # 3
float(10)       # 10.0
str(42)         # "42"

# 序列转换
list("hello")   # ['h','e','l','l','o']
tuple([1,2,3])  # (1,2,3)
set([1,2,2,3])  # {1,2,3}

# 字符串分割与合并
"a,b,c".split(",")  # ['a','b','c']
",".join(['a','b']) # "a,b"
```

---

## 9. 深拷贝与浅拷贝

### 对比表

| 方式 | 方法 | 内层对象 | 场景 |
|------|------|----------|------|
| 赋值 | `b=a` | 共享 | 引用 |
| 浅拷贝 | `b=a.copy()` | 共享 | 单层 |
| 深拷贝 | `b=copy.deepcopy(a)` | 独立 | 嵌套 |

### 示例

```python
import copy

# 赋值(引用)
a = [1, 2, 3]
b = a
b[0] = 100
print(a)  # [100,2,3] a也变了

# 浅拷贝
a = [1, 2, 3]
b = a.copy()
b[0] = 100
print(a)  # [1,2,3] a没变

# 嵌套列表问题
a = [[1,2], [3,4]]
b = a.copy()
b[0][0] = 100
print(a)  # [[100,2],[3,4]] 内层共享

# 深拷贝
a = [[1,2], [3,4]]
b = copy.deepcopy(a)
b[0][0] = 100
print(a)  # [[1,2],[3,4]] 完全独立
```

---

## 10. 完整示例

### 示例1: 学生成绩管理

```python
students = {
    "张三": {"数学": 90, "英语": 85, "物理": 88},
    "李四": {"数学": 78, "英语": 92, "物理": 80},
    "王五": {"数学": 95, "英语": 88, "物理": 91}
}

# 计算平均分
for name, scores in students.items():
    avg = sum(scores.values()) / len(scores)
    print(f"{name}: {avg:.2f}")

# 输出:
# 张三: 87.67
# 李四: 83.33
# 王五: 91.33
```

### 示例2: 词频统计

```python
text = "hello world hello python python python"
words = text.split()

word_count = {}
for word in words:
    word_count[word] = word_count.get(word, 0) + 1

print(word_count)
# {'hello': 2, 'world': 1, 'python': 3}
```

### 示例3: 去重并排序

```python
numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]

# 使用集合去重
unique = sorted(set(numbers))
print(unique)  # [1, 2, 3, 4, 5, 6, 9]
```

---

## 知识点总结

### 核心概念

| 类型 | 可变性 | 有序性 | 常用场景 |
|------|--------|--------|----------|
| 列表 | 可变 | 有序 | 动态数据集合 |
| 元组 | 不可变 | 有序 | 固定数据、字典键 |
| 字典 | 可变 | 有序 | 键值对映射 |
| 集合 | 可变 | 无序 | 去重、集合运算 |

### 对比: Python vs C++

| 特性 | Python | C++ |
|------|--------|-----|
| 列表 | `list` 动态 | `vector` 需指定类型 |
| 字典 | `dict` 内置 | `map` STL容器 |
| 集合 | `set` 内置 | `set` STL容器 |
| 字符串 | 不可变 | 可变(`string`) |
| 类型 | 动态推导 | 静态声明 |

---

## 练习题

1. 创建列表`[1,2,3,4,5]`,实现反转、排序、去重操作
2. 统计字符串`"hello world"`中每个字符出现次数
3. 合并两个字典:`d1={'a':1,'b':2}`, `d2={'b':3,'c':4}`
4. 找出两个列表的交集、并集、差集
5. 将嵌套列表`[[1,2],[3,4],[5,6]]`展开为一维列表

---

[← 上一章: 基础入门](01-basics.md) | [下一章: 控制流 →](03-control-flow.md)
