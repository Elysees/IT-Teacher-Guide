# C++ 基础入门

[← 上一章: Python常用模块](../python/06-common-modules.md) | [下一章: 数据类型与指针 →](02-data-types.md)

## 目录
1. [C++简介](#1-c简介)
2. [环境搭建](#2-环境搭建)
3. [第一个程序](#3-第一个程序)
4. [基本语法](#4-基本语法)
5. [变量与数据类型](#5-变量与数据类型)
6. [运算符](#6-运算符)
7. [输入输出](#7-输入输出)
8. [完整示例](#8-完整示例)

---

## 1. C++简介

### 语言特点

| 特性 | 说明 |
|------|------|
| 静态类型 | 编译时确定类型 |
| 编译型语言 | 编译为机器码执行 |
| 面向对象 | 支持封装、继承、多态 |
| 高性能 | 接近硬件,执行效率高 |
| 系统编程 | 可直接操作内存 |
| 向下兼容 | 兼容C语言 |

### 应用领域

- 系统软件 (操作系统、驱动程序)
- 游戏开发 (引擎、图形渲染)
- 高性能计算 (科学计算、金融)
- 嵌入式系统 (物联网、单片机)
- 图形界面 (桌面应用)

---

## 2. 环境搭建

### 编译器安装

```bash
# Windows
# 1. 安装MinGW-w64或Visual Studio
# 2. 或使用Code::Blocks、Dev-C++等IDE

# Linux (Ubuntu/Debian)
sudo apt update
sudo apt install build-essential
# 包含gcc, g++, make等工具

# macOS
xcode-select --install
# 或安装Xcode
```

### 编译运行

```bash
# 编译C++文件
g++ -o hello hello.cpp

# 运行可执行文件
./hello

# 编译选项
g++ -std=c++17 -Wall -O2 -o program program.cpp  # C++17标准,开启警告,优化
```

### IDE推荐

- **Visual Studio** (Windows) - 功能强大
- **Code::Blocks** (跨平台) - 轻量级
- **CLion** (跨平台) - 专业C++ IDE
- **VS Code** (跨平台) - 配置插件

---

## 3. 第一个程序

```cpp
#include <iostream>  // 包含输入输出库

int main() {         // 主函数
    std::cout << "Hello, World!" << std::endl;  // 输出
    return 0;        // 返回值
}
```

**编译运行**:
```bash
g++ -o hello hello.cpp
./hello
```

**输出**:
```
Hello, World!
```

### 代码说明

| 元素 | 说明 |
|------|------|
| `#include <iostream>` | 预处理指令,包含头文件 |
| `int main()` | 程序入口函数 |
| `std::cout` | 标准输出流 |
| `<<` | 输出操作符 |
| `std::endl` | 换行并刷新缓冲区 |
| `return 0` | 返回状态码 |

---

## 4. 基本语法

### 头文件

```cpp
// 标准库头文件
#include <iostream>   // 输入输出
#include <string>     // 字符串
#include <vector>     // 动态数组
#include <algorithm>  // 算法
#include <cmath>      // 数学函数

// 使用命名空间
using namespace std;  // 避免std::前缀
```

### 命名空间

```cpp
// 定义命名空间
namespace MyNamespace {
    int value = 42;
    void print() {
        cout << "Hello from MyNamespace" << endl;
    }
}

// 使用命名空间
using MyNamespace::value;  // 只使用value
using namespace MyNamespace;  // 使用整个命名空间

int main() {
    cout << value << endl;  // 42
    print();  // Hello from MyNamespace
    return 0;
}
```

### 注释

```cpp
// 单行注释

/*
多行注释
可以跨越多行
*/

/// 文档注释 (Doxygen)
int function() {
    return 0;
}
```

### 语句与分号

```cpp
int x = 10;     // 声明并初始化
x = 20;         // 赋值语句
cout << x;      // 输出语句
int y;          // 声明语句

// 注意: 每个语句必须以分号结束
```

---

## 5. 变量与数据类型

### 基本数据类型

| 类型 | 关键字 | 大小 | 范围 | 说明 |
|------|--------|------|------|------|
| 布尔 | `bool` | 1字节 | `true`/`false` | 逻辑值 |
| 字符 | `char` | 1字节 | -128~127 | 单个字符 |
| 整数 | `int` | 4字节 | -2^31~2^31-1 | 一般整数 |
| 长整数 | `long` | 8字节 | -2^63~2^63-1 | 大整数 |
| 短整数 | `short` | 2字节 | -32768~32767 | 小整数 |
| 浮点数 | `float` | 4字节 | 7位精度 | 单精度 |
| 双精度 | `double` | 8字节 | 15位精度 | 双精度 |
| 字符串 | `string` | 变长 | - | 需`#include <string>` |

### 变量声明与初始化

```cpp
// 声明变量
int age;
double price;
char grade;
bool is_valid;

// 初始化
int count = 10;
double pi = 3.14159;
char letter = 'A';
bool flag = true;

// 声明并初始化
int x(5);        // 构造函数语法
int y{10};       // 统一初始化语法 (C++11)
int z = {15};    // 列表初始化

// 多变量声明
int a, b, c;     // 同类型
int m = 1, n = 2, p = 3;  // 同类型并初始化
```

### 常量

```cpp
// const关键字
const int MAX_SIZE = 100;
const double PI = 3.14159;

// 常量表达式
constexpr int square(int x) {
    return x * x;
}
constexpr int result = square(5);  // 编译时计算

// 宏定义 (预处理)
#define MAX 1000
```

### 类型转换

```cpp
// 隐式转换
int i = 10;
double d = i;  // int → double

// 显式转换
double x = 3.14;
int y = (int)x;           // C风格
int z = int(x);          // 函数风格
int w = static_cast<int>(x);  // C++风格 (推荐)

// 类型转换表
int a = 10;
double b = static_cast<double>(a);  // int → double
char c = static_cast<char>(a);      // int → char
bool flag = static_cast<bool>(a);   // 非0 → true
```

---

## 6. 运算符

### 算术运算符

| 运算符 | 说明 | 示例 | 结果 |
|--------|------|------|------|
| `+` | 加法 | `5 + 3` | `8` |
| `-` | 减法 | `5 - 3` | `2` |
| `*` | 乘法 | `5 * 3` | `15` |
| `/` | 除法 | `5 / 2` | `2` (整除) |
| `%` | 取余 | `5 % 2` | `1` |
| `++` | 自增 | `x++`或`++x` | `x+1` |
| `--` | 自减 | `x--`或`--x` | `x-1` |

```cpp
int a = 10, b = 3;

cout << a + b << endl;   // 13
cout << a - b << endl;   // 7
cout << a * b << endl;   // 30
cout << a / b << endl;   // 3 (整除)
cout << a % b << endl;   // 1

// 自增自减
int x = 5;
cout << x++ << endl;     // 5 (后置:先用后加)
cout << x << endl;       // 6
cout << ++x << endl;     // 7 (前置:先加后用)

// 注意整除
cout << 5 / 2 << endl;   // 2 (整数除法)
cout << 5.0 / 2 << endl; // 2.5 (浮点除法)
```

### 比较运算符

| 运算符 | 说明 | 示例 | 结果 |
|--------|------|------|------|
| `==` | 等于 | `5 == 5` | `true` |
| `!=` | 不等于 | `5 != 3` | `true` |
| `>` | 大于 | `5 > 3` | `true` |
| `<` | 小于 | `5 < 3` | `false` |
| `>=` | 大于等于 | `5 >= 5` | `true` |
| `<=` | 小于等于 | `5 <= 3` | `false` |

### 逻辑运算符

| 运算符 | 说明 | 示例 | 结果 |
|--------|------|------|------|
| `&&` | 逻辑与 | `true && false` | `false` |
| `\|\|` | 逻辑或 | `true \|\| false` | `true` |
| `!` | 逻辑非 | `!true` | `false` |

```cpp
bool a = true, b = false;

cout << (a && b) << endl;  // 0 (false)
cout << (a || b) << endl;  // 1 (true)
cout << (!a) << endl;      // 0 (false)
```

### 赋值运算符

| 运算符 | 等价于 | 示例 |
|--------|--------|------|
| `=` | - | `x = 5` |
| `+=` | `x = x + 5` | `x += 5` |
| `-=` | `x = x - 5` | `x -= 5` |
| `*=` | `x = x * 5` | `x *= 5` |
| `/=` | `x = x / 5` | `x /= 5` |
| `%=` | `x = x % 5` | `x %= 5` |

---

## 7. 输入输出

### 标准输出 (cout)

```cpp
#include <iostream>
#include <iomanip>  // 格式化输出

using namespace std;

int main() {
    // 基本输出
    cout << "Hello, World!" << endl;
    cout << "Number: " << 42 << endl;
    
    // 多个值输出
    cout << "A = " << 10 << ", B = " << 20 << endl;
    
    // 格式化输出
    double pi = 3.14159265359;
    cout << fixed << setprecision(2);  // 固定小数点,保留2位
    cout << "PI = " << pi << endl;    // PI = 3.14
    
    // 科学计数法
    cout << scientific << 123456.0 << endl;
    
    return 0;
}
```

### 标准输入 (cin)

```cpp
#include <iostream>
using namespace std;

int main() {
    // 输入整数
    int age;
    cout << "请输入年龄: ";
    cin >> age;
    cout << "您的年龄是: " << age << endl;
    
    // 输入多个值
    int a, b;
    cout << "请输入两个数字: ";
    cin >> a >> b;
    cout << "和为: " << a + b << endl;
    
    // 输入字符串
    string name;
    cout << "请输入姓名: ";
    cin >> name;  // 遇到空格停止
    cout << "您好, " << name << "!" << endl;
    
    // 输入带空格的字符串
    cin.ignore();  // 清除缓冲区
    getline(cin, name);  // 读取整行
    return 0;
}
```

### 字符串输入

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string str;
    
    // 读取单个单词
    cin >> str;
    
    // 读取整行 (包含空格)
    getline(cin, str);
    
    // 读取指定长度
    char buffer[100];
    cin.getline(buffer, 100);
    
    return 0;
}
```

---

## 8. 完整示例

### 示例1: 计算圆面积

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    const double PI = 3.14159265359;
    double radius;
    
    cout << "请输入圆的半径: ";
    cin >> radius;
    
    double area = PI * radius * radius;
    
    cout << fixed << setprecision(2);
    cout << "圆的面积为: " << area << endl;
    
    return 0;
}
```

### 示例2: 温度转换

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double celsius, fahrenheit;
    
    cout << "请输入摄氏温度: ";
    cin >> celsius;
    
    // 摄氏转华氏: F = C * 9/5 + 32
    fahrenheit = celsius * 9.0 / 5.0 + 32;
    
    cout << fixed << setprecision(2);
    cout << celsius << "°C = " << fahrenheit << "°F" << endl;
    
    return 0;
}
```

### 示例3: 简单计算器

```cpp
#include <iostream>
using namespace std;

int main() {
    double num1, num2, result;
    char op;
    
    cout << "简单计算器" << endl;
    cout << "输入格式: 数字1 运算符 数字2" << endl;
    cout << "例如: 5 + 3" << endl;
    
    cin >> num1 >> op >> num2;
    
    switch(op) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if(num2 != 0) {
                result = num1 / num2;
            } else {
                cout << "错误: 除数不能为0" << endl;
                return 1;
            }
            break;
        default:
            cout << "错误: 不支持的运算符" << endl;
            return 1;
    }
    
    cout << num1 << " " << op << " " << num2 << " = " << result << endl;
    
    return 0;
}
```

---

## 知识点总结

### 核心概念

| 概念 | 要点 |
|------|------|
| 头文件 | `#include <iostream>` 包含库函数 |
| 命名空间 | `std::` 或 `using namespace std` |
| main函数 | 程序入口点 |
| 变量声明 | 需指定类型: `int x;` |
| 分号 | 每个语句必须以分号结束 |
| 输入输出 | `cin >>`, `cout <<` |

### 对比: C++ vs Python

| 特性 | C++ | Python |
|------|-----|--------|
| 类型声明 | 需要指定类型 | 动态类型 |
| 编译执行 | 先编译再执行 | 解释执行 |
| 内存管理 | 手动或智能指针 | 自动垃圾回收 |
| 性能 | 高性能 | 相对较慢 |
| 语法 | 需要分号和大括号 | 缩进语法 |
| 变量声明 | `int x = 10;` | `x = 10` |

---

## 练习题

1. 编写程序,输入两个数,输出它们的和、差、积、商
2. 计算矩形的周长和面积(输入长和宽)
3. 输入年份,判断是否为闰年
4. 交换两个变量的值(不使用第三个变量)
5. 将秒数转换为时:分:秒格式

---

[← 上一章: Python常用模块](../python/06-common-modules.md) | [下一章: 数据类型与指针 →](02-data-types.md)
