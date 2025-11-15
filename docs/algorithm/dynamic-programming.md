# 动态规划

## 目录
1. [动态规划概述](#1-动态规划概述)
2. [斐波那契数列](#2-斐波那契数列)
3. [背包问题](#3-背包问题)
4. [最长公共子序列](#4-最长公共子序列)
5. [最长递增子序列](#5-最长递增子序列)
6. [硬币找零问题](#6-硬币找零问题)
7. [矩阵链乘法](#7-矩阵链乘法)
8. [动态规划总结](#8-动态规划总结)

---

## 1. 动态规划概述

### 动态规划的定义
动态规划（Dynamic Programming，简称DP）是一种通过把原问题分解为相对简单的子问题的方式求解复杂问题的方法。它常常适用于有重叠子问题和最优子结构性质的问题。

### 动态规划的核心思想
1. **分阶段**：将复杂问题分解为多个阶段
2. **最优子结构**：问题的最优解包含子问题的最优解
3. **重叠子问题**：子问题会被重复计算
4. **记忆化**：保存子问题的解，避免重复计算

### 动态规划 vs 分治算法
| 特征 | 动态规划 | 分治算法 |
|------|----------|----------|
| 子问题关系 | 子问题重叠 | 子问题独立 |
| 计算方式 | 自底向上 | 自顶向下 |
| 存储需求 | 需要存储子问题解 | 通常不需要 |

### 动态规划的解题步骤
1. **定义状态**：确定dp数组的含义
2. **状态转移方程**：找出状态之间的关系
3. **初始化**：确定初始状态的值
4. **计算顺序**：按正确的顺序计算
5. **返回结果**：从dp数组中获取答案

---

## 2. 斐波那契数列

### 问题描述
斐波那契数列定义为：F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2) (n≥2)

### 暴力递归解法

```python
def fibonacci_recursive(n):
    """
    斐波那契数列 - 暴力递归解法
    时间复杂度: O(2^n)
    空间复杂度: O(n)
    """
    if n <= 1:
        return n
    return fibonacci_recursive(n-1) + fibonacci_recursive(n-2)

# 测试
print("暴力递归解法:")
for i in range(8):
    print(f"F({i}) = {fibonacci_recursive(i)}")
```

```cpp
#include <iostream>
using namespace std;

int fibonacciRecursive(int n) {
    /*
     * 斐波那契数列 - 暴力递归解法
     * 时间复杂度: O(2^n)
     * 空间复杂度: O(n)
     */
    if (n <= 1) {
        return n;
    }
    return fibonacciRecursive(n-1) + fibonacciRecursive(n-2);
}

int main() {
    cout << "暴力递归解法:" << endl;
    for (int i = 0; i < 8; i++) {
        cout << "F(" << i << ") = " << fibonacciRecursive(i) << endl;
    }
    return 0;
}
```

### 记忆化递归解法

```python
def fibonacci_memo(n, memo=None):
    """
    斐波那契数列 - 记忆化递归解法
    时间复杂度: O(n)
    空间复杂度: O(n)
    """
    if memo is None:
        memo = {}
    
    if n in memo:
        return memo[n]
    
    if n <= 1:
        return n
    
    memo[n] = fibonacci_memo(n-1, memo) + fibonacci_memo(n-2, memo)
    return memo[n]

# 测试
print("记忆化递归解法:")
memo = {}
for i in range(8):
    result = fibonacci_memo(i, memo)
    print(f"F({i}) = {result}")
```

```cpp
#include <iostream>
#include <unordered_map>
using namespace std;

int fibonacciMemo(int n, unordered_map<int, int>& memo) {
    /*
     * 斐波那契数列 - 记忆化递归解法
     * 时间复杂度: O(n)
     * 空间复杂度: O(n)
     */
    if (memo.find(n) != memo.end()) {
        return memo[n];
    }
    
    if (n <= 1) {
        return n;
    }
    
    memo[n] = fibonacciMemo(n-1, memo) + fibonacciMemo(n-2, memo);
    return memo[n];
}

int main() {
    cout << "记忆化递归解法:" << endl;
    unordered_map<int, int> memo;
    for (int i = 0; i < 8; i++) {
        int result = fibonacciMemo(i, memo);
        cout << "F(" << i << ") = " << result << endl;
    }
    return 0;
}
```

### 动态规划解法

```python
def fibonacci_dp(n):
    """
    斐波那契数列 - 动态规划解法
    时间复杂度: O(n)
    空间复杂度: O(n)
    """
    if n <= 1:
        return n
    
    dp = [0] * (n + 1)
    dp[0] = 0
    dp[1] = 1
    
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    
    return dp[n]

def fibonacci_optimized(n):
    """
    斐波那契数列 - 空间优化解法
    时间复杂度: O(n)
    空间复杂度: O(1)
    """
    if n <= 1:
        return n
    
    prev2 = 0  # F(i-2)
    prev1 = 1  # F(i-1)
    
    for i in range(2, n + 1):
        current = prev1 + prev2
        prev2 = prev1
        prev1 = current
    
    return prev1

# 测试
print("动态规划解法:")
for i in range(8):
    result = fibonacci_dp(i)
    print(f"F({i}) = {result}")

print("\n空间优化解法:")
for i in range(8):
    result = fibonacci_optimized(i)
    print(f"F({i}) = {result}")
```

```cpp
#include <iostream>
#include <vector>
using namespace std;

int fibonacciDP(int n) {
    /*
     * 斐波那契数列 - 动态规划解法
     * 时间复杂度: O(n)
     * 空间复杂度: O(n)
     */
    if (n <= 1) {
        return n;
    }
    
    vector<int> dp(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    
    return dp[n];
}

int fibonacciOptimized(int n) {
    /*
     * 斐波那契数列 - 空间优化解法
     * 时间复杂度: O(n)
     * 空间复杂度: O(1)
     */
    if (n <= 1) {
        return n;
    }
    
    int prev2 = 0;  // F(i-2)
    int prev1 = 1;  // F(i-1)
    
    for (int i = 2; i <= n; i++) {
        int current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

int main() {
    cout << "动态规划解法:" << endl;
    for (int i = 0; i < 8; i++) {
        cout << "F(" << i << ") = " << fibonacciDP(i) << endl;
    }
    
    cout << "\n空间优化解法:" << endl;
    for (int i = 0; i < 8; i++) {
        cout << "F(" << i << ") = " << fibonacciOptimized(i) << endl;
    }
    
    return 0;
}
```

---

## 3. 背包问题

### 0-1背包问题

#### 问题描述
有n个物品，每个物品有重量weight[i]和价值value[i]，背包容量为W，求能装入背包的最大价值。

#### Python实现

```python
def knapsack_01(weights, values, capacity):
    """
    0-1背包问题 - 动态规划解法
    时间复杂度: O(n*W)
    空间复杂度: O(n*W)
    """
    n = len(weights)
    # dp[i][w] 表示前i个物品在容量为w的背包中的最大价值
    dp = [[0 for _ in range(capacity + 1)] for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(1, capacity + 1):
            # 如果当前物品重量超过背包容量，不能放入
            if weights[i-1] > w:
                dp[i][w] = dp[i-1][w]
            else:
                # 选择放入或不放入的最大值
                dp[i][w] = max(
                    dp[i-1][w],  # 不放入
                    dp[i-1][w - weights[i-1]] + values[i-1]  # 放入
                )
    
    return dp[n][capacity]

def knapsack_01_optimized(weights, values, capacity):
    """
    0-1背包问题 - 空间优化解法
    时间复杂度: O(n*W)
    空间复杂度: O(W)
    """
    n = len(weights)
    # 只使用一维数组
    dp = [0] * (capacity + 1)
    
    for i in range(n):
        # 从后往前遍历，避免重复使用
        for w in range(capacity, weights[i] - 1, -1):
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
    
    return dp[capacity]

def knapsack_01_with_items(weights, values, capacity):
    """
    0-1背包问题 - 返回选择的物品
    """
    n = len(weights)
    dp = [[0 for _ in range(capacity + 1)] for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(1, capacity + 1):
            if weights[i-1] > w:
                dp[i][w] = dp[i-1][w]
            else:
                dp[i][w] = max(
                    dp[i-1][w],
                    dp[i-1][w - weights[i-1]] + values[i-1]
                )
    
    # 回溯找出选择的物品
    selected_items = []
    w = capacity
    for i in range(n, 0, -1):
        if dp[i][w] != dp[i-1][w]:
            selected_items.append(i-1)  # 物品索引
            w -= weights[i-1]
    
    return dp[n][capacity], selected_items[::-1]

# 测试
weights = [2, 1, 3, 2]
values = [12, 10, 20, 15]
capacity = 5

print("物品信息:")
for i in range(len(weights)):
    print(f"物品{i}: 重量={weights[i]}, 价值={values[i]}")
print(f"背包容量: {capacity}")

max_value = knapsack_01(weights, values, capacity)
print(f"\n最大价值 (DP): {max_value}")

max_value_opt = knapsack_01_optimized(weights, values, capacity)
print(f"最大价值 (优化): {max_value_opt}")

max_value_items, items = knapsack_01_with_items(weights, values, capacity)
print(f"最大价值 (带物品): {max_value_items}")
print(f"选择的物品索引: {items}")
```

#### C++实现

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int knapsack01(const vector<int>& weights, const vector<int>& values, int capacity) {
    /*
     * 0-1背包问题 - 动态规划解法
     * 时间复杂度: O(n*W)
     * 空间复杂度: O(n*W)
     */
    int n = weights.size();
    // dp[i][w] 表示前i个物品在容量为w的背包中的最大价值
    vector<vector<int>> dp(n + 1, vector<int>(capacity + 1, 0));
    
    for (int i = 1; i <= n; i++) {
        for (int w = 1; w <= capacity; w++) {
            // 如果当前物品重量超过背包容量，不能放入
            if (weights[i-1] > w) {
                dp[i][w] = dp[i-1][w];
            } else {
                // 选择放入或不放入的最大值
                dp[i][w] = max(
                    dp[i-1][w],  // 不放入
                    dp[i-1][w - weights[i-1]] + values[i-1]  // 放入
                );
            }
        }
    }
    
    return dp[n][capacity];
}

int knapsack01Optimized(const vector<int>& weights, const vector<int>& values, int capacity) {
    /*
     * 0-1背包问题 - 空间优化解法
     * 时间复杂度: O(n*W)
     * 空间复杂度: O(W)
     */
    int n = weights.size();
    // 只使用一维数组
    vector<int> dp(capacity + 1, 0);
    
    for (int i = 0; i < n; i++) {
        // 从后往前遍历，避免重复使用
        for (int w = capacity; w >= weights[i]; w--) {
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }
    
    return dp[capacity];
}

pair<int, vector<int>> knapsack01WithItems(const vector<int>& weights, 
                                          const vector<int>& values, 
                                          int capacity) {
    /*
     * 0-1背包问题 - 返回选择的物品
     */
    int n = weights.size();
    vector<vector<int>> dp(n + 1, vector<int>(capacity + 1, 0));
    
    for (int i = 1; i <= n; i++) {
        for (int w = 1; w <= capacity; w++) {
            if (weights[i-1] > w) {
                dp[i][w] = dp[i-1][w];
            } else {
                dp[i][w] = max(
                    dp[i-1][w],
                    dp[i-1][w - weights[i-1]] + values[i-1]
                );
            }
        }
    }
    
    // 回溯找出选择的物品
    vector<int> selectedItems;
    int w = capacity;
    for (int i = n; i > 0; i--) {
        if (dp[i][w] != dp[i-1][w]) {
            selectedItems.push_back(i-1);  // 物品索引
            w -= weights[i-1];
        }
    }
    
    reverse(selectedItems.begin(), selectedItems.end());
    return make_pair(dp[n][capacity], selectedItems);
}

int main() {
    vector<int> weights = {2, 1, 3, 2};
    vector<int> values = {12, 10, 20, 15};
    int capacity = 5;
    
    cout << "物品信息:" << endl;
    for (int i = 0; i < weights.size(); i++) {
        cout << "物品" << i << ": 重量=" << weights[i] << ", 价值=" << values[i] << endl;
    }
    cout << "背包容量: " << capacity << endl;
    
    int maxValue = knapsack01(weights, values, capacity);
    cout << "\n最大价值 (DP): " << maxValue << endl;
    
    int maxValueOpt = knapsack01Optimized(weights, values, capacity);
    cout << "最大价值 (优化): " << maxValueOpt << endl;
    
    pair<int, vector<int>> result = knapsack01WithItems(weights, values, capacity);
    cout << "最大价值 (带物品): " << result.first << endl;
    cout << "选择的物品索引: ";
    for (int idx : result.second) {
        cout << idx << " ";
    }
    cout << endl;
    
    return 0;
}
```

### 完全背包问题

#### 问题描述
与0-1背包不同，完全背包中每个物品可以选择多次。

#### Python实现

```python
def knapsack_complete(weights, values, capacity):
    """
    完全背包问题 - 动态规划解法
    时间复杂度: O(n*W)
    空间复杂度: O(W)
    """
    n = len(weights)
    # dp[w] 表示容量为w的背包能获得的最大价值
    dp = [0] * (capacity + 1)
    
    for i in range(n):
        # 从前到后遍历，允许重复选择同一物品
        for w in range(weights[i], capacity + 1):
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
    
    return dp[capacity]

def knapsack_complete_with_count(weights, values, capacity):
    """
    完全背包问题 - 返回每个物品选择的次数
    """
    n = len(weights)
    dp = [0] * (capacity + 1)
    choice = [0] * (capacity + 1)  # 记录最后选择的物品
    
    for i in range(n):
        for w in range(weights[i], capacity + 1):
            if dp[w] < dp[w - weights[i]] + values[i]:
                dp[w] = dp[w - weights[i]] + values[i]
                choice[w] = i
    
    # 回溯计算每个物品的选择次数
    counts = [0] * n
    w = capacity
    while w > 0:
        item = choice[w]
        counts[item] += 1
        w -= weights[item]
    
    return dp[capacity], counts

# 测试
weights = [1, 3, 4]
values = [15, 20, 30]
capacity = 4

print("完全背包测试:")
print(f"物品: 重量{weights}, 价值{values}, 背包容量: {capacity}")

max_value = knapsack_complete(weights, values, capacity)
print(f"最大价值: {max_value}")

max_value_count, counts = knapsack_complete_with_count(weights, values, capacity)
print(f"最大价值(带计数): {max_value_count}")
print(f"各物品选择次数: {counts}")
```

#### C++实现

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int knapsackComplete(const vector<int>& weights, const vector<int>& values, int capacity) {
    /*
     * 完全背包问题 - 动态规划解法
     * 时间复杂度: O(n*W)
     * 空间复杂度: O(W)
     */
    int n = weights.size();
    // dp[w] 表示容量为w的背包能获得的最大价值
    vector<int> dp(capacity + 1, 0);
    
    for (int i = 0; i < n; i++) {
        // 从前到后遍历，允许重复选择同一物品
        for (int w = weights[i]; w <= capacity; w++) {
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }
    
    return dp[capacity];
}

pair<int, vector<int>> knapsackCompleteWithCount(const vector<int>& weights, 
                                                const vector<int>& values, 
                                                int capacity) {
    /*
     * 完全背包问题 - 返回每个物品选择的次数
     */
    int n = weights.size();
    vector<int> dp(capacity + 1, 0);
    vector<int> choice(capacity + 1, -1);  // 记录最后选择的物品
    
    for (int i = 0; i < n; i++) {
        for (int w = weights[i]; w <= capacity; w++) {
            if (dp[w] < dp[w - weights[i]] + values[i]) {
                dp[w] = dp[w - weights[i]] + values[i];
                choice[w] = i;
            }
        }
    }
    
    // 回溯计算每个物品的选择次数
    vector<int> counts(n, 0);
    int w = capacity;
    while (w > 0 && choice[w] != -1) {
        int item = choice[w];
        counts[item]++;
        w -= weights[item];
    }
    
    return make_pair(dp[capacity], counts);
}

int main() {
    vector<int> weights = {1, 3, 4};
    vector<int> values = {15, 20, 30};
    int capacity = 4;
    
    cout << "完全背包测试:" << endl;
    cout << "物品: 重量{";
    for (int i = 0; i < weights.size(); i++) {
        cout << weights[i] << (i < weights.size()-1 ? ", " : "");
    }
    cout << "}, 价值{";
    for (int i = 0; i < values.size(); i++) {
        cout << values[i] << (i < values.size()-1 ? ", " : "");
    }
    cout << "}, 背包容量: " << capacity << endl;
    
    int maxValue = knapsackComplete(weights, values, capacity);
    cout << "最大价值: " << maxValue << endl;
    
    pair<int, vector<int>> result = knapsackCompleteWithCount(weights, values, capacity);
    cout << "最大价值(带计数): " << result.first << endl;
    cout << "各物品选择次数: ";
    for (int i = 0; i < result.second.size(); i++) {
        cout << result.second[i] << (i < result.second.size()-1 ? ", " : "");
    }
    cout << endl;
    
    return 0;
}
```

---

## 4. 最长公共子序列

### 问题描述
给定两个序列，找出它们最长的公共子序列的长度。

### Python实现

```python
def lcs_length(str1, str2):
    """
    最长公共子序列 - 长度计算
    时间复杂度: O(m*n)
    空间复杂度: O(m*n)
    """
    m, n = len(str1), len(str2)
    # dp[i][j] 表示str1[0:i]和str2[0:j]的LCS长度
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if str1[i-1] == str2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    return dp[m][n]

def lcs_string(str1, str2):
    """
    最长公共子序列 - 返回实际的子序列
    """
    m, n = len(str1), len(str2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    # 构建DP表
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if str1[i-1] == str2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    # 回溯构建LCS字符串
    lcs = []
    i, j = m, n
    while i > 0 and j > 0:
        if str1[i-1] == str2[j-1]:
            lcs.append(str1[i-1])
            i -= 1
            j -= 1
        elif dp[i-1][j] > dp[i][j-1]:
            i -= 1
        else:
            j -= 1
    
    return ''.join(reversed(lcs))

def lcs_optimized_space(str1, str2):
    """
    最长公共子序列 - 空间优化版（只计算长度）
    时间复杂度: O(m*n)
    空间复杂度: O(min(m,n))
    """
    # 确保str1是较短的字符串
    if len(str1) > len(str2):
        str1, str2 = str2, str1
    
    m, n = len(str1), len(str2)
    prev = [0] * (m + 1)
    curr = [0] * (m + 1)
    
    for j in range(1, n + 1):
        for i in range(1, m + 1):
            if str1[i-1] == str2[j-1]:
                curr[i] = prev[i-1] + 1
            else:
                curr[i] = max(prev[i], curr[i-1])
        prev, curr = curr, prev
    
    return prev[m]

# 测试
str1 = "ABCDGH"
str2 = "AEDFHR"

print(f"字符串1: {str1}")
print(f"字符串2: {str2}")

length = lcs_length(str1, str2)
print(f"LCS长度: {length}")

lcs_str = lcs_string(str1, str2)
print(f"LCS字符串: {lcs_str}")

length_opt = lcs_optimized_space(str1, str2)
print(f"LCS长度(空间优化): {length_opt}")
```

### C++实现

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int lcsLength(const string& str1, const string& str2) {
    /*
     * 最长公共子序列 - 长度计算
     * 时间复杂度: O(m*n)
     * 空间复杂度: O(m*n)
     */
    int m = str1.length();
    int n = str2.length();
    // dp[i][j] 表示str1[0:i]和str2[0:j]的LCS长度
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

string lcsString(const string& str1, const string& str2) {
    /*
     * 最长公共子序列 - 返回实际的子序列
     */
    int m = str1.length();
    int n = str2.length();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    
    // 构建DP表
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (str1[i-1] == str2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    
    // 回溯构建LCS字符串
    string lcs;
    int i = m, j = n;
    while (i > 0 && j > 0) {
        if (str1[i-1] == str2[j-1]) {
            lcs.push_back(str1[i-1]);
            i--;
            j--;
        } else if (dp[i-1][j] > dp[i][j-1]) {
            i--;
        } else {
            j--;
        }
    }
    
    reverse(lcs.begin(), lcs.end());
    return lcs;
}

int lcsOptimizedSpace(const string& str1, const string& str2) {
    /*
     * 最长公共子序列 - 空间优化版（只计算长度）
     * 时间复杂度: O(m*n)
     * 空间复杂度: O(min(m,n))
     */
    // 确保str1是较短的字符串
    string s1 = str1, s2 = str2;
    if (s1.length() > s2.length()) {
        swap(s1, s2);
    }
    
    int m = s1.length();
    int n = s2.length();
    vector<int> prev(m + 1, 0);
    vector<int> curr(m + 1, 0);
    
    for (int j = 1; j <= n; j++) {
        for (int i = 1; i <= m; i++) {
            if (s1[i-1] == s2[j-1]) {
                curr[i] = prev[i-1] + 1;
            } else {
                curr[i] = max(prev[i], curr[i-1]);
            }
        }
        prev = curr;
    }
    
    return prev[m];
}

int main() {
    string str1 = "ABCDGH";
    string str2 = "AEDFHR";
    
    cout << "字符串1: " << str1 << endl;
    cout << "字符串2: " << str2 << endl;
    
    int length = lcsLength(str1, str2);
    cout << "LCS长度: " << length << endl;
    
    string lcsStr = lcsString(str1, str2);
    cout << "LCS字符串: " << lcsStr << endl;
    
    int lengthOpt = lcsOptimizedSpace(str1, str2);
    cout << "LCS长度(空间优化): " << lengthOpt << endl;
    
    return 0;
}
```

---

## 5. 最长递增子序列

### 问题描述
给定一个数组，找到其中最长的递增子序列的长度。

### Python实现

```python
def lis_length(nums):
    """
    最长递增子序列 - 长度计算
    时间复杂度: O(n^2)
    空间复杂度: O(n)
    """
    if not nums:
        return 0
    
    n = len(nums)
    # dp[i] 表示以nums[i]结尾的最长递增子序列长度
    dp = [1] * n
    
    for i in range(1, n):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    
    return max(dp)

def lis_length_optimized(nums):
    """
    最长递增子序列 - 优化解法
    时间复杂度: O(n log n)
    空间复杂度: O(n)
    """
    if not nums:
        return 0
    
    # tails[i] 表示长度为i+1的递增子序列的最小尾部元素
    tails = []
    
    for num in nums:
        # 二分查找第一个大于等于num的位置
        left, right = 0, len(tails)
        while left < right:
            mid = (left + right) // 2
            if tails[mid] < num:
                left = mid + 1
            else:
                right = mid
        
        # 如果left等于tails长度，说明num比所有元素都大，直接添加
        if left == len(tails):
            tails.append(num)
        else:
            # 否则替换找到位置的元素
            tails[left] = num
    
    return len(tails)

def lis_sequence(nums):
    """
    最长递增子序列 - 返回实际序列
    """
    if not nums:
        return []
    
    n = len(nums)
    dp = [1] * n
    parent = [-1] * n  # 记录前驱元素索引
    
    for i in range(1, n):
        for j in range(i):
            if nums[j] < nums[i] and dp[j] + 1 > dp[i]:
                dp[i] = dp[j] + 1
                parent[i] = j
    
    # 找到最长递增子序列的结束位置
    max_length = max(dp)
    max_index = dp.index(max_length)
    
    # 回溯构建序列
    lis = []
    current = max_index
    while current != -1:
        lis.append(nums[current])
        current = parent[current]
    
    return lis[::-1]

# 测试
nums = [10, 9, 2, 5, 3, 7, 101, 18]

print(f"数组: {nums}")

length = lis_length(nums)
print(f"LIS长度 (O(n^2)): {length}")

length_opt = lis_length_optimized(nums)
print(f"LIS长度 (O(n log n)): {length_opt}")

sequence = lis_sequence(nums)
print(f"LIS序列: {sequence}")
```

### C++实现

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int lisLength(const vector<int>& nums) {
    /*
     * 最长递增子序列 - 长度计算
     * 时间复杂度: O(n^2)
     * 空间复杂度: O(n)
     */
    if (nums.empty()) {
        return 0;
    }
    
    int n = nums.size();
    // dp[i] 表示以nums[i]结尾的最长递增子序列长度
    vector<int> dp(n, 1);
    
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
    }
    
    return *max_element(dp.begin(), dp.end());
}

int lisLengthOptimized(const vector<int>& nums) {
    /*
     * 最长递增子序列 - 优化解法
     * 时间复杂度: O(n log n)
     * 空间复杂度: O(n)
     */
    if (nums.empty()) {
        return 0;
    }
    
    // tails[i] 表示长度为i+1的递增子序列的最小尾部元素
    vector<int> tails;
    
    for (int num : nums) {
        // 二分查找第一个大于等于num的位置
        auto it = lower_bound(tails.begin(), tails.end(), num);
        
        // 如果没找到，说明num比所有元素都大，直接添加
        if (it == tails.end()) {
            tails.push_back(num);
        } else {
            // 否则替换找到位置的元素
            *it = num;
        }
    }
    
    return tails.size();
}

vector<int> lisSequence(const vector<int>& nums) {
    /*
     * 最长递增子序列 - 返回实际序列
     */
    if (nums.empty()) {
        return {};
    }
    
    int n = nums.size();
    vector<int> dp(n, 1);
    vector<int> parent(n, -1);  // 记录前驱元素索引
    
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (nums[j] < nums[i] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
                parent[i] = j;
            }
        }
    }
    
    // 找到最长递增子序列的结束位置
    int maxLength = *max_element(dp.begin(), dp.end());
    int maxIndex = 0;
    for (int i = 0; i < n; i++) {
        if (dp[i] == maxLength) {
            maxIndex = i;
            break;
        }
    }
    
    // 回溯构建序列
    vector<int> lis;
    int current = maxIndex;
    while (current != -1) {
        lis.push_back(nums[current]);
        current = parent[current];
    }
    
    reverse(lis.begin(), lis.end());
    return lis;
}

int main() {
    vector<int> nums = {10, 9, 2, 5, 3, 7, 101, 18};
    
    cout << "数组: ";
    for (int n : nums) cout << n << " ";
    cout << endl;
    
    int length = lisLength(nums);
    cout << "LIS长度 (O(n^2)): " << length << endl;
    
    int lengthOpt = lisLengthOptimized(nums);
    cout << "LIS长度 (O(n log n)): " << lengthOpt << endl;
    
    vector<int> sequence = lisSequence(nums);
    cout << "LIS序列: ";
    for (int n : sequence) cout << n << " ";
    cout << endl;
    
    return 0;
}
```

---

## 6. 硬币找零问题

### 问题描述
给定不同面额的硬币和总金额，计算可以凑成总金额所需的最少硬币个数。

### Python实现

```python
def coin_change_min_coins(coins, amount):
    """
    硬币找零 - 最少硬币数
    时间复杂度: O(amount * len(coins))
    空间复杂度: O(amount)
    """
    if amount == 0:
        return 0
    
    # dp[i] 表示凑成金额i所需的最少硬币数
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0  # 凑成金额0需要0个硬币
    
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1

def coin_change_ways(coins, amount):
    """
    硬币找零 - 凑成总金额的方案数
    时间复杂度: O(amount * len(coins))
    空间复杂度: O(amount)
    """
    # dp[i] 表示凑成金额i的方案数
    dp = [0] * (amount + 1)
    dp[0] = 1  # 凑成金额0有1种方案（不选任何硬币）
    
    for coin in coins:
        for i in range(coin, amount + 1):
            dp[i] += dp[i - coin]
    
    return dp[amount]

def coin_change_with_coins(coins, amount):
    """
    硬币找零 - 返回使用的硬币
    """
    if amount == 0:
        return 0, []
    
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    parent = [-1] * (amount + 1)  # 记录使用的硬币
    
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i and dp[i - coin] + 1 < dp[i]:
                dp[i] = dp[i - coin] + 1
                parent[i] = coin
    
    if dp[amount] == float('inf'):
        return -1, []
    
    # 回溯构建使用的硬币
    used_coins = []
    current = amount
    while current > 0:
        coin = parent[current]
        used_coins.append(coin)
        current -= coin
    
    return dp[amount], used_coins

# 测试
coins = [1, 3, 4]
amount = 6

print(f"硬币面额: {coins}")
print(f"目标金额: {amount}")

min_coins = coin_change_min_coins(coins, amount)
print(f"最少硬币数: {min_coins}")

ways = coin_change_ways(coins, amount)
print(f"凑成方案数: {ways}")

min_coins2, used = coin_change_with_coins(coins, amount)
print(f"最少硬币数(带硬币): {min_coins2}")
if min_coins2 != -1:
    print(f"使用的硬币: {used}")
```

### C++实现

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

int coinChangeMinCoins(const vector<int>& coins, int amount) {
    /*
     * 硬币找零 - 最少硬币数
     * 时间复杂度: O(amount * len(coins))
     * 空间复杂度: O(amount)
     */
    if (amount == 0) {
        return 0;
    }
    
    // dp[i] 表示凑成金额i所需的最少硬币数
    vector<int> dp(amount + 1, INT_MAX);
    dp[0] = 0;  // 凑成金额0需要0个硬币
    
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i && dp[i - coin] != INT_MAX) {
                dp[i] = min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] == INT_MAX ? -1 : dp[amount];
}

int coinChangeWays(const vector<int>& coins, int amount) {
    /*
     * 硬币找零 - 凑成总金额的方案数
     * 时间复杂度: O(amount * len(coins))
     * 空间复杂度: O(amount)
     */
    // dp[i] 表示凑成金额i的方案数
    vector<long long> dp(amount + 1, 0);
    dp[0] = 1;  // 凑成金额0有1种方案（不选任何硬币）
    
    for (int coin : coins) {
        for (int i = coin; i <= amount; i++) {
            dp[i] += dp[i - coin];
        }
    }
    
    return dp[amount];
}

pair<int, vector<int>> coinChangeWithCoins(const vector<int>& coins, int amount) {
    /*
     * 硬币找零 - 返回使用的硬币
     */
    if (amount == 0) {
        return make_pair(0, vector<int>());
    }
    
    vector<int> dp(amount + 1, INT_MAX);
    dp[0] = 0;
    vector<int> parent(amount + 1, -1);  // 记录使用的硬币
    
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i && dp[i - coin] != INT_MAX && dp[i - coin] + 1 < dp[i]) {
                dp[i] = dp[i - coin] + 1;
                parent[i] = coin;
            }
        }
    }
    
    if (dp[amount] == INT_MAX) {
        return make_pair(-1, vector<int>());
    }
    
    // 回溯构建使用的硬币
    vector<int> usedCoins;
    int current = amount;
    while (current > 0) {
        int coin = parent[current];
        usedCoins.push_back(coin);
        current -= coin;
    }
    
    return make_pair(dp[amount], usedCoins);
}

int main() {
    vector<int> coins = {1, 3, 4};
    int amount = 6;
    
    cout << "硬币面额: ";
    for (int c : coins) cout << c << " ";
    cout << endl;
    cout << "目标金额: " << amount << endl;
    
    int minCoins = coinChangeMinCoins(coins, amount);
    cout << "最少硬币数: " << minCoins << endl;
    
    int ways = coinChangeWays(coins, amount);
    cout << "凑成方案数: " << ways << endl;
    
    pair<int, vector<int>> result = coinChangeWithCoins(coins, amount);
    cout << "最少硬币数(带硬币): " << result.first << endl;
    if (result.first != -1) {
        cout << "使用的硬币: ";
        for (int coin : result.second) {
            cout << coin << " ";
        }
        cout << endl;
    }
    
    return 0;
}
```

---

## 7. 矩阵链乘法

### 问题描述
给定n个矩阵的维度，确定矩阵乘法的计算顺序，使得总的标量乘法次数最少。

### Python实现

```python
def matrix_chain_order(p):
    """
    矩阵链乘法 - 计算最少乘法次数
    时间复杂度: O(n^3)
    空间复杂度: O(n^2)
    """
    n = len(p) - 1  # 矩阵数量
    # m[i][j] 表示计算矩阵A[i]到A[j]的最少乘法次数
    m = [[0 for _ in range(n)] for _ in range(n)]
    # s[i][j] 记录最优分割点
    s = [[0 for _ in range(n)] for _ in range(n)]
    
    # l是链长度
    for l in range(2, n + 1):  # 链长度从2开始
        for i in range(n - l + 1):
            j = i + l - 1
            m[i][j] = float('inf')
            
            # 尝试所有可能的分割点
            for k in range(i, j):
                cost = m[i][k] + m[k+1][j] + p[i] * p[k+1] * p[j+1]
                if cost < m[i][j]:
                    m[i][j] = cost
                    s[i][j] = k
    
    return m, s

def print_optimal_parens(s, i, j, matrix_names=None):
    """
    打印最优加括号方式
    """
    if matrix_names is None:
        matrix_names = [f"A{k}" for k in range(len(s))]
    
    if i == j:
        return matrix_names[i]
    else:
        left = print_optimal_parens(s, i, s[i][j], matrix_names)
        right = print_optimal_parens(s, s[i][j] + 1, j, matrix_names)
        return f"({left}×{right})"

def matrix_chain_multiplication_cost(p):
    """
    矩阵链乘法 - 返回最少乘法次数
    """
    n = len(p) - 1
    m, s = matrix_chain_order(p)
    return m[0][n-1], s

# 测试
# 矩阵维度: A1(1x2), A2(2x3), A3(3x4), A4(4x5)
dimensions = [1, 2, 3, 4, 5]

print(f"矩阵维度: {dimensions}")
print("矩阵:")
for i in range(len(dimensions) - 1):
    print(f"A{i+1}: {dimensions[i]}×{dimensions[i+1]}")

min_cost, split_points = matrix_chain_multiplication_cost(dimensions)
print(f"\n最少标量乘法次数: {min_cost}")

matrix_names = [f"A{i+1}" for i in range(len(dimensions) - 1)]
optimal_order = print_optimal_parens(split_points, 0, len(dimensions) - 2, matrix_names)
print(f"最优计算顺序: {optimal_order}")
```

### C++实现

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <climits>
using namespace std;

pair<vector<vector<int>>, vector<vector<int>>> matrixChainOrder(const vector<int>& p) {
    /*
     * 矩阵链乘法 - 计算最少乘法次数
     * 时间复杂度: O(n^3)
     * 空间复杂度: O(n^2)
     */
    int n = p.size() - 1;  // 矩阵数量
    // m[i][j] 表示计算矩阵A[i]到A[j]的最少乘法次数
    vector<vector<int>> m(n, vector<int>(n, 0));
    // s[i][j] 记录最优分割点
    vector<vector<int>> s(n, vector<int>(n, 0));
    
    // l是链长度
    for (int l = 2; l <= n; l++) {  // 链长度从2开始
        for (int i = 0; i < n - l + 1; i++) {
            int j = i + l - 1;
            m[i][j] = INT_MAX;
            
            // 尝试所有可能的分割点
            for (int k = i; k < j; k++) {
                int cost = m[i][k] + m[k+1][j] + p[i] * p[k+1] * p[j+1];
                if (cost < m[i][j]) {
                    m[i][j] = cost;
                    s[i][j] = k;
                }
            }
        }
    }
    
    return make_pair(m, s);
}

string printOptimalParens(const vector<vector<int>>& s, int i, int j, 
                         const vector<string>& matrixNames) {
    /*
     * 打印最优加括号方式
     */
    if (i == j) {
        return matrixNames[i];
    } else {
        string left = printOptimalParens(s, i, s[i][j], matrixNames);
        string right = printOptimalParens(s, s[i][j] + 1, j, matrixNames);
        return "(" + left + "×" + right + ")";
    }
}

pair<int, vector<vector<int>>> matrixChainMultiplicationCost(const vector<int>& p) {
    /*
     * 矩阵链乘法 - 返回最少乘法次数
     */
    int n = p.size() - 1;
    pair<vector<vector<int>>, vector<vector<int>>> result = matrixChainOrder(p);
    return make_pair(result.first[0][n-1], result.second);
}

int main() {
    vector<int> dimensions = {1, 2, 3, 4, 5};
    
    cout << "矩阵维度: ";
    for (int i = 0; i < dimensions.size(); i++) {
        cout << dimensions[i];
        if (i < dimensions.size() - 1) cout << " ";
    }
    cout << endl;
    
    cout << "矩阵:" << endl;
    for (int i = 0; i < dimensions.size() - 1; i++) {
        cout << "A" << i+1 << ": " << dimensions[i] << "×" << dimensions[i+1] << endl;
    }
    
    pair<int, vector<vector<int>>> result = matrixChainMultiplicationCost(dimensions);
    cout << "\n最少标量乘法次数: " << result.first << endl;
    
    vector<string> matrixNames;
    for (int i = 0; i < dimensions.size() - 1; i++) {
        matrixNames.push_back("A" + to_string(i+1));
    }
    
    string optimalOrder = printOptimalParens(result.second, 0, dimensions.size() - 2, matrixNames);
    cout << "最优计算顺序: " << optimalOrder << endl;
    
    return 0;
}
```

---

## 8. 动态规划总结

### 动态规划经典问题分类

| 问题类型 | 代表问题 | 状态定义 | 状态转移方程 |
|----------|----------|----------|--------------|
| 线性DP | 斐波那契数列 | dp[i] = 第i项的值 | dp[i] = dp[i-1] + dp[i-2] |
| 背包DP | 0-1背包 | dp[i][w] = 前i个物品容量w的最大价值 | dp[i][w] = max(dp[i-1][w], dp[i-1][w-wt[i]] + val[i]) |
| 序列DP | 最长公共子序列 | dp[i][j] = 前i和前j的LCS长度 | if s1[i]==s2[j]: dp[i][j] = dp[i-1][j-1]+1 |
| 区间DP | 矩阵链乘法 | dp[i][j] = i到j的最优值 | dp[i][j] = min(dp[i][k] + dp[k+1][j] + cost) |

### 动态规划解题模板

```python
def dynamic_programming_template():
    """
    动态规划解题模板
    """
    # 1. 确定状态定义
    # dp[i] = ...
    
    # 2. 确定边界条件
    # dp[0] = initial_value
    
    # 3. 确定状态转移方程
    # dp[i] = function(dp[i-1], dp[i-2], ...)
    
    # 4. 按顺序计算
    # for i in range(1, n):
    #     dp[i] = ...
    
    # 5. 返回结果
    # return dp[n-1] or max(dp)
    pass
```

### 时间复杂度优化技巧

1. **空间优化**：从二维数组优化到一维数组
2. **单调队列/栈**：优化某些特殊状态转移
3. **斜率优化**：用于特定的DP问题
4. **四边形不等式优化**：用于区间DP

### 实际应用示例

```python
def edit_distance(str1, str2):
    """
    编辑距离（Levenshtein距离）
    """
    m, n = len(str1), len(str2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    # 初始化边界
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if str1[i-1] == str2[j-1]:
                dp[i][j] = dp[i-1][j-1]  # 不需要操作
            else:
                dp[i][j] = 1 + min(
                    dp[i-1][j],      # 删除
                    dp[i][j-1],      # 插入
                    dp[i-1][j-1]     # 替换
                )
    
    return dp[m][n]

# 测试编辑距离
str1, str2 = "kitten", "sitting"
distance = edit_distance(str1, str2)
print(f"编辑距离 '{str1}' -> '{str2}': {distance}")
```

### 动态规划学习建议

1. **从简单问题开始**：如斐波那契数列
2. **掌握经典模型**：背包、LCS、LIS等
3. **理解状态转移**：为什么这样转移是正确的
4. **练习空间优化**：学会优化空间复杂度
5. **多做练习**：通过大量练习掌握技巧

---

## 练习题

1. 实现最大子数组和问题（Kadane算法）
2. 编写正则表达式匹配的动态规划解法
3. 实现不同路径问题（机器人从左上角到右下角）
4. 解决股票买卖问题的变种
5. 实现分割等和子集问题

---

## 总结

动态规划是算法设计中的重要方法，掌握动态规划需要：

1. **识别问题特征**：最优子结构和重叠子问题
2. **定义状态**：明确dp数组的含义
3. **推导转移方程**：找出状态之间的关系
4. **注意边界条件**：正确初始化
5. **优化实现**：空间和时间复杂度优化

动态规划问题虽然有一定难度，但通过大量练习和总结模式，可以逐步掌握。
