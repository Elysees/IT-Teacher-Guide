# Python 函数

## 目录
1. [函数定义与调用](#1-函数定义与调用)
2. [参数传递](#2-参数传递)
3. [返回值](#3-返回值)
4. [变量作用域](#4-变量作用域)
5. [Lambda函数](#5-lambda函数)
6. [递归函数](#6-递归函数)
7. [内置函数](#7-内置函数)
8. [完整示例](#8-完整示例)

---

## 1. 函数定义与调用

### 基本语法

```python
# 定义函数
def 函数名(参数列表):
    """文档字符串(可选)"""
    函数体
    return 返回值
```

### 简单函数

```python
# 无参数无返回值
def greet():
    print("Hello, World!")

greet()  # 调用函数

# 有参数有返回值
def add(a, b):
    """计算两数之和"""
    return a + b

result = add(3, 5)
print(result)  # 8
```

### 文档字符串

```python
def calculate_area(radius):
    """
    计算圆的面积
    
    参数:
        radius: 圆的半径
    
    返回:
        圆的面积
    """
    return 3.14159 * radius ** 2

# 查看文档
print(calculate_area.__doc__)
help(calculate_area)
```

---

## 2. 参数传递

### 位置参数

```python
def power(base, exponent):
    """计算base的exponent次方"""
    return base ** exponent

print(power(2, 3))   # 8
print(power(3, 2))   # 9 (顺序很重要)
```

### 关键字参数

```python
def introduce(name, age, city):
    print(f"我叫{name},今年{age}岁,来自{city}")

# 使用关键字参数(顺序无关)
introduce(name="Alice", age=25, city="Beijing")
introduce(city="Shanghai", name="Bob", age=30)

# 混合使用(位置参数必须在前)
introduce("Charlie", age=35, city="Guangzhou")
```

### 默认参数

```python
def greet(name, greeting="你好"):
    """打招呼,默认问候语为'你好'"""
    print(f"{greeting}, {name}!")

greet("Alice")              # 你好, Alice!
greet("Bob", "Hello")       # Hello, Bob!
greet("Charlie", greeting="Hi")  # Hi, Charlie!
```

### 可变位置参数 (*args)

```python
def sum_all(*numbers):
    """计算任意个数的和"""
    total = 0
    for num in numbers:
        total += num
    return total

print(sum_all(1, 2, 3))           # 6
print(sum_all(1, 2, 3, 4, 5))     # 15
print(sum_all())                   # 0

# args是一个元组
def print_args(*args):
    print(type(args))  # <class 'tuple'>
    print(args)

print_args(1, 2, 3)  # (1, 2, 3)
```

### 可变关键字参数 (**kwargs)

```python
def print_info(**info):
    """打印任意个键值对"""
    for key, value in info.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=25, city="Beijing")
# name: Alice
# age: 25
# city: Beijing

# kwargs是一个字典
def show_kwargs(**kwargs):
    print(type(kwargs))  # <class 'dict'>
    print(kwargs)

show_kwargs(a=1, b=2, c=3)  # {'a': 1, 'b': 2, 'c': 3}
```

### 参数组合

```python
# 参数顺序: 位置参数 → 默认参数 → *args → **kwargs
def complex_function(a, b, c=0, *args, **kwargs):
    print(f"a={a}, b={b}, c={c}")
    print(f"args={args}")
    print(f"kwargs={kwargs}")

complex_function(1, 2)
# a=1, b=2, c=0
# args=()
# kwargs={}

complex_function(1, 2, 3, 4, 5, x=10, y=20)
# a=1, b=2, c=3
# args=(4, 5)
# kwargs={'x': 10, 'y': 20}
```

### 参数类型对照表

| 参数类型 | 语法 | 接收 | 示例 |
|----------|------|------|------|
| 位置参数 | `def f(a, b)` | 按顺序 | `f(1, 2)` |
| 关键字参数 | `def f(a, b)` | 按名称 | `f(a=1, b=2)` |
| 默认参数 | `def f(a=0)` | 可选 | `f()` 或 `f(1)` |
| 可变位置 | `def f(*args)` | 元组 | `f(1, 2, 3)` |
| 可变关键字 | `def f(**kwargs)` | 字典 | `f(a=1, b=2)` |

---

## 3. 返回值

### 单个返回值

```python
def square(x):
    return x ** 2

result = square(5)
print(result)  # 25
```

### 多个返回值

```python
def divide(a, b):
    """返回商和余数"""
    quotient = a // b
    remainder = a % b
    return quotient, remainder  # 返回元组

q, r = divide(17, 5)
print(f"商: {q}, 余数: {r}")  # 商: 3, 余数: 2

# 也可以作为元组接收
result = divide(17, 5)
print(result)  # (3, 2)
```

### 无返回值

```python
# 不写return或return后无值,返回None
def print_message(msg):
    print(msg)
    # 隐式return None

result = print_message("Hello")
print(result)  # None
```

### 条件返回

```python
def absolute_value(x):
    """计算绝对值"""
    if x >= 0:
        return x
    else:
        return -x

print(absolute_value(5))   # 5
print(absolute_value(-5))  # 5
```

---

## 4. 变量作用域

### 局部变量

```python
def my_function():
    x = 10  # 局部变量
    print(x)

my_function()  # 10
# print(x)  # NameError: name 'x' is not defined
```

### 全局变量

```python
x = 10  # 全局变量

def my_function():
    print(x)  # 可以访问全局变量

my_function()  # 10
```

### global 关键字

```python
x = 10

def modify_global():
    global x  # 声明使用全局变量
    x = 20    # 修改全局变量

print(x)  # 10
modify_global()
print(x)  # 20
```

### nonlocal 关键字

```python
def outer():
    x = 10
    
    def inner():
        nonlocal x  # 声明使用外层函数的变量
        x = 20
    
    print(f"调用inner前: x={x}")
    inner()
    print(f"调用inner后: x={x}")

outer()
# 调用inner前: x=10
# 调用inner后: x=20
```

### 作用域查找顺序 (LEGB)

| 顺序 | 名称 | 说明 |
|------|------|------|
| L | Local | 局部作用域 |
| E | Enclosing | 嵌套函数外层 |
| G | Global | 全局作用域 |
| B | Built-in | 内置作用域 |

```python
x = "global"

def outer():
    x = "enclosing"
    
    def inner():
        x = "local"
        print(x)  # local
    
    inner()
    print(x)  # enclosing

outer()
print(x)  # global
```

---

## 5. Lambda函数

### 基本语法

```python
# 语法: lambda 参数: 表达式
# 等价于简单函数

# 普通函数
def add(x, y):
    return x + y

# Lambda函数
add_lambda = lambda x, y: x + y

print(add(3, 5))         # 8
print(add_lambda(3, 5))  # 8
```

### 常见用法

```python
# 单参数
square = lambda x: x ** 2
print(square(5))  # 25

# 多参数
multiply = lambda x, y: x * y
print(multiply(3, 4))  # 12

# 无参数
greet = lambda: "Hello!"
print(greet())  # Hello!

# 条件表达式
max_value = lambda a, b: a if a > b else b
print(max_value(10, 20))  # 20
```

### 与内置函数配合

```python
# map: 对序列每个元素应用函数
numbers = [1, 2, 3, 4, 5]
squares = list(map(lambda x: x**2, numbers))
print(squares)  # [1, 4, 9, 16, 25]

# filter: 过滤序列
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [2, 4]

# sorted: 自定义排序
students = [("Alice", 85), ("Bob", 92), ("Charlie", 78)]
sorted_by_score = sorted(students, key=lambda x: x[1])
print(sorted_by_score)
# [('Charlie', 78), ('Alice', 85), ('Bob', 92)]
```

---

## 6. 递归函数

### 基本概念

递归函数: 函数调用自身

**要素**:
1. 基准条件(终止条件)
2. 递归调用(向基准条件靠近)

### 阶乘计算

```python
def factorial(n):
    """计算n的阶乘"""
    # 基准条件
    if n == 0 or n == 1:
        return 1
    
    # 递归调用
    return n * factorial(n - 1)

print(factorial(5))  # 120 (5*4*3*2*1)
```

### 斐波那契数列

```python
def fibonacci(n):
    """计算第n个斐波那契数"""
    # 基准条件
    if n <= 1:
        return n
    
    # 递归调用
    return fibonacci(n-1) + fibonacci(n-2)

# 打印前10个
for i in range(10):
    print(fibonacci(i), end=" ")
# 0 1 1 2 3 5 8 13 21 34
```

### 递归遍历

```python
def sum_list(lst):
    """递归计算列表元素之和"""
    # 基准条件
    if not lst:
        return 0
    
    # 递归调用
    return lst[0] + sum_list(lst[1:])

print(sum_list([1, 2, 3, 4, 5]))  # 15
```

### 递归优化 - 尾递归

```python
# 普通递归(效率低)
def factorial_normal(n):
    if n == 1:
        return 1
    return n * factorial_normal(n - 1)

# 尾递归(优化)
def factorial_tail(n, acc=1):
    if n == 1:
        return acc
    return factorial_tail(n - 1, n * acc)

print(factorial_tail(5))  # 120
```

---

## 7. 内置函数

### 数学函数

| 函数 | 说明 | 示例 |
|------|------|------|
| `abs(x)` | 绝对值 | `abs(-5)` → `5` |
| `pow(x, y)` | 幂运算 | `pow(2, 3)` → `8` |
| `round(x, n)` | 四舍五入 | `round(3.14, 1)` → `3.1` |
| `max(...)` | 最大值 | `max(1, 5, 3)` → `5` |
| `min(...)` | 最小值 | `min(1, 5, 3)` → `1` |
| `sum(iterable)` | 求和 | `sum([1,2,3])` → `6` |

### 类型转换

| 函数 | 说明 | 示例 |
|------|------|------|
| `int(x)` | 转整数 | `int("42")` → `42` |
| `float(x)` | 转浮点 | `float(10)` → `10.0` |
| `str(x)` | 转字符串 | `str(42)` → `"42"` |
| `bool(x)` | 转布尔 | `bool(0)` → `False` |
| `list(x)` | 转列表 | `list((1,2))` → `[1,2]` |

### 序列操作

| 函数 | 说明 | 示例 |
|------|------|------|
| `len(s)` | 长度 | `len([1,2,3])` → `3` |
| `sorted(s)` | 排序 | `sorted([3,1,2])` → `[1,2,3]` |
| `reversed(s)` | 反转 | `list(reversed([1,2,3]))` → `[3,2,1]` |
| `enumerate(s)` | 枚举 | `list(enumerate(['a','b']))` → `[(0,'a'),(1,'b')]` |
| `zip(s1, s2)` | 打包 | `list(zip([1,2],['a','b']))` → `[(1,'a'),(2,'b')]` |

### 高阶函数

```python
# map: 映射
numbers = [1, 2, 3, 4, 5]
squares = list(map(lambda x: x**2, numbers))
print(squares)  # [1, 4, 9, 16, 25]

# filter: 过滤
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [2, 4]

# reduce: 累积(需要导入)
from functools import reduce
product = reduce(lambda x, y: x * y, numbers)
print(product)  # 120 (1*2*3*4*5)
```

---

## 8. 完整示例

### 示例1: 计算器

```python
def calculator():
    """简单计算器"""
    def add(a, b):
        return a + b
    
    def subtract(a, b):
        return a - b
    
    def multiply(a, b):
        return a * b
    
    def divide(a, b):
        if b == 0:
            return "错误: 除数不能为0"
        return a / b
    
    print("简单计算器")
    print("1. 加法  2. 减法  3. 乘法  4. 除法")
    
    choice = input("选择操作(1-4): ")
    a = float(input("输入第一个数: "))
    b = float(input("输入第二个数: "))
    
    operations = {
        '1': add,
        '2': subtract,
        '3': multiply,
        '4': divide
    }
    
    if choice in operations:
        result = operations[choice](a, b)
        print(f"结果: {result}")
    else:
        print("无效的选择")

# calculator()  # 取消注释以运行
```

### 示例2: 装饰器(高级)

```python
def timer_decorator(func):
    """计时装饰器"""
    import time
    
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__}执行时间: {end-start:.4f}秒")
        return result
    
    return wrapper

@timer_decorator
def slow_function():
    """模拟耗时操作"""
    import time
    time.sleep(1)
    return "完成"

result = slow_function()
# slow_function执行时间: 1.0001秒
```

### 示例3: 菜单系统

```python
def show_menu():
    """显示菜单"""
    print("\n" + "="*30)
    print("学生管理系统")
    print("="*30)
    print("1. 添加学生")
    print("2. 查看所有学生")
    print("3. 查找学生")
    print("4. 删除学生")
    print("5. 退出")
    print("="*30)

def add_student(students):
    """添加学生"""
    name = input("姓名: ")
    age = int(input("年龄: "))
    score = float(input("成绩: "))
    students.append({"name": name, "age": age, "score": score})
    print(f"成功添加学生: {name}")

def view_students(students):
    """查看所有学生"""
    if not students:
        print("暂无学生记录")
        return
    
    print("\n所有学生:")
    for i, s in enumerate(students, 1):
        print(f"{i}. {s['name']} - 年龄:{s['age']}, 成绩:{s['score']}")

def main():
    """主函数"""
    students = []
    
    while True:
        show_menu()
        choice = input("请选择(1-5): ")
        
        if choice == '1':
            add_student(students)
        elif choice == '2':
            view_students(students)
        elif choice == '5':
            print("感谢使用!")
            break
        else:
            print("无效选择,请重试")

# main()  # 取消注释以运行
```

---

## 知识点总结

### 函数参数类型

| 类型 | 定义 | 调用 | 特点 |
|------|------|------|------|
| 位置参数 | `def f(a, b)` | `f(1, 2)` | 按顺序匹配 |
| 默认参数 | `def f(a=0)` | `f()` | 可省略 |
| 可变位置 | `def f(*args)` | `f(1,2,3)` | 元组 |
| 可变关键字 | `def f(**kw)` | `f(a=1)` | 字典 |

### 函数设计原则

1. **单一职责**: 一个函数只做一件事
2. **命名清晰**: 函数名描述功能
3. **参数合理**: 参数不宜过多(建议≤5个)
4. **文档完整**: 添加文档字符串
5. **避免副作用**: 尽量不修改全局变量

### 对比: Python vs C++

| 特性 | Python | C++ |
|------|--------|-----|
| 定义 | `def f():` | `void f() {}` |
| 类型声明 | 不需要 | 需要(返回值+参数) |
| 默认参数 | 支持 | 支持 |
| 可变参数 | `*args` | 模板/可变参数模板 |
| Lambda | `lambda x: x*2` | `[](int x){return x*2;}` |
| 递归 | 支持(有栈限制) | 支持 |

---

## 练习题

1. 编写函数判断一个数是否为素数
2. 实现一个函数,接收任意个数字,返回它们的平均值
3. 编写递归函数计算列表元素之和
4. 使用Lambda函数对字典列表按某个键排序
5. 实现一个装饰器,统计函数被调用的次数
6. 编写函数实现冒泡排序
7. 实现一个函数,接收字符串,返回其反转
8. 编写递归函数遍历嵌套列表并展平
9. 实现一个缓存装饰器(记忆化)
10. 编写函数生成指定长度的随机密码

---
