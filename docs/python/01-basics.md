# Python 基础入门

## 1. Python 简介

### 语言特点

| 特性 | 说明 |
|------|------|
| 解释型语言 | 无需编译,逐行执行 |
| 动态类型 | 变量无需声明类型 |
| 高级语言 | 接近人类语言,易读易写 |
| 跨平台 | Windows/Linux/macOS通用 |
| 丰富的库 | 标准库+第三方库生态完善 |

### 应用领域

- Web开发 (Django, Flask)
- 数据分析 (Pandas, NumPy)
- 人工智能 (TensorFlow, PyTorch)
- 自动化脚本
- 科学计算

---

## 2. 环境搭建

### 安装Python

```bash
# 检查Python版本
python --version
python3 --version

# Windows: 从python.org下载安装包
# Linux: sudo apt install python3
# macOS: brew install python3
```

### 交互式解释器

```python
# 启动交互式环境
$ python3

>>> print("Hello, Python!")
Hello, Python!

>>> 2 + 3
5

>>> exit()  # 退出
```

### 运行Python文件

```bash
# 创建文件 hello.py
# 执行文件
python3 hello.py
```

---

## 3. 第一个程序

```python
# hello.py
print("Hello, World!")
```

**输出**:
```
Hello, World!
```

### 代码说明

| 元素 | 说明 |
|------|------|
| `#` | 单行注释 |
| `print()` | 输出函数 |
| `"..."` | 字符串字面量 |

---

## 4. 基本语法

### 缩进规则

```python
# ✓ 正确: 使用4个空格缩进
if True:
    print("正确的缩进")

# ✗ 错误: 缩进不一致
if True:
  print("错误")  # 2个空格
    print("错误")  # 4个空格
```

### 语句结束

```python
# Python不需要分号结束语句
print("语句1")
print("语句2")

# 同一行多条语句用分号分隔(不推荐)
x = 1; y = 2; print(x + y)
```

### 续行

```python
# 方法1: 反斜杠
total = 1 + 2 + 3 + \
        4 + 5 + 6

# 方法2: 括号内自动续行
total = (1 + 2 + 3 +
         4 + 5 + 6)
```

---

## 5. 变量与命名

### 变量赋值

```python
# 基本赋值
x = 10
name = "Python"
is_valid = True

# 多重赋值
a, b, c = 1, 2, 3

# 链式赋值
x = y = z = 0

# 交换变量
a, b = b, a
```

### 命名规则

| 规则 | 说明 | 示例 |
|------|------|------|
| 字母/数字/下划线 | 只能包含这三种 | `my_var`, `data2` |
| 不能以数字开头 | 首字符必须是字母或下划线 | `_temp`, `value` |
| 区分大小写 | `Age` ≠ `age` | - |
| 不能使用关键字 | `if`, `for`, `while`等 | - |
| 使用snake_case | 小写+下划线 | `user_name` |

### Python关键字

```python
# 查看所有关键字
import keyword
print(keyword.kwlist)

# 输出:
# ['False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 
#  'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 
#  'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 
#  'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 
#  'try', 'while', 'with', 'yield']
```

---

## 6. 数据类型概览

### 基本类型

| 类型 | 名称 | 示例 | 说明 |
|------|------|------|------|
| `int` | 整数 | `42`, `-10` | 无大小限制 |
| `float` | 浮点数 | `3.14`, `-0.5` | 双精度 |
| `str` | 字符串 | `"hello"`, `'world'` | 不可变 |
| `bool` | 布尔值 | `True`, `False` | 逻辑类型 |

### 类型查询

```python
# type() 查询类型
print(type(42))         # <class 'int'>
print(type(3.14))       # <class 'float'>
print(type("hello"))    # <class 'str'>
print(type(True))       # <class 'bool'>

# isinstance() 类型检查
print(isinstance(42, int))        # True
print(isinstance(3.14, float))    # True
```

---

## 7. 运算符

### 算术运算符

| 运算符 | 说明 | 示例 | 结果 |
|--------|------|------|------|
| `+` | 加法 | `5 + 3` | `8` |
| `-` | 减法 | `5 - 3` | `2` |
| `*` | 乘法 | `5 * 3` | `15` |
| `/` | 除法(浮点) | `5 / 2` | `2.5` |
| `//` | 整除 | `5 // 2` | `2` |
| `%` | 取余 | `5 % 2` | `1` |
| `**` | 幂运算 | `2 ** 3` | `8` |

```python
# 算术运算示例
a = 10
b = 3

print(a + b)   # 13
print(a - b)   # 7
print(a * b)   # 30
print(a / b)   # 3.3333...
print(a // b)  # 3
print(a % b)   # 1
print(a ** b)  # 1000
```

### 比较运算符

| 运算符 | 说明 | 示例 | 结果 |
|--------|------|------|------|
| `==` | 等于 | `5 == 5` | `True` |
| `!=` | 不等于 | `5 != 3` | `True` |
| `>` | 大于 | `5 > 3` | `True` |
| `<` | 小于 | `5 < 3` | `False` |
| `>=` | 大于等于 | `5 >= 5` | `True` |
| `<=` | 小于等于 | `5 <= 3` | `False` |

```python
# 比较运算示例
x = 10
y = 20

print(x == y)   # False
print(x != y)   # True
print(x > y)    # False
print(x < y)    # True
print(x >= 10)  # True
print(y <= 20)  # True
```

### 赋值运算符

| 运算符 | 等价于 | 示例 |
|--------|--------|------|
| `=` | - | `x = 5` |
| `+=` | `x = x + 5` | `x += 5` |
| `-=` | `x = x - 5` | `x -= 5` |
| `*=` | `x = x * 5` | `x *= 5` |
| `/=` | `x = x / 5` | `x /= 5` |
| `//=` | `x = x // 5` | `x //= 5` |
| `%=` | `x = x % 5` | `x %= 5` |
| `**=` | `x = x ** 5` | `x **= 5` |

```python
# 赋值运算示例
x = 10

x += 5   # x = x + 5  →  x = 15
x -= 3   # x = x - 3  →  x = 12
x *= 2   # x = x * 2  →  x = 24
x /= 4   # x = x / 4  →  x = 6.0
```

---

## 8. 输入与输出

### 输出 print()

```python
# 基本输出
print("Hello")
print(42)

# 多个值输出
print("a =", 10, "b =", 20)  # a = 10 b = 20

# 指定分隔符
print(1, 2, 3, sep='-')  # 1-2-3

# 指定结束符
print("Hello", end=' ')
print("World")  # Hello World

# 格式化输出
name = "Alice"
age = 25
print(f"姓名: {name}, 年龄: {age}")  # f-string (Python 3.6+)
print("姓名: {}, 年龄: {}".format(name, age))  # format()
print("姓名: %s, 年龄: %d" % (name, age))  # % 格式化
```

### 输入 input()

```python
# 基本输入(返回字符串)
name = input("请输入姓名: ")
print("你好,", name)

# 输入数字(需要类型转换)
age = int(input("请输入年龄: "))
print("明年你", age + 1, "岁")

# 输入浮点数
height = float(input("请输入身高(m): "))
print("身高:", height, "米")
```

---

## 9. 代码风格 (PEP 8)

### 命名约定

| 类型 | 风格 | 示例 |
|------|------|------|
| 变量 | snake_case | `user_name`, `total_count` |
| 常量 | UPPER_CASE | `MAX_SIZE`, `PI` |
| 函数 | snake_case | `get_data()`, `calculate_total()` |
| 类 | PascalCase | `MyClass`, `UserData` |

### 空格使用

```python
# ✓ 正确
x = 1
y = x + 2
data = [1, 2, 3]

# ✗ 错误
x=1          # 赋值运算符两边无空格
y = x+2      # 算术运算符两边无空格
data=[1,2,3] # 逗号后无空格
```

### 空行使用

```python
# 顶层函数/类之间空两行
def function1():
    pass


def function2():
    pass


# 类方法之间空一行
class MyClass:
    def method1(self):
        pass
    
    def method2(self):
        pass
```

---

## 10. 常见错误

### 语法错误

```python
# NameError: 使用未定义的变量
print(x)  # x未定义

# SyntaxError: 语法错误
if True
    print("missing colon")  # 缺少冒号

# IndentationError: 缩进错误
if True:
print("wrong indent")  # 缩进错误
```

### 类型错误

```python
# TypeError: 类型不匹配
result = "10" + 5  # 字符串不能与数字相加

# 正确做法
result = int("10") + 5  # 15
result = "10" + str(5)  # "105"
```

---

## 11. 完整示例

### 示例1: 计算圆面积

```python
# 输入半径,计算面积
PI = 3.14159

radius = float(input("请输入半径: "))
area = PI * radius ** 2

print(f"圆的面积为: {area:.2f}")
```

### 示例2: 温度转换

```python
# 摄氏度转华氏度
celsius = float(input("请输入摄氏温度: "))
fahrenheit = celsius * 9 / 5 + 32

print(f"{celsius}°C = {fahrenheit}°F")
```

### 示例3: 计算平均分

```python
# 输入三门成绩,计算平均分
math = float(input("数学成绩: "))
english = float(input("英语成绩: "))
physics = float(input("物理成绩: "))

average = (math + english + physics) / 3

print(f"平均分: {average:.2f}")
```

---

## 12. 知识点总结

### 核心概念

| 概念 | 要点 |
|------|------|
| 缩进 | 4个空格,表示代码块 |
| 变量 | 动态类型,无需声明 |
| 命名 | snake_case,不能以数字开头 |
| 运算符 | `+`, `-`, `*`, `/`, `//`, `%`, `**` |
| 输入输出 | `input()`, `print()` |
| 类型转换 | `int()`, `float()`, `str()` |

### 对比: Python vs C++

| 特性 | Python | C++ |
|------|--------|-----|
| 变量声明 | 不需要 | 需要指定类型 |
| 分号 | 不需要 | 必需 |
| 缩进 | 语法要求 | 仅为美观 |
| 编译 | 解释执行 | 编译后执行 |
| 整除 | `//` | `/`(整数除整数) |

---

## 练习题

1. 编写程序,输入两个数,输出它们的和、差、积、商
2. 计算矩形的周长和面积(输入长和宽)
3. 输入年份,判断是否为闰年(提示: 能被4整除但不能被100整除,或能被400整除)
4. 交换两个变量的值(不使用第三个变量)
5. 将秒数转换为时:分:秒格式(如3665秒 → 1:1:5)

---

[下一章: 数据类型 →](02-data-types.md)
