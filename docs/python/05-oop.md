# Python 面向对象编程

[← 上一章: 函数](04-functions.md) | [下一章: 常用模块 →](06-common-modules.md)

## 目录
1. [面向对象基础](#1-面向对象基础)
2. [类与对象](#2-类与对象)
3. [构造与析构](#3-构造与析构)
4. [继承](#4-继承)
5. [多态](#5-多态)
6. [封装与访问控制](#6-封装与访问控制)
7. [特殊方法](#7-特殊方法)
8. [完整示例](#8-完整示例)

---

## 1. 面向对象基础

### 核心概念

| 概念 | 说明 | 示例 |
|------|------|------|
| 类(Class) | 对象的模板/蓝图 | `class Dog:` |
| 对象(Object) | 类的实例 | `my_dog = Dog()` |
| 属性(Attribute) | 对象的数据 | `my_dog.name` |
| 方法(Method) | 对象的行为 | `my_dog.bark()` |
| 继承(Inheritance) | 类之间的关系 | `class Puppy(Dog):` |
| 封装(Encapsulation) | 隐藏内部实现 | `_private_var` |
| 多态(Polymorphism) | 同一接口不同实现 | 方法重写 |

### 三大特性

```
┌─────────────┐
│ 封装(Encapsulation) │  隐藏实现细节
├─────────────┤
│ 继承(Inheritance)   │  代码复用
├─────────────┤
│ 多态(Polymorphism)  │  灵活扩展
└─────────────┘
```

---

## 2. 类与对象

### 定义类

```python
class Dog:
    """狗类"""
    
    # 类属性(所有实例共享)
    species = "Canis familiaris"
    
    # 实例方法
    def bark(self):
        print("汪汪!")
    
    def eat(self, food):
        print(f"正在吃{food}")

# 创建对象
my_dog = Dog()
my_dog.bark()  # 汪汪!
my_dog.eat("骨头")  # 正在吃骨头
```

### 实例属性

```python
class Person:
    def set_info(self, name, age):
        self.name = name  # 实例属性
        self.age = age

# 创建并设置属性
person1 = Person()
person1.set_info("Alice", 25)
print(person1.name)  # Alice

person2 = Person()
person2.set_info("Bob", 30)
print(person2.name)  # Bob
```

### self 参数

```python
class Circle:
    def __init__(self, radius):
        self.radius = radius  # self指向当前实例
    
    def area(self):
        return 3.14159 * self.radius ** 2
    
    def describe(self):
        print(f"这是半径为{self.radius}的圆")

c = Circle(5)
print(c.area())  # 78.53975
c.describe()     # 这是半径为5的圆
```

### 类属性 vs 实例属性

```python
class Student:
    # 类属性
    school = "Python中学"
    count = 0
    
    def __init__(self, name):
        # 实例属性
        self.name = name
        Student.count += 1

# 类属性访问
print(Student.school)  # Python中学
print(Student.count)   # 0

# 创建实例
s1 = Student("Alice")
s2 = Student("Bob")

print(Student.count)   # 2
print(s1.school)       # Python中学 (也可通过实例访问)
print(s1.name)         # Alice
```

---

## 3. 构造与析构

### 构造函数 __init__

```python
class Person:
    def __init__(self, name, age):
        """构造函数:创建对象时自动调用"""
        self.name = name
        self.age = age
        print(f"创建了{name}")

# 创建对象时自动调用__init__
person = Person("Alice", 25)
# 输出: 创建了Alice
```

### 默认参数

```python
class Rectangle:
    def __init__(self, width=1, height=1):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height

r1 = Rectangle()           # 使用默认值
r2 = Rectangle(5, 10)      # 指定值
r3 = Rectangle(width=3, height=4)

print(r1.area())  # 1
print(r2.area())  # 50
print(r3.area())  # 12
```

### 析构函数 __del__

```python
class FileHandler:
    def __init__(self, filename):
        self.filename = filename
        self.file = open(filename, 'w')
        print(f"打开文件: {filename}")
    
    def write(self, text):
        self.file.write(text)
    
    def __del__(self):
        """析构函数:对象销毁时自动调用"""
        if hasattr(self, 'file'):
            self.file.close()
            print(f"关闭文件: {self.filename}")

# 使用
handler = FileHandler("test.txt")
handler.write("Hello")
del handler  # 显式删除,触发__del__
# 输出: 关闭文件: test.txt
```

---

## 4. 继承

### 单继承

```python
# 父类(基类)
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        print(f"{self.name}发出声音")

# 子类(派生类)
class Dog(Animal):
    def speak(self):
        print(f"{self.name}汪汪叫")

class Cat(Animal):
    def speak(self):
        print(f"{self.name}喵喵叫")

# 使用
dog = Dog("旺财")
cat = Cat("咪咪")

dog.speak()  # 旺财汪汪叫
cat.speak()  # 咪咪喵喵叫
```

### 调用父类方法

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):
        print(f"我是{self.name},今年{self.age}岁")

class Student(Person):
    def __init__(self, name, age, grade):
        # 方法1: 使用super()
        super().__init__(name, age)
        self.grade = grade
    
    def introduce(self):
        # 调用父类方法
        super().introduce()
        print(f"我在{self.grade}年级")

s = Student("Alice", 15, 9)
s.introduce()
# 我是Alice,今年15岁
# 我在9年级
```

### 多继承

```python
class Flyable:
    def fly(self):
        print("可以飞行")

class Swimmable:
    def swim(self):
        print("可以游泳")

class Duck(Flyable, Swimmable):
    def quack(self):
        print("嘎嘎叫")

duck = Duck()
duck.fly()    # 可以飞行
duck.swim()   # 可以游泳
duck.quack()  # 嘎嘎叫
```

### 方法解析顺序 (MRO)

```python
class A:
    def method(self):
        print("A的方法")

class B(A):
    def method(self):
        print("B的方法")

class C(A):
    def method(self):
        print("C的方法")

class D(B, C):
    pass

# 查看MRO
print(D.mro())
# [<class 'D'>, <class 'B'>, <class 'C'>, <class 'A'>, <class 'object'>]

d = D()
d.method()  # B的方法 (按MRO顺序)
```

---

## 5. 多态

### 方法重写

```python
class Shape:
    def area(self):
        return 0

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return 3.14159 * self.radius ** 2

# 多态:同一方法不同实现
shapes = [Rectangle(5, 10), Circle(5), Rectangle(3, 4)]

for shape in shapes:
    print(f"面积: {shape.area()}")

# 输出:
# 面积: 50
# 面积: 78.53975
# 面积: 12
```

### 鸭子类型

```python
# "如果它走起来像鸭子,叫起来像鸭子,那它就是鸭子"
class Dog:
    def speak(self):
        return "汪汪"

class Cat:
    def speak(self):
        return "喵喵"

class Duck:
    def speak(self):
        return "嘎嘎"

def animal_speak(animal):
    # 不检查类型,只要有speak方法就行
    print(animal.speak())

# 多态
animal_speak(Dog())   # 汪汪
animal_speak(Cat())   # 喵喵
animal_speak(Duck())  # 嘎嘎
```

---

## 6. 封装与访问控制

### 命名约定

| 前缀 | 类型 | 访问性 | 示例 |
|------|------|--------|------|
| 无 | 公有(public) | 内外可访问 | `name` |
| `_` | 受保护(protected) | 约定内部使用 | `_age` |
| `__` | 私有(private) | 名称改写 | `__salary` |

### 公有属性

```python
class Person:
    def __init__(self, name):
        self.name = name  # 公有属性

person = Person("Alice")
print(person.name)  # 可访问
person.name = "Bob"  # 可修改
```

### 受保护属性

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self._age = age  # 受保护(约定,非强制)
    
    def get_age(self):
        return self._age

person = Person("Alice", 25)
print(person._age)  # 可以访问,但不建议
print(person.get_age())  # 推荐方式
```

### 私有属性

```python
class Person:
    def __init__(self, name, salary):
        self.name = name
        self.__salary = salary  # 私有属性
    
    def get_salary(self):
        return self.__salary
    
    def set_salary(self, salary):
        if salary >= 0:
            self.__salary = salary

person = Person("Alice", 10000)
print(person.name)          # Alice
# print(person.__salary)    # AttributeError
print(person.get_salary())  # 10000 (通过方法访问)

# 名称改写机制
print(person._Person__salary)  # 10000 (可以但不推荐)
```

### 属性装饰器 @property

```python
class Circle:
    def __init__(self, radius):
        self._radius = radius
    
    @property
    def radius(self):
        """获取半径"""
        return self._radius
    
    @radius.setter
    def radius(self, value):
        """设置半径"""
        if value > 0:
            self._radius = value
        else:
            raise ValueError("半径必须为正数")
    
    @property
    def area(self):
        """计算面积(只读)"""
        return 3.14159 * self._radius ** 2

c = Circle(5)
print(c.radius)  # 5 (像访问属性一样)
print(c.area)    # 78.53975

c.radius = 10    # 通过setter设置
print(c.area)    # 314.159

# c.area = 100   # AttributeError (只读)
```

---

## 7. 特殊方法

### 常用特殊方法

| 方法 | 说明 | 示例 |
|------|------|------|
| `__init__` | 构造函数 | 创建对象 |
| `__del__` | 析构函数 | 销毁对象 |
| `__str__` | 字符串表示(用户) | `print(obj)` |
| `__repr__` | 字符串表示(开发) | `repr(obj)` |
| `__len__` | 长度 | `len(obj)` |
| `__getitem__` | 索引访问 | `obj[key]` |
| `__setitem__` | 索引赋值 | `obj[key]=value` |
| `__eq__` | 等于 | `obj1 == obj2` |
| `__lt__` | 小于 | `obj1 < obj2` |
| `__add__` | 加法 | `obj1 + obj2` |

### __str__ 和 __repr__

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def __str__(self):
        """用户友好的字符串"""
        return f"{self.name},今年{self.age}岁"
    
    def __repr__(self):
        """开发者用的字符串"""
        return f"Person(name='{self.name}', age={self.age})"

person = Person("Alice", 25)
print(str(person))   # Alice,今年25岁
print(repr(person))  # Person(name='Alice', age=25)
print(person)        # Alice,今年25岁 (默认调用__str__)
```

### 运算符重载

```python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __add__(self, other):
        """重载加法运算符"""
        return Vector(self.x + other.x, self.y + other.y)
    
    def __sub__(self, other):
        """重载减法运算符"""
        return Vector(self.x - other.x, self.y - other.y)
    
    def __mul__(self, scalar):
        """重载乘法运算符"""
        return Vector(self.x * scalar, self.y * scalar)
    
    def __str__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(2, 3)
v2 = Vector(1, 4)

print(v1 + v2)  # Vector(3, 7)
print(v1 - v2)  # Vector(1, -1)
print(v1 * 3)   # Vector(6, 9)
```

### 比较运算符

```python
class Student:
    def __init__(self, name, score):
        self.name = name
        self.score = score
    
    def __eq__(self, other):
        """等于"""
        return self.score == other.score
    
    def __lt__(self, other):
        """小于"""
        return self.score < other.score
    
    def __le__(self, other):
        """小于等于"""
        return self.score <= other.score

s1 = Student("Alice", 85)
s2 = Student("Bob", 90)
s3 = Student("Charlie", 85)

print(s1 == s3)  # True
print(s1 < s2)   # True
print(s1 <= s3)  # True

# 排序
students = [s2, s1, s3]
students.sort()
for s in students:
    print(f"{s.name}: {s.score}")
# Alice: 85
# Charlie: 85
# Bob: 90
```

### 容器方法

```python
class MyList:
    def __init__(self):
        self.items = []
    
    def __len__(self):
        """支持len()"""
        return len(self.items)
    
    def __getitem__(self, index):
        """支持索引访问"""
        return self.items[index]
    
    def __setitem__(self, index, value):
        """支持索引赋值"""
        self.items[index] = value
    
    def append(self, item):
        self.items.append(item)

my_list = MyList()
my_list.append(1)
my_list.append(2)
my_list.append(3)

print(len(my_list))     # 3
print(my_list[0])       # 1
my_list[0] = 10
print(my_list[0])       # 10
```

---

## 8. 完整示例

### 示例1: 银行账户系统

```python
class BankAccount:
    """银行账户类"""
    
    # 类属性
    interest_rate = 0.03  # 利率
    
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.__balance = balance  # 私有属性
        self.transactions = []
    
    @property
    def balance(self):
        """余额(只读)"""
        return self.__balance
    
    def deposit(self, amount):
        """存款"""
        if amount > 0:
            self.__balance += amount
            self.transactions.append(f"存款: +{amount}")
            return True
        return False
    
    def withdraw(self, amount):
        """取款"""
        if 0 < amount <= self.__balance:
            self.__balance -= amount
            self.transactions.append(f"取款: -{amount}")
            return True
        return False
    
    def add_interest(self):
        """添加利息"""
        interest = self.__balance * BankAccount.interest_rate
        self.__balance += interest
        self.transactions.append(f"利息: +{interest:.2f}")
    
    def __str__(self):
        return f"账户所有者: {self.owner}, 余额: ¥{self.__balance:.2f}"

# 使用
account = BankAccount("Alice", 1000)
print(account)  # 账户所有者: Alice, 余额: ¥1000.00

account.deposit(500)
account.withdraw(200)
account.add_interest()

print(account)  # 账户所有者: Alice, 余额: ¥1339.00
print("\n交易记录:")
for trans in account.transactions:
    print(trans)
```

### 示例2: 图书管理系统

```python
class Book:
    """图书类"""
    def __init__(self, title, author, isbn):
        self.title = title
        self.author = author
        self.isbn = isbn
        self.is_borrowed = False
    
    def __str__(self):
        status = "已借出" if self.is_borrowed else "可借"
        return f"《{self.title}》 - {self.author} [{status}]"

class Library:
    """图书馆类"""
    def __init__(self, name):
        self.name = name
        self.books = []
    
    def add_book(self, book):
        """添加图书"""
        self.books.append(book)
        print(f"已添加: {book.title}")
    
    def find_book(self, title):
        """查找图书"""
        for book in self.books:
            if book.title == title:
                return book
        return None
    
    def borrow_book(self, title):
        """借书"""
        book = self.find_book(title)
        if book and not book.is_borrowed:
            book.is_borrowed = True
            print(f"成功借阅: {book.title}")
            return True
        elif book:
            print(f"{book.title}已被借出")
        else:
            print(f"未找到图书: {title}")
        return False
    
    def return_book(self, title):
        """还书"""
        book = self.find_book(title)
        if book and book.is_borrowed:
            book.is_borrowed = False
            print(f"成功归还: {book.title}")
            return True
        return False
    
    def list_books(self):
        """列出所有图书"""
        print(f"\n{self.name}藏书:")
        for book in self.books:
            print(f"  {book}")

# 使用
library = Library("Python图书馆")
library.add_book(Book("Python编程", "张三", "001"))
library.add_book(Book("数据结构", "李四", "002"))
library.add_book(Book("算法导论", "王五", "003"))

library.list_books()
library.borrow_book("Python编程")
library.list_books()
library.return_book("Python编程")
library.list_books()
```

---

## 知识点总结

### OOP核心概念

| 概念 | Python实现 | 要点 |
|------|------------|------|
| 类 | `class ClassName:` | 对象模板 |
| 对象 | `obj = ClassName()` | 类的实例 |
| 继承 | `class Child(Parent):` | 代码复用 |
| 多态 | 方法重写 | 灵活扩展 |
| 封装 | `_protected`, `__private` | 隐藏实现 |

### 特殊方法速查

| 方法 | 触发方式 | 用途 |
|------|----------|------|
| `__init__` | `obj = Class()` | 初始化 |
| `__str__` | `print(obj)` | 字符串表示 |
| `__len__` | `len(obj)` | 长度 |
| `__getitem__` | `obj[key]` | 索引读取 |
| `__eq__` | `obj1 == obj2` | 相等比较 |
| `__add__` | `obj1 + obj2` | 加法运算 |

### 对比: Python vs C++

| 特性 | Python | C++ |
|------|--------|-----|
| 类定义 | `class Dog:` | `class Dog {};` |
| 构造 | `__init__(self)` | `Dog()` |
| 访问控制 | `_`, `__` (约定) | `private:`, `public:` (强制) |
| 多继承 | 支持 | 支持 |
| 多态 | 鸭子类型 | 虚函数 |
| self | 显式`self` | 隐式`this` |

---

## 练习题

1. 创建Person类,包含姓名、年龄属性和自我介绍方法
2. 实现Rectangle类,计算面积和周长
3. 创建Student类继承Person,添加成绩属性
4. 重载Vector类的加减乘除运算符
5. 实现一个简单的购物车系统(商品类+购物车类)
6. 创建Shape抽象基类,派生出Circle和Square
7. 实现一个通讯录类,支持添加、删除、查找联系人
8. 创建一个简单的员工管理系统(继承+多态)
9. 实现一个自定义列表类,支持索引和切片
10. 创建游戏角色类系统(继承+属性+方法)

---

[← 上一章: 函数](04-functions.md) | [下一章: 常用模块 →](06-common-modules.md)
