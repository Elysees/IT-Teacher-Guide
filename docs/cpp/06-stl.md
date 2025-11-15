# C++ STL标准库

[← 上一章: 面向对象](05-oop.md)

## 目录
1. [STL概述](#1-stl概述)
2. [容器(Container)](#2-容器container)
3. [迭代器(Iterator)](#3-迭代器iterator)
4. [算法(Algorithm)](#4-算法algorithm)
5. [函数对象与Lambda](#5-函数对象与lambda)
6. [完整示例](#6-完整示例)

---

## 1. STL概述

### STL组成

STL (Standard Template Library) 标准模板库由三部分组成：

| 组件 | 说明 | 示例 |
|------|------|------|
| 容器 | 存储数据的对象 | `vector`, `list`, `map` |
| 迭代器 | 访问容器元素的指针 | `begin()`, `end()` |
| 算法 | 操作数据的函数 | `sort()`, `find()`, `copy()` |

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    // 容器 - 存储数据
    vector<int> numbers = {5, 2, 8, 1, 9, 3};
    
    // 算法 - 操作数据
    sort(numbers.begin(), numbers.end());  // 使用迭代器
    
    // 输出结果
    cout << "排序后的数组: ";
    for (int n : numbers) {
        cout << n << " ";
    }
    cout << endl;
    
    return 0;
}
```

### STL头文件

| 头文件 | 内容 |
|--------|------|
| `<vector>` | 动态数组 |
| `<list>` | 双向链表 |
| `<deque>` | 双端队列 |
| `<array>` | 固定大小数组 |
| `<queue>` | 队列 |
| `<stack>` | 栈 |
| `<priority_queue>` | 优先队列 |
| `<set>` | 集合 |
| `<map>` | 映射 |
| `<unordered_set>` | 无序集合 |
| `<unordered_map>` | 无序映射 |
| `<algorithm>` | 算法函数 |
| `<functional>` | 函数对象 |
| `<iterator>` | 迭代器 |

---

## 2. 容器(Container)

### 序列容器

#### vector - 动态数组

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    // 创建vector
    vector<int> vec1;                    // 空vector
    vector<int> vec2(5);                 // 5个0
    vector<int> vec3(5, 10);             // 5个10
    vector<int> vec4 = {1, 2, 3, 4, 5};  // 初始化列表
    
    // 基本操作
    vec1.push_back(100);    // 添加元素
    vec1.push_back(200);
    vec1.push_back(300);
    
    cout << "vec1大小: " << vec1.size() << endl;        // 3
    cout << "vec1容量: " << vec1.capacity() << endl;    // 可能大于3
    
    // 访问元素
    cout << "第一个元素: " << vec1[0] << endl;          // 100
    cout << "最后一个元素: " << vec1.at(vec1.size()-1) << endl; // 300
    cout << "第一个元素: " << vec1.front() << endl;     // 100
    cout << "最后一个元素: " << vec1.back() << endl;    // 300
    
    // 迭代器访问
    cout << "使用迭代器: ";
    for (auto it = vec1.begin(); it != vec1.end(); ++it) {
        cout << *it << " ";
    }
    cout << endl;
    
    // 范围for循环
    cout << "范围for循环: ";
    for (const auto& item : vec1) {
        cout << item << " ";
    }
    cout << endl;
    
    // 插入和删除
    vec1.insert(vec1.begin() + 1, 150);  // 在位置1插入150
    vec1.erase(vec1.begin() + 2);        // 删除位置2的元素
    vec1.pop_back();                     // 删除最后一个元素
    
    // 清空
    vec1.clear();
    cout << "清空后大小: " << vec1.size() << endl;      // 0
    
    return 0;
}
```

#### list - 双向链表

```cpp
#include <iostream>
#include <list>
using namespace std;

int main() {
    // 创建list
    list<int> lst = {1, 2, 3, 4, 5};
    
    // 基本操作
    lst.push_front(0);      // 前端插入
    lst.push_back(6);       // 后端插入
    
    cout << "list内容: ";
    for (const auto& item : lst) {
        cout << item << " ";
    }
    cout << endl;
    
    // 插入操作
    auto it = lst.begin();
    ++it;  // 指向第二个元素
    lst.insert(it, 100);    // 在第二个位置插入100
    
    cout << "插入后: ";
    for (const auto& item : lst) {
        cout << item << " ";
    }
    cout << endl;
    
    // 删除操作
    lst.pop_front();        // 删除第一个
    lst.pop_back();         // 删除最后一个
    lst.remove(100);        // 删除值为100的元素
    
    cout << "删除后: ";
    for (const auto& item : lst) {
        cout << item << " ";
    }
    cout << endl;
    
    // 排序
    lst.sort();
    cout << "排序后: ";
    for (const auto& item : lst) {
        cout << item << " ";
    }
    cout << endl;
    
    // 反转
    lst.reverse();
    cout << "反转后: ";
    for (const auto& item : lst) {
        cout << item << " ";
    }
    cout << endl;
    
    return 0;
}
```

#### deque - 双端队列

```cpp
#include <iostream>
#include <deque>
using namespace std;

int main() {
    // 创建deque
    deque<int> dq = {1, 2, 3};
    
    // 双端操作
    dq.push_front(0);       // 前端插入
    dq.push_back(4);        // 后端插入
    
    cout << "deque内容: ";
    for (const auto& item : dq) {
        cout << item << " ";
    }
    cout << endl;
    
    // 访问元素
    cout << "第一个: " << dq.front() << endl;    // 0
    cout << "最后一个: " << dq.back() << endl;   // 4
    cout << "下标访问: " << dq[2] << endl;       // 2
    
    // 删除操作
    dq.pop_front();         // 删除前端
    dq.pop_back();          // 删除后端
    
    cout << "删除首尾后: ";
    for (const auto& item : dq) {
        cout << item << " ";
    }
    cout << endl;
    
    return 0;
}
```

#### array - 固定大小数组

```cpp
#include <iostream>
#include <array>
using namespace std;

int main() {
    // 创建array (大小固定)
    array<int, 5> arr = {10, 20, 30, 40, 50};
    
    // 基本操作
    cout << "大小: " << arr.size() << endl;          // 5
    cout << "是否为空: " << arr.empty() << endl;     // 0 (false)
    
    // 访问元素
    cout << "使用at(): " << arr.at(2) << endl;       // 30
    cout << "使用[]: " << arr[2] << endl;            // 30
    cout << "第一个: " << arr.front() << endl;       // 10
    cout << "最后一个: " << arr.back() << endl;      // 50
    
    // 迭代器
    cout << "使用迭代器: ";
    for (auto it = arr.begin(); it != arr.end(); ++it) {
        cout << *it << " ";
    }
    cout << endl;
    
    // 范围for
    cout << "范围for: ";
    for (const auto& item : arr) {
        cout << item << " ";
    }
    cout << endl;
    
    // 数据指针
    int* ptr = arr.data();
    cout << "通过指针访问: " << ptr[0] << endl;      // 10
    
    return 0;
}
```

### 关联容器

#### set - 集合

```cpp
#include <iostream>
#include <set>
using namespace std;

int main() {
    // 创建set (自动排序，无重复)
    set<int> s = {5, 2, 8, 1, 9, 3};
    
    cout << "set内容(自动排序): ";
    for (const auto& item : s) {
        cout << item << " ";
    }
    cout << endl;
    
    // 插入元素
    pair<set<int>::iterator, bool> result = s.insert(10);
    if (result.second) {
        cout << "成功插入10" << endl;
    }
    
    // 尝试插入已存在的元素
    result = s.insert(5);
    if (!result.second) {
        cout << "5已存在，插入失败" << endl;
    }
    
    // 查找元素
    auto it = s.find(8);
    if (it != s.end()) {
        cout << "找到元素: " << *it << endl;
    } else {
        cout << "未找到元素" << endl;
    }
    
    // 检查元素是否存在
    if (s.count(3)) {
        cout << "3存在于set中" << endl;
    }
    
    // 删除元素
    s.erase(3);
    cout << "删除3后: ";
    for (const auto& item : s) {
        cout << item << " ";
    }
    cout << endl;
    
    return 0;
}
```

#### map - 映射

```cpp
#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    // 创建map
    map<string, int> ages;
    
    // 插入元素
    ages["张三"] = 25;
    ages["李四"] = 30;
    ages["王五"] = 28;
    
    // 另一种插入方式
    ages.insert(make_pair("赵六", 35));
    ages.insert({"钱七", 22});
    
    cout << "map内容:" << endl;
    for (const auto& pair : ages) {
        cout << pair.first << " -> " << pair.second << endl;
    }
    
    // 访问元素
    cout << "张三的年龄: " << ages["张三"] << endl;
    cout << "李四的年龄: " << ages.at("李四") << endl;
    
    // 检查键是否存在
    if (ages.count("张三")) {
        cout << "张三存在于map中" << endl;
    }
    
    // 查找
    auto it = ages.find("王五");
    if (it != ages.end()) {
        cout << "找到: " << it->first << " -> " << it->second << endl;
    }
    
    // 遍历并修改
    for (auto& pair : ages) {
        pair.second += 1;  // 所有人年龄+1
    }
    
    cout << "\n年龄增加后:" << endl;
    for (const auto& pair : ages) {
        cout << pair.first << " -> " << pair.second << endl;
    }
    
    return 0;
}
```

### 无序关联容器

#### unordered_map - 无序映射

```cpp
#include <iostream>
#include <unordered_map>
#include <string>
using namespace std;

int main() {
    // 创建unordered_map
    unordered_map<string, int> score;
    
    // 插入元素
    score["数学"] = 95;
    score["英语"] = 87;
    score["物理"] = 92;
    
    cout << "unordered_map内容:" << endl;
    for (const auto& pair : score) {
        cout << pair.first << " -> " << pair.second << endl;
    }
    // 注意：输出顺序可能与插入顺序不同
    
    // 访问元素
    cout << "数学成绩: " << score["数学"] << endl;
    
    // 检查键是否存在
    if (score.find("化学") == score.end()) {
        cout << "化学科目不存在" << endl;
    }
    
    // 计算平均分
    int total = 0;
    for (const auto& pair : score) {
        total += pair.second;
    }
    double average = static_cast<double>(total) / score.size();
    cout << "平均分: " << average << endl;
    
    return 0;
}
```

---

## 3. 迭代器(Iterator)

### 迭代器类型

```cpp
#include <iostream>
#include <vector>
#include <list>
#include <set>
using namespace std;

int main() {
    // 不同容器的迭代器
    vector<int> vec = {1, 2, 3, 4, 5};
    list<int> lst = {10, 20, 30};
    set<int> st = {100, 200, 300};
    
    // 随机访问迭代器 (vector, array, deque)
    auto vec_it = vec.begin();
    cout << "vector第一个元素: " << *vec_it << endl;
    vec_it += 2;  // 可以跳跃
    cout << "vector第三个元素: " << *vec_it << endl;
    
    // 双向迭代器 (list, set, map)
    auto lst_it = lst.begin();
    cout << "list第一个元素: " << *lst_it << endl;
    ++lst_it;  // 只能逐个移动
    cout << "list第二个元素: " << *lst_it << endl;
    --lst_it;  // 可以往回移动
    cout << "list第一个元素: " << *lst_it << endl;
    
    // 常量迭代器
    auto const_it = vec.cbegin();
    cout << "常量迭代器: " << *const_it << endl;
    // *const_it = 10;  // 错误! 不能修改
    
    // 反向迭代器
    cout << "反向遍历vector: ";
    for (auto rit = vec.rbegin(); rit != vec.rend(); ++rit) {
        cout << *rit << " ";
    }
    cout << endl;
    
    return 0;
}
```

### 迭代器操作

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> vec = {10, 20, 30, 40, 50};
    
    // begin/end 迭代器
    cout << "使用begin/end: ";
    for (auto it = vec.begin(); it != vec.end(); ++it) {
        cout << *it << " ";
    }
    cout << endl;
    
    // advance - 迭代器前进
    auto it = vec.begin();
    advance(it, 3);  // 前进3个位置
    cout << "前进3个位置后: " << *it << endl;  // 40
    
    // distance - 计算距离
    auto start = vec.begin();
    auto end = vec.end();
    cout << "容器大小: " << distance(start, end) << endl;  // 5
    
    // next/prev - 获取下一个/上一个位置
    auto pos2 = next(vec.begin(), 2);  // 第3个位置
    cout << "第3个元素: " << *pos2 << endl;  // 30
    
    auto pos4 = prev(vec.end(), 2);   // 倒数第2个位置
    cout << "倒数第2个元素: " << *pos4 << endl;  // 40
    
    return 0;
}
```

---

## 4. 算法(Algorithm)

### 非修改序列算法

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    vector<int> vec = {1, 2, 3, 4, 5, 4, 3, 2, 1};
    
    // 查找算法
    auto it = find(vec.begin(), vec.end(), 4);
    if (it != vec.end()) {
        cout << "找到4，位置: " << distance(vec.begin(), it) << endl;
    }
    
    // 计数
    int count_4 = count(vec.begin(), vec.end(), 4);
    cout << "数字4出现次数: " << count_4 << endl;  // 2
    
    // 检查是否存在
    bool has_6 = count(vec.begin(), vec.end(), 6) > 0;
    cout << "是否存在6: " << has_6 << endl;  // 0 (false)
    
    // 任意元素满足条件
    bool any_even = any_of(vec.begin(), vec.end(), [](int n) { return n % 2 == 0; });
    cout << "是否存在偶数: " << any_even << endl;  // 1 (true)
    
    // 所有元素满足条件
    bool all_positive = all_of(vec.begin(), vec.end(), [](int n) { return n > 0; });
    cout << "是否都为正数: " << all_positive << endl;  // 1 (true)
    
    // 遍历算法
    cout << "使用for_each: ";
    for_each(vec.begin(), vec.end(), [](int n) { cout << n * 2 << " "; });
    cout << endl;
    
    return 0;
}
```

### 修改序列算法

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

int main() {
    vector<int> vec = {1, 2, 3, 4, 5};
    vector<int> target(5);
    
    // 复制
    copy(vec.begin(), vec.end(), target.begin());
    cout << "复制结果: ";
    for (int n : target) cout << n << " ";
    cout << endl;
    
    // 变换
    vector<int> doubled(5);
    transform(vec.begin(), vec.end(), doubled.begin(), [](int n) { return n * 2; });
    cout << "变换结果: ";
    for (int n : doubled) cout << n << " ";
    cout << endl;
    
    // 替换
    vector<int> to_replace = {1, 2, 1, 3, 1};
    replace(to_replace.begin(), to_replace.end(), 1, 99);
    cout << "替换1为99: ";
    for (int n : to_replace) cout << n << " ";
    cout << endl;
    
    // 移除
    vector<int> to_remove = {1, 2, 3, 2, 4, 2, 5};
    to_remove.erase(remove(to_remove.begin(), to_remove.end(), 2), to_remove.end());
    cout << "移除所有2: ";
    for (int n : to_remove) cout << n << " ";
    cout << endl;
    
    // 填充
    vector<int> filled(5);
    fill(filled.begin(), filled.end(), 7);
    cout << "填充为7: ";
    for (int n : filled) cout << n << " ";
    cout << endl;
    
    return 0;
}
```

### 排序和搜索算法

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

int main() {
    vector<int> vec = {5, 2, 8, 1, 9, 3, 7, 4, 6};
    
    cout << "原始: ";
    for (int n : vec) cout << n << " ";
    cout << endl;
    
    // 排序
    sort(vec.begin(), vec.end());
    cout << "升序: ";
    for (int n : vec) cout << n << " ";
    cout << endl;
    
    // 降序
    sort(vec.begin(), vec.end(), greater<int>());
    cout << "降序: ";
    for (int n : vec) cout << n << " ";
    cout << endl;
    
    // 随机洗牌
    random_shuffle(vec.begin(), vec.end());  // C++14及以前
    // 或使用 shuffle (C++11及以后)
    // shuffle(vec.begin(), vec.end(), default_random_engine(42));
    cout << "随机: ";
    for (int n : vec) cout << n << " ";
    cout << endl;
    
    // 二分搜索 (需要先排序)
    sort(vec.begin(), vec.end());
    bool found = binary_search(vec.begin(), vec.end(), 5);
    cout << "是否找到5: " << found << endl;
    
    // 查找已排序序列中的位置
    auto lower = lower_bound(vec.begin(), vec.end(), 5);
    auto upper = upper_bound(vec.begin(), vec.end(), 5);
    cout << "5的下界位置: " << distance(vec.begin(), lower) << endl;
    cout << "5的上界位置: " << distance(vec.begin(), upper) << endl;
    
    return 0;
}
```

### 数值算法

```cpp
#include <iostream>
#include <vector>
#include <numeric>
#include <functional>
using namespace std;

int main() {
    vector<int> numbers = {1, 2, 3, 4, 5};
    
    // 求和
    int sum = accumulate(numbers.begin(), numbers.end(), 0);
    cout << "总和: " << sum << endl;  // 15
    
    // 求积
    int product = accumulate(numbers.begin(), numbers.end(), 1, multiplies<int>());
    cout << "乘积: " << product << endl;  // 120
    
    // 计算相邻元素差值
    vector<int> diff(numbers.size());
    adjacent_difference(numbers.begin(), numbers.end(), diff.begin());
    cout << "相邻差值: ";
    for (int n : diff) cout << n << " ";
    cout << endl;  // 1 1 1 1 1
    
    // 计算部分和
    vector<int> partial(numbers.size());
    partial_sum(numbers.begin(), numbers.end(), partial.begin());
    cout << "部分和: ";
    for (int n : partial) cout << n << " ";
    cout << endl;  // 1 3 6 10 15
    
    return 0;
}
```

---

## 5. 函数对象与Lambda

### 函数对象

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <functional>
using namespace std;

// 自定义函数对象
struct GreaterThan {
    int threshold;
    
    GreaterThan(int t) : threshold(t) {}
    
    bool operator()(int value) const {
        return value > threshold;
    }
};

struct AddValue {
    int addend;
    
    AddValue(int a) : addend(a) {}
    
    int operator()(int value) const {
        return value + addend;
    }
};

int main() {
    vector<int> numbers = {1, 5, 3, 9, 2, 8, 4, 7, 6};
    
    // 使用预定义函数对象
    sort(numbers.begin(), numbers.end(), greater<int>());  // 降序
    cout << "降序排列: ";
    for (int n : numbers) cout << n << " ";
    cout << endl;
    
    // 使用自定义函数对象
    int count = count_if(numbers.begin(), numbers.end(), GreaterThan(5));
    cout << "大于5的元素个数: " << count << endl;
    
    // 使用函数对象进行变换
    vector<int> result(numbers.size());
    transform(numbers.begin(), numbers.end(), result.begin(), AddValue(10));
    cout << "每个元素加10: ";
    for (int n : result) cout << n << " ";
    cout << endl;
    
    return 0;
}
```

### Lambda表达式

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <functional>
using namespace std;

int main() {
    vector<int> numbers = {1, -4, 3, -2, 5, -6, 7, -8, 9};
    
    // Lambda作为比较函数
    sort(numbers.begin(), numbers.end(), [](int a, int b) {
        return abs(a) < abs(b);  // 按绝对值排序
    });
    
    cout << "按绝对值排序: ";
    for (int n : numbers) cout << n << " ";
    cout << endl;
    
    // Lambda作为条件函数
    auto positive_count = count_if(numbers.begin(), numbers.end(), 
                                  [](int n) { return n > 0; });
    cout << "正数个数: " << positive_count << endl;
    
    // Lambda作为变换函数
    vector<int> squared(numbers.size());
    transform(numbers.begin(), numbers.end(), squared.begin(),
              [](int n) { return n * n; });
    
    cout << "平方值: ";
    for (int n : squared) cout << n << " ";
    cout << endl;
    
    // 捕获外部变量
    int multiplier = 3;
    transform(numbers.begin(), numbers.end(), squared.begin(),
              [multiplier](int n) { return n * multiplier; });
    
    cout << "乘以" << multiplier << ": ";
    for (int n : squared) cout << n << " ";
    cout << endl;
    
    // 引用捕获
    int sum = 0;
    for_each(numbers.begin(), numbers.end(),
             [&sum](int n) { sum += n; });
    cout << "总和: " << sum << endl;
    
    return 0;
}
```

### 绑定器(bind)

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <functional>
using namespace std;
using namespace placeholders;

// 示例函数
bool compare_threshold(int value, int threshold) {
    return value > threshold;
}

int multiply_add(int a, int b, int c) {
    return a * b + c;
}

int main() {
    vector<int> numbers = {1, 5, 3, 9, 2, 8, 4, 7, 6};
    
    // 使用bind固定部分参数
    auto greater_than_5 = bind(compare_threshold, placeholders::_1, 5);
    int count = count_if(numbers.begin(), numbers.end(), greater_than_5);
    cout << "大于5的元素个数: " << count << endl;
    
    // 绑定函数并固定某些参数
    auto multiply_by_10_plus_5 = bind(multiply_add, placeholders::_1, 10, 5);
    vector<int> result(numbers.size());
    transform(numbers.begin(), numbers.end(), result.begin(), multiply_by_10_plus_5);
    
    cout << "每个数*10+5: ";
    for (int n : result) cout << n << " ";
    cout << endl;
    
    // 使用bind创建递减函数
    auto decrement = bind(minus<int>(), placeholders::_1, 1);
    transform(numbers.begin(), numbers.end(), result.begin(), decrement);
    
    cout << "每个数减1: ";
    for (int n : result) cout << n << " ";
    cout << endl;
    
    return 0;
}
```

---

## 6. 完整示例

### 示例1: 学生成绩管理系统

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <map>
#include <algorithm>
#include <numeric>
using namespace std;

struct Student {
    string name;
    int id;
    vector<int> scores;  // 各科成绩
    
    Student(string n, int i, vector<int> s) : name(n), id(i), scores(s) {}
    
    double getAverage() const {
        if (scores.empty()) return 0.0;
        double sum = accumulate(scores.begin(), scores.end(), 0.0);
        return sum / scores.size();
    }
    
    int getTotal() const {
        return accumulate(scores.begin(), scores.end(), 0);
    }
};

int main() {
    // 创建学生数据
    vector<Student> students = {
        {"张三", 1001, {85, 92, 78, 88}},
        {"李四", 1002, {90, 85, 95, 87}},
        {"王五", 1003, {78, 82, 80, 85}},
        {"赵六", 1004, {95, 90, 92, 94}},
        {"钱七", 1005, {88, 86, 90, 89}}
    };
    
    cout << "原始学生数据:" << endl;
    for (const auto& student : students) {
        cout << "姓名: " << student.name 
             << ", ID: " << student.id 
             << ", 平均分: " << student.getAverage() 
             << ", 总分: " << student.getTotal() << endl;
    }
    
    // 按平均分排序
    sort(students.begin(), students.end(), 
         [](const Student& a, const Student& b) {
             return a.getAverage() > b.getAverage();
         });
    
    cout << "\n按平均分排序后:" << endl;
    for (int i = 0; i < students.size(); i++) {
        cout << (i+1) << ". " << students[i].name 
             << " (平均分: " << students[i].getAverage() << ")" << endl;
    }
    
    // 找出平均分最高的学生
    auto top_student = max_element(students.begin(), students.end(),
                                  [](const Student& a, const Student& b) {
                                      return a.getAverage() < b.getAverage();
                                  });
    cout << "\n最高平均分学生: " << top_student->name 
         << " (" << top_student->getAverage() << ")" << endl;
    
    // 计算所有学生的平均分
    double class_average = accumulate(students.begin(), students.end(), 0.0,
                                      [](double sum, const Student& s) {
                                          return sum + s.getAverage();
                                      }) / students.size();
    cout << "班级平均分: " << class_average << endl;
    
    // 统计各分数段人数
    map<string, int> grade_distribution;
    for (const auto& student : students) {
        double avg = student.getAverage();
        if (avg >= 90) grade_distribution["优秀"]++;
        else if (avg >= 80) grade_distribution["良好"]++;
        else if (avg >= 70) grade_distribution["中等"]++;
        else if (avg >= 60) grade_distribution["及格"]++;
        else grade_distribution["不及格"]++;
    }
    
    cout << "\n成绩分布:" << endl;
    for (const auto& pair : grade_distribution) {
        cout << pair.first << ": " << pair.second << "人" << endl;
    }
    
    return 0;
}
```

### 示例2: 文本处理工具

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <map>
#include <sstream>
#include <cctype>
using namespace std;

class TextProcessor {
private:
    vector<string> words;
    
public:
    void loadText(const string& text) {
        words.clear();
        istringstream iss(text);
        string word;
        
        while (iss >> word) {
            // 移除标点符号并转换为小写
            word.erase(remove_if(word.begin(), word.end(), 
                                [](char c) { return ispunct(c); }), word.end());
            transform(word.begin(), word.end(), word.begin(), ::tolower);
            
            if (!word.empty()) {
                words.push_back(word);
            }
        }
    }
    
    void displayWords() const {
        cout << "单词列表: ";
        for (const auto& word : words) {
            cout << word << " ";
        }
        cout << endl;
    }
    
    void sortWords() {
        sort(words.begin(), words.end());
    }
    
    void sortByLength() {
        sort(words.begin(), words.end(), 
             [](const string& a, const string& b) {
                 return a.length() < b.length();
             });
    }
    
    void sortByFrequency() {
        // 统计词频
        map<string, int> freq;
        for (const auto& word : words) {
            freq[word]++;
        }
        
        // 按频率排序
        sort(words.begin(), words.end(),
             [&freq](const string& a, const string& b) {
                 if (freq[a] != freq[b]) {
                     return freq[a] > freq[b];  // 频率高的在前
                 }
                 return a < b;  // 频率相同时按字母序
             });
    }
    
    void displayWordFrequency() const {
        map<string, int> freq;
        for (const auto& word : words) {
            freq[word]++;
        }
        
        cout << "词频统计:" << endl;
        for (const auto& pair : freq) {
            cout << pair.first << ": " << pair.second << endl;
        }
    }
    
    vector<string> getUniqueWords() const {
        vector<string> unique_words = words;
        sort(unique_words.begin(), unique_words.end());
        unique_words.erase(unique(unique_words.begin(), unique_words.end()), 
                          unique_words.end());
        return unique_words;
    }
};

int main() {
    TextProcessor processor;
    string text = "Hello world! This is a sample text. Hello again, world!";
    
    cout << "原文: " << text << endl;
    
    processor.loadText(text);
    cout << "\n处理后单词:" << endl;
    processor.displayWords();
    
    processor.sortWords();
    cout << "\n按字母序排序:" << endl;
    processor.displayWords();
    
    processor.sortByLength();
    cout << "\n按长度排序:" << endl;
    processor.displayWords();
    
    processor.sortByFrequency();
    cout << "\n按频率排序:" << endl;
    processor.displayWords();
    
    cout << "\n词频统计:" << endl;
    processor.displayWordFrequency();
    
    auto unique_words = processor.getUniqueWords();
    cout << "\n不重复单词(" << unique_words.size() << "个): ";
    for (const auto& word : unique_words) {
        cout << word << " ";
    }
    cout << endl;
    
    return 0;
}
```

---

## 知识点总结

### STL容器选择指南

| 场景 | 推荐容器 | 原因 |
|------|----------|------|
| 动态数组 | `vector` | 随机访问，内存连续 |
| 频繁插入/删除 | `list` | 任意位置高效操作 |
| 双端操作 | `deque` | 两端高效插入删除 |
| 自动排序 | `set` | 保持有序，无重复 |
| 键值对 | `map` | 有序键值对 |
| 快速查找 | `unordered_map` | O(1)平均查找时间 |

### 迭代器类型对比

| 类型 | 支持操作 | 适用容器 |
|------|----------|----------|
| 输入迭代器 | 读取，++ | istream |
| 输出迭代器 | 写入，++ | ostream |
| 前向迭代器 | 读写，++ | forward_list |
| 双向迭代器 | 前向迭代器 + -- | list, set |
| 随机访问迭代器 | 双向迭代器 + +=, [] | vector, array |

### 对比: C++ STL vs Python

| 功能 | C++ STL | Python |
|------|---------|--------|
| 动态数组 | `vector<int>` | `list` |
| 关联数组 | `map<string, int>` | `dict` |
| 集合 | `set<int>` | `set` |
| 排序 | `sort(vec.begin(), vec.end())` | `list.sort()` |
| 查找 | `find(vec.begin(), vec.end(), x)` | `x in list` |
| 函数式 | `transform, for_each` | `map, filter, reduce` |

---

## 练习题

1. 使用STL容器实现一个简单的通讯录系统，支持添加、删除、查找联系人
2. 编写程序统计文本文件中每个单词的出现频率，并按频率排序
3. 使用STL算法实现一个简单的学生成绩排名系统
4. 创建一个使用set的去重工具，去除数组中的重复元素
5. 实现一个使用priority_queue的作业调度系统
6. 使用map实现一个简单的英汉词典
7. 编写程序找出两个数组的交集、并集、差集
8. 实现一个使用deque的回文检测器
9. 创建一个使用STL的简单数据库查询系统
10. 使用STL容器和算法实现一个简单的搜索引擎

---

[← 上一章: 面向对象](05-oop.md)
