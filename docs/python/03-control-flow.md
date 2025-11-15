# Python 控制流

[← 上一章: 数据类型](02-data-types.md) | [下一章: 函数 →](04-functions.md)

## 目录
1. [条件语句](#1-条件语句)
2. [逻辑运算符](#2-逻辑运算符)
3. [for循环](#3-for循环)
4. [while循环](#4-while循环)
5. [跳转语句](#5-跳转语句)
6. [嵌套结构](#6-嵌套结构)
7. [完整示例](#7-完整示例)

---

## 1. 条件语句

### if 语句

```python
# 基本形式
age = 18
if age >= 18:
    print("成年人")

# if-else
if age >= 18:
    print("成年人")
else:
    print("未成年人")

# if-elif-else
score = 85
if score >= 90:
    print("优秀")
elif score >= 80:
    print("良好")
elif score >= 60:
    print("及格")
else:
    print("不及格")
```

### 语法格式

```python
if 条件1:
    语句块1
elif 条件2:
    语句块2
elif 条件3:
    语句块3
else:
    语句块4
```

### 三元表达式

```python
# 语法: 值1 if 条件 else 值2
age = 20
status = "成年" if age >= 18 else "未成年"
print(status)  # "成年"

# 等价于
if age >= 18:
    status = "成年"
else:
    status = "未成年"

# 嵌套三元表达式
score = 85
level = "优秀" if score >= 90 else ("良好" if score >= 80 else "及格")
```

### 条件表达式

| 运算符 | 说明 | 示例 |
|--------|------|------|
| `==` | 等于 | `x == 5` |
| `!=` | 不等于 | `x != 5` |
| `>` | 大于 | `x > 5` |
| `<` | 小于 | `x < 5` |
| `>=` | 大于等于 | `x >= 5` |
| `<=` | 小于等于 | `x <= 5` |
| `in` | 包含 | `x in [1,2,3]` |
| `not in` | 不包含 | `x not in [1,2,3]` |
| `is` | 身份 | `x is None` |
| `is not` | 非身份 | `x is not None` |

```python
# 比较运算
x = 10
print(x == 10)  # True
print(x != 5)   # True
print(x > 5)    # True

# 成员运算
print(3 in [1, 2, 3])      # True
print('a' in "hello")      # False
print('key' in {"key": 1}) # True

# 身份运算
a = None
print(a is None)     # True
print(a is not None) # False
```

---

## 2. 逻辑运算符

### 基本逻辑运算

| 运算符 | 说明 | 示例 | 结果 |
|--------|------|------|------|
| `and` | 与 | `True and False` | `False` |
| `or` | 或 | `True or False` | `True` |
| `not` | 非 | `not True` | `False` |

```python
# and: 两个都为True才为True
print(True and True)   # True
print(True and False)  # False
print(False and False) # False

# or: 有一个为True就为True
print(True or True)    # True
print(True or False)   # True
print(False or False)  # False

# not: 取反
print(not True)   # False
print(not False)  # True
```

### 短路求值

```python
# and: 第一个为False时不计算第二个
x = 0
y = 5 / x if False and x != 0 else 0  # 不会报错

# or: 第一个为True时不计算第二个
result = True or (1 / 0)  # 不会报错
```

### 组合条件

```python
age = 20
score = 85

# 多条件判断
if age >= 18 and score >= 60:
    print("合格")

# 复杂条件
if (age >= 18 and score >= 60) or (age < 18 and score >= 80):
    print("通过")

# 链式比较
x = 10
if 0 < x < 20:  # 等价于 0 < x and x < 20
    print("x在0到20之间")
```

### 真值测试

```python
# False值: False, 0, 0.0, "", [], (), {}, None
# 其他都是True值

if "":          # False
    print("空字符串")
    
if []:          # False
    print("空列表")
    
if 0:           # False
    print("零")
    
if "hello":     # True
    print("非空字符串")
    
if [1, 2]:      # True
    print("非空列表")
```

---

## 3. for循环

### 基本用法

```python
# 遍历列表
fruits = ["苹果", "香蕉", "橙子"]
for fruit in fruits:
    print(fruit)

# 遍历字符串
for char in "Python":
    print(char)

# 遍历字典
person = {"name": "Alice", "age": 25}
for key in person:
    print(key, person[key])

for key, value in person.items():
    print(f"{key}: {value}")
```

### range() 函数

```python
# range(stop): 0到stop-1
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# range(start, stop): start到stop-1
for i in range(2, 7):
    print(i)  # 2, 3, 4, 5, 6

# range(start, stop, step): 指定步长
for i in range(0, 10, 2):
    print(i)  # 0, 2, 4, 6, 8

# 倒序
for i in range(10, 0, -1):
    print(i)  # 10, 9, 8, ..., 1
```

### enumerate() 函数

```python
# 同时获取索引和值
fruits = ["苹果", "香蕉", "橙子"]

for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# 输出:
# 0: 苹果
# 1: 香蕉
# 2: 橙子

# 指定起始索引
for index, fruit in enumerate(fruits, start=1):
    print(f"{index}: {fruit}")
# 1: 苹果
# 2: 香蕉
# 3: 橙子
```

### zip() 函数

```python
# 并行遍历多个序列
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]
cities = ["Beijing", "Shanghai", "Guangzhou"]

for name, age, city in zip(names, ages, cities):
    print(f"{name}, {age}岁, 来自{city}")

# 输出:
# Alice, 25岁, 来自Beijing
# Bob, 30岁, 来自Shanghai
# Charlie, 35岁, 来自Guangzhou
```

### 列表推导式

```python
# 基本形式
squares = [x**2 for x in range(5)]
# [0, 1, 4, 9, 16]

# 带条件
evens = [x for x in range(10) if x % 2 == 0]
# [0, 2, 4, 6, 8]

# 嵌套
matrix = [[i*3+j for j in range(3)] for i in range(3)]
# [[0, 1, 2], [3, 4, 5], [6, 7, 8]]

# 字符串处理
words = ["hello", "world", "python"]
upper_words = [w.upper() for w in words]
# ['HELLO', 'WORLD', 'PYTHON']
```

---

## 4. while循环

### 基本用法

```python
# 基本形式
count = 0
while count < 5:
    print(count)
    count += 1

# 输出: 0, 1, 2, 3, 4
```

### while-else 结构

```python
# else在循环正常结束时执行
count = 0
while count < 3:
    print(count)
    count += 1
else:
    print("循环结束")

# 输出: 0, 1, 2, 循环结束
```

### 无限循环

```python
# 无限循环(需要break跳出)
while True:
    user_input = input("输入'quit'退出: ")
    if user_input == 'quit':
        break
    print(f"你输入了: {user_input}")
```

### 条件控制

```python
# 计数器
i = 0
while i < 10:
    i += 1
    if i % 2 == 0:
        continue  # 跳过偶数
    print(i)

# 输出: 1, 3, 5, 7, 9
```

---

## 5. 跳转语句

### break - 跳出循环

```python
# 在循环中遇到break立即退出
for i in range(10):
    if i == 5:
        break
    print(i)

# 输出: 0, 1, 2, 3, 4

# 在嵌套循环中只跳出内层循环
for i in range(3):
    for j in range(3):
        if j == 1:
            break
        print(f"i={i}, j={j}")
```

### continue - 跳过本次循环

```python
# 跳过当前迭代,继续下一次
for i in range(5):
    if i == 2:
        continue
    print(i)

# 输出: 0, 1, 3, 4

# 跳过偶数
for i in range(10):
    if i % 2 == 0:
        continue
    print(i)

# 输出: 1, 3, 5, 7, 9
```

### pass - 空操作

```python
# pass是占位符,什么都不做
for i in range(5):
    if i == 2:
        pass  # 占位,以后实现
    else:
        print(i)

# 用于定义空函数
def empty_function():
    pass

# 用于定义空类
class EmptyClass:
    pass
```

### 对比表

| 语句 | 作用 | 使用场景 |
|------|------|----------|
| `break` | 退出循环 | 满足条件立即结束 |
| `continue` | 跳过本次迭代 | 跳过特定情况 |
| `pass` | 什么都不做 | 占位符 |

---

## 6. 嵌套结构

### 嵌套循环

```python
# 二重循环
for i in range(3):
    for j in range(3):
        print(f"({i},{j})", end=" ")
    print()  # 换行

# 输出:
# (0,0) (0,1) (0,2)
# (1,0) (1,1) (1,2)
# (2,0) (2,1) (2,2)

# 九九乘法表
for i in range(1, 10):
    for j in range(1, i + 1):
        print(f"{j}×{i}={i*j}", end="\t")
    print()
```

### 嵌套条件

```python
age = 20
score = 85

if age >= 18:
    if score >= 60:
        print("成年且及格")
    else:
        print("成年但不及格")
else:
    if score >= 80:
        print("未成年但优秀")
    else:
        print("未成年且未达标")
```

### 循环中的条件

```python
# 打印1-10之间的奇数
for i in range(1, 11):
    if i % 2 == 1:
        print(i)

# 找出列表中的偶数
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = []
for num in numbers:
    if num % 2 == 0:
        evens.append(num)

print(evens)  # [2, 4, 6, 8, 10]
```

---

## 7. 完整示例

### 示例1: 猜数字游戏

```python
import random

# 生成1-100的随机数
target = random.randint(1, 100)
attempts = 0

print("猜数字游戏(1-100)")
while True:
    guess = int(input("请输入你的猜测: "))
    attempts += 1
    
    if guess < target:
        print("太小了!")
    elif guess > target:
        print("太大了!")
    else:
        print(f"恭喜!你猜对了!用了{attempts}次")
        break
```

### 示例2: 素数判断

```python
def is_prime(n):
    """判断n是否为素数"""
    if n < 2:
        return False
    
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    
    return True

# 打印1-50之间的所有素数
primes = []
for num in range(2, 51):
    if is_prime(num):
        primes.append(num)

print(f"1-50之间的素数: {primes}")
```

### 示例3: 成绩统计

```python
# 学生成绩列表
scores = [85, 92, 78, 90, 88, 76, 95, 89]

# 统计
total = 0
max_score = scores[0]
min_score = scores[0]
pass_count = 0

for score in scores:
    total += score
    
    if score > max_score:
        max_score = score
    
    if score < min_score:
        min_score = score
    
    if score >= 60:
        pass_count += 1

average = total / len(scores)
pass_rate = pass_count / len(scores) * 100

print(f"平均分: {average:.2f}")
print(f"最高分: {max_score}")
print(f"最低分: {min_score}")
print(f"及格率: {pass_rate:.1f}%")
```

### 示例4: 打印图形

```python
# 直角三角形
n = 5
for i in range(1, n + 1):
    print("*" * i)

# 输出:
# *
# **
# ***
# ****
# *****

# 等腰三角形
n = 5
for i in range(1, n + 1):
    print(" " * (n - i) + "*" * (2 * i - 1))

# 输出:
#     *
#    ***
#   *****
#  *******
# *********

# 菱形
n = 5
# 上半部分
for i in range(1, n + 1):
    print(" " * (n - i) + "*" * (2 * i - 1))

# 下半部分
for i in range(n - 1, 0, -1):
    print(" " * (n - i) + "*" * (2 * i - 1))
```

### 示例5: 列表去重

```python
# 保持顺序的去重
numbers = [1, 3, 2, 3, 4, 1, 5, 2, 6]
unique = []
seen = set()

for num in numbers:
    if num not in seen:
        unique.append(num)
        seen.add(num)

print(unique)  # [1, 3, 2, 4, 5, 6]
```

---

## 知识点总结

### 控制流语句对比

| 语句 | 用途 | 特点 |
|------|------|------|
| `if` | 条件判断 | 可嵌套,支持elif |
| `for` | 遍历序列 | 次数已知,可用range |
| `while` | 条件循环 | 次数未知,需手动控制 |
| `break` | 跳出循环 | 立即终止循环 |
| `continue` | 跳过迭代 | 继续下一次循环 |

### 循环选择指南

| 场景 | 推荐 | 原因 |
|------|------|------|
| 遍历列表/字符串 | `for` | 简洁,自动迭代 |
| 固定次数循环 | `for + range()` | 明确次数 |
| 条件未知循环 | `while` | 灵活,条件控制 |
| 用户输入循环 | `while True + break` | 持续接收输入 |

### 对比: Python vs C++

| 特性 | Python | C++ |
|------|--------|-----|
| if语句 | `if x:` | `if (x)` |
| for循环 | `for i in range(5):` | `for (int i=0; i<5; i++)` |
| while循环 | `while x:` | `while (x)` |
| switch | 无(用if-elif) | `switch-case` |
| 逻辑与 | `and` | `&&` |
| 逻辑或 | `or` | `\|\|` |
| 逻辑非 | `not` | `!` |

---

## 练习题

1. 判断一个年份是否为闰年(能被4整除但不能被100整除,或能被400整除)
2. 打印1-100之间所有3的倍数
3. 计算1+2+3+...+100的和
4. 找出列表中的最大值和最小值(不使用max/min函数)
5. 打印斐波那契数列的前20项
6. 判断一个字符串是否为回文串(正读反读都一样)
7. 使用循环实现阶乘计算(如5! = 5×4×3×2×1)
8. 打印1-100之间所有同时被3和5整除的数
9. 将列表`[1, 2, 3, 4, 5]`反转(不使用reverse方法)
10. 统计字符串中每个字符出现的次数

---

[← 上一章: 数据类型](02-data-types.md) | [下一章: 函数 →](04-functions.md)
