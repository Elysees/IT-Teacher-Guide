# C++ 面向对象编程

[← 上一章: 函数](04-functions.md) | [下一章: STL标准库 →](06-stl.md)

## 目录
1. [类与对象](#1-类与对象)
2. [构造函数与析构函数](#2-构造函数与析构函数)
3. [访问控制](#3-访问控制)
4. [继承](#4-继承)
5. [多态](#5-多态)
6. [虚函数](#6-虚函数)
7. [运算符重载](#7-运算符重载)
8. [完整示例](#8-完整示例)

---

## 1. 类与对象

### 类的定义

```cpp
#include <iostream>
#include <string>
using namespace std;

// 类的基本定义
class Student {
private:
    string name;
    int age;
    double score;

public:
    // 构造函数
    Student(string n, int a, double s) {
        name = n;
        age = a;
        score = s;
    }
    
    // 成员函数
    void display() {
        cout << "姓名: " << name << ", 年龄: " << age << ", 成绩: " << score << endl;
    }
    
    // Getter函数
    string getName() { return name; }
    int getAge() { return age; }
    double getScore() { return score; }
    
    // Setter函数
    void setName(string n) { name = n; }
    void setAge(int a) { age = a; }
    void setScore(double s) { score = s; }
};

int main() {
    // 创建对象
    Student s1("张三", 20, 85.5);
    Student s2("李四", 19, 92.0);
    
    // 调用成员函数
    s1.display();  // 姓名: 张三, 年龄: 20, 成绩: 85.5
    s2.display();  // 姓名: 李四, 年龄: 19, 成绩: 92
    
    return 0;
}
```

### 类的声明与定义分离

```cpp
#include <iostream>
#include <string>
using namespace std;

// 类声明 (通常在头文件中)
class Rectangle {
private:
    double width, height;

public:
    // 函数声明
    Rectangle(double w, double h);
    double getArea();
    double getPerimeter();
    void setDimensions(double w, double h);
    void display();
};

// 成员函数定义
Rectangle::Rectangle(double w, double h) {
    width = w;
    height = h;
}

double Rectangle::getArea() {
    return width * height;
}

double Rectangle::getPerimeter() {
    return 2 * (width + height);
}

void Rectangle::setDimensions(double w, double h) {
    width = w;
    height = h;
}

void Rectangle::display() {
    cout << "矩形: 宽=" << width << ", 高=" << height 
         << ", 面积=" << getArea() << ", 周长=" << getPerimeter() << endl;
}

int main() {
    Rectangle rect(5.0, 3.0);
    rect.display();
    
    rect.setDimensions(10.0, 7.0);
    rect.display();
    
    return 0;
}
```

### this指针

```cpp
#include <iostream>
#include <string>
using namespace std;

class Person {
private:
    string name;
    int age;

public:
    Person(string name, int age) {
        // 使用this指针区分成员变量和参数
        this->name = name;
        this->age = age;
    }
    
    // 返回对象自身的引用
    Person& setName(string name) {
        this->name = name;
        return *this;  // 返回当前对象的引用
    }
    
    Person& setAge(int age) {
        this->age = age;
        return *this;
    }
    
    void display() {
        cout << "姓名: " << this->name << ", 年龄: " << this->age << endl;
    }
    
    // 比较对象
    bool isEqual(const Person& other) {
        return (this->name == other.name && this->age == other.age);
    }
};

int main() {
    Person p1("张三", 25);
    p1.display();
    
    // 链式调用
    p1.setName("李四").setAge(30);
    p1.display();
    
    Person p2("李四", 30);
    cout << "p1和p2相等: " << p1.isEqual(p2) << endl;  // 1 (true)
    
    return 0;
}
```

---

## 2. 构造函数与析构函数

### 构造函数类型

```cpp
#include <iostream>
#include <string>
using namespace std;

class Book {
private:
    string title;
    string author;
    int pages;

public:
    // 默认构造函数
    Book() {
        title = "未知";
        author = "未知";
        pages = 0;
        cout << "默认构造函数调用" << endl;
    }
    
    // 带参数的构造函数
    Book(string t, string a, int p) {
        title = t;
        author = a;
        pages = p;
        cout << "参数构造函数调用: " << title << endl;
    }
    
    // 拷贝构造函数
    Book(const Book& other) {
        title = other.title;
        author = other.author;
        pages = other.pages;
        cout << "拷贝构造函数调用: " << title << endl;
    }
    
    // 析构函数
    ~Book() {
        cout << "析构函数调用: " << title << endl;
    }
    
    void display() {
        cout << "书名: " << title << ", 作者: " << author << ", 页数: " << pages << endl;
    }
};

int main() {
    cout << "1. 创建默认对象:" << endl;
    Book b1;  // 调用默认构造函数
    
    cout << "\n2. 创建带参数对象:" << endl;
    Book b2("C++ Primer", "Stanley Lippman", 900);  // 调用参数构造函数
    
    cout << "\n3. 创建拷贝对象:" << endl;
    Book b3 = b2;  // 调用拷贝构造函数
    
    cout << "\n4. 显示对象信息:" << endl;
    b1.display();
    b2.display();
    b3.display();
    
    cout << "\n5. 程序结束，对象将被销毁:" << endl;
    return 0;  // 程序结束时调用析构函数
}
```

### 初始化列表

```cpp
#include <iostream>
#include <string>
using namespace std;

class Point {
private:
    const int id;  // 常量成员，必须在初始化列表中初始化
    double x, y;

public:
    // 使用初始化列表
    Point(int i, double x_val, double y_val) : id(i), x(x_val), y(y_val) {
        cout << "Point构造: ID=" << id << ", (" << x << ", " << y << ")" << endl;
    }
    
    // 拷贝构造函数使用初始化列表
    Point(const Point& other) : id(other.id), x(other.x), y(other.y) {
        cout << "拷贝构造: ID=" << id << endl;
    }
    
    void display() const {  // 常量成员函数
        cout << "ID: " << id << ", 坐标: (" << x << ", " << y << ")" << endl;
    }
    
    // Getter函数
    int getId() const { return id; }
    double getX() const { return x; }
    double getY() const { return y; }
};

int main() {
    Point p1(1, 3.5, 4.2);
    Point p2(2, 1.0, 2.0);
    Point p3 = p1;  // 拷贝构造
    
    p1.display();
    p2.display();
    p3.display();
    
    return 0;
}
```

### 析构函数详解

```cpp
#include <iostream>
#include <string>
using namespace std;

class DynamicArray {
private:
    int* data;
    int size;

public:
    DynamicArray(int s) : size(s) {
        data = new int[size];
        cout << "分配内存，大小: " << size << endl;
    }
    
    // 拷贝构造函数
    DynamicArray(const DynamicArray& other) {
        size = other.size;
        data = new int[size];
        for (int i = 0; i < size; i++) {
            data[i] = other.data[i];
        }
        cout << "拷贝构造，分配内存" << endl;
    }
    
    // 析构函数 - 释放动态分配的内存
    ~DynamicArray() {
        delete[] data;
        cout << "释放内存，大小: " << size << endl;
    }
    
    void setValue(int index, int value) {
        if (index >= 0 && index < size) {
            data[index] = value;
        }
    }
    
    int getValue(int index) const {
        if (index >= 0 && index < size) {
            return data[index];
        }
        return -1;
    }
    
    int getSize() const { return size; }
};

void function() {
    DynamicArray arr(5);
    arr.setValue(0, 100);
    cout << "函数内的数组值: " << arr.getValue(0) << endl;
    // 函数结束时，arr的析构函数被调用
}

int main() {
    cout << "1. 创建对象:" << endl;
    DynamicArray arr1(10);
    
    cout << "\n2. 调用函数:" << endl;
    function();  // 函数结束时会调用析构函数
    
    cout << "\n3. 创建拷贝对象:" << endl;
    DynamicArray arr2 = arr1;
    
    cout << "\n4. 程序结束:" << endl;
    return 0;  // main结束时调用析构函数
}
```

---

## 3. 访问控制

### public, private, protected

```cpp
#include <iostream>
#include <string>
using namespace std;

class BankAccount {
private:
    string accountNumber;
    double balance;
    string pin;  // 私有，外部无法访问

protected:
    string accountType;  // 受保护，子类可访问

public:
    string ownerName;  // 公有，外部可访问
    
    // 构造函数
    BankAccount(string name, string accNum, double initialBalance, string p) 
        : ownerName(name), accountNumber(accNum), balance(initialBalance), pin(p) {
        accountType = "普通账户";
    }
    
    // 公有方法
    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            cout << "存款成功，余额: " << balance << endl;
        }
    }
    
    bool withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            cout << "取款成功，余额: " << balance << endl;
            return true;
        }
        cout << "取款失败，余额不足" << endl;
        return false;
    }
    
    // Getter方法
    double getBalance() const {
        return balance;
    }
    
    string getAccountNumber() const {
        return accountNumber;
    }
    
    // 私有方法只能在类内部调用
private:
    bool verifyPin(string inputPin) const {
        return pin == inputPin;
    }
    
protected:
    void logTransaction(string type, double amount) const {
        cout << "交易记录: " << type << " " << amount << endl;
    }
};

int main() {
    BankAccount account("张三", "123456789", 1000.0, "1234");
    
    // 可以访问公有成员
    cout << "账户名: " << account.ownerName << endl;
    account.deposit(500);
    account.withdraw(200);
    cout << "余额: " << account.getBalance() << endl;
    
    // 不能直接访问私有和保护成员
    // account.balance = 9999;  // 错误!
    // account.pin = "0000";    // 错误!
    
    return 0;
}
```

### getter/setter模式

```cpp
#include <iostream>
#include <string>
using namespace std;

class Student {
private:
    string name;
    int age;
    double score;

public:
    // 构造函数
    Student(string n = "", int a = 0, double s = 0.0) : name(n), age(a), score(s) {}
    
    // Getter方法
    string getName() const { return name; }
    int getAge() const { return age; }
    double getScore() const { return score; }
    
    // Setter方法 - 带验证
    void setName(string n) {
        if (!n.empty()) {
            name = n;
        }
    }
    
    void setAge(int a) {
        if (a >= 0 && a <= 150) {  // 年龄验证
            age = a;
        } else {
            cout << "无效年龄: " << a << endl;
        }
    }
    
    void setScore(double s) {
        if (s >= 0 && s <= 100) {  // 成绩验证
            score = s;
        } else {
            cout << "无效成绩: " << s << endl;
        }
    }
    
    void display() const {
        cout << "姓名: " << name << ", 年龄: " << age << ", 成绩: " << score << endl;
    }
};

int main() {
    Student s;
    
    // 使用setter设置值
    s.setName("李四");
    s.setAge(20);
    s.setScore(85.5);
    s.display();
    
    // 尝试设置无效值
    s.setAge(-5);    // 会输出错误信息
    s.setScore(150); // 会输出错误信息
    
    // 使用getter获取值
    cout << "获取的姓名: " << s.getName() << endl;
    cout << "获取的年龄: " << s.getAge() << endl;
    cout << "获取的成绩: " << s.getScore() << endl;
    
    return 0;
}
```

---

## 4. 继承

### 基本继承

```cpp
#include <iostream>
#include <string>
using namespace std;

// 基类
class Animal {
protected:
    string name;
    int age;

public:
    Animal(string n, int a) : name(n), age(a) {
        cout << "Animal构造: " << name << endl;
    }
    
    virtual ~Animal() {
        cout << "Animal析构: " << name << endl;
    }
    
    virtual void speak() {
        cout << name << " 发出声音" << endl;
    }
    
    void eat() {
        cout << name << " 正在吃东西" << endl;
    }
    
    string getName() const { return name; }
    int getAge() const { return age; }
};

// 派生类
class Dog : public Animal {
private:
    string breed;

public:
    Dog(string n, int a, string b) : Animal(n, a), breed(b) {
        cout << "Dog构造: " << name << endl;
    }
    
    ~Dog() {
        cout << "Dog析构: " << name << endl;
    }
    
    // 重写基类方法
    void speak() override {
        cout << name << " 汪汪叫" << endl;
    }
    
    void wagTail() {
        cout << name << " 摇尾巴" << endl;
    }
    
    string getBreed() const { return breed; }
};

class Cat : public Animal {
private:
    bool isIndoor;

public:
    Cat(string n, int a, bool indoor) : Animal(n, a), isIndoor(indoor) {
        cout << "Cat构造: " << name << endl;
    }
    
    ~Cat() {
        cout << "Cat析构: " << name << endl;
    }
    
    // 重写基类方法
    void speak() override {
        cout << name << " 喵喵叫" << endl;
    }
    
    void purr() {
        cout << name << " 呼噜呼噜" << endl;
    }
    
    bool getIndoorStatus() const { return isIndoor; }
};

int main() {
    cout << "创建Dog对象:" << endl;
    Dog dog("旺财", 3, "金毛");
    
    cout << "\n创建Cat对象:" << endl;
    Cat cat("咪咪", 2, true);
    
    cout << "\n调用继承的方法:" << endl;
    dog.eat();  // 从基类继承
    cat.eat();  // 从基类继承
    
    cout << "\n调用重写的方法:" << endl;
    dog.speak();  // 重写的方法
    cat.speak();  // 重写的方法
    
    cout << "\n调用特有方法:" << endl;
    dog.wagTail();
    cat.purr();
    
    cout << "\n访问继承的成员:" << endl;
    cout << "Dog名字: " << dog.getName() << ", 年龄: " << dog.getAge() << endl;
    cout << "Cat名字: " << cat.getName() << ", 年龄: " << cat.getAge() << endl;
    
    return 0;
}
```

### 多重继承

```cpp
#include <iostream>
#include <string>
using namespace std;

// 飞行能力
class Flyable {
public:
    virtual void fly() {
        cout << "可以飞行" << endl;
    }
    
    virtual ~Flyable() = default;
};

// 游泳能力
class Swimmable {
public:
    virtual void swim() {
        cout << "可以游泳" << endl;
    }
    
    virtual ~Swimmable() = default;
};

// 走路能力
class Walkable {
public:
    virtual void walk() {
        cout << "可以走路" << endl;
    }
    
    virtual ~Walkable() = default;
};

// 鸭子类：多重继承
class Duck : public Flyable, public Swimmable, public Walkable {
private:
    string name;

public:
    Duck(string n) : name(n) {}
    
    void fly() override {
        cout << name << " 扑腾翅膀飞行" << endl;
    }
    
    void swim() override {
        cout << name << " 悠闲地游泳" << endl;
    }
    
    void walk() override {
        cout << name << " 摇摆地走路" << endl;
    }
    
    void quack() {
        cout << name << " 嘎嘎叫" << endl;
    }
};

int main() {
    Duck duck("唐老鸭");
    
    duck.fly();    // 继承自Flyable
    duck.swim();   // 继承自Swimmable
    duck.walk();   // 继承自Walkable
    duck.quack();  // Duck类自己的方法
    
    // 通过不同基类指针访问
    Flyable* f = &duck;
    Swimmable* s = &duck;
    Walkable* w = &duck;
    
    f->fly();
    s->swim();
    w->walk();
    
    return 0;
}
```

### 继承访问控制

```cpp
#include <iostream>
#include <string>
using namespace std;

class Base {
private:
    int privateVar;

protected:
    int protectedVar;

public:
    int publicVar;
    
    Base(int pv, int ptv, int pbv) : privateVar(pv), protectedVar(ptv), publicVar(pbv) {}
    
    void display() {
        cout << "Base: private=" << privateVar 
             << ", protected=" << protectedVar 
             << ", public=" << publicVar << endl;
    }
};

// 公有继承
class PublicDerived : public Base {
public:
    PublicDerived(int pv, int ptv, int pbv) : Base(pv, ptv, pbv) {}
    
    void accessBaseMembers() {
        // protectedVar = 10;  // 可以访问
        // publicVar = 20;     // 可以访问
        // privateVar = 30;    // 错误! 不能访问基类private成员
        
        cout << "PublicDerived中: protected=" << protectedVar 
             << ", public=" << publicVar << endl;
    }
};

// 私有继承
class PrivateDerived : private Base {
public:
    PrivateDerived(int pv, int ptv, int pbv) : Base(pv, ptv, pbv) {}
    
    void accessBaseMembers() {
        cout << "PrivateDerived中: protected=" << protectedVar 
             << ", public=" << publicVar << endl;
    }
    
    // 需要提供接口让外部访问
    void display() {
        Base::display();
    }
};

int main() {
    PublicDerived pub(1, 2, 3);
    pub.display();
    pub.accessBaseMembers();
    cout << "外部访问public: " << pub.publicVar << endl;  // 可以访问
    
    PrivateDerived priv(4, 5, 6);
    priv.display();
    priv.accessBaseMembers();
    // cout << priv.publicVar << endl;  // 错误! 私有继承后public成员变为private
    
    return 0;
}
```

---

## 5. 多态

### 虚函数与多态

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

// 基类
class Shape {
protected:
    string color;

public:
    Shape(string c) : color(c) {}
    
    // 虚函数
    virtual double getArea() {
        return 0.0;
    }
    
    virtual void draw() {
        cout << "绘制一个" << color << "的形状" << endl;
    }
    
    // 纯虚函数 - 抽象类
    virtual string getType() = 0;
    
    virtual ~Shape() = default;
};

// 派生类：矩形
class Rectangle : public Shape {
private:
    double width, height;

public:
    Rectangle(string c, double w, double h) : Shape(c), width(w), height(h) {}
    
    double getArea() override {
        return width * height;
    }
    
    void draw() override {
        cout << "绘制一个" << color << "的矩形，面积: " << getArea() << endl;
    }
    
    string getType() override {
        return "矩形";
    }
};

// 派生类：圆形
class Circle : public Shape {
private:
    double radius;

public:
    Circle(string c, double r) : Shape(c), radius(r) {}
    
    double getArea() override {
        const double PI = 3.14159265359;
        return PI * radius * radius;
    }
    
    void draw() override {
        cout << "绘制一个" << color << "的圆形，面积: " << getArea() << endl;
    }
    
    string getType() override {
        return "圆形";
    }
};

// 派生类：三角形
class Triangle : public Shape {
private:
    double base, height;

public:
    Triangle(string c, double b, double h) : Shape(c), base(b), height(h) {}
    
    double getArea() override {
        return 0.5 * base * height;
    }
    
    void draw() override {
        cout << "绘制一个" << color << "的三角形，面积: " << getArea() << endl;
    }
    
    string getType() override {
        return "三角形";
    }
};

int main() {
    // 使用基类指针数组实现多态
    vector<Shape*> shapes;
    shapes.push_back(new Rectangle("红色", 5.0, 3.0));
    shapes.push_back(new Circle("蓝色", 2.0));
    shapes.push_back(new Triangle("绿色", 4.0, 6.0));
    
    cout << "多态演示:" << endl;
    for (Shape* shape : shapes) {
        cout << "类型: " << shape->getType() << ", ";
        shape->draw();
        cout << "面积: " << shape->getArea() << endl << endl;
    }
    
    // 释放内存
    for (Shape* shape : shapes) {
        delete shape;
    }
    
    return 0;
}
```

### 运行时多态

```cpp
#include <iostream>
#include <string>
#include <memory>
using namespace std;

class Animal {
public:
    virtual void makeSound() {
        cout << "动物发出声音" << endl;
    }
    
    virtual string getSpecies() {
        return "未知动物";
    }
    
    virtual ~Animal() = default;
};

class Dog : public Animal {
public:
    void makeSound() override {
        cout << "汪汪汪!" << endl;
    }
    
    string getSpecies() override {
        return "狗";
    }
};

class Cat : public Animal {
public:
    void makeSound() override {
        cout << "喵喵喵!" << endl;
    }
    
    string getSpecies() override {
        return "猫";
    }
};

class Bird : public Animal {
public:
    void makeSound() override {
        cout << "叽叽喳喳!" << endl;
    }
    
    string getSpecies() override {
        return "鸟";
    }
};

void animalActivity(Animal* animal) {
    cout << "这是一只" << animal->getSpecies() << endl;
    animal->makeSound();
}

int main() {
    Dog dog;
    Cat cat;
    Bird bird;
    
    cout << "编译时多态:" << endl;
    animalActivity(&dog);  // 输出: 这是一只狗 \n 汪汪汪!
    animalActivity(&cat);  // 输出: 这是一只猫 \n 喵喵喵!
    animalActivity(&bird); // 输出: 这是一只鸟 \n 叽叽喳喳!
    
    cout << "\n使用智能指针:" << endl;
    unique_ptr<Animal> ptr1 = make_unique<Dog>();
    unique_ptr<Animal> ptr2 = make_unique<Cat>();
    
    ptr1->makeSound();  // 汪汪汪!
    ptr2->makeSound();  // 喵喵喵!
    
    return 0;
}
```

---

## 6. 虚函数

### 虚函数基础

```cpp
#include <iostream>
#include <string>
using namespace std;

class Base {
public:
    // 普通函数 - 静态绑定
    void normalFunction() {
        cout << "Base::normalFunction()" << endl;
    }
    
    // 虚函数 - 动态绑定
    virtual void virtualFunction() {
        cout << "Base::virtualFunction()" << endl;
    }
    
    // 纯虚函数 - 抽象类
    virtual void pureVirtualFunction() = 0;
    
    virtual ~Base() = default;
};

class Derived : public Base {
public:
    void normalFunction() {
        cout << "Derived::normalFunction()" << endl;
    }
    
    void virtualFunction() override {
        cout << "Derived::virtualFunction()" << endl;
    }
    
    void pureVirtualFunction() override {
        cout << "Derived::pureVirtualFunction()" << endl;
    }
};

int main() {
    Derived d;
    Base* ptr = &d;
    
    cout << "普通函数调用:" << endl;
    ptr->normalFunction();      // 调用Base::normalFunction() - 静态绑定
    
    cout << "虚函数调用:" << endl;
    ptr->virtualFunction();     // 调用Derived::virtualFunction() - 动态绑定
    
    cout << "纯虚函数调用:" << endl;
    ptr->pureVirtualFunction(); // 调用Derived::pureVirtualFunction()
    
    return 0;
}
```

### 虚析构函数

```cpp
#include <iostream>
#include <string>
using namespace std;

class Base {
public:
    Base() { cout << "Base构造" << endl; }
    
    // 虚析构函数 - 确保正确调用派生类析构函数
    virtual ~Base() {
        cout << "Base析构" << endl;
    }
};

class Derived : public Base {
private:
    int* data;

public:
    Derived(int size) {
        cout << "Derived构造" << endl;
        data = new int[size];
    }
    
    ~Derived() {
        cout << "Derived析构" << endl;
        delete[] data;
    }
};

int main() {
    cout << "使用基类指针指向派生类对象:" << endl;
    Base* ptr = new Derived(100);
    
    cout << "删除基类指针:" << endl;
    delete ptr;  // 会正确调用Derived的析构函数，然后调用Base的析构函数
    
    return 0;
}
```

---

## 7. 运算符重载

### 基本运算符重载

```cpp
#include <iostream>
using namespace std;

class Complex {
private:
    double real, imag;

public:
    Complex(double r = 0, double i = 0) : real(r), imag(i) {}
    
    // 重载加法运算符
    Complex operator+(const Complex& other) const {
        return Complex(real + other.real, imag + other.imag);
    }
    
    // 重载减法运算符
    Complex operator-(const Complex& other) const {
        return Complex(real - other.real, imag - other.imag);
    }
    
    // 重载乘法运算符
    Complex operator*(const Complex& other) const {
        return Complex(real * other.real - imag * other.imag,
                      real * other.imag + imag * other.real);
    }
    
    // 重载赋值运算符
    Complex& operator=(const Complex& other) {
        if (this != &other) {  // 自赋值检查
            real = other.real;
            imag = other.imag;
        }
        return *this;
    }
    
    // 重载相等运算符
    bool operator==(const Complex& other) const {
        return (real == other.real && imag == other.imag);
    }
    
    // 重载输出运算符 (友元函数)
    friend ostream& operator<<(ostream& os, const Complex& c) {
        os << c.real;
        if (c.imag >= 0) os << "+";
        os << c.imag << "i";
        return os;
    }
    
    // 重载输入运算符 (友元函数)
    friend istream& operator>>(istream& is, Complex& c) {
        cout << "输入实部和虚部: ";
        is >> c.real >> c.imag;
        return is;
    }
    
    // 重载一元运算符
    Complex operator-() const {
        return Complex(-real, -imag);
    }
    
    // 重载自增运算符 (前置)
    Complex& operator++() {
        ++real;
        return *this;
    }
    
    // 重载自增运算符 (后置)
    Complex operator++(int) {
        Complex temp = *this;
        ++real;
        return temp;
    }
    
    // 访问器函数
    double getReal() const { return real; }
    double getImag() const { return imag; }
};

int main() {
    Complex c1(3, 4);
    Complex c2(1, 2);
    
    cout << "c1 = " << c1 << endl;
    cout << "c2 = " << c2 << endl;
    
    Complex c3 = c1 + c2;
    cout << "c1 + c2 = " << c3 << endl;
    
    Complex c4 = c1 - c2;
    cout << "c1 - c2 = " << c4 << endl;
    
    Complex c5 = c1 * c2;
    cout << "c1 * c2 = " << c5 << endl;
    
    cout << "c1 == c2: " << (c1 == c2) << endl;
    
    Complex c6 = -c1;
    cout << "-c1 = " << c6 << endl;
    
    Complex c7 = c1;
    cout << "c7 (自增前) = " << c7 << endl;
    ++c7;
    cout << "c7 (前置自增后) = " << c7 << endl;
    
    Complex c8 = c7++;
    cout << "c8 (后置自增赋值) = " << c8 << ", c7 = " << c7 << endl;
    
    return 0;
}
```

### 下标运算符重载

```cpp
#include <iostream>
#include <stdexcept>
using namespace std;

class IntArray {
private:
    int* data;
    int size;

public:
    IntArray(int s) : size(s) {
        data = new int[size]();
    }
    
    // 拷贝构造函数
    IntArray(const IntArray& other) : size(other.size) {
        data = new int[size];
        for (int i = 0; i < size; i++) {
            data[i] = other.data[i];
        }
    }
    
    // 赋值运算符
    IntArray& operator=(const IntArray& other) {
        if (this != &other) {
            delete[] data;
            size = other.size;
            data = new int[size];
            for (int i = 0; i < size; i++) {
                data[i] = other.data[i];
            }
        }
        return *this;
    }
    
    // 析构函数
    ~IntArray() {
        delete[] data;
    }
    
    // 重载下标运算符
    int& operator[](int index) {
        if (index < 0 || index >= size) {
            throw out_of_range("索引越界");
        }
        return data[index];
    }
    
    // 常量版本的下标运算符
    const int& operator[](int index) const {
        if (index < 0 || index >= size) {
            throw out_of_range("索引越界");
        }
        return data[index];
    }
    
    int getSize() const { return size; }
    
    // 重载输出运算符
    friend ostream& operator<<(ostream& os, const IntArray& arr) {
        os << "[";
        for (int i = 0; i < arr.size; i++) {
            os << arr.data[i];
            if (i < arr.size - 1) os << ", ";
        }
        os << "]";
        return os;
    }
};

int main() {
    IntArray arr(5);
    
    // 使用下标运算符赋值
    for (int i = 0; i < arr.getSize(); i++) {
        arr[i] = (i + 1) * 10;
    }
    
    cout << "数组内容: " << arr << endl;
    
    // 使用下标运算符访问
    cout << "arr[2] = " << arr[2] << endl;
    
    // 修改特定元素
    arr[2] = 999;
    cout << "修改后: " << arr << endl;
    
    // 常量对象测试
    const IntArray const_arr = arr;
    cout << "常量数组[2] = " << const_arr[2] << endl;
    
    return 0;
}
```

---

## 8. 完整示例

### 示例1: 图书管理系统

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

// 基类：出版物
class Publication {
protected:
    string title;
    string author;
    int year;

public:
    Publication(string t, string a, int y) : title(t), author(a), year(y) {}
    
    virtual void display() const {
        cout << "标题: " << title << ", 作者: " << author << ", 年份: " << year;
    }
    
    virtual double calculateLateFee(int days) const = 0;  // 纯虚函数
    
    string getTitle() const { return title; }
    virtual ~Publication() = default;
};

// 派生类：图书
class Book : public Publication {
private:
    int pages;
    string isbn;

public:
    Book(string t, string a, int y, int p, string i) 
        : Publication(t, a, y), pages(p), isbn(i) {}
    
    void display() const override {
        Publication::display();
        cout << ", 页数: " << pages << ", ISBN: " << isbn << endl;
    }
    
    double calculateLateFee(int days) const override {
        return days * 0.50;  // 图书每天0.5元滞纳金
    }
    
    int getPages() const { return pages; }
};

// 派生类：期刊
class Journal : public Publication {
private:
    int issue;
    string publisher;

public:
    Journal(string t, string a, int y, int i, string p) 
        : Publication(t, a, y), issue(i), publisher(p) {}
    
    void display() const override {
        Publication::display();
        cout << ", 期号: " << issue << ", 出版社: " << publisher << endl;
    }
    
    double calculateLateFee(int days) const override {
        return days * 1.00;  // 期刊每天1.0元滞纳金
    }
    
    int getIssue() const { return issue; }
};

// 图书馆类
class Library {
private:
    vector<Publication*> catalog;

public:
    void addPublication(Publication* pub) {
        catalog.push_back(pub);
    }
    
    void displayAll() const {
        cout << "\n图书馆所有出版物:" << endl;
        for (const auto& pub : catalog) {
            pub->display();
        }
    }
    
    Publication* findPublication(const string& title) {
        auto it = find_if(catalog.begin(), catalog.end(),
                         [&title](Publication* p) {
                             return p->getTitle() == title;
                         });
        return (it != catalog.end()) ? *it : nullptr;
    }
    
    double calculateTotalLateFee(const vector<pair<string, int>>& borrowed) const {
        double total = 0.0;
        for (const auto& item : borrowed) {
            Publication* pub = findPublication(item.first);
            if (pub) {
                total += pub->calculateLateFee(item.second);
            }
        }
        return total;
    }
    
    ~Library() {
        for (auto* pub : catalog) {
            delete pub;
        }
    }
};

int main() {
    Library lib;
    
    // 添加出版物
    lib.addPublication(new Book("C++ Primer", "Stanley Lippman", 2012, 900, "978-0321714114"));
    lib.addPublication(new Book("算法导论", "Thomas Cormen", 2009, 1292, "978-0262033848"));
    lib.addPublication(new Journal("计算机学报", "中科院", 2023, 11, "科学出版社"));
    
    // 显示所有出版物
    lib.displayAll();
    
    // 查找特定出版物
    Publication* found = lib.findPublication("C++ Primer");
    if (found) {
        cout << "\n找到出版物: ";
        found->display();
    }
    
    // 计算滞纳金
    vector<pair<string, int>> borrowed = {% raw %}{{"C++ Primer", 7}, {"计算机学报", 3}}{% endraw %};
    double fee = lib.calculateTotalLateFee(borrowed);
    cout << "\n总滞纳金: $" << fee << endl;
    
    return 0;
}
```

### 示例2: 员工管理系统

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <memory>
using namespace std;

// 员工基类
class Employee {
protected:
    string name;
    int id;
    double baseSalary;

public:
    Employee(string n, int i, double salary) : name(n), id(i), baseSalary(salary) {}
    
    virtual double calculateSalary() const {
        return baseSalary;
    }
    
    virtual void displayInfo() const {
        cout << "ID: " << id << ", 姓名: " << name 
             << ", 基本工资: " << baseSalary 
             << ", 总工资: " << calculateSalary() << endl;
    }
    
    virtual string getEmployeeType() const = 0;
    
    string getName() const { return name; }
    int getId() const { return id; }
    
    virtual ~Employee() = default;
};

// 全职员工
class FullTimeEmployee : public Employee {
private:
    double bonus;

public:
    FullTimeEmployee(string n, int i, double salary, double b) 
        : Employee(n, i, salary), bonus(b) {}
    
    double calculateSalary() const override {
        return baseSalary + bonus;
    }
    
    string getEmployeeType() const override {
        return "全职员工";
    }
    
    void displayInfo() const override {
        Employee::displayInfo();
        cout << "  类型: " << getEmployeeType() << ", 奖金: " << bonus << endl;
    }
};

// 兼职员工
class PartTimeEmployee : public Employee {
private:
    int hoursWorked;
    double hourlyRate;

public:
    PartTimeEmployee(string n, int i, double rate, int hours) 
        : Employee(n, i, 0), hourlyRate(rate), hoursWorked(hours) {}
    
    double calculateSalary() const override {
        return hourlyRate * hoursWorked;
    }
    
    string getEmployeeType() const override {
        return "兼职员工";
    }
    
    void displayInfo() const override {
        Employee::displayInfo();
        cout << "  类型: " << getEmployeeType() 
             << ", 工时: " << hoursWorked << ", 时薪: " << hourlyRate << endl;
    }
};

// 销售员工
class SalesEmployee : public Employee {
private:
    double salesAmount;
    double commissionRate;

public:
    SalesEmployee(string n, int i, double salary, double sales, double rate) 
        : Employee(n, i, salary), salesAmount(sales), commissionRate(rate) {}
    
    double calculateSalary() const override {
        return baseSalary + (salesAmount * commissionRate);
    }
    
    string getEmployeeType() const override {
        return "销售员工";
    }
    
    void displayInfo() const override {
        Employee::displayInfo();
        cout << "  类型: " << getEmployeeType() 
             << ", 销售额: " << salesAmount << ", 提成率: " << commissionRate << endl;
    }
};

// 公司管理系统
class Company {
private:
    vector<unique_ptr<Employee>> employees;

public:
    void addEmployee(unique_ptr<Employee> emp) {
        employees.push_back(move(emp));
    }
    
    void displayAllEmployees() const {
        cout << "\n公司所有员工信息:" << endl;
        for (const auto& emp : employees) {
            emp->displayInfo();
            cout << endl;
        }
    }
    
    double getTotalSalary() const {
        double total = 0.0;
        for (const auto& emp : employees) {
            total += emp->calculateSalary();
        }
        return total;
    }
    
    Employee* findEmployee(int id) {
        for (auto& emp : employees) {
            if (emp->getId() == id) {
                return emp.get();
            }
        }
        return nullptr;
    }
};

int main() {
    Company company;
    
    // 添加不同类型员工
    company.addEmployee(make_unique<FullTimeEmployee>("张三", 1001, 8000, 2000));
    company.addEmployee(make_unique<PartTimeEmployee>("李四", 1002, 50, 80));
    company.addEmployee(make_unique<SalesEmployee>("王五", 1003, 5000, 50000, 0.05));
    
    // 显示所有员工
    company.displayAllEmployees();
    
    // 显示总薪资
    cout << "公司总薪资支出: " << company.getTotalSalary() << endl;
    
    // 查找特定员工
    Employee* emp = company.findEmployee(1001);
    if (emp) {
        cout << "\n找到员工: ";
        emp->displayInfo();
    }
    
    return 0;
}
```

---

## 知识点总结

### OOP核心概念

| 概念 | C++实现 | 说明 |
|------|---------|------|
| 封装 | `class` + 访问控制 | 数据和方法封装在一起 |
| 继承 | `class Derived : public Base` | 代码复用和扩展 |
| 多态 | 虚函数 + 重写 | 统一接口不同实现 |

### 访问控制对比

| 修饰符 | 同类 | 派生类 | 外部 |
|--------|------|--------|------|
| `private` | ✓ | ✗ | ✗ |
| `protected` | ✓ | ✓ | ✗ |
| `public` | ✓ | ✓ | ✓ |

### 对比: C++ vs Python

| 特性 | C++ | Python |
|------|-----|--------|
| 类定义 | `class Name { ... };` | `class Name:` |
| 访问控制 | `private`, `protected`, `public` | `_private`, `__mangled` (约定) |
| 继承 | `class Derived : public Base` | `class Derived(Base):` |
| 多态 | 虚函数 | 鸭子类型 |
| 构造函数 | `Class(params)` | `__init__(self, params)` |
| 析构函数 | `~Class()` | `__del__(self)` |
| 运算符重载 | `operator+`, `operator[]` | `__add__`, `__getitem__` |

---

## 练习题

1. 创建一个图形类层次结构，包含圆形、矩形、三角形等，实现面积和周长计算
2. 设计一个银行账户系统，包含储蓄账户和支票账户，有不同的利息和手续费规则
3. 实现一个简单的游戏系统，包含不同类型的敌人，每种敌人有不同的攻击方式
4. 创建一个文件系统模拟器，包含普通文件、目录、链接等不同类型
5. 设计一个动物模拟器，包含哺乳动物、鸟类、鱼类等，每类有不同的行为特征
6. 实现一个学校管理系统，包含学生、教师、管理员等不同角色
7. 创建一个媒体播放器系统，支持音频、视频等不同格式
8. 设计一个电商系统，包含不同类型的用户（普通用户、VIP用户、企业用户）
9. 实现一个图形界面组件系统，包含按钮、文本框、列表等控件
10. 创建一个交通工具模拟器，包含汽车、飞机、船舶等，每种有不同特性

---

[← 上一章: 函数](04-functions.md) | [下一章: STL标准库 →](06-stl.md)
