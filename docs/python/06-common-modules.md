# Python 常用模块

## 目录
1. [文件操作](#1-文件操作)
2. [os模块](#2-os模块)
3. [json模块](#3-json模块)
4. [正则表达式](#4-正则表达式)
5. [datetime模块](#5-datetime模块)
6. [collections模块](#6-collections模块)
7. [其他常用模块](#7-其他常用模块)
8. [完整示例](#8-完整示例)

---

## 1. 文件操作

### 打开文件

```python
# 语法: open(filename, mode, encoding)
# mode: 'r'读 'w'写 'a'追加 'r+'读写
# encoding: 'utf-8' 推荐

# 读取文件
file = open('test.txt', 'r', encoding='utf-8')
content = file.read()
file.close()

# 推荐: 使用with自动关闭
with open('test.txt', 'r', encoding='utf-8') as file:
    content = file.read()
# 自动关闭,无需file.close()
```

### 文件模式

| 模式 | 说明 | 文件不存在 |
|------|------|-----------|
| `r` | 只读 | 报错 |
| `w` | 写入(覆盖) | 创建 |
| `a` | 追加 | 创建 |
| `r+` | 读写 | 报错 |
| `w+` | 读写(覆盖) | 创建 |
| `rb` | 二进制读 | 报错 |
| `wb` | 二进制写 | 创建 |

### 读取文件

```python
# 读取全部内容
with open('test.txt', 'r', encoding='utf-8') as f:
    content = f.read()
    print(content)

# 按行读取
with open('test.txt', 'r', encoding='utf-8') as f:
    for line in f:
        print(line.strip())  # strip()去除换行符

# 读取所有行到列表
with open('test.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()
    print(lines)

# 读取一行
with open('test.txt', 'r', encoding='utf-8') as f:
    line = f.readline()
    print(line)
```

### 写入文件

```python
# 写入(覆盖)
with open('output.txt', 'w', encoding='utf-8') as f:
    f.write("Hello, World!\n")
    f.write("Python is awesome!")

# 追加
with open('output.txt', 'a', encoding='utf-8') as f:
    f.write("\nAppended line")

# 写入多行
lines = ["Line 1\n", "Line 2\n", "Line 3\n"]
with open('output.txt', 'w', encoding='utf-8') as f:
    f.writelines(lines)
```

### 文件操作示例

```python
# 读取并处理文件
def count_words(filename):
    """统计文件单词数"""
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
        words = content.split()
        return len(words)

# 复制文件
def copy_file(src, dst):
    """复制文件"""
    with open(src, 'r', encoding='utf-8') as f_src:
        content = f_src.read()
    
    with open(dst, 'w', encoding='utf-8') as f_dst:
        f_dst.write(content)

# 二进制文件复制
def copy_binary(src, dst):
    """复制二进制文件"""
    with open(src, 'rb') as f_src:
        with open(dst, 'wb') as f_dst:
            f_dst.write(f_src.read())
```

---

## 2. os模块

### 路径操作

```python
import os

# 当前工作目录
print(os.getcwd())  # /home/admin/workspace

# 改变工作目录
os.chdir('/tmp')

# 列出目录内容
print(os.listdir('.'))  # [' file1.txt', 'file2.py', ...]

# 路径拼接(自动处理分隔符)
path = os.path.join('folder', 'subfolder', 'file.txt')
# Windows: folder\subfolder\file.txt
# Linux: folder/subfolder/file.txt

# 路径分割
print(os.path.split('/home/admin/file.txt'))
# ('/home/admin', 'file.txt')

# 文件名和扩展名
print(os.path.splitext('file.txt'))
# ('file', '.txt')

# 获取目录名
print(os.path.dirname('/home/admin/file.txt'))
# /home/admin

# 获取文件名
print(os.path.basename('/home/admin/file.txt'))
# file.txt
```

### 路径判断

```python
import os

# 判断路径是否存在
print(os.path.exists('test.txt'))  # True/False

# 判断是否为文件
print(os.path.isfile('test.txt'))  # True/False

# 判断是否为目录
print(os.path.isdir('folder'))  # True/False

# 判断是否为绝对路径
print(os.path.isabs('/home/admin'))  # True

# 获取文件大小(字节)
print(os.path.getsize('test.txt'))

# 获取修改时间
print(os.path.getmtime('test.txt'))
```

### 目录操作

```python
import os

# 创建目录
os.mkdir('new_folder')

# 创建多级目录
os.makedirs('path/to/folder', exist_ok=True)

# 删除空目录
os.rmdir('empty_folder')

# 删除文件
os.remove('file.txt')

# 重命名
os.rename('old.txt', 'new.txt')

# 遍历目录树
for root, dirs, files in os.walk('.'):
    print(f"目录: {root}")
    print(f"  子目录: {dirs}")
    print(f"  文件: {files}")
```

### os.path 常用函数

| 函数 | 说明 | 示例 |
|------|------|------|
| `join(a, b)` | 拼接路径 | `os.path.join('a', 'b')` |
| `split(path)` | 分割路径 | `os.path.split('/a/b')` |
| `exists(path)` | 判断存在 | `os.path.exists('file')` |
| `isfile(path)` | 判断文件 | `os.path.isfile('test.txt')` |
| `isdir(path)` | 判断目录 | `os.path.isdir('folder')` |
| `getsize(path)` | 文件大小 | `os.path.getsize('file')` |
| `abspath(path)` | 绝对路径 | `os.path.abspath('.')` |

---

## 3. json模块

### JSON基础

```python
import json

# Python对象 → JSON字符串
data = {
    "name": "Alice",
    "age": 25,
    "hobbies": ["reading", "coding"],
    "married": False
}

json_str = json.dumps(data)
print(json_str)
# {"name": "Alice", "age": 25, "hobbies": ["reading", "coding"], "married": false}

# 格式化输出
json_str = json.dumps(data, indent=2, ensure_ascii=False)
print(json_str)
```

### 类型对应

| Python | JSON |
|--------|------|
| `dict` | `object` |
| `list`, `tuple` | `array` |
| `str` | `string` |
| `int`, `float` | `number` |
| `True` | `true` |
| `False` | `false` |
| `None` | `null` |

### JSON文件操作

```python
import json

# 写入JSON文件
data = {"name": "Alice", "age": 25}

with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

# 读取JSON文件
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
    print(data['name'])  # Alice

# JSON字符串 → Python对象
json_str = '{"name": "Bob", "age": 30}'
data = json.loads(json_str)
print(data['name'])  # Bob
```

### JSON实用示例

```python
import json

# 配置文件读写
def save_config(config, filename='config.json'):
    """保存配置"""
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(config, f, indent=2)

def load_config(filename='config.json'):
    """加载配置"""
    with open(filename, 'r', encoding='utf-8') as f:
        return json.load(f)

# 使用
config = {
    "host": "localhost",
    "port": 8080,
    "debug": True
}
save_config(config)
loaded = load_config()
print(loaded['host'])  # localhost
```

---

## 4. 正则表达式

### re模块基础

```python
import re

# 匹配模式
pattern = r'\d+'  # 匹配一个或多个数字
text = "There are 123 apples and 456 oranges"

# 查找第一个匹配
match = re.search(pattern, text)
if match:
    print(match.group())  # 123

# 查找所有匹配
matches = re.findall(pattern, text)
print(matches)  # ['123', '456']

# 匹配并分组
pattern = r'(\d+) (\w+)'
matches = re.findall(pattern, text)
print(matches)  # [('123', 'apples'), ('456', 'oranges')]
```

### 常用元字符

| 元字符 | 说明 | 示例 |
|--------|------|------|
| `.` | 任意字符 | `a.c` 匹配 `abc` |
| `^` | 行首 | `^abc` |
| `$` | 行尾 | `abc$` |
| `*` | 0次或多次 | `ab*c` |
| `+` | 1次或多次 | `ab+c` |
| `?` | 0次或1次 | `ab?c` |
| `{n}` | 恰好n次 | `a{3}` |
| `{n,m}` | n到m次 | `a{2,4}` |
| `\d` | 数字 | `[0-9]` |
| `\w` | 字母数字下划线 | `[a-zA-Z0-9_]` |
| `\s` | 空白字符 | `[ \t\n\r]` |
| `[...]` | 字符集 | `[abc]` |
| `\|` | 或 | `a\|b` |

### 常用方法

```python
import re

text = "Email: alice@example.com, bob@test.com"

# search: 查找第一个匹配
match = re.search(r'\w+@\w+\.\w+', text)
if match:
    print(match.group())  # alice@example.com

# findall: 查找所有匹配
emails = re.findall(r'\w+@\w+\.\w+', text)
print(emails)  # ['alice@example.com', 'bob@test.com']

# sub: 替换
text = "Phone: 123-456-7890"
new_text = re.sub(r'\d', '*', text)
print(new_text)  # Phone: ***-***-****

# split: 分割
text = "apple,banana;orange:grape"
fruits = re.split(r'[,;:]', text)
print(fruits)  # ['apple', 'banana', 'orange', 'grape']

# match: 从头匹配
if re.match(r'^\d+', '123abc'):
    print("以数字开头")
```

### 实用示例

```python
import re

# 验证邮箱
def is_valid_email(email):
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return bool(re.match(pattern, email))

print(is_valid_email("alice@example.com"))  # True
print(is_valid_email("invalid.email"))      # False

# 验证手机号(中国)
def is_valid_phone(phone):
    pattern = r'^1[3-9]\d{9}$'
    return bool(re.match(pattern, phone))

print(is_valid_phone("13812345678"))  # True
print(is_valid_phone("12345678901"))  # False

# 提取URL
def extract_urls(text):
    pattern = r'https?://[\w\.-]+\.\w+[^\s]*'
    return re.findall(pattern, text)

text = "Visit https://www.python.org and http://github.com"
print(extract_urls(text))
# ['https://www.python.org', 'http://github.com']
```

---

## 5. datetime模块

### 获取当前时间

```python
from datetime import datetime, date, time

# 当前日期和时间
now = datetime.now()
print(now)  # 2025-11-15 13:00:00.123456

# 当前日期
today = date.today()
print(today)  # 2025-11-15

# 当前时间
current_time = datetime.now().time()
print(current_time)  # 13:00:00.123456
```

### 创建日期时间

```python
from datetime import datetime, date, time

# 创建日期
d = date(2025, 11, 15)
print(d)  # 2025-11-15

# 创建时间
t = time(14, 30, 0)
print(t)  # 14:30:00

# 创建日期时间
dt = datetime(2025, 11, 15, 14, 30, 0)
print(dt)  # 2025-11-15 14:30:00
```

### 格式化输出

```python
from datetime import datetime

now = datetime.now()

# strftime: 格式化输出
print(now.strftime("%Y-%m-%d"))           # 2025-11-15
print(now.strftime("%Y/%m/%d %H:%M:%S"))  # 2025/11/15 13:00:00
print(now.strftime("%Y年%m月%d日"))        # 2025年11月15日
```

### 格式化代码

| 代码 | 说明 | 示例 |
|------|------|------|
| `%Y` | 4位年份 | 2025 |
| `%m` | 月份(01-12) | 11 |
| `%d` | 日期(01-31) | 15 |
| `%H` | 小时(00-23) | 14 |
| `%M` | 分钟(00-59) | 30 |
| `%S` | 秒(00-59) | 45 |
| `%A` | 星期全名 | Monday |
| `%a` | 星期缩写 | Mon |
| `%B` | 月份全名 | November |
| `%b` | 月份缩写 | Nov |

### 字符串解析

```python
from datetime import datetime

# strptime: 解析字符串
date_str = "2025-11-15 14:30:00"
dt = datetime.strptime(date_str, "%Y-%m-%d %H:%M:%S")
print(dt)  # 2025-11-15 14:30:00
```

### 时间计算

```python
from datetime import datetime, timedelta

now = datetime.now()

# 加减时间
tomorrow = now + timedelta(days=1)
yesterday = now - timedelta(days=1)
next_week = now + timedelta(weeks=1)
next_hour = now + timedelta(hours=1)

print(tomorrow.strftime("%Y-%m-%d"))

# 计算时间差
start = datetime(2025, 1, 1)
end = datetime(2025, 12, 31)
diff = end - start

print(f"相差{diff.days}天")  # 相差364天
print(f"相差{diff.total_seconds()}秒")
```

---

## 6. collections模块

### Counter - 计数器

```python
from collections import Counter

# 统计元素出现次数
words = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple']
counter = Counter(words)

print(counter)  # Counter({'apple': 3, 'banana': 2, 'orange': 1})
print(counter['apple'])  # 3

# 最常见的n个
print(counter.most_common(2))  # [('apple', 3), ('banana', 2)]

# 字符串统计
text = "hello world"
char_count = Counter(text)
print(char_count)  # Counter({'l': 3, 'o': 2, 'h': 1, ...})
```

### defaultdict - 默认字典

```python
from collections import defaultdict

# 普通字典会KeyError
# d = {}
# d['key'].append(1)  # KeyError

# defaultdict提供默认值
d = defaultdict(list)
d['fruits'].append('apple')
d['fruits'].append('banana')
d['vegetables'].append('carrot')

print(dict(d))
# {'fruits': ['apple', 'banana'], 'vegetables': ['carrot']}

# 计数
d = defaultdict(int)
words = ['apple', 'banana', 'apple']
for word in words:
    d[word] += 1

print(dict(d))  # {'apple': 2, 'banana': 1}
```

### namedtuple - 命名元组

```python
from collections import namedtuple

# 创建命名元组类
Point = namedtuple('Point', ['x', 'y'])

# 创建实例
p = Point(10, 20)
print(p.x, p.y)  # 10 20
print(p[0], p[1])  # 10 20 (也支持索引)

# 学生信息
Student = namedtuple('Student', ['name', 'age', 'grade'])
s = Student('Alice', 20, 'A')
print(f"{s.name}, {s.age}岁, 成绩{s.grade}")
```

### deque - 双端队列

```python
from collections import deque

# 创建双端队列
d = deque([1, 2, 3])

# 两端添加
d.append(4)      # 右端添加
d.appendleft(0)  # 左端添加
print(d)  # deque([0, 1, 2, 3, 4])

# 两端删除
d.pop()       # 右端删除
d.popleft()   # 左端删除
print(d)  # deque([1, 2, 3])

# 旋转
d.rotate(1)   # 向右旋转
print(d)  # deque([3, 1, 2])
```

---

## 7. 其他常用模块

### random - 随机数

```python
import random

# 随机整数
print(random.randint(1, 10))  # 1到10之间

# 随机浮点数
print(random.random())  # 0到1之间

# 从序列中随机选择
colors = ['red', 'green', 'blue']
print(random.choice(colors))

# 随机打乱
numbers = [1, 2, 3, 4, 5]
random.shuffle(numbers)
print(numbers)

# 随机抽样
print(random.sample(colors, 2))  # 随机抽2个
```

### math - 数学函数

```python
import math

print(math.pi)      # 3.141592653589793
print(math.e)       # 2.718281828459045

print(math.sqrt(16))    # 4.0 平方根
print(math.pow(2, 3))   # 8.0 幂运算
print(math.ceil(3.2))   # 4 向上取整
print(math.floor(3.8))  # 3 向下取整
print(math.sin(math.pi/2))  # 1.0 正弦
print(math.log(10))     # 2.302... 自然对数
print(math.log10(100))  # 2.0 以10为底
```

### sys - 系统相关

```python
import sys

# Python版本
print(sys.version)

# 命令行参数
print(sys.argv)  # ['script.py', 'arg1', 'arg2']

# 退出程序
# sys.exit()

# 模块搜索路径
print(sys.path)
```

---

## 8. 完整示例

### 示例1: 日志记录系统

```python
import os
import json
from datetime import datetime

class Logger:
    """简单日志记录器"""
    
    def __init__(self, log_file='app.log'):
        self.log_file = log_file
    
    def _write_log(self, level, message):
        """写入日志"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        log_entry = f"[{timestamp}] [{level}] {message}\n"
        
        with open(self.log_file, 'a', encoding='utf-8') as f:
            f.write(log_entry)
    
    def info(self, message):
        """信息日志"""
        self._write_log('INFO', message)
    
    def error(self, message):
        """错误日志"""
        self._write_log('ERROR', message)
    
    def warning(self, message):
        """警告日志"""
        self._write_log('WARNING', message)

# 使用
logger = Logger('myapp.log')
logger.info('应用启动')
logger.warning('这是一个警告')
logger.error('发生错误')
```

### 示例2: 配置管理器

```python
import json
import os

class ConfigManager:
    """配置文件管理器"""
    
    def __init__(self, config_file='config.json'):
        self.config_file = config_file
        self.config = self.load()
    
    def load(self):
        """加载配置"""
        if os.path.exists(self.config_file):
            with open(self.config_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        return {}
    
    def save(self):
        """保存配置"""
        with open(self.config_file, 'w', encoding='utf-8') as f:
            json.dump(self.config, f, indent=2, ensure_ascii=False)
    
    def get(self, key, default=None):
        """获取配置项"""
        return self.config.get(key, default)
    
    def set(self, key, value):
        """设置配置项"""
        self.config[key] = value
        self.save()

# 使用
config = ConfigManager()
config.set('host', 'localhost')
config.set('port', 8080)
print(config.get('host'))  # localhost
```

### 示例3: 文件批量处理

```python
import os
import re
from datetime import datetime

class FileProcessor:
    """文件批量处理工具"""
    
    def __init__(self, directory):
        self.directory = directory
    
    def find_files(self, pattern):
        """查找匹配的文件"""
        files = []
        for root, dirs, filenames in os.walk(self.directory):
            for filename in filenames:
                if re.match(pattern, filename):
                    full_path = os.path.join(root, filename)
                    files.append(full_path)
        return files
    
    def rename_files(self, pattern, replacement):
        """批量重命名"""
        count = 0
        for root, dirs, filenames in os.walk(self.directory):
            for filename in filenames:
                new_name = re.sub(pattern, replacement, filename)
                if new_name != filename:
                    old_path = os.path.join(root, filename)
                    new_path = os.path.join(root, new_name)
                    os.rename(old_path, new_path)
                    count += 1
                    print(f"重命名: {filename} → {new_name}")
        return count
    
    def get_file_info(self, filepath):
        """获取文件信息"""
        stat = os.stat(filepath)
        return {
            'name': os.path.basename(filepath),
            'size': stat.st_size,
            'modified': datetime.fromtimestamp(stat.st_mtime)
        }

# 使用
processor = FileProcessor('.')
txt_files = processor.find_files(r'.*\.txt$')
print(f"找到{len(txt_files)}个txt文件")
```

---

## 知识点总结

### 常用模块速查

| 模块 | 用途 | 常用功能 |
|------|------|----------|
| `os` | 系统操作 | 路径、文件、目录 |
| `json` | JSON处理 | 序列化、反序列化 |
| `re` | 正则表达式 | 匹配、查找、替换 |
| `datetime` | 日期时间 | 格式化、计算 |
| `collections` | 容器类型 | Counter、deque |
| `random` | 随机数 | 随机选择、打乱 |
| `math` | 数学函数 | 三角、指数、对数 |

### 文件操作最佳实践

1. **使用with**: 自动关闭文件
2. **指定编码**: `encoding='utf-8'`
3. **错误处理**: try-except捕获异常
4. **检查存在**: `os.path.exists()`
5. **使用os.path**: 跨平台路径操作

### 对比: Python vs C++

| 功能 | Python | C++ |
|------|--------|-----|
| 文件读取 | `open('f.txt').read()` | `fstream` |
| JSON | `json模块` | 第三方库(nlohmann/json) |
| 正则 | `re模块` | `<regex>` |
| 日期时间 | `datetime` | `<chrono>` |
| 路径操作 | `os.path` | `<filesystem>` (C++17) |

---

## 练习题

1. 创建一个程序,读取文本文件并统计每个单词出现的次数
2. 使用datetime模块计算两个日期之间的天数
3. 编写一个文件备份程序,将指定目录的文件复制到备份目录
4. 使用正则表达式验证身份证号码格式
5. 创建一个简单的配置文件读写器
6. 使用collections.Counter统计文本中字符出现频率
7. 实现一个日志记录器,支持不同级别的日志
8. 编写一个程序,将CSV格式的数据转换为JSON格式
9. 使用os模块查找指定目录下所有大于1MB的文件
10. 创建一个简单的定时任务调度器

---