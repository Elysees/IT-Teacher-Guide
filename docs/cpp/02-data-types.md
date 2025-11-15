# C++ 数据类型与指针

[← 上一章: C++基础](01-basics.md) | [下一章: 控制流 →](03-control-flow.md)

## 目录
1. [基本数据类型](#1-基本数据类型)
2. [指针](#2-指针)
3. [引用](#3-引用)
4. [数组](#4-数组)
5. [字符串](#5-字符串)
6. [类型转换](#6-类型转换)
7. [完整示例](#7-完整示例)

---

## 1. 基本数据类型

### 整数类型

| 类型 | 关键字 | 大小 | 范围 | 说明 |
|------|--------|------|------|------|
| 有符号字符 | `signed char` | 1字节 | -128~127 | 最小整数类型 |
| 无符号字符 | `unsigned char` | 1字节 | 0~255 | 字节数据 |
| 短整型 | `short` | 2字节 | -32,768~32,767 | 小整数 |
| 有符号短整型 | `signed short` | 2字节 | -32,768~32,767 | 同short |
| 无符号短整型 | `unsigned short` | 2字节 | 0~65,535 | 非负小整数 |
| 整型 | `int` | 4字节 | -2^31~2^31-1 | 标准整数 |
| 有符号整型 | `signed int` | 4字节 | -2^31~2^31-1 | 同int |
| 无符号整型 | `unsigned int` | 4字节 | 0~2^32-1 | 非负整数 |
| 长整型 | `long` | 8字节 | -2^63~2^63-1 | 大整数 |
| 无符号长整型 | `unsigned long` | 8字节 | 0~2^64-1 | 非负大整数 |

```cpp
#include <iostream>
#include <climits>
#include <cfloat>
using namespace std;

int main() {
    // 整数类型示例
    signed char sc = -100;
    unsigned char uc = 200;
    short s = 30000;
    unsigned short us = 60000;
    int i = 1000000;
    unsigned int ui = 3000000000U;  // U后缀表示unsigned
    long l = 10000000000L;          // L后缀表示long
    unsigned long ul = 40000000000UL; // UL后缀表示unsigned long
    
    cout << "signed char: " << (int)sc << endl;  // 强制转换为int显示
    cout << "unsigned char: " << (int)uc << endl;
    cout << "short: " << s << endl;
    cout << "unsigned short: " << us << endl;
    cout << "int: " << i << endl;
    cout << "unsigned int: " << ui << endl;
    cout << "long: " << l << endl;
    cout << "unsigned long: " << ul << endl;
    
    // 显示类型范围
    cout << "int范围: " << INT_MIN << " 到 " << INT_MAX << endl;
    cout << "unsigned int范围: 0 到 " << UINT_MAX << endl;
    
    return 0;
}
```

### 浮点类型

| 类型 | 关键字 | 大小 | 精度 | 范围 |
|------|--------|------|------|------|
| 单精度 | `float` | 4字节 | 7位有效数字 | ±3.4×10^38 |
| 双精度 | `double` | 8字节 | 15位有效数字 | ±1.7×10^308 |
| 扩展精度 | `long double` | 16字节 | 18-19位有效数字 | 更大范围 |

```cpp
#include <iostream>
#include <iomanip>
#include <cfloat>
using namespace std;

int main() {
    float f = 3.141592653589793238f;  // f后缀表示float
    double d = 3.141592653589793238;   // 默认为double
    long double ld = 3.141592653589793238L;  // L后缀表示long double
    
    cout << fixed << setprecision(10);
    cout << "float: " << f << endl;      // 3.1415927410 (精度损失)
    cout << "double: " << d << endl;     // 3.1415926536
    cout << "long double: " << ld << endl; // 3.1415926536
    
    // 显示精度信息
    cout << "float精度: " << FLT_DIG << " 位" << endl;
    cout << "double精度: " << DBL_DIG << " 位" << endl;
    cout << "long double精度: " << LDBL_DIG << " 位" << endl;
    
    return 0;
}
```

### 字符类型

```cpp
#include <iostream>
using namespace std;

int main() {
    char c1 = 'A';           // 普通字符
    char c2 = 65;            // ASCII值
    char c3 = '\n';          // 转义字符
    char c4 = '\t';          // 制表符
    char c5 = '\\';          // 反斜杠
    char c6 = '\'';          // 单引号
    char c7 = '\0';          // 空字符
    
    cout << "字符: " << c1 << endl;
    cout << "ASCII: " << (int)c1 << endl;  // 显示ASCII值
    cout << "转义字符: " << c3 << "新行开始" << endl;
    
    // 宽字符 (Unicode)
    wchar_t wc = L'A';       // 宽字符前缀L
    char16_t c16 = u'中';    // UTF-16字符
    char32_t c32 = U'国';    // UTF-32字符
    
    return 0;
}
```

### 布尔类型

```cpp
#include <iostream>
using namespace std;

int main() {
    bool flag1 = true;
    bool flag2 = false;
    bool flag3 = 1;          // 非0为true
    bool flag4 = 0;          // 0为false
    bool result = 5 > 3;     // 表达式结果
    
    cout << "flag1: " << flag1 << endl;     // 1
    cout << "flag2: " << flag2 << endl;     // 0
    cout << "result: " << result << endl;   // 1
    
    // boolalpha显示true/false
    cout << boolalpha;
    cout << "flag1: " << flag1 << endl;     // true
    cout << "flag2: " << flag2 << endl;     // false
    
    return 0;
}
```

---

## 2. 指针

### 指针基础

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 42;              // 普通变量
    int* ptr = &x;           // 指针变量,存储x的地址
    
    cout << "x的值: " << x << endl;           // 42
    cout << "x的地址: " << &x << endl;        // 地址值
    cout << "ptr的值(地址): " << ptr << endl; // 与&x相同
    cout << "ptr指向的值: " << *ptr << endl;  // 42 (解引用)
    
    // 修改指针指向的值
    *ptr = 100;
    cout << "修改后x的值: " << x << endl;     // 100
    
    return 0;
}
```

### 指针声明与初始化

```cpp
#include <iostream>
using namespace std;

int main() {
    // 指针声明
    int* ptr1;               // 未初始化的指针(危险!)
    int* ptr2 = nullptr;     // 空指针(安全)
    int value = 10;
    int* ptr3 = &value;      // 指向value的指针
    
    // 多个指针声明
    int* p1, *p2, *p3;       // 三个int指针
    int *p4, *p5, *p6;       // 与上一行等价
    
    // 指向不同类型的指针
    int* int_ptr = &value;
    double d = 3.14;
    double* double_ptr = &d;
    char c = 'A';
    char* char_ptr = &c;
    
    cout << "value: " << *ptr3 << endl;
    cout << "d: " << *double_ptr << endl;
    cout << "c: " << *char_ptr << endl;
    
    return 0;
}
```

### 指针运算

```cpp
#include <iostream>
using namespace std;

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int* ptr = arr;          // 指向数组首元素
    
    cout << "数组元素访问:" << endl;
    cout << "ptr[0]: " << ptr[0] << endl;    // 10
    cout << "ptr[1]: " << ptr[1] << endl;    // 20
    cout << "*(ptr+2): " << *(ptr+2) << endl; // 30
    
    cout << "\n指针运算:" << endl;
    cout << "原始ptr: " << *ptr << endl;     // 10
    cout << "ptr+1: " << *(ptr+1) << endl;   // 20
    cout << "ptr+2: " << *(ptr+2) << endl;   // 30
    
    // 指针递增
    ptr++;  // 指向下一个元素
    cout << "ptr++后: " << *ptr << endl;     // 20
    
    // 指针比较
    int* start = arr;
    int* end = arr + 4;  // 指向最后一个元素
    cout << "start < end: " << (start < end) << endl;  // 1 (true)
    
    return 0;
}
```

### 空指针与野指针

```cpp
#include <iostream>
using namespace std;

int main() {
    // 空指针
    int* null_ptr = nullptr;
    if (null_ptr == nullptr) {
        cout << "指针为空" << endl;
    }
    
    // 野指针(危险!)
    int* wild_ptr;  // 未初始化,指向未知地址
    // cout << *wild_ptr << endl;  // 危险!可能导致程序崩溃
    
    // 悬空指针
    int* dangling_ptr;
    {
        int local = 100;
        dangling_ptr = &local;
    }  // local已销毁,但dangling_ptr仍指向原地址
    // cout << *dangling_ptr << endl;  // 危险!
    
    // 安全做法
    int value = 200;
    int* safe_ptr = &value;
    cout << "安全指针: " << *safe_ptr << endl;  // 200
    
    // 使用前检查
    if (safe_ptr != nullptr) {
        cout << "指针有效: " << *safe_ptr << endl;
    }
    
    return 0;
}
```

### 指针与函数

```cpp
#include <iostream>
using namespace std;

// 通过指针修改变量值
void modify_value(int* ptr) {
    *ptr = 100;  // 修改指针指向的值
}

// 返回指针(谨慎使用)
int* get_address(int& ref) {
    return &ref;
}

int main() {
    int x = 10;
    cout << "修改前: " << x << endl;  // 10
    
    modify_value(&x);  // 传递x的地址
    cout << "修改后: " << x << endl;  // 100
    
    // 指针作为返回值
    int y = 200;
    int* ptr = get_address(y);
    cout << "通过指针访问: " << *ptr << endl;  // 200
    
    return 0;
}
```

---

## 3. 引用

### 引用基础

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 42;
    int& ref = x;      // ref是x的引用(别名)
    
    cout << "x的值: " << x << endl;      // 42
    cout << "ref的值: " << ref << endl;  // 42
    cout << "x的地址: " << &x << endl;   // 地址
    cout << "ref的地址: " << &ref << endl; // 与x相同
    
    // 通过引用修改值
    ref = 100;
    cout << "修改ref后x: " << x << endl; // 100
    
    // x的修改也影响ref
    x = 200;
    cout << "修改x后ref: " << ref << endl; // 200
    
    return 0;
}
```

### 引用vs指针

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 10;
    
    // 指针
    int* ptr = &x;
    *ptr = 20;        // 通过指针修改
    ptr = nullptr;    // 指针可以重新赋值
    
    cout << "指针修改后: " << x << endl;  // 20
    
    // 引用
    int& ref = x;
    ref = 30;         // 通过引用修改
    // ref = nullptr; // 错误!引用不能重新绑定
    // ref = y;       // 错误!引用不能重新绑定到其他变量
    
    cout << "引用修改后: " << x << endl;  // 30
    
    return 0;
}
```

### 常量引用

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 100;
    
    // 常量引用 - 不能通过引用修改原值
    const int& const_ref = x;
    cout << "常量引用: " << const_ref << endl;  // 100
    
    // const_ref = 200;  // 错误!不能修改
    
    x = 150;  // 可以直接修改原变量
    cout << "修改原变量后: " << const_ref << endl;  // 150
    
    // 常量引用可以绑定临时值
    const int& temp_ref = 42;  // 合法
    cout << "临时值引用: " << temp_ref << endl;  // 42
    
    return 0;
}
```

### 引用作为函数参数

```cpp
#include <iostream>
using namespace std;

// 通过引用传递 - 避免拷贝,可修改原值
void swap_values(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

// 常量引用 - 避免拷贝,不可修改
void print_value(const int& value) {
    cout << "值: " << value << endl;
    // value = 100;  // 错误!不能修改
}

int main() {
    int x = 10, y = 20;
    cout << "交换前: x=" << x << ", y=" << y << endl;
    
    swap_values(x, y);
    cout << "交换后: x=" << x << ", y=" << y << endl;
    
    print_value(x);
    
    return 0;
}
```

---

## 4. 数组

### 一维数组

```cpp
#include <iostream>
using namespace std;

int main() {
    // 数组声明与初始化
    int arr1[5];                    // 未初始化
    int arr2[5] = {1, 2, 3, 4, 5};  // 完全初始化
    int arr3[] = {10, 20, 30};      // 自动推断大小
    int arr4[5] = {0};              // 全部初始化为0
    int arr5[5] = {1};              // 第一个为1,其余为0
    
    // 访问数组元素
    cout << "arr2[0]: " << arr2[0] << endl;  // 1
    cout << "arr2[4]: " << arr2[4] << endl;  // 5
    
    // 数组大小
    int size = sizeof(arr2) / sizeof(arr2[0]);
    cout << "数组大小: " << size << endl;    // 5
    
    // 遍历数组
    cout << "数组元素: ";
    for (int i = 0; i < size; i++) {
        cout << arr2[i] << " ";
    }
    cout << endl;
    
    return 0;
}
```

### 多维数组

```cpp
#include <iostream>
using namespace std;

int main() {
    // 二维数组
    int matrix[3][4] = {
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 10, 11, 12}
    };
    
    // 访问二维数组
    cout << "matrix[1][2]: " << matrix[1][2] << endl;  // 7
    
    // 遍历二维数组
    cout << "二维数组:" << endl;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 4; j++) {
            cout << matrix[i][j] << " ";
        }
        cout << endl;
    }
    
    // 三维数组
    int cube[2][3][2] = {
        {{1, 2}, {3, 4}, {5, 6}},
        {{7, 8}, {9, 10}, {11, 12}}
    };
    
    cout << "cube[1][2][0]: " << cube[1][2][0] << endl;  // 11
    
    return 0;
}
```

### 数组与指针

```cpp
#include <iostream>
using namespace std;

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int size = sizeof(arr) / sizeof(arr[0]);
    
    // 数组名是首元素地址
    cout << "arr: " << arr << endl;        // 首元素地址
    cout << "&arr[0]: " << &arr[0] << endl; // 首元素地址
    
    // 指针遍历数组
    int* ptr = arr;  // 指向数组首元素
    cout << "指针遍历: ";
    for (int i = 0; i < size; i++) {
        cout << *(ptr + i) << " ";  // 等价于ptr[i]
    }
    cout << endl;
    
    // 指针算术
    cout << "arr[2]: " << *(arr + 2) << endl;  // 30
    cout << "arr[2]: " << arr[2] << endl;      // 30 (等价)
    
    return 0;
}
```

### 动态数组

```cpp
#include <iostream>
using namespace std;

int main() {
    int size;
    cout << "输入数组大小: ";
    cin >> size;
    
    // 动态分配数组
    int* dynamic_arr = new int[size];
    
    // 初始化动态数组
    for (int i = 0; i < size; i++) {
        dynamic_arr[i] = (i + 1) * 10;
    }
    
    // 输出动态数组
    cout << "动态数组: ";
    for (int i = 0; i < size; i++) {
        cout << dynamic_arr[i] << " ";
    }
    cout << endl;
    
    // 释放内存
    delete[] dynamic_arr;
    dynamic_arr = nullptr;  // 避免悬空指针
    
    return 0;
}
```

---

## 5. 字符串

### C风格字符串

```cpp
#include <iostream>
#include <cstring>  // C字符串函数
using namespace std;

int main() {
    // C风格字符串(字符数组)
    char str1[] = "Hello";           // 自动添加\0
    char str2[20] = "World";         // 指定大小
    char str3[10] = {'H', 'i', '\0'}; // 手动添加结束符
    char* str4 = "Constant";         // 字符串字面量
    
    cout << "str1: " << str1 << endl;
    cout << "str2: " << str2 << endl;
    cout << "str3: " << str3 << endl;
    cout << "str4: " << str4 << endl;
    
    // C字符串函数
    char dest[50];
    strcpy(dest, str1);              // 复制
    strcat(dest, " ");               // 连接
    strcat(dest, str2);
    cout << "连接结果: " << dest << endl;  // Hello World
    
    int len = strlen(dest);          // 长度
    cout << "长度: " << len << endl;
    
    int cmp = strcmp(str1, str2);    // 比较
    cout << "比较结果: " << cmp << endl;  // 负数(Hello < World)
    
    return 0;
}
```

### C++ string类

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    // string对象创建
    string str1 = "Hello";
    string str2("World");
    string str3(5, 'A');        // 5个'A'
    string str4 = str1 + " " + str2;  // 连接
    
    cout << "str1: " << str1 << endl;
    cout << "str2: " << str2 << endl;
    cout << "str3: " << str3 << endl;  // AAAAA
    cout << "str4: " << str4 << endl;  // Hello World
    
    // string操作
    cout << "长度: " << str4.length() << endl;
    cout << "大小: " << str4.size() << endl;
    
    // 访问字符
    cout << "第一个字符: " << str1[0] << endl;     // H
    cout << "最后一个字符: " << str4.back() << endl; // d
    
    // 子字符串
    string substr = str4.substr(0, 5);  // 从位置0取5个字符
    cout << "子串: " << substr << endl;  // Hello
    
    // 查找
    size_t pos = str4.find("World");
    if (pos != string::npos) {
        cout << "'World'位置: " << pos << endl;  // 6
    }
    
    // 替换
    string new_str = str4;
    new_str.replace(6, 5, "C++");  // 从位置6替换5个字符为"C++"
    cout << "替换后: " << new_str << endl;  // Hello C++
    
    return 0;
}
```

### 字符串与指针

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string cpp_str = "Hello C++";
    
    // 获取C风格字符串
    const char* c_str = cpp_str.c_str();
    cout << "C风格字符串: " << c_str << endl;
    
    // 通过指针访问
    const char* ptr = c_str;
    cout << "逐字符输出: ";
    while (*ptr != '\0') {
        cout << *ptr << "-";
        ptr++;
    }
    cout << endl;
    
    // 字符串数组
    string names[] = {"Alice", "Bob", "Charlie"};
    for (int i = 0; i < 3; i++) {
        cout << "names[" << i << "]: " << names[i] << endl;
    }
    
    return 0;
}
```

---

## 6. 类型转换

### 隐式转换

```cpp
#include <iostream>
using namespace std;

int main() {
    // 算术转换
    int i = 10;
    double d = i;        // int → double (安全)
    cout << "int to double: " << d << endl;  // 10.0
    
    double pi = 3.14159;
    int truncated = pi;  // double → int (截断小数部分)
    cout << "double to int: " << truncated << endl;  // 3
    
    // 布尔转换
    bool b1 = 100;       // 非0 → true
    bool b2 = 0;         // 0 → false
    cout << "100 to bool: " << b1 << endl;  // 1
    cout << "0 to bool: " << b2 << endl;    // 0
    
    // 字符转换
    char c = 65;         // int → char (ASCII)
    cout << "65 to char: " << c << endl;    // A
    
    return 0;
}
```

### 显式转换

```cpp
#include <iostream>
using namespace std;

int main() {
    double d = 3.14159;
    
    // C风格转换
    int c_style = (int)d;
    
    // 函数风格转换
    int func_style = int(d);
    
    // C++风格转换 (推荐)
    int cpp_style = static_cast<int>(d);
    
    cout << "原值: " << d << endl;
    cout << "C风格: " << c_style << endl;
    cout << "函数风格: " << func_style << endl;
    cout << "C++风格: " << cpp_style << endl;
    
    // 指针转换示例
    int value = 42;
    int* int_ptr = &value;
    
    // void* 转换
    void* void_ptr = int_ptr;
    int* back_ptr = static_cast<int*>(void_ptr);
    cout << "通过void*转换: " << *back_ptr << endl;  // 42
    
    return 0;
}
```

### 类型转换的安全性

```cpp
#include <iostream>
using namespace std;

int main() {
    // 安全转换
    int small = 100;
    long large = small;        // 小类型→大类型 (安全)
    cout << "Safe: " << large << endl;
    
    // 不安全转换 (可能数据丢失)
    long big = 10000000000L;
    int small_again = big;     // 大类型→小类型 (可能溢出)
    cout << "Big: " << big << ", Small: " << small_again << endl;
    
    // 检查转换结果
    if (big == small_again) {
        cout << "转换无数据丢失" << endl;
    } else {
        cout << "警告: 转换可能丢失数据" << endl;
    }
    
    // 指针转换需谨慎
    int value = 42;
    int* int_ptr = &value;
    
    // 危险的指针类型转换
    double* double_ptr = reinterpret_cast<double*>(int_ptr);
    // cout << *double_ptr << endl;  // 可能产生无意义结果
    
    return 0;
}
```

---

## 7. 完整示例

### 示例1: 学生成绩管理

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    const int NUM_STUDENTS = 3;
    const int NUM_SUBJECTS = 3;
    
    // 学生信息
    string names[NUM_STUDENTS] = {"Alice", "Bob", "Charlie"};
    int scores[NUM_STUDENTS][NUM_SUBJECTS] = {
        {85, 90, 88},  // Alice的成绩
        {78, 85, 82},  // Bob的成绩
        {92, 89, 95}   // Charlie的成绩
    };
    
    // 计算并显示平均分
    cout << "学生成绩表:" << endl;
    cout << "姓名\t科目1\t科目2\t科目3\t平均分" << endl;
    
    for (int i = 0; i < NUM_STUDENTS; i++) {
        int total = 0;
        cout << names[i] << "\t";
        
        for (int j = 0; j < NUM_SUBJECTS; j++) {
            cout << scores[i][j] << "\t";
            total += scores[i][j];
        }
        
        double average = static_cast<double>(total) / NUM_SUBJECTS;
        cout << average << endl;
    }
    
    return 0;
}
```

### 示例2: 动态内存管理

```cpp
#include <iostream>
using namespace std;

int main() {
    int size;
    cout << "输入数组大小: ";
    cin >> size;
    
    // 动态分配内存
    int* arr = new int[size];
    
    // 输入数据
    cout << "输入 " << size << " 个整数: ";
    for (int i = 0; i < size; i++) {
        cin >> arr[i];
    }
    
    // 显示数据
    cout << "您输入的数据: ";
    for (int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    // 查找最大值
    int* max_ptr = arr;  // 指向第一个元素
    for (int i = 1; i < size; i++) {
        if (arr[i] > *max_ptr) {
            max_ptr = &arr[i];  // 更新指针
        }
    }
    cout << "最大值: " << *max_ptr << endl;
    
    // 释放内存
    delete[] arr;
    arr = nullptr;
    
    return 0;
}
```

---

## 知识点总结

### 数据类型对比

| 类型 | C++ | Python |
|------|-----|--------|
| 整数 | `int`, `long` | `int` (任意大小) |
| 浮点 | `float`, `double` | `float` |
| 字符 | `char` | `str` (单字符) |
| 布尔 | `bool` | `bool` |
| 字符串 | `char[]`, `string` | `str` |

### 指针与引用

| 特性 | 指针 | 引用 |
|------|------|------|
| 声明 | `int* ptr` | `int& ref` |
| 初始化 | 可不初始化 | 必须初始化 |
| 重新赋值 | 可以 | 不可以 |
| 空值 | 可为`nullptr` | 不可以为空 |
| 内存 | 存储地址 | 别名 |

### 数组特点

- **静态数组**: 编译时确定大小
- **动态数组**: 运行时分配内存
- **数组名**: 指向首元素的指针
- **边界检查**: C++不自动检查

---

## 练习题

1. 编写程序,使用指针遍历并反转一个整数数组
2. 创建一个字符串数组,实现字符串查找和替换功能
3. 使用动态内存分配创建一个矩阵,实现矩阵转置
4. 编写函数,使用引用参数交换两个变量的值
5. 实现一个简单的字符串连接函数(不使用+操作符)

---

[← 上一章: C++基础](01-basics.md) | [下一章: 控制流 →](03-control-flow.md)
