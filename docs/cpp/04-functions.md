# C++ 函数

## 目录
1. [函数定义与声明](#1-函数定义与声明)
2. [参数传递](#2-参数传递)
3. [返回值](#3-返回值)
4. [函数重载](#4-函数重载)
5. [默认参数](#5-默认参数)
6. [内联函数](#6-内联函数)
7. [递归函数](#7-递归函数)
8. [Lambda表达式](#8-lambda表达式)
9. [函数指针](#9-函数指针)
10. [完整示例](#10-完整示例)

---

## 1. 函数定义与声明

### 函数基本语法

```cpp
// 函数定义语法: 返回类型 函数名(参数列表) { 函数体 }
#include <iostream>
using namespace std;

// 函数定义
int add(int a, int b) {
    return a + b;
}

// 函数声明 (告诉编译器函数存在)
int multiply(int x, int y);  // 声明
int subtract(int x, int y);  // 声明

int main() {
    // 调用函数
    int sum = add(5, 3);
    cout << "5 + 3 = " << sum << endl;  // 8
    
    int product = multiply(4, 6);
    cout << "4 * 6 = " << product << endl;  // 24
    
    int diff = subtract(10, 3);
    cout << "10 - 3 = " << diff << endl;  // 7
    
    return 0;
}

// 函数定义可以在main函数之后
int multiply(int x, int y) {
    return x * y;
}

int subtract(int x, int y) {
    return x - y;
}
```

### 函数声明 vs 定义

```cpp
#include <iostream>
using namespace std;

// 函数声明 (通常放在头文件中)
int power(int base, int exp);
double power(double base, int exp);  // 重载
void print_info();
bool is_even(int n);

// 函数定义
int power(int base, int exp) {
    int result = 1;
    for (int i = 0; i < exp; i++) {
        result *= base;
    }
    return result;
}

double power(double base, int exp) {
    double result = 1.0;
    for (int i = 0; i < exp; i++) {
        result *= base;
    }
    return result;
}

void print_info() {
    cout << "这是一个函数示例" << endl;
}

bool is_even(int n) {
    return n % 2 == 0;
}

int main() {
    cout << power(2, 3) << endl;      // 8
    cout << power(2.5, 2) << endl;    // 6.25
    print_info();
    cout << "4是偶数: " << is_even(4) << endl;  // 1
    
    return 0;
}
```

### 函数原型

```cpp
#include <iostream>
using namespace std;

// 函数原型 (声明) - 告诉编译器函数的签名
int calculate_area(int length, int width);
double calculate_area(double radius);  // 重载
string format_name(string first, string last);
void display_result(int result);

int main() {
    int area1 = calculate_area(5, 3);
    double area2 = calculate_area(2.5);
    
    cout << "矩形面积: " << area1 << endl;    // 15
    cout << "圆形面积: " << area2 << endl;    // 19.635
    
    string full_name = format_name("张", "三");
    cout << "姓名: " << full_name << endl;    // 张三
    
    display_result(area1);
    
    return 0;
}

int calculate_area(int length, int width) {
    return length * width;
}

double calculate_area(double radius) {
    const double PI = 3.14159265359;
    return PI * radius * radius;
}

string format_name(string first, string last) {
    return first + last;
}

void display_result(int result) {
    cout << "结果是: " << result << endl;
}
```

---

## 2. 参数传递

### 值传递 (Pass by Value)

```cpp
#include <iostream>
using namespace std;

// 值传递: 传递参数的副本,原值不变
void modify_by_value(int x) {
    x = 100;  // 只修改副本
    cout << "函数内 x = " << x << endl;  // 100
}

int main() {
    int num = 10;
    cout << "调用前 num = " << num << endl;  // 10
    
    modify_by_value(num);
    cout << "调用后 num = " << num << endl;  // 10 (未改变)
    
    return 0;
}
```

### 引用传递 (Pass by Reference)

```cpp
#include <iostream>
using namespace std;

// 引用传递: 传递参数的引用,原值会改变
void modify_by_reference(int& x) {
    x = 100;  // 修改原值
    cout << "函数内 x = " << x << endl;  // 100
}

void swap_values(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int num = 10;
    cout << "调用前 num = " << num << endl;  // 10
    
    modify_by_reference(num);
    cout << "调用后 num = " << num << endl;  // 100 (已改变)
    
    // 交换两个数
    int x = 5, y = 15;
    cout << "交换前: x=" << x << ", y=" << y << endl;
    swap_values(x, y);
    cout << "交换后: x=" << x << ", y=" << y << endl;  // x=15, y=5
    
    return 0;
}
```

### 指针传递 (Pass by Pointer)

```cpp
#include <iostream>
using namespace std;

// 指针传递: 传递参数的地址
void modify_by_pointer(int* x) {
    *x = 100;  // 通过指针修改原值
    cout << "函数内 *x = " << *x << endl;  // 100
}

void swap_with_pointers(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int num = 10;
    cout << "调用前 num = " << num << endl;  // 10
    
    modify_by_pointer(&num);  // 传递地址
    cout << "调用后 num = " << num << endl;  // 100 (已改变)
    
    // 使用指针交换
    int x = 5, y = 15;
    cout << "交换前: x=" << x << ", y=" << y << endl;
    swap_with_pointers(&x, &y);
    cout << "交换后: x=" << x << ", y=" << y << endl;  // x=15, y=5
    
    return 0;
}
```

### 数组作为参数

```cpp
#include <iostream>
using namespace std;

// 数组作为参数 (实际传递的是指针)
void print_array(int arr[], int size) {  // 或 int* arr
    cout << "数组元素: ";
    for (int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

void modify_array(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        arr[i] *= 2;  // 修改原数组
    }
}

// 二维数组作为参数
void print_2d_array(int matrix[][3], int rows) {  // 列数必须指定
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < 3; j++) {
            cout << matrix[i][j] << " ";
        }
        cout << endl;
    }
}

int main() {
    int numbers[] = {1, 2, 3, 4, 5};
    int size = sizeof(numbers) / sizeof(numbers[0]);
    
    print_array(numbers, size);
    
    modify_array(numbers, size);
    print_array(numbers, size);  // 已被修改
    
    // 二维数组
    int matrix[2][3] = {% raw %}{{1, 2, 3}, {4, 5, 6}}{% endraw %};
    print_2d_array(matrix, 2);
    
    return 0;
}
```

### const 参数

```cpp
#include <iostream>
#include <string>
using namespace std;

// const引用参数 - 避免拷贝,防止修改
void print_string(const string& str) {
    cout << str << endl;
    // str = "new value";  // 错误! 不能修改
}

// const指针参数
void print_value(const int* ptr) {
    cout << "值: " << *ptr << endl;
    // *ptr = 100;  // 错误! 不能修改指向的值
}

// 指向const的指针
void process_array(const int arr[], int size) {
    cout << "数组元素: ";
    for (int i = 0; i < size; i++) {
        cout << arr[i] << " ";  // 只读访问
    }
    cout << endl;
    // arr[0] = 100;  // 错误! 不能修改
}

int main() {
    string text = "Hello, C++!";
    print_string(text);
    
    int value = 42;
    print_value(&value);
    
    int numbers[] = {10, 20, 30};
    process_array(numbers, 3);
    
    return 0;
}
```

---

## 3. 返回值

### 基本返回值

```cpp
#include <iostream>
using namespace std;

// 返回基本类型
int get_max(int a, int b) {
    return (a > b) ? a : b;
}

double calculate_average(int sum, int count) {
    if (count == 0) return 0.0;
    return static_cast<double>(sum) / count;
}

bool is_positive(int n) {
    return n > 0;
}

char get_grade(int score) {
    if (score >= 90) return 'A';
    else if (score >= 80) return 'B';
    else if (score >= 70) return 'C';
    else if (score >= 60) return 'D';
    else return 'F';
}

int main() {
    cout << "较大值: " << get_max(15, 25) << endl;  // 25
    cout << "平均分: " << calculate_average(85, 3) << endl;  // 28.33
    cout << "是否为正数: " << is_positive(-5) << endl;  // 0
    cout << "等级: " << get_grade(87) << endl;  // B
    
    return 0;
}
```

### 返回数组和结构

```cpp
#include <iostream>
#include <string>
using namespace std;

// 返回结构体
struct Point {
    int x, y;
};

Point create_point(int x, int y) {
    Point p;
    p.x = x;
    p.y = y;
    return p;
}

// 返回字符串
string format_name(string first, string last) {
    return first + " " + last;
}

// 返回指针 (需要谨慎使用)
int* create_array(int size) {
    int* arr = new int[size];
    for (int i = 0; i < size; i++) {
        arr[i] = i + 1;
    }
    return arr;  // 调用者需要delete[]释放内存
}

int main() {
    Point p = create_point(10, 20);
    cout << "点坐标: (" << p.x << ", " << p.y << ")" << endl;
    
    string full_name = format_name("张", "三");
    cout << "姓名: " << full_name << endl;
    
    int* arr = create_array(5);
    cout << "动态数组: ";
    for (int i = 0; i < 5; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    delete[] arr;  // 释放内存
    arr = nullptr;
    
    return 0;
}
```

### 引用返回值

```cpp
#include <iostream>
using namespace std;

int global_var = 100;

// 返回引用
int& get_reference() {
    return global_var;
}

// 返回数组元素的引用
int arr[] = {10, 20, 30, 40, 50};

int& get_element(int index) {
    if (index >= 0 && index < 5) {
        return arr[index];
    }
    return arr[0];  // 返回第一个元素的引用
}

int main() {
    // 通过返回的引用修改值
    get_reference() = 200;
    cout << "global_var: " << global_var << endl;  // 200
    
    // 修改数组元素
    get_element(2) = 999;
    cout << "arr[2]: " << arr[2] << endl;  // 999
    
    return 0;
}
```

---

## 4. 函数重载

### 基本重载

```cpp
#include <iostream>
#include <string>
using namespace std;

// 函数重载: 同名函数,不同参数列表
int add(int a, int b) {
    cout << "调用 int 版本: ";
    return a + b;
}

double add(double a, double b) {
    cout << "调用 double 版本: ";
    return a + b;
}

string add(string a, string b) {
    cout << "调用 string 版本: ";
    return a + b;
}

int add(int a, int b, int c) {  // 不同参数个数
    cout << "调用三参数版本: ";
    return a + b + c;
}

int main() {
    cout << add(5, 3) << endl;        // 调用 int 版本: 8
    cout << add(2.5, 3.7) << endl;    // 调用 double 版本: 6.2
    cout << add("Hello", " World") << endl;  // 调用 string 版本: Hello World
    cout << add(1, 2, 3) << endl;     // 调用三参数版本: 6
    
    return 0;
}
```

### 重载解析

```cpp
#include <iostream>
using namespace std;

void display(int n) {
    cout << "整数: " << n << endl;
}

void display(double d) {
    cout << "浮点数: " << d << endl;
}

void display(int* ptr) {
    cout << "指针: " << ptr << endl;
}

void display(int n, int m = 0) {  // 有默认参数
    cout << "两个整数: " << n << ", " << m << endl;
}

int main() {
    display(42);        // 调用 int 版本
    display(3.14);      // 调用 double 版本
    int x = 10;
    display(&x);        // 调用指针版本
    
    // 类型转换示例
    display(5.0f);      // float会转换为double
    display(5L);        // long会转换为int
    
    return 0;
}
```

### 重载与const

```cpp
#include <iostream>
#include <string>
using namespace std;

// 重载const和非const版本
void process(const string& str) {
    cout << "处理常量字符串: " << str << endl;
}

void process(string& str) {
    cout << "处理可变字符串: " << str << endl;
    str += " (已修改)";
}

// 重载指针版本
void print(const int* ptr) {
    cout << "常量指针: " << *ptr << endl;
}

void print(int* ptr) {
    cout << "可变指针: " << *ptr << endl;
    *ptr = 999;  // 修改值
}

int main() {
    string text = "Hello";
    const string const_text = "World";
    
    process(text);      // 调用非const版本
    cout << "text: " << text << endl;  // Hello (已修改)
    
    process(const_text); // 调用const版本
    cout << "const_text: " << const_text << endl;
    
    int value = 100;
    print(&value);      // 调用非const版本
    cout << "value: " << value << endl;  // 999 (已被修改)
    
    const int const_value = 200;
    print(&const_value); // 调用const版本
    
    return 0;
}
```

---

## 5. 默认参数

### 基本默认参数

```cpp
#include <iostream>
#include <string>
using namespace std;

// 函数定义时设置默认参数
int calculate(int base, int multiplier = 1, int addend = 0) {
    return base * multiplier + addend;
}

void print_info(string name, int age = 18, string city = "Unknown") {
    cout << "姓名: " << name << ", 年龄: " << age << ", 城市: " << city << endl;
}

double power(double base, int exp = 2) {
    double result = 1.0;
    for (int i = 0; i < exp; i++) {
        result *= base;
    }
    return result;
}

int main() {
    cout << calculate(5) << endl;           // 5 * 1 + 0 = 5
    cout << calculate(5, 2) << endl;        // 5 * 2 + 0 = 10
    cout << calculate(5, 2, 3) << endl;     // 5 * 2 + 3 = 13
    
    print_info("张三");                    // 使用默认年龄和城市
    print_info("李四", 25);                // 使用默认城市
    print_info("王五", 30, "北京");         // 不使用默认值
    
    cout << power(3) << endl;              // 3^2 = 9
    cout << power(3, 3) << endl;           // 3^3 = 27
    
    return 0;
}
```

### 默认参数规则

```cpp
#include <iostream>
using namespace std;

// 默认参数必须从右到左连续
void function1(int a, int b = 10, int c = 20) {
    cout << "a=" << a << ", b=" << b << ", c=" << c << endl;
}

// 错误示例: 不能跳过参数
// void function2(int a = 1, int b, int c = 3); // 错误!

// 正确示例: 所有右边的参数都有默认值
void function3(int a, int b = 10, int c = 20, int d = 30) {
    cout << "a=" << a << ", b=" << b << ", c=" << c << ", d=" << d << endl;
}

// 声明中设置默认参数,定义中不能重复
void function4(int x, int y = 100);  // 声明

int main() {
    function1(1);        // a=1, b=10, c=20
    function1(1, 2);     // a=1, b=2, c=20
    function1(1, 2, 3);  // a=1, b=2, c=3
    
    function3(1);        // a=1, b=10, c=20, d=30
    function3(1, 2);     // a=1, b=2, c=20, d=30
    
    function4(5);        // y使用默认值100
    function4(5, 50);    // y=50
    
    return 0;
}

// 定义时不能重复默认参数
void function4(int x, int y) {
    cout << "x=" << x << ", y=" << y << endl;
}
```

---

## 6. 内联函数

### 内联函数基础

```cpp
#include <iostream>
using namespace std;

// 内联函数: 编译器尝试将函数调用替换为函数体
inline int max_value(int a, int b) {
    return (a > b) ? a : b;
}

inline int square(int x) {
    return x * x;
}

// 内联函数的注意事项
inline int complex_function(int x) {
    // 复杂的函数体可能不会被内联
    int result = 0;
    for (int i = 0; i < x; i++) {
        result += i * i;
    }
    return result;
}

int main() {
    int a = 10, b = 20;
    
    // 内联函数调用
    int max_val = max_value(a, b);
    cout << "较大值: " << max_val << endl;  // 20
    
    int sq = square(5);
    cout << "5的平方: " << sq << endl;  // 25
    
    int complex_result = complex_function(4);
    cout << "复杂函数结果: " << complex_result << endl;  // 14
    
    return 0;
}
```

### 内联函数 vs 宏

```cpp
#include <iostream>
using namespace std;

// 宏定义 (C风格)
#define MAX_MACRO(a, b) ((a) > (b) ? (a) : (b))
#define SQUARE_MACRO(x) ((x) * (x))

// 内联函数 (C++风格)
inline int max_inline(int a, int b) {
    return a > b ? a : b;
}

inline int square_inline(int x) {
    return x * x;
}

int main() {
    int x = 5, y = 3;
    
    // 使用宏
    cout << "宏 - 较大值: " << MAX_MACRO(x, y) << endl;
    cout << "宏 - 平方: " << SQUARE_MACRO(x + 2) << endl;  // 注意: 结果是 5+2*5+2 = 17
    
    // 使用内联函数
    cout << "内联 - 较大值: " << max_inline(x, y) << endl;
    cout << "内联 - 平方: " << square_inline(x + 2) << endl;  // 正确: (5+2)^2 = 49
    
    // 内联函数有类型检查
    // MAX_MACRO(5.5, 3.2)  // 宏没有类型检查
    max_inline(5, 3);  // 内联函数有类型检查
    
    return 0;
}
```

---

## 7. 递归函数

### 基本递归

```cpp
#include <iostream>
using namespace std;

// 阶乘计算
int factorial(int n) {
    // 基础情况
    if (n <= 1) {
        return 1;
    }
    // 递归情况
    return n * factorial(n - 1);
}

// 斐波那契数列
int fibonacci(int n) {
    // 基础情况
    if (n <= 1) {
        return n;
    }
    // 递归情况
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// 汉诺塔问题
void hanoi(int n, char from, char to, char aux) {
    if (n == 1) {
        cout << "移动盘子从 " << from << " 到 " << to << endl;
        return;
    }
    
    // 将上面n-1个盘子从from移动到aux
    hanoi(n - 1, from, aux, to);
    
    // 将第n个盘子从from移动到to
    cout << "移动盘子从 " << from << " 到 " << to << endl;
    
    // 将n-1个盘子从aux移动到to
    hanoi(n - 1, aux, to, from);
}

int main() {
    cout << "5的阶乘: " << factorial(5) << endl;  // 120
    
    cout << "斐波那契数列前10项: ";
    for (int i = 0; i < 10; i++) {
        cout << fibonacci(i) << " ";
    }
    cout << endl;
    
    cout << "\n汉诺塔解法 (3个盘子):" << endl;
    hanoi(3, 'A', 'C', 'B');
    
    return 0;
}
```

### 递归优化

```cpp
#include <iostream>
#include <vector>
using namespace std;

// 记忆化递归 - 斐波那契
class FibonacciCalculator {
private:
    vector<long long> memo;
    
public:
    FibonacciCalculator(int size) : memo(size + 1, -1) {}
    
    long long fibonacci(int n) {
        if (n <= 1) {
            return n;
        }
        
        if (memo[n] != -1) {
            return memo[n];
        }
        
        memo[n] = fibonacci(n - 1) + fibonacci(n - 2);
        return memo[n];
    }
};

// 尾递归优化示例
long long factorial_tail(int n, long long acc = 1) {
    if (n <= 1) {
        return acc;
    }
    return factorial_tail(n - 1, n * acc);  // 尾递归
}

int main() {
    // 记忆化递归
    FibonacciCalculator calc(50);
    cout << "第40个斐波那契数: " << calc.fibonacci(40) << endl;
    
    // 尾递归
    cout << "10的阶乘(尾递归): " << factorial_tail(10) << endl;
    
    return 0;
}
```

---

## 8. Lambda表达式

### Lambda基础

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    // 基本Lambda表达式: [捕获列表](参数列表) -> 返回类型 { 函数体 }
    auto add = [](int a, int b) -> int {
        return a + b;
    };
    
    cout << "Lambda相加: " << add(5, 3) << endl;  // 8
    
    // 简化写法 (返回类型可自动推导)
    auto multiply = [](int a, int b) {
        return a * b;
    };
    
    cout << "Lambda相乘: " << multiply(4, 6) << endl;  // 24
    
    // 无参数Lambda
    auto greet = []() {
        cout << "Hello from Lambda!" << endl;
    };
    
    greet();  // Hello from Lambda!
    
    return 0;
}
```

### Lambda与STL

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

int main() {
    vector<int> numbers = {5, 2, 8, 1, 9, 3};
    
    // 使用Lambda排序
    sort(numbers.begin(), numbers.end(), [](int a, int b) {
        return a > b;  // 降序
    });
    
    cout << "降序排列: ";
    for (int n : numbers) {
        cout << n << " ";
    }
    cout << endl;
    
    // 使用Lambda过滤
    vector<int> evens;
    copy_if(numbers.begin(), numbers.end(), back_inserter(evens),
            [](int n) { return n % 2 == 0; });
    
    cout << "偶数: ";
    for (int n : evens) {
        cout << n << " ";
    }
    cout << endl;
    
    // 使用Lambda转换
    vector<string> words = {"hello", "world", "cpp", "lambda"};
    vector<string> upper_words;
    
    transform(words.begin(), words.end(), back_inserter(upper_words),
              [](string s) {
                  for (char& c : s) {
                      c = toupper(c);
                  }
                  return s;
              });
    
    cout << "大写转换: ";
    for (const string& w : upper_words) {
        cout << w << " ";
    }
    cout << endl;
    
    return 0;
}
```

### Lambda捕获

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int multiplier = 10;
    vector<int> numbers = {1, 2, 3, 4, 5};
    
    // 值捕获 [=]
    vector<int> multiplied;
    transform(numbers.begin(), numbers.end(), back_inserter(multiplied),
              [=](int n) { return n * multiplier; });
    
    cout << "乘以" << multiplier << ": ";
    for (int n : multiplied) {
        cout << n << " ";
    }
    cout << endl;
    
    // 引用捕获 [&]
    int sum = 0;
    for_each(numbers.begin(), numbers.end(),
             [&sum](int n) { sum += n; });
    
    cout << "总和: " << sum << endl;  // 15
    
    // 混合捕获
    int base = 100;
    vector<int> result;
    transform(numbers.begin(), numbers.end(), back_inserter(result),
              [base, &multiplier](int n) {
                  return base + n * multiplier;
              });
    
    cout << "混合计算结果: ";
    for (int n : result) {
        cout << n << " ";
    }
    cout << endl;
    
    // 可变Lambda (修改捕获的值)
    int counter = 0;
    auto incrementer = [counter]() mutable {
        return ++counter;
    };
    
    cout << "可变Lambda: " << incrementer() << ", " << incrementer() << endl;  // 1, 2
    
    return 0;
}
```

---

## 9. 函数指针

### 函数指针基础

```cpp
#include <iostream>
using namespace std;

// 普通函数
int add(int a, int b) {
    return a + b;
}

int multiply(int a, int b) {
    return a * b;
}

int subtract(int a, int b) {
    return a - b;
}

int main() {
    // 函数指针声明: 返回类型 (*指针名)(参数类型列表)
    int (*func_ptr)(int, int);
    
    // 指向不同的函数
    func_ptr = add;
    cout << "使用函数指针调用add: " << func_ptr(5, 3) << endl;  // 8
    
    func_ptr = multiply;
    cout << "使用函数指针调用multiply: " << func_ptr(5, 3) << endl;  // 15
    
    func_ptr = subtract;
    cout << "使用函数指针调用subtract: " << func_ptr(5, 3) << endl;  // 2
    
    return 0;
}
```

### 函数指针数组

```cpp
#include <iostream>
#include <string>
using namespace std;

int add(int a, int b) { return a + b; }
int subtract(int a, int b) { return a - b; }
int multiply(int a, int b) { return a * b; }
int divide(int a, int b) { 
    return (b != 0) ? a / b : 0; 
}

int main() {
    // 函数指针数组
    int (*operations[])(int, int) = {add, subtract, multiply, divide};
    string op_names[] = {"加", "减", "乘", "除"};
    
    int x = 10, y = 3;
    
    for (int i = 0; i < 4; i++) {
        cout << x << " 和 " << y << " " << op_names[i] << " 的结果: " 
             << operations[i](x, y) << endl;
    }
    
    // 使用函数指针作为参数
    auto calculate = [](int a, int b, int (*op)(int, int)) -> int {
        return op(a, b);
    };
    
    cout << "通过函数指针计算: " << calculate(15, 5, multiply) << endl;  // 75
    
    return 0;
}
```

---

## 10. 完整示例

### 示例1: 计算器类

```cpp
#include <iostream>
#include <vector>
#include <functional>
using namespace std;

class Calculator {
private:
    vector<double> history;
    
public:
    // 基本运算函数
    double add(double a, double b) { return a + b; }
    double subtract(double a, double b) { return a - b; }
    double multiply(double a, double b) { return a * b; }
    double divide(double a, double b) { 
        return (b != 0) ? a / b : 0; 
    }
    
    // 使用函数指针的通用计算方法
    double calculate(double a, double b, double (Calculator::*op)(double, double)) {
        double result = (this->*op)(a, b);
        history.push_back(result);
        return result;
    }
    
    // 使用函数对象的计算方法
    double calculate_with_function(double a, double b, function<double(double, double)> op) {
        double result = op(a, b);
        history.push_back(result);
        return result;
    }
    
    void show_history() {
        cout << "计算历史: ";
        for (double val : history) {
            cout << val << " ";
        }
        cout << endl;
    }
};

int main() {
    Calculator calc;
    
    cout << "加法: " << calc.calculate(10, 5, &Calculator::add) << endl;      // 15
    cout << "减法: " << calc.calculate(10, 5, &Calculator::subtract) << endl; // 5
    cout << "乘法: " << calc.calculate(10, 5, &Calculator::multiply) << endl; // 50
    cout << "除法: " << calc.calculate(10, 5, &Calculator::divide) << endl;   // 2
    
    // 使用Lambda表达式
    cout << "Lambda计算: " << calc.calculate_with_function(8, 4, 
        [](double a, double b) { return a * b + 1; }) << endl;  // 33
    
    calc.show_history();
    
    return 0;
}
```

### 示例2: 排序算法比较

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <chrono>
#include <functional>
using namespace std;
using namespace std::chrono;

// 不同的比较函数
bool ascending(int a, int b) {
    return a < b;
}

bool descending(int a, int b) {
    return a > b;
}

bool absolute_compare(int a, int b) {
    return abs(a) < abs(b);
}

// 排序函数接受比较函数
void sort_with_function(vector<int>& arr, function<bool(int, int)> comp) {
    sort(arr.begin(), arr.end(), comp);
}

int main() {
    vector<int> numbers = {5, -3, 8, -1, 9, -7, 2};
    
    cout << "原始数组: ";
    for (int n : numbers) cout << n << " ";
    cout << endl;
    
    // 使用不同比较函数排序
    vector<int> temp = numbers;
    sort_with_function(temp, ascending);
    cout << "升序排列: ";
    for (int n : temp) cout << n << " ";
    cout << endl;
    
    temp = numbers;
    sort_with_function(temp, descending);
    cout << "降序排列: ";
    for (int n : temp) cout << n << " ";
    cout << endl;
    
    temp = numbers;
    sort_with_function(temp, absolute_compare);
    cout << "按绝对值排列: ";
    for (int n : temp) cout << n << " ";
    cout << endl;
    
    // 使用Lambda表达式
    temp = numbers;
    sort(temp.begin(), temp.end(), [](int a, int b) {
        return abs(a) < abs(b);
    });
    cout << "Lambda按绝对值排列: ";
    for (int n : temp) cout << n << " ";
    cout << endl;
    
    return 0;
}
```

---

## 知识点总结

### 函数特性对比

| 特性 | C++ | Python |
|------|-----|--------|
| 函数定义 | `type func(type a, type b)` | `def func(a, b):` |
| 参数类型 | 必须声明 | 动态类型 |
| 默认参数 | `func(int a = 10)` | `func(a=10)` |
| 函数重载 | 支持 | 不支持(但有*args, **kwargs) |
| 引用参数 | `func(int& a)` | 所有参数引用传递 |

### 参数传递方式

| 方式 | 语法 | 特点 |
|------|------|------|
| 值传递 | `func(int a)` | 传递副本,原值不变 |
| 引用传递 | `func(int& a)` | 传递引用,可修改原值 |
| 指针传递 | `func(int* a)` | 传递地址,需解引用 |

### 对比: C++ vs Python

| 概念 | C++ | Python |
|------|-----|--------|
| 函数定义 | 需要类型声明 | 无需类型声明 |
| 函数重载 | 通过参数列表区分 | 使用*args, **kwargs |
| 默认参数 | `param = value` | `param = value` |
| Lambda | `[captures](params){body}` | `lambda params: expression` |
| 函数指针 | `int (*func)(int)` | 函数作为对象 |

---

## 练习题

1. 编写一个函数，接受一个整数数组和大小，返回数组中的最大值和最小值（使用引用参数返回多个值）
2. 实现一个函数模板，可以对不同类型的数据进行排序
3. 编写一个递归函数计算组合数 C(n, k)
4. 创建一个函数指针数组，实现一个简单的命令处理器
5. 使用Lambda表达式实现一个过滤函数，从整数向量中筛选出满足特定条件的元素
6. 实现一个支持四则运算的计算器类，使用函数指针存储操作
7. 编写一个函数，接受另一个函数作为参数，并返回该函数的执行结果
8. 实现一个简单的函数式编程示例，使用Lambda和STL算法
9. 创建一个可以接受可变参数的函数，计算任意个数的平均值
10. 实现一个函数，使用递归和记忆化技术计算第n个斐波那契数

---