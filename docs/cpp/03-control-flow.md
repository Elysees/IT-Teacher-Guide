# C++ 控制流

## 目录
1. [条件语句](#1-条件语句)
2. [循环语句](#2-循环语句)
3. [跳转语句](#3-跳转语句)
4. [选择语句](#4-选择语句)
5. [逻辑运算符](#5-逻辑运算符)
6. [嵌套结构](#6-嵌套结构)
7. [完整示例](#7-完整示例)

---

## 1. 条件语句

### if 语句

```cpp
#include <iostream>
using namespace std;

int main() {
    int score = 85;
    
    // 基本if语句
    if (score >= 90) {
        cout << "优秀" << endl;
    }
    
    // if-else语句
    if (score >= 60) {
        cout << "及格" << endl;
    } else {
        cout << "不及格" << endl;
    }
    
    // if-else if-else语句
    if (score >= 90) {
        cout << "A" << endl;
    } else if (score >= 80) {
        cout << "B" << endl;
    } else if (score >= 70) {
        cout << "C" << endl;
    } else if (score >= 60) {
        cout << "D" << endl;
    } else {
        cout << "F" << endl;
    }
    
    return 0;
}
```

### 三元运算符

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 20;
    
    // 三元运算符: condition ? value_if_true : value_if_false
    int max_value = (a > b) ? a : b;
    cout << "较大值: " << max_value << endl;  // 20
    
    // 嵌套三元运算符
    int c = 15;
    int largest = (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);
    cout << "最大值: " << largest << endl;  // 20
    
    // 三元运算符用于输出
    cout << "a是" << ((a % 2 == 0) ? "偶数" : "奇数") << endl;
    
    return 0;
}
```

### 布尔表达式

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 10, y = 20;
    bool result;
    
    // 比较运算符
    result = (x == y);      // 等于
    cout << "x == y: " << result << endl;  // 0 (false)
    
    result = (x != y);      // 不等于
    cout << "x != y: " << result << endl;  // 1 (true)
    
    result = (x < y);       // 小于
    cout << "x < y: " << result << endl;  // 1 (true)
    
    result = (x <= 10);     // 小于等于
    cout << "x <= 10: " << result << endl; // 1 (true)
    
    // 检查范围
    bool in_range = (x >= 5 && x <= 15);
    cout << "x在5-15之间: " << in_range << endl;  // 1 (true)
    
    return 0;
}
```

---

## 2. 循环语句

### for 循环

```cpp
#include <iostream>
using namespace std;

int main() {
    // 基本for循环: for(初始化; 条件; 更新)
    cout << "基本for循环: ";
    for (int i = 0; i < 5; i++) {
        cout << i << " ";
    }
    cout << endl;
    
    // 逆向循环
    cout << "逆向循环: ";
    for (int i = 5; i > 0; i--) {
        cout << i << " ";
    }
    cout << endl;
    
    // 步长为2
    cout << "步长为2: ";
    for (int i = 0; i <= 10; i += 2) {
        cout << i << " ";
    }
    cout << endl;
    
    // 多变量循环
    cout << "多变量循环: ";
    for (int i = 0, j = 10; i <= j; i++, j--) {
        cout << "(" << i << "," << j << ") ";
    }
    cout << endl;
    
    // 范围for循环 (C++11)
    int arr[] = {1, 2, 3, 4, 5};
    cout << "范围for循环: ";
    for (int value : arr) {
        cout << value << " ";
    }
    cout << endl;
    
    return 0;
}
```

### while 循环

```cpp
#include <iostream>
using namespace std;

int main() {
    int count = 0;
    
    // while循环
    cout << "while循环: ";
    while (count < 5) {
        cout << count << " ";
        count++;
    }
    cout << endl;
    
    // 重置计数器
    count = 0;
    
    // do-while循环 (至少执行一次)
    cout << "do-while循环: ";
    do {
        cout << count << " ";
        count++;
    } while (count < 5);
    cout << endl;
    
    // while循环示例: 计算数字各位数之和
    int number = 12345;
    int sum = 0;
    int temp = number;
    
    while (temp > 0) {
        sum += temp % 10;  // 取最后一位
        temp /= 10;        // 去掉最后一位
    }
    
    cout << number << "的各位数之和: " << sum << endl;  // 15
    
    return 0;
}
```

### 循环嵌套

```cpp
#include <iostream>
using namespace std;

int main() {
    // 九九乘法表
    cout << "九九乘法表:" << endl;
    for (int i = 1; i <= 9; i++) {
        for (int j = 1; j <= i; j++) {
            cout << j << "×" << i << "=" << i*j << "\t";
        }
        cout << endl;
    }
    
    cout << endl;
    
    // 打印三角形
    cout << "直角三角形:" << endl;
    for (int i = 1; i <= 5; i++) {
        for (int j = 1; j <= i; j++) {
            cout << "*";
        }
        cout << endl;
    }
    
    return 0;
}
```

---

## 3. 跳转语句

### break 语句

```cpp
#include <iostream>
using namespace std;

int main() {
    // break在循环中的使用
    cout << "使用break跳出循环: ";
    for (int i = 0; i < 10; i++) {
        if (i == 5) {
            break;  // 跳出for循环
        }
        cout << i << " ";
    }
    cout << endl;  // 输出: 0 1 2 3 4
    
    // break在嵌套循环中的使用
    cout << "嵌套循环中的break:" << endl;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (i == 1 && j == 1) {
                break;  // 只跳出内层循环
            }
            cout << "(" << i << "," << j << ") ";
        }
        cout << endl;
    }
    // 输出:
    // (0,0) (0,1) (0,2) 
    // (1,0) 
    // (2,0) (2,1) (2,2)
    
    return 0;
}
```

### continue 语句

```cpp
#include <iostream>
using namespace std;

int main() {
    // continue跳过当前迭代
    cout << "使用continue跳过偶数: ";
    for (int i = 0; i < 10; i++) {
        if (i % 2 == 0) {
            continue;  // 跳过本次循环
        }
        cout << i << " ";
    }
    cout << endl;  // 输出: 1 3 5 7 9
    
    // continue在嵌套循环中的使用
    cout << "嵌套循环中的continue:" << endl;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (j == 1) {
                continue;  // 跳过内层循环的当前迭代
            }
            cout << "(" << i << "," << j << ") ";
        }
        cout << endl;
    }
    // 输出:
    // (0,0) (0,2) 
    // (1,0) (1,2) 
    // (2,0) (2,2)
    
    return 0;
}
```

### goto 语句

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 0;
    
    // goto语句 (不推荐使用)
    start:
    if (x < 3) {
        cout << "x = " << x << endl;
        x++;
        goto start;  // 跳转到start标签
    }
    
    cout << "循环结束" << endl;
    
    // goto用于跳出多层嵌套
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            for (int k = 0; k < 3; k++) {
                if (i == 1 && j == 1 && k == 1) {
                    goto end_loop;  // 跳出所有循环
                }
                cout << "(" << i << "," << j << "," << k << ") ";
            }
        }
    }
    
    end_loop:
    cout << endl << "跳出多层循环" << endl;
    
    return 0;
}
```

---

## 4. 选择语句

### switch 语句

```cpp
#include <iostream>
using namespace std;

int main() {
    int day = 3;
    
    // 基本switch语句
    switch (day) {
        case 1:
            cout << "星期一" << endl;
            break;
        case 2:
            cout << "星期二" << endl;
            break;
        case 3:
            cout << "星期三" << endl;
            break;
        case 4:
            cout << "星期四" << endl;
            break;
        case 5:
            cout << "星期五" << endl;
            break;
        case 6:
            cout << "星期六" << endl;
            break;
        case 7:
            cout << "星期日" << endl;
            break;
        default:
            cout << "无效的日期" << endl;
            break;
    }
    
    return 0;
}
```

### switch 语句的fallthrough

```cpp
#include <iostream>
using namespace std;

int main() {
    char grade = 'A';
    
    // fallthrough示例 (没有break)
    switch (grade) {
        case 'A':
            cout << "优秀! ";
        case 'B':
            cout << "良好! ";
        case 'C':
            cout << "及格! ";
            break;
        case 'D':
            cout << "需要努力! ";
            break;
        default:
            cout << "不及格! ";
            break;
    }
    cout << endl;  // 输出: 优秀! 良好! 及格!
    
    // 字符选择示例
    char option = 'h';
    switch (option) {
        case 'h':
        case 'H':
            cout << "帮助选项" << endl;
            break;
        case 'q':
        case 'Q':
            cout << "退出程序" << endl;
            break;
        default:
            cout << "无效选项" << endl;
            break;
    }
    
    return 0;
}
```

### switch与枚举

```cpp
#include <iostream>
using namespace std;

// 定义枚举类型
enum Color { RED, GREEN, BLUE, YELLOW };

int main() {
    Color my_color = GREEN;
    
    switch (my_color) {
        case RED:
            cout << "红色" << endl;
            break;
        case GREEN:
            cout << "绿色" << endl;
            break;
        case BLUE:
            cout << "蓝色" << endl;
            break;
        case YELLOW:
            cout << "黄色" << endl;
            break;
        default:
            cout << "未知颜色" << endl;
            break;
    }
    
    return 0;
}
```

---

## 5. 逻辑运算符

### 逻辑与、或、非

```cpp
#include <iostream>
using namespace std;

int main() {
    bool a = true, b = false;
    
    // 逻辑与 (&&)
    cout << "a && b: " << (a && b) << endl;     // 0 (false)
    cout << "a && true: " << (a && true) << endl; // 1 (true)
    
    // 逻辑或 (||)
    cout << "a || b: " << (a || b) << endl;     // 1 (true)
    cout << "b || false: " << (b || false) << endl; // 0 (false)
    
    // 逻辑非 (!)
    cout << "!a: " << !a << endl;               // 0 (false)
    cout << "!b: " << !b << endl;               // 1 (true)
    
    // 复杂逻辑表达式
    int x = 10, y = 20;
    bool result = (x > 5) && (y < 25) && (x != y);
    cout << "(x>5)&&(y<25)&&(x!=y): " << result << endl;  // 1 (true)
    
    return 0;
}
```

### 短路求值

```cpp
#include <iostream>
using namespace std;

// 辅助函数用于演示短路求值
bool func1() {
    cout << "func1 called" << endl;
    return false;
}

bool func2() {
    cout << "func2 called" << endl;
    return true;
}

int main() {
    cout << "逻辑与短路求值:" << endl;
    bool result1 = func1() && func2();  // func2不会被调用
    cout << "结果: " << result1 << endl;
    
    cout << "\n逻辑或短路求值:" << endl;
    bool result2 = func2() || func1();  // func1不会被调用
    cout << "结果: " << result2 << endl;
    
    // 实际应用: 防止除零错误
    int divisor = 0;
    int dividend = 10;
    
    if (divisor != 0 && dividend / divisor > 1) {
        cout << "安全的除法操作" << endl;
    } else {
        cout << "除数为零，跳过除法" << endl;
    }
    
    return 0;
}
```

### 位运算符

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 12;   // 1100 in binary
    int b = 10;   // 1010 in binary
    
    // 位与 (&)
    cout << "a & b: " << (a & b) << endl;     // 8 (1000)
    
    // 位或 (|)
    cout << "a | b: " << (a | b) << endl;     // 14 (1110)
    
    // 位异或 (^)
    cout << "a ^ b: " << (a ^ b) << endl;     // 6 (0110)
    
    // 位非 (~)
    cout << "~a: " << (~a) << endl;           // -13
    
    // 左移 (<<)
    cout << "a << 1: " << (a << 1) << endl;   // 24 (11000)
    
    // 右移 (>>)
    cout << "a >> 1: " << (a >> 1) << endl;   // 6 (110)
    
    return 0;
}
```

---

## 6. 嵌套结构

### 条件嵌套

```cpp
#include <iostream>
using namespace std;

int main() {
    int age = 25;
    bool has_license = true;
    bool has_car = false;
    
    if (age >= 18) {
        cout << "成年人" << endl;
        if (has_license) {
            cout << "有驾照" << endl;
            if (has_car) {
                cout << "可以自己开车" << endl;
            } else {
                cout << "可以租车或打车" << endl;
            }
        } else {
            cout << "需要考取驾照" << endl;
        }
    } else {
        cout << "未成年" << endl;
        if (age >= 16) {
            cout << "可以考虑考驾照(如果当地允许)" << endl;
        }
    }
    
    return 0;
}
```

### 循环与条件嵌套

```cpp
#include <iostream>
using namespace std;

int main() {
    // 找出1-100之间的所有素数
    cout << "1-30之间的素数: ";
    for (int num = 2; num <= 30; num++) {
        bool is_prime = true;
        
        for (int i = 2; i * i <= num; i++) {
            if (num % i == 0) {
                is_prime = false;
                break;  // 不是素数，跳出内层循环
            }
        }
        
        if (is_prime) {
            cout << num << " ";
        }
    }
    cout << endl;
    
    // 打印特殊图案
    cout << "\n特殊图案:" << endl;
    for (int i = 1; i <= 5; i++) {
        // 打印前导空格
        for (int j = 1; j <= 5 - i; j++) {
            cout << " ";
        }
        
        // 打印星号
        for (int k = 1; k <= 2 * i - 1; k++) {
            cout << "*";
        }
        
        cout << endl;
    }
    
    return 0;
}
```

---

## 7. 完整示例

### 示例1: 猜数字游戏

```cpp
#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int main() {
    // 初始化随机数种子
    srand(time(0));
    
    // 生成1-100之间的随机数
    int target = rand() % 100 + 1;
    int guess;
    int attempts = 0;
    const int MAX_ATTEMPTS = 7;
    
    cout << "猜数字游戏 (1-100, 你有" << MAX_ATTEMPTS << "次机会)" << endl;
    
    while (attempts < MAX_ATTEMPTS) {
        cout << "请输入你的猜测: ";
        cin >> guess;
        attempts++;
        
        if (guess == target) {
            cout << "恭喜! 你猜对了! 使用了 " << attempts << " 次尝试." << endl;
            break;
        } else if (guess < target) {
            cout << "太小了!" << endl;
        } else {
            cout << "太大了!" << endl;
        }
        
        int remaining = MAX_ATTEMPTS - attempts;
        if (remaining > 0) {
            cout << "还有 " << remaining << " 次机会." << endl;
        }
    }
    
    if (attempts >= MAX_ATTEMPTS && guess != target) {
        cout << "游戏结束! 正确答案是: " << target << endl;
    }
    
    return 0;
}
```

### 示例2: 学生成绩统计

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    const int NUM_STUDENTS = 5;
    string names[NUM_STUDENTS] = {"Alice", "Bob", "Charlie", "Diana", "Eve"};
    int scores[NUM_STUDENTS];
    
    // 输入成绩
    cout << "请输入学生成绩:" << endl;
    for (int i = 0; i < NUM_STUDENTS; i++) {
        do {
            cout << names[i] << ": ";
            cin >> scores[i];
            if (scores[i] < 0 || scores[i] > 100) {
                cout << "成绩应在0-100之间, 请重新输入!" << endl;
            }
        } while (scores[i] < 0 || scores[i] > 100);
    }
    
    // 统计信息
    int total = 0;
    int highest = scores[0];
    int lowest = scores[0];
    string top_student = names[0];
    string low_student = names[0];
    int pass_count = 0;
    
    for (int i = 0; i < NUM_STUDENTS; i++) {
        total += scores[i];
        
        if (scores[i] > highest) {
            highest = scores[i];
            top_student = names[i];
        }
        
        if (scores[i] < lowest) {
            lowest = scores[i];
            low_student = names[i];
        }
        
        if (scores[i] >= 60) {
            pass_count++;
        }
    }
    
    // 输出结果
    cout << "\n成绩统计结果:" << endl;
    cout << "平均分: " << static_cast<double>(total) / NUM_STUDENTS << endl;
    cout << "最高分: " << highest << " (" << top_student << ")" << endl;
    cout << "最低分: " << lowest << " (" << low_student << ")" << endl;
    cout << "及格人数: " << pass_count << "/" << NUM_STUDENTS << endl;
    cout << "及格率: " << static_cast<double>(pass_count) / NUM_STUDENTS * 100 << "%" << endl;
    
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
    bool continue_calc = true;
    
    cout << "简单计算器 (输入 'q' 退出)" << endl;
    
    while (continue_calc) {
        cout << "\n输入计算表达式 (如: 5 + 3): ";
        
        // 检查是否要退出
        char check = cin.peek();
        if (check == 'q' || check == 'Q') {
            break;
        }
        
        cin >> num1 >> op >> num2;
        
        switch (op) {
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
                if (num2 != 0) {
                    result = num1 / num2;
                } else {
                    cout << "错误: 除数不能为零!" << endl;
                    continue;
                }
                break;
            case '%':
                // 注意: C++中%只能用于整数
                result = static_cast<int>(num1) % static_cast<int>(num2);
                break;
            default:
                cout << "错误: 不支持的运算符 '" << op << "'" << endl;
                continue;
        }
        
        cout << "结果: " << num1 << " " << op << " " << num2 << " = " << result << endl;
        
        cout << "继续计算? (y/n): ";
        char choice;
        cin >> choice;
        if (choice == 'n' || choice == 'N') {
            continue_calc = false;
        }
    }
    
    cout << "感谢使用计算器!" << endl;
    
    return 0;
}
```

---

## 知识点总结

### 控制流语句对比

| 语句 | 用途 | 语法特点 |
|------|------|----------|
| if | 条件判断 | `if(condition) { ... } else { ... }` |
| switch | 多路选择 | `case value: ... break;` |
| for | 计数循环 | `for(init; condition; update)` |
| while | 条件循环 | `while(condition) { ... }` |
| do-while | 至少执行一次 | `do { ... } while(condition)` |

### 循环选择指南

| 场景 | 推荐循环 | 原因 |
|------|----------|------|
| 已知次数 | for | 语法简洁，计数方便 |
| 条件控制 | while | 条件明确，逻辑清晰 |
| 至少执行一次 | do-while | 确保执行至少一次 |
| 遍历容器 | 范围for | 语法简洁，不易出错 |

### 对比: C++ vs Python

| 特性 | C++ | Python |
|------|-----|--------|
| if语句 | `if (condition) { ... }` | `if condition: ...` |
| for循环 | `for(init;cond;update)` | `for i in range(n):` |
| while循环 | `while (condition) { ... }` | `while condition: ...` |
| switch | `switch-case-break` | `if-elif-else` |
| 逻辑与 | `&&` | `and` |
| 逻辑或 | `\|\|` | `or` |
| 逻辑非 | `!` | `not` |

---

## 练习题

1. 编写程序，使用循环输出斐波那契数列的前20项
2. 实现一个程序，判断一个数是否为质数
3. 编写一个程序，计算1到n的阶乘
4. 使用嵌套循环打印菱形图案
5. 编写一个程序，统计输入的一系列数字中的正数、负数和零的个数
6. 实现一个简单的密码验证程序
7. 编写程序，将十进制数转换为二进制数
8. 使用switch语句实现一个简单的菜单系统
9. 编写程序，找出二维数组中的最大值和最小值
10. 实现一个简单的学生成绩管理系统

---
