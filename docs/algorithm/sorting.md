# 排序算法

## 目录
1. [排序算法概述](#1-排序算法概述)
2. [冒泡排序](#2-冒泡排序)
3. [选择排序](#3-选择排序)
4. [插入排序](#4-插入排序)
5. [快速排序](#5-快速排序)
6. [归并排序](#6-归并排序)
7. [堆排序](#7-堆排序)
8. [计数排序](#8-计数排序)
9. [排序算法比较](#9-排序算法比较)

---

## 1. 排序算法概述

### 排序的定义
排序是将一组数据按照特定顺序（通常是升序或降序）进行排列的过程。

### 排序算法分类
- **比较排序**：通过比较元素大小来决定顺序（如快速排序、归并排序）
- **非比较排序**：不通过比较元素大小来决定顺序（如计数排序、基数排序）

### 时间复杂度对比
| 算法 | 最好情况 | 平均情况 | 最坏情况 | 空间复杂度 | 稳定性 |
|------|----------|----------|----------|------------|--------|
| 冒泡排序 | O(n) | O(n²) | O(n²) | O(1) | 稳定 |
| 选择排序 | O(n²) | O(n²) | O(n²) | O(1) | 不稳定 |
| 插入排序 | O(n) | O(n²) | O(n²) | O(1) | 稳定 |
| 快速排序 | O(n log n) | O(n log n) | O(n²) | O(log n) | 不稳定 |
| 归并排序 | O(n log n) | O(n log n) | O(n log n) | O(n) | 稳定 |
| 堆排序 | O(n log n) | O(n log n) | O(n log n) | O(1) | 不稳定 |
| 计数排序 | O(n+k) | O(n+k) | O(n+k) | O(k) | 稳定 |

---

## 2. 冒泡排序

### 算法原理
冒泡排序通过重复遍历数组，比较相邻元素并交换位置，使较大的元素逐渐"冒泡"到数组末尾。

### Python实现

```python
def bubble_sort(arr):
    """
    冒泡排序 - Python实现
    时间复杂度: O(n²)
    空间复杂度: O(1)
    """
    n = len(arr)
    
    # 外层循环控制排序轮数
    for i in range(n):
        # 标记本轮是否发生交换
        swapped = False
        
        # 内层循环进行相邻元素比较
        # 每轮后最大元素会移到正确位置，所以范围逐渐缩小
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                # 交换相邻元素
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        # 如果本轮没有交换，说明已经有序
        if not swapped:
            break
    
    return arr

# 测试
numbers = [64, 34, 25, 12, 22, 11, 90]
print("原数组:", numbers)
sorted_numbers = bubble_sort(numbers.copy())
print("排序后:", sorted_numbers)
```

### C++实现

```cpp
#include <iostream>
#include <vector>
using namespace std;

vector<int> bubbleSort(vector<int> arr) {
    int n = arr.size();
    
    // 外层循环控制排序轮数
    for (int i = 0; i < n; i++) {
        bool swapped = false;  // 标记本轮是否发生交换
        
        // 内层循环进行相邻元素比较
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // 交换相邻元素
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        
        // 如果本轮没有交换，说明已经有序
        if (!swapped) {
            break;
        }
    }
    
    return arr;
}

int main() {
    vector<int> numbers = {64, 34, 25, 12, 22, 11, 90};
    
    cout << "原数组: ";
    for (int n : numbers) cout << n << " ";
    cout << endl;
    
    vector<int> sorted = bubbleSort(numbers);
    
    cout << "排序后: ";
    for (int n : sorted) cout << n << " ";
    cout << endl;
    
    return 0;
}
```

---

## 3. 选择排序

### 算法原理
选择排序每次从未排序部分选择最小（或最大）元素，放到已排序部分的末尾。

### Python实现

```python
def selection_sort(arr):
    """
    选择排序 - Python实现
    时间复杂度: O(n²)
    空间复杂度: O(1)
    """
    n = len(arr)
    
    # 遍历数组的每个位置
    for i in range(n):
        # 找到未排序部分的最小元素索引
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        
        # 将最小元素与当前位置交换
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    
    return arr

# 测试
numbers = [64, 34, 25, 12, 22, 11, 90]
print("原数组:", numbers)
sorted_numbers = selection_sort(numbers.copy())
print("排序后:", sorted_numbers)
```

### C++实现

```cpp
#include <iostream>
#include <vector>
using namespace std;

vector<int> selectionSort(vector<int> arr) {
    int n = arr.size();
    
    // 遍历数组的每个位置
    for (int i = 0; i < n; i++) {
        // 找到未排序部分的最小元素索引
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        
        // 将最小元素与当前位置交换
        swap(arr[i], arr[minIdx]);
    }
    
    return arr;
}

int main() {
    vector<int> numbers = {64, 34, 25, 12, 22, 11, 90};
    
    cout << "原数组: ";
    for (int n : numbers) cout << n << " ";
    cout << endl;
    
    vector<int> sorted = selectionSort(numbers);
    
    cout << "排序后: ";
    for (int n : sorted) cout << n << " ";
    cout << endl;
    
    return 0;
}
```

---

## 4. 插入排序

### 算法原理
插入排序将数组分为已排序和未排序两部分，每次从未排序部分取一个元素插入到已排序部分的正确位置。

### Python实现

```python
def insertion_sort(arr):
    """
    插入排序 - Python实现
    时间复杂度: O(n²)
    空间复杂度: O(1)
    """
    # 从第二个元素开始，逐个插入到前面已排序的部分
    for i in range(1, len(arr)):
        key = arr[i]  # 当前要插入的元素
        j = i - 1     # 已排序部分的最后一个元素索引
        
        # 将大于key的元素向后移动
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        
        # 插入key到正确位置
        arr[j + 1] = key
    
    return arr

# 测试
numbers = [64, 34, 25, 12, 22, 11, 90]
print("原数组:", numbers)
sorted_numbers = insertion_sort(numbers.copy())
print("排序后:", sorted_numbers)
```

### C++实现

```cpp
#include <iostream>
#include <vector>
using namespace std;

vector<int> insertionSort(vector<int> arr) {
    int n = arr.size();
    
    // 从第二个元素开始，逐个插入到前面已排序的部分
    for (int i = 1; i < n; i++) {
        int key = arr[i];  // 当前要插入的元素
        int j = i - 1;     // 已排序部分的最后一个元素索引
        
        // 将大于key的元素向后移动
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        // 插入key到正确位置
        arr[j + 1] = key;
    }
    
    return arr;
}

int main() {
    vector<int> numbers = {64, 34, 25, 12, 22, 11, 90};
    
    cout << "原数组: ";
    for (int n : numbers) cout << n << " ";
    cout << endl;
    
    vector<int> sorted = insertionSort(numbers);
    
    cout << "排序后: ";
    for (int n : sorted) cout << n << " ";
    cout << endl;
    
    return 0;
}
```

---

## 5. 快速排序

### 算法原理
快速排序采用分治策略，选择一个基准元素，将数组分为小于基准和大于基准的两部分，然后递归排序两部分。

### Python实现

```python
def quick_sort(arr):
    """
    快速排序 - Python实现
    时间复杂度: 平均O(n log n), 最坏O(n²)
    空间复杂度: O(log n)
    """
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]  # 选择中间元素作为基准
    left = [x for x in arr if x < pivot]      # 小于基准的元素
    middle = [x for x in arr if x == pivot]   # 等于基准的元素
    right = [x for x in arr if x > pivot]     # 大于基准的元素
    
    # 递归排序左右两部分，然后合并
    return quick_sort(left) + middle + quick_sort(right)

def quick_sort_inplace(arr, low=0, high=None):
    """
    原地快速排序 - Python实现
    """
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        # 分区操作，返回基准元素的最终位置
        pivot_index = partition(arr, low, high)
        
        # 递归排序基准左右两部分
        quick_sort_inplace(arr, low, pivot_index - 1)
        quick_sort_inplace(arr, pivot_index + 1, high)
    
    return arr

def partition(arr, low, high):
    """
    分区函数：将数组分为小于和大于基准的两部分
    """
    pivot = arr[high]  # 选择最后一个元素作为基准
    i = low - 1        # 小于基准的区域的边界
    
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]  # 交换元素
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]  # 将基准放到正确位置
    return i + 1

# 测试
numbers = [64, 34, 25, 12, 22, 11, 90]
print("原数组:", numbers)
sorted_numbers = quick_sort(numbers.copy())
print("排序后:", sorted_numbers)

numbers2 = [64, 34, 25, 12, 22, 11, 90]
quick_sort_inplace(numbers2)
print("原地排序后:", numbers2)
```

### C++实现

```cpp
#include <iostream>
#include <vector>
using namespace std;

int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];  // 选择最后一个元素作为基准
    int i = low - 1;        // 小于基准的区域的边界
    
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);  // 交换元素
        }
    }
    
    swap(arr[i + 1], arr[high]);  // 将基准放到正确位置
    return i + 1;
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        // 分区操作，返回基准元素的最终位置
        int pivotIndex = partition(arr, low, high);
        
        // 递归排序基准左右两部分
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
}

vector<int> quickSort(vector<int> arr) {
    quickSort(arr, 0, arr.size() - 1);
    return arr;
}

int main() {
    vector<int> numbers = {64, 34, 25, 12, 22, 11, 90};
    
    cout << "原数组: ";
    for (int n : numbers) cout << n << " ";
    cout << endl;
    
    vector<int> sorted = quickSort(numbers);
    
    cout << "排序后: ";
    for (int n : sorted) cout << n << " ";
    cout << endl;
    
    return 0;
}
```

---

## 6. 归并排序

### 算法原理
归并排序采用分治策略，将数组分成两半，递归排序两半，然后合并两个已排序的部分。

### Python实现

```python
def merge_sort(arr):
    """
    归并排序 - Python实现
    时间复杂度: O(n log n)
    空间复杂度: O(n)
    """
    if len(arr) <= 1:
        return arr
    
    # 分割数组
    mid = len(arr) // 2
    left = arr[:mid]
    right = arr[mid:]
    
    # 递归排序两半
    left = merge_sort(left)
    right = merge_sort(right)
    
    # 合并已排序的两半
    return merge(left, right)

def merge(left, right):
    """
    合并两个已排序的数组
    """
    result = []
    i = j = 0
    
    # 比较两个数组的元素，将较小的添加到结果中
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    # 添加剩余元素
    result.extend(left[i:])
    result.extend(right[j:])
    
    return result

# 测试
numbers = [64, 34, 25, 12, 22, 11, 90]
print("原数组:", numbers)
sorted_numbers = merge_sort(numbers)
print("排序后:", sorted_numbers)
```

### C++实现

```cpp
#include <iostream>
#include <vector>
using namespace std;

vector<int> merge(const vector<int>& left, const vector<int>& right) {
    vector<int> result;
    int i = 0, j = 0;
    
    // 比较两个数组的元素，将较小的添加到结果中
    while (i < left.size() && j < right.size()) {
        if (left[i] <= right[j]) {
            result.push_back(left[i]);
            i++;
        } else {
            result.push_back(right[j]);
            j++;
        }
    }
    
    // 添加剩余元素
    while (i < left.size()) {
        result.push_back(left[i]);
        i++;
    }
    while (j < right.size()) {
        result.push_back(right[j]);
        j++;
    }
    
    return result;
}

vector<int> mergeSort(vector<int> arr) {
    if (arr.size() <= 1) {
        return arr;
    }
    
    // 分割数组
    int mid = arr.size() / 2;
    vector<int> left(arr.begin(), arr.begin() + mid);
    vector<int> right(arr.begin() + mid, arr.end());
    
    // 递归排序两半
    left = mergeSort(left);
    right = mergeSort(right);
    
    // 合并已排序的两半
    return merge(left, right);
}

int main() {
    vector<int> numbers = {64, 34, 25, 12, 22, 11, 90};
    
    cout << "原数组: ";
    for (int n : numbers) cout << n << " ";
    cout << endl;
    
    vector<int> sorted = mergeSort(numbers);
    
    cout << "排序后: ";
    for (int n : sorted) cout << n << " ";
    cout << endl;
    
    return 0;
}
```

---

## 7. 堆排序

### 算法原理
堆排序利用堆这种数据结构进行排序。首先构建最大堆，然后重复将堆顶元素与末尾元素交换并重新调整堆。

### Python实现

```python
def heap_sort(arr):
    """
    堆排序 - Python实现
    时间复杂度: O(n log n)
    空间复杂度: O(1)
    """
    def heapify(arr, n, i):
        """
        调整堆，使其满足最大堆性质
        """
        largest = i  # 初始化最大值为根节点
        left = 2 * i + 1     # 左子节点
        right = 2 * i + 2    # 右子节点
        
        # 如果左子节点存在且大于根节点
        if left < n and arr[left] > arr[largest]:
            largest = left
        
        # 如果右子节点存在且大于当前最大值
        if right < n and arr[right] > arr[largest]:
            largest = right
        
        # 如果最大值不是根节点，则交换并继续调整
        if largest != i:
            arr[i], arr[largest] = arr[largest], arr[i]
            heapify(arr, n, largest)
    
    n = len(arr)
    
    # 构建最大堆
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    # 逐个提取元素
    for i in range(n - 1, 0, -1):
        # 将当前最大元素移到末尾
        arr[0], arr[i] = arr[i], arr[0]
        # 重新调整堆
        heapify(arr, i, 0)
    
    return arr

# 测试
numbers = [64, 34, 25, 12, 22, 11, 90]
print("原数组:", numbers)
sorted_numbers = heap_sort(numbers.copy())
print("排序后:", sorted_numbers)
```

### C++实现

```cpp
#include <iostream>
#include <vector>
using namespace std;

void heapify(vector<int>& arr, int n, int i) {
    int largest = i;  // 初始化最大值为根节点
    int left = 2 * i + 1;   // 左子节点
    int right = 2 * i + 2;  // 右子节点
    
    // 如果左子节点存在且大于根节点
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    
    // 如果右子节点存在且大于当前最大值
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    // 如果最大值不是根节点，则交换并继续调整
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

vector<int> heapSort(vector<int> arr) {
    int n = arr.size();
    
    // 构建最大堆
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    // 逐个提取元素
    for (int i = n - 1; i > 0; i--) {
        // 将当前最大元素移到末尾
        swap(arr[0], arr[i]);
        // 重新调整堆
        heapify(arr, i, 0);
    }
    
    return arr;
}

int main() {
    vector<int> numbers = {64, 34, 25, 12, 22, 11, 90};
    
    cout << "原数组: ";
    for (int n : numbers) cout << n << " ";
    cout << endl;
    
    vector<int> sorted = heapSort(numbers);
    
    cout << "排序后: ";
    for (int n : sorted) cout << n << " ";
    cout << endl;
    
    return 0;
}
```

---

## 8. 计数排序

### 算法原理
计数排序不是基于比较的排序算法，它通过统计每个元素出现的次数来实现排序，适用于数据范围较小的情况。

### Python实现

```python
def counting_sort(arr):
    """
    计数排序 - Python实现
    时间复杂度: O(n + k)，其中k是数据范围
    空间复杂度: O(k)
    """
    if not arr:
        return arr
    
    # 找到最大值和最小值
    max_val = max(arr)
    min_val = min(arr)
    range_val = max_val - min_val + 1
    
    # 创建计数数组
    count = [0] * range_val
    
    # 统计每个元素出现的次数
    for num in arr:
        count[num - min_val] += 1
    
    # 重构数组
    result = []
    for i in range(range_val):
        result.extend([i + min_val] * count[i])
    
    return result

def counting_sort_stable(arr):
    """
    稳定的计数排序 - Python实现
    """
    if not arr:
        return arr
    
    max_val = max(arr)
    min_val = min(arr)
    range_val = max_val - min_val + 1
    
    # 创建计数数组
    count = [0] * range_val
    
    # 统计每个元素出现的次数
    for num in arr:
        count[num - min_val] += 1
    
    # 将计数数组转换为实际位置
    for i in range(1, range_val):
        count[i] += count[i - 1]
    
    # 创建输出数组
    output = [0] * len(arr)
    
    # 从后往前遍历原数组，确保稳定性
    for i in range(len(arr) - 1, -1, -1):
        output[count[arr[i] - min_val] - 1] = arr[i]
        count[arr[i] - min_val] -= 1
    
    return output

# 测试
numbers = [4, 2, 2, 8, 3, 3, 1]
print("原数组:", numbers)
sorted_numbers = counting_sort(numbers.copy())
print("排序后:", sorted_numbers)

sorted_stable = counting_sort_stable(numbers.copy())
print("稳定排序后:", sorted_stable)
```

### C++实现

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<int> countingSort(vector<int> arr) {
    if (arr.empty()) {
        return arr;
    }
    
    // 找到最大值和最小值
    int max_val = *max_element(arr.begin(), arr.end());
    int min_val = *min_element(arr.begin(), arr.end());
    int range_val = max_val - min_val + 1;
    
    // 创建计数数组
    vector<int> count(range_val, 0);
    
    // 统计每个元素出现的次数
    for (int num : arr) {
        count[num - min_val]++;
    }
    
    // 重构数组
    vector<int> result;
    for (int i = 0; i < range_val; i++) {
        result.insert(result.end(), count[i], i + min_val);
    }
    
    return result;
}

vector<int> countingSortStable(vector<int> arr) {
    if (arr.empty()) {
        return arr;
    }
    
    int max_val = *max_element(arr.begin(), arr.end());
    int min_val = *min_element(arr.begin(), arr.end());
    int range_val = max_val - min_val + 1;
    
    // 创建计数数组
    vector<int> count(range_val, 0);
    
    // 统计每个元素出现的次数
    for (int num : arr) {
        count[num - min_val]++;
    }
    
    // 将计数数组转换为实际位置
    for (int i = 1; i < range_val; i++) {
        count[i] += count[i - 1];
    }
    
    // 创建输出数组
    vector<int> output(arr.size());
    
    // 从后往前遍历原数组，确保稳定性
    for (int i = arr.size() - 1; i >= 0; i--) {
        output[count[arr[i] - min_val] - 1] = arr[i];
        count[arr[i] - min_val]--;
    }
    
    return output;
}

int main() {
    vector<int> numbers = {4, 2, 2, 8, 3, 3, 1};
    
    cout << "原数组: ";
    for (int n : numbers) cout << n << " ";
    cout << endl;
    
    vector<int> sorted = countingSort(numbers);
    
    cout << "排序后: ";
    for (int n : sorted) cout << n << " ";
    cout << endl;
    
    vector<int> stable_sorted = countingSortStable(numbers);
    
    cout << "稳定排序后: ";
    for (int n : stable_sorted) cout << n << " ";
    cout << endl;
    
    return 0;
}
```

---

## 9. 排序算法比较

### 性能对比测试

```python
import time
import random

def performance_test():
    """性能测试函数"""
    sizes = [100, 1000, 5000]
    
    for size in sizes:
        print(f"\n测试数组大小: {size}")
        
        # 生成随机数组
        original_arr = [random.randint(1, 1000) for _ in range(size)]
        
        algorithms = [
            ("冒泡排序", bubble_sort),
            ("选择排序", selection_sort),
            ("插入排序", insertion_sort),
            ("快速排序", lambda x: quick_sort(x)),
            ("归并排序", merge_sort),
            ("堆排序", heap_sort),
            ("计数排序", counting_sort)
        ]
        
        for name, func in algorithms:
            arr_copy = original_arr.copy()
            start_time = time.time()
            func(arr_copy)
            end_time = time.time()
            
            print(f"{name}: {end_time - start_time:.4f}秒")

# 运行性能测试（取消注释以运行）
# performance_test()
```

### 算法选择指南

| 数据特征 | 推荐算法 | 原因 |
|----------|----------|------|
| 小数据集(n < 50) | 插入排序 | 简单高效，对小数据集性能好 |
| 几乎有序 | 插入排序 | 时间复杂度接近O(n) |
| 需要稳定排序 | 归并排序 | 稳定且性能好 |
| 内存受限 | 堆排序 | 空间复杂度O(1) |
| 数据范围小 | 计数排序 | 时间复杂度O(n+k) |
| 一般情况 | 快速排序 | 平均性能最好 |

### 总结

1. **冒泡排序**：简单但效率低，适合教学
2. **选择排序**：简单，但不稳定
3. **插入排序**：对小数据集或近似有序数据效率高
4. **快速排序**：平均性能最好，但最坏情况性能差
5. **归并排序**：性能稳定，适合大数据集
6. **堆排序**：性能稳定，空间效率高
7. **计数排序**：对特定数据范围效率极高

---

## 练习题

1. 实现一个混合排序算法：对于小数组使用插入排序，大数组使用快速排序
2. 编写一个可以自定义比较函数的通用排序函数
3. 实现三路快速排序（处理重复元素效率更高）
4. 比较各种排序算法在不同数据分布下的性能表现
5. 实现基数排序和桶排序，并与已实现的排序算法比较
