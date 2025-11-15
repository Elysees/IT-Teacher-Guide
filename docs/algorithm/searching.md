# 搜索算法

## 目录
1. [搜索算法概述](#1-搜索算法概述)
2. [线性搜索](#2-线性搜索)
3. [二分搜索](#3-二分搜索)
4. [插值搜索](#4-插值搜索)
5. [指数搜索](#5-指数搜索)
6. [搜索算法比较](#6-搜索算法比较)

---

## 1. 搜索算法概述

### 搜索的定义
搜索算法是在数据结构中查找特定元素的过程。搜索算法的效率直接影响程序的整体性能。

### 搜索算法分类
- **无序搜索**：在未排序的数据中搜索（如线性搜索）
- **有序搜索**：在已排序的数据中搜索（如二分搜索）

### 时间复杂度对比
| 算法 | 最好情况 | 平均情况 | 最坏情况 | 空间复杂度 | 数据要求 |
|------|----------|----------|----------|------------|----------|
| 线性搜索 | O(1) | O(n) | O(n) | O(1) | 无 |
| 二分搜索 | O(1) | O(log n) | O(log n) | O(1) | 已排序 |
| 插值搜索 | O(1) | O(log log n) | O(n) | O(1) | 已排序、均匀分布 |
| 指数搜索 | O(1) | O(log n) | O(log n) | O(1) | 已排序 |

---

## 2. 线性搜索

### 算法原理
线性搜索（也称为顺序搜索）是最简单的搜索算法，它依次检查数组中的每个元素，直到找到目标值或搜索完所有元素。

### Python实现

```python
def linear_search(arr, target):
    """
    线性搜索 - Python实现
    时间复杂度: O(n)
    空间复杂度: O(1)
    """
    for i in range(len(arr)):
        if arr[i] == target:
            return i  # 返回目标元素的索引
    return -1  # 未找到返回-1

def linear_search_all(arr, target):
    """
    线性搜索 - 查找所有匹配元素的索引
    """
    indices = []
    for i in range(len(arr)):
        if arr[i] == target:
            indices.append(i)
    return indices

# 测试
numbers = [64, 34, 25, 12, 22, 11, 90]
target = 22

print("数组:", numbers)
print(f"搜索目标: {target}")

index = linear_search(numbers, target)
if index != -1:
    print(f"找到目标，索引: {index}")
else:
    print("未找到目标")

# 查找所有匹配
target2 = 12
all_indices = linear_search_all(numbers, target2)
print(f"查找所有{target2}的索引: {all_indices}")

# 查找不存在的元素
target3 = 99
index3 = linear_search(numbers, target3)
print(f"搜索{target3}: {'找到' if index3 != -1 else '未找到'}")
```

### C++实现

```cpp
#include <iostream>
#include <vector>
using namespace std;

int linearSearch(const vector<int>& arr, int target) {
    /*
     * 线性搜索 - C++实现
     * 时间复杂度: O(n)
     * 空间复杂度: O(1)
     */
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) {
            return i;  // 返回目标元素的索引
        }
    }
    return -1;  // 未找到返回-1
}

vector<int> linearSearchAll(const vector<int>& arr, int target) {
    /*
     * 线性搜索 - 查找所有匹配元素的索引
     */
    vector<int> indices;
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) {
            indices.push_back(i);
        }
    }
    return indices;
}

int main() {
    vector<int> numbers = {64, 34, 25, 12, 22, 11, 90};
    int target = 22;
    
    cout << "数组: ";
    for (int n : numbers) cout << n << " ";
    cout << endl;
    cout << "搜索目标: " << target << endl;
    
    int index = linearSearch(numbers, target);
    if (index != -1) {
        cout << "找到目标，索引: " << index << endl;
    } else {
        cout << "未找到目标" << endl;
    }
    
    // 查找所有匹配
    int target2 = 12;
    vector<int> allIndices = linearSearchAll(numbers, target2);
    cout << "查找所有" << target2 << "的索引: ";
    for (int idx : allIndices) cout << idx << " ";
    cout << endl;
    
    // 查找不存在的元素
    int target3 = 99;
    int index3 = linearSearch(numbers, target3);
    cout << "搜索" << target3 << ": " << (index3 != -1 ? "找到" : "未找到") << endl;
    
    return 0;
}
```

---

## 3. 二分搜索

### 算法原理
二分搜索（也称为折半搜索）是一种在已排序数组中搜索特定元素的算法。它通过比较目标值与数组中间元素的大小，每次将搜索范围缩小一半。

### Python实现

```python
def binary_search(arr, target):
    """
    二分搜索 - Python实现
    时间复杂度: O(log n)
    空间复杂度: O(1)
    """
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid  # 找到目标，返回索引
        elif arr[mid] < target:
            left = mid + 1  # 目标在右半部分
        else:
            right = mid - 1  # 目标在左半部分
    
    return -1  # 未找到

def binary_search_recursive(arr, target, left=0, right=None):
    """
    二分搜索 - 递归实现
    """
    if right is None:
        right = len(arr) - 1
    
    if left > right:
        return -1  # 未找到
    
    mid = (left + right) // 2
    
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)
    else:
        return binary_search_recursive(arr, target, left, mid - 1)

def binary_search_first(arr, target):
    """
    二分搜索 - 查找第一个匹配的元素
    """
    left, right = 0, len(arr) - 1
    result = -1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            result = mid
            right = mid - 1  # 继续在左半部分查找
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return result

def binary_search_last(arr, target):
    """
    二分搜索 - 查找最后一个匹配的元素
    """
    left, right = 0, len(arr) - 1
    result = -1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            result = mid
            left = mid + 1  # 继续在右半部分查找
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return result

# 测试
numbers = [11, 12, 22, 25, 34, 64, 90]  # 已排序数组
target = 22

print("已排序数组:", numbers)
print(f"搜索目标: {target}")

index = binary_search(numbers, target)
if index != -1:
    print(f"二分搜索找到目标，索引: {index}")
else:
    print("二分搜索未找到目标")

# 递归实现测试
index_recursive = binary_search_recursive(numbers, target)
print(f"递归二分搜索结果: {index_recursive}")

# 测试重复元素
arr_with_duplicates = [1, 2, 2, 2, 3, 4, 4, 5]
target_dup = 2
first = binary_search_first(arr_with_duplicates, target_dup)
last = binary_search_last(arr_with_duplicates, target_dup)
print(f"\n数组: {arr_with_duplicates}")
print(f"查找{target_dup} - 第一个位置: {first}, 最后一个位置: {last}")

# 性能测试
import time

def performance_test():
    """性能测试函数"""
    sizes = [1000, 10000, 100000]
    
    for size in sizes:
        # 创建已排序数组
        arr = list(range(size))
        target = size // 2  # 搜索中间元素
        
        # 线性搜索
        start_time = time.time()
        linear_result = linear_search(arr, target)
        linear_time = time.time() - start_time
        
        # 二分搜索
        start_time = time.time()
        binary_result = binary_search(arr, target)
        binary_time = time.time() - start_time
        
        print(f"\n数组大小: {size}")
        print(f"线性搜索: {linear_time:.6f}秒, 结果: {linear_result}")
        print(f"二分搜索: {binary_time:.6f}秒, 结果: {binary_result}")
        print(f"性能提升: {linear_time/binary_time:.2f}倍")

# 运行性能测试（取消注释以运行）
# performance_test()
```

### C++实现

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <chrono>
using namespace std;
using namespace std::chrono;

int binarySearch(const vector<int>& arr, int target) {
    /*
     * 二分搜索 - C++实现
     * 时间复杂度: O(log n)
     * 空间复杂度: O(1)
     */
    int left = 0, right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;  // 防止整数溢出
        
        if (arr[mid] == target) {
            return mid;  // 找到目标，返回索引
        } else if (arr[mid] < target) {
            left = mid + 1;  // 目标在右半部分
        } else {
            right = mid - 1;  // 目标在左半部分
        }
    }
    
    return -1;  // 未找到
}

int binarySearchRecursive(const vector<int>& arr, int target, int left, int right) {
    /*
     * 二分搜索 - 递归实现
     */
    if (left > right) {
        return -1;  // 未找到
    }
    
    int mid = left + (right - left) / 2;
    
    if (arr[mid] == target) {
        return mid;
    } else if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    } else {
        return binarySearchRecursive(arr, target, left, mid - 1);
    }
}

int binarySearchFirst(const vector<int>& arr, int target) {
    /*
     * 二分搜索 - 查找第一个匹配的元素
     */
    int left = 0, right = arr.size() - 1;
    int result = -1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            result = mid;
            right = mid - 1;  // 继续在左半部分查找
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

int binarySearchLast(const vector<int>& arr, int target) {
    /*
     * 二分搜索 - 查找最后一个匹配的元素
     */
    int left = 0, right = arr.size() - 1;
    int result = -1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            result = mid;
            left = mid + 1;  // 继续在右半部分查找
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

int main() {
    vector<int> numbers = {11, 12, 22, 25, 34, 64, 90};  // 已排序数组
    int target = 22;
    
    cout << "已排序数组: ";
    for (int n : numbers) cout << n << " ";
    cout << endl;
    cout << "搜索目标: " << target << endl;
    
    int index = binarySearch(numbers, target);
    if (index != -1) {
        cout << "二分搜索找到目标，索引: " << index << endl;
    } else {
        cout << "二分搜索未找到目标" << endl;
    }
    
    // 递归实现测试
    int indexRecursive = binarySearchRecursive(numbers, target, 0, numbers.size() - 1);
    cout << "递归二分搜索结果: " << indexRecursive << endl;
    
    // 测试重复元素
    vector<int> arrWithDuplicates = {1, 2, 2, 2, 3, 4, 4, 5};
    int targetDup = 2;
    int first = binarySearchFirst(arrWithDuplicates, targetDup);
    int last = binarySearchLast(arrWithDuplicates, targetDup);
    cout << "\n数组: ";
    for (int n : arrWithDuplicates) cout << n << " ";
    cout << endl;
    cout << "查找" << targetDup << " - 第一个位置: " << first << ", 最后一个位置: " << last << endl;
    
    // 性能测试
    vector<int> largeArr;
    for (int i = 0; i < 100000; i++) {
        largeArr.push_back(i);
    }
    int largeTarget = 50000;
    
    auto start = high_resolution_clock::now();
    int linearResult = linearSearch(largeArr, largeTarget);
    auto end = high_resolution_clock::now();
    auto linearTime = duration_cast<microseconds>(end - start);
    
    start = high_resolution_clock::now();
    int binaryResult = binarySearch(largeArr, largeTarget);
    end = high_resolution_clock::now();
    auto binaryTime = duration_cast<microseconds>(end - start);
    
    cout << "\n性能测试 (数组大小: 100000):" << endl;
    cout << "线性搜索: " << linearTime.count() << "微秒, 结果: " << linearResult << endl;
    cout << "二分搜索: " << binaryTime.count() << "微秒, 结果: " << binaryResult << endl;
    cout << "性能提升: " << (double)linearTime.count() / binaryTime.count() << "倍" << endl;
    
    return 0;
}
```

---

## 4. 插值搜索

### 算法原理
插值搜索是二分搜索的改进版本，它根据目标值与数组首尾元素的相对位置来预测目标值的位置，适用于元素分布相对均匀的已排序数组。

### Python实现

```python
def interpolation_search(arr, target):
    """
    插值搜索 - Python实现
    时间复杂度: 平均O(log log n)，最坏O(n)
    空间复杂度: O(1)
    """
    left = 0
    right = len(arr) - 1
    
    while left <= right and target >= arr[left] and target <= arr[right]:
        # 如果数组只有一个元素
        if left == right:
            if arr[left] == target:
                return left
            return -1
        
        # 计算插值位置
        pos = left + int(((target - arr[left]) / (arr[right] - arr[left])) * (right - left))
        
        # 防止pos超出范围
        pos = max(left, min(pos, right))
        
        if arr[pos] == target:
            return pos
        elif arr[pos] < target:
            left = pos + 1
        else:
            right = pos - 1
    
    return -1

def interpolation_search_with_stats(arr, target):
    """
    插值搜索 - 带统计信息的版本
    """
    left = 0
    right = len(arr) - 1
    comparisons = 0
    
    while left <= right and target >= arr[left] and target <= arr[right]:
        comparisons += 1
        
        if left == right:
            if arr[left] == target:
                return left, comparisons
            return -1, comparisons
        
        # 计算插值位置
        pos = left + int(((target - arr[left]) / (arr[right] - arr[left])) * (right - left))
        pos = max(left, min(pos, right))
        
        print(f"比较次数: {comparisons}, 搜索位置: {pos}, 值: {arr[pos]}")
        
        if arr[pos] == target:
            return pos, comparisons
        elif arr[pos] < target:
            left = pos + 1
        else:
            right = pos - 1
    
    return -1, comparisons

# 测试
numbers = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
target = 70

print("数组:", numbers)
print(f"搜索目标: {target}")

index = interpolation_search(numbers, target)
if index != -1:
    print(f"插值搜索找到目标，索引: {index}")
else:
    print("插值搜索未找到目标")

print("\n详细搜索过程:")
index, comparisons = interpolation_search_with_stats(numbers, target)
print(f"结果: {'找到' if index != -1 else '未找到'}, 比较次数: {comparisons}")
```

### C++实现

```cpp
#include <iostream>
#include <vector>
using namespace std;

int interpolationSearch(const vector<int>& arr, int target) {
    /*
     * 插值搜索 - C++实现
     * 时间复杂度: 平均O(log log n)，最坏O(n)
     * 空间复杂度: O(1)
     */
    int left = 0;
    int right = arr.size() - 1;
    
    while (left <= right && target >= arr[left] && target <= arr[right]) {
        // 如果数组只有一个元素
        if (left == right) {
            if (arr[left] == target) {
                return left;
            }
            return -1;
        }
        
        // 计算插值位置
        int pos = left + ((target - arr[left]) * (right - left)) / (arr[right] - arr[left]);
        
        // 防止pos超出范围
        pos = max(left, min(pos, right));
        
        if (arr[pos] == target) {
            return pos;
        } else if (arr[pos] < target) {
            left = pos + 1;
        } else {
            right = pos - 1;
        }
    }
    
    return -1;
}

pair<int, int> interpolationSearchWithStats(const vector<int>& arr, int target) {
    /*
     * 插值搜索 - 带统计信息的版本
     */
    int left = 0;
    int right = arr.size() - 1;
    int comparisons = 0;
    
    while (left <= right && target >= arr[left] && target <= arr[right]) {
        comparisons++;
        
        if (left == right) {
            if (arr[left] == target) {
                return make_pair(left, comparisons);
            }
            return make_pair(-1, comparisons);
        }
        
        // 计算插值位置
        int pos = left + ((target - arr[left]) * (right - left)) / (arr[right] - arr[left]);
        pos = max(left, min(pos, right));
        
        cout << "比较次数: " << comparisons << ", 搜索位置: " << pos 
             << ", 值: " << arr[pos] << endl;
        
        if (arr[pos] == target) {
            return make_pair(pos, comparisons);
        } else if (arr[pos] < target) {
            left = pos + 1;
        } else {
            right = pos - 1;
        }
    }
    
    return make_pair(-1, comparisons);
}

int main() {
    vector<int> numbers = {10, 20, 30, 40, 50, 60, 70, 80, 90, 100};
    int target = 70;
    
    cout << "数组: ";
    for (int n : numbers) cout << n << " ";
    cout << endl;
    cout << "搜索目标: " << target << endl;
    
    int index = interpolationSearch(numbers, target);
    if (index != -1) {
        cout << "插值搜索找到目标，索引: " << index << endl;
    } else {
        cout << "插值搜索未找到目标" << endl;
    }
    
    cout << "\n详细搜索过程:" << endl;
    pair<int, int> result = interpolationSearchWithStats(numbers, target);
    cout << "结果: " << (result.first != -1 ? "找到" : "未找到") 
         << ", 比较次数: " << result.second << endl;
    
    return 0;
}
```

---

## 5. 指数搜索

### 算法原理
指数搜索（也称为倍增搜索）首先确定目标值可能存在的范围，然后在这个范围内使用二分搜索。它特别适用于无界或非常大的数组。

### Python实现

```python
def binary_search_range(arr, target, left, right):
    """
    在指定范围内进行二分搜索
    """
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1

def exponential_search(arr, target):
    """
    指数搜索 - Python实现
    时间复杂度: O(log n)
    空间复杂度: O(1)
    """
    if not arr:
        return -1
    
    # 如果第一个元素就是目标
    if arr[0] == target:
        return 0
    
    # 找到目标值可能存在的范围
    i = 1
    while i < len(arr) and arr[i] <= target:
        i *= 2  # 指数增长
    
    # 在找到的范围内进行二分搜索
    return binary_search_range(arr, target, i // 2, min(i, len(arr) - 1))

def exponential_search_with_stats(arr, target):
    """
    指数搜索 - 带统计信息的版本
    """
    if not arr:
        return -1, 0
    
    comparisons = 0
    
    # 如果第一个元素就是目标
    if arr[0] == target:
        return 0, 1
    
    # 找到目标值可能存在的范围
    i = 1
    while i < len(arr) and arr[i] <= target:
        comparisons += 1
        print(f"检查位置 {i}, 值: {arr[i]}")
        i *= 2  # 指数增长
    
    print(f"目标范围: [{i//2}, {min(i, len(arr)-1)}]")
    
    # 在找到的范围内进行二分搜索
    result = binary_search_range(arr, target, i // 2, min(i, len(arr) - 1))
    return result, comparisons + 1  # +1 for the binary search

# 测试
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
target = 15

print("数组:", numbers)
print(f"搜索目标: {target}")

index = exponential_search(numbers, target)
if index != -1:
    print(f"指数搜索找到目标，索引: {index}")
else:
    print("指数搜索未找到目标")

print("\n详细搜索过程:")
index, comparisons = exponential_search_with_stats(numbers, target)
print(f"结果: {'找到' if index != -1 else '未找到'}, 总比较次数: {comparisons}")

# 测试大数组
large_numbers = list(range(0, 1000000, 10))  # 0, 10, 20, ..., 999990
large_target = 500000

import time
start_time = time.time()
large_index = exponential_search(large_numbers, large_target)
end_time = time.time()

print(f"\n大数组搜索测试 (大小: {len(large_numbers)}):")
print(f"搜索 {large_target}, 结果: {'找到' if large_index != -1 else '未找到'}, 索引: {large_index}")
print(f"耗时: {end_time - start_time:.6f}秒")
```

### C++实现

```cpp
#include <iostream>
#include <vector>
#include <climits>
using namespace std;

int binarySearchRange(const vector<int>& arr, int target, int left, int right) {
    /*
     * 在指定范围内进行二分搜索
     */
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

int exponentialSearch(const vector<int>& arr, int target) {
    /*
     * 指数搜索 - C++实现
     * 时间复杂度: O(log n)
     * 空间复杂度: O(1)
     */
    if (arr.empty()) {
        return -1;
    }
    
    // 如果第一个元素就是目标
    if (arr[0] == target) {
        return 0;
    }
    
    // 找到目标值可能存在的范围
    int i = 1;
    while (i < arr.size() && arr[i] <= target) {
        i *= 2;  // 指数增长
    }
    
    // 在找到的范围内进行二分搜索
    return binarySearchRange(arr, target, i / 2, min(i, (int)arr.size() - 1));
}

pair<int, int> exponentialSearchWithStats(const vector<int>& arr, int target) {
    /*
     * 指数搜索 - 带统计信息的版本
     */
    if (arr.empty()) {
        return make_pair(-1, 0);
    }
    
    int comparisons = 0;
    
    // 如果第一个元素就是目标
    if (arr[0] == target) {
        return make_pair(0, 1);
    }
    
    // 找到目标值可能存在的范围
    int i = 1;
    while (i < arr.size() && arr[i] <= target) {
        comparisons++;
        cout << "检查位置 " << i << ", 值: " << arr[i] << endl;
        i *= 2;  // 指数增长
    }
    
    cout << "目标范围: [" << i/2 << ", " << min(i, (int)arr.size()-1) << "]" << endl;
    
    // 在找到的范围内进行二分搜索
    int result = binarySearchRange(arr, target, i / 2, min(i, (int)arr.size() - 1));
    return make_pair(result, comparisons + 1);  // +1 for the binary search
}

int main() {
    vector<int> numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20};
    int target = 15;
    
    cout << "数组: ";
    for (int n : numbers) cout << n << " ";
    cout << endl;
    cout << "搜索目标: " << target << endl;
    
    int index = exponentialSearch(numbers, target);
    if (index != -1) {
        cout << "指数搜索找到目标，索引: " << index << endl;
    } else {
        cout << "指数搜索未找到目标" << endl;
    }
    
    cout << "\n详细搜索过程:" << endl;
    pair<int, int> result = exponentialSearchWithStats(numbers, target);
    cout << "结果: " << (result.first != -1 ? "找到" : "未找到") 
         << ", 总比较次数: " << result.second << endl;
    
    return 0;
}
```

---

## 6. 搜索算法比较

### 算法选择指南

| 数据特征 | 推荐算法 | 原因 |
|----------|----------|------|
| 无序小数组 | 线性搜索 | 实现简单，常数因子小 |
| 有序数组 | 二分搜索 | 性能优秀，O(log n) |
| 均匀分布数据 | 插值搜索 | 平均O(log log n) |
| 无界或大数组 | 指数搜索 | 结合了线性搜索的范围确定和二分搜索的高效性 |
| 频繁搜索 | 先排序再二分搜索 | 预处理成本摊销 |

### 综合性能测试

```python
import time
import random

def comprehensive_search_test():
    """综合搜索算法性能测试"""
    sizes = [1000, 10000, 100000]
    
    for size in sizes:
        print(f"\n测试数组大小: {size}")
        
        # 创建已排序数组
        sorted_arr = list(range(0, size * 2, 2))  # 偶数数组
        target = random.choice(sorted_arr)  # 随机选择一个目标
        
        algorithms = [
            ("线性搜索", linear_search),
            ("二分搜索", binary_search),
            ("插值搜索", interpolation_search),
            ("指数搜索", exponential_search)
        ]
        
        for name, func in algorithms:
            start_time = time.time()
            result = func(sorted_arr, target)
            end_time = time.time()
            
            print(f"{name}: {end_time - start_time:.6f}秒, 结果: {result}")

# 运行综合测试（取消注释以运行）
# comprehensive_search_test()
```

### 算法优缺点总结

| 算法 | 优点 | 缺点 | 适用场景 |
|------|------|------|----------|
| 线性搜索 | 实现简单，适用于任何数据 | 时间复杂度高O(n) | 小数组，无序数据 |
| 二分搜索 | 时间复杂度低O(log n) | 需要已排序数据 | 有序数组，频繁搜索 |
| 插值搜索 | 对均匀分布数据性能极佳 | 对非均匀分布数据性能差 | 均匀分布的有序数据 |
| 指数搜索 | 适用于无界数组 | 实现相对复杂 | 大数组，无界数组 |

### 实际应用示例

```python
class SearchableDatabase:
    """
    模拟一个可搜索的数据库
    """
    def __init__(self, data):
        self.data = sorted(data)  # 内部保持排序
    
    def search(self, target, method='binary'):
        """
        根据不同方法搜索
        """
        if method == 'linear':
            return linear_search(self.data, target)
        elif method == 'binary':
            return binary_search(self.data, target)
        elif method == 'interpolation':
            return interpolation_search(self.data, target)
        elif method == 'exponential':
            return exponential_search(self.data, target)
        else:
            raise ValueError("不支持的搜索方法")
    
    def range_search(self, min_val, max_val):
        """
        范围搜索
        """
        # 找到第一个大于等于min_val的元素
        start = binary_search_first(self.data, min_val)
        if start == -1:
            # 如果没找到，找到第一个大于min_val的元素
            start = 0
            while start < len(self.data) and self.data[start] < min_val:
                start += 1
        
        # 找到最后一个小于等于max_val的元素
        end = binary_search_last(self.data, max_val)
        if end == -1:
            # 如果没找到，找到最后一个小于max_val的元素
            end = len(self.data) - 1
            while end >= 0 and self.data[end] > max_val:
                end -= 1
        
        if start <= end:
            return self.data[start:end+1]
        else:
            return []

# 测试数据库搜索
db = SearchableDatabase([5, 15, 25, 35, 45, 55, 65, 75, 85, 95])
print("数据库内容:", db.data)

# 不同方法搜索
target = 35
for method in ['linear', 'binary', 'interpolation', 'exponential']:
    result = db.search(target, method)
    print(f"{method}搜索{target}: 索引{result}")

# 范围搜索
range_result = db.range_search(25, 65)
print(f"范围搜索[25, 65]: {range_result}")
```

---

## 练习题

1. 实现一个搜索算法，可以在旋转排序数组中搜索目标值
2. 编写一个算法，在二维有序矩阵中搜索目标值（每行和每列都已排序）
3. 实现跳跃搜索算法，并与二分搜索进行性能比较
4. 创建一个搜索算法，可以处理包含重复元素的数组，返回所有匹配元素的索引
5. 实现一个自适应搜索算法，根据数据特征自动选择最优搜索策略

---

## 总结

搜索算法是计算机科学中的基础算法之一，选择合适的搜索算法可以显著提高程序性能：

1. **线性搜索**：最简单，适用于小数据集或无序数据
2. **二分搜索**：高效，适用于已排序数据
3. **插值搜索**：对均匀分布数据性能极佳
4. **指数搜索**：适用于大数组或无界数组

在实际应用中，应根据数据特征和使用场景选择最合适的搜索算法。
