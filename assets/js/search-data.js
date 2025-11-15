// 搜索索引数据文件
// 包含所有文档的标题、内容、URL等信息，用于Lunr.js全文搜索

window.searchData = [
    // Python教程
    {
        id: 'python-01-basics',
        title: 'Python 基础入门',
        url: '/docs/python/01-basics',
        category: 'Python',
        content: 'Python 基础入门 Python 简介 语言特点 解释型语言 无需编译 逐行执行 动态类型 变量无需声明类型 高级语言 接近人类语言 易读易写 跨平台 Windows Linux macOS通用 丰富的库 标准库 第三方库生态完善 应用领域 Web开发 Django Flask 数据分析 Pandas NumPy 人工智能 TensorFlow PyTorch 自动化脚本 科学计算 环境搭建 安装Python 交互式解释器 运行Python文件 第一个程序 基本语法 缩进规则 语句结束 续行 变量与命名 变量赋值 命名规则 Python关键字 数据类型概览 基本类型 类型查询 运算符 算术运算符 比较运算符',
        keywords: ['python', '基础', '入门', '变量', '语法', '环境', '数据类型', '运算符']
    },
    {
        id: 'python-02-data-types',
        title: 'Python 数据类型',
        url: '/docs/python/02-data-types',
        category: 'Python',
        content: 'Python 数据类型 数字类型 整数 浮点数 复数 字符串 字符串创建 字符串操作 格式化 列表 列表创建 列表操作 列表方法 元组 元组创建 元组操作 字典 字典创建 字典操作 字典方法 集合 集合创建 集合操作 集合运算',
        keywords: ['python', '数据类型', '字符串', '列表', '字典', '元组', '集合', '数字']
    },
    {
        id: 'python-03-control-flow',
        title: 'Python 控制流',
        url: '/docs/python/03-control-flow',
        category: 'Python',
        content: 'Python 控制流 条件语句 if语句 elif语句 else语句 嵌套条件 循环语句 for循环 while循环 循环控制 break continue pass 异常处理 try except finally',
        keywords: ['python', '控制流', 'if', 'for', 'while', '循环', '条件', '异常处理']
    },
    {
        id: 'python-04-functions',
        title: 'Python 函数',
        url: '/docs/python/04-functions',
        category: 'Python',
        content: 'Python 函数 函数定义 参数传递 位置参数 关键字参数 默认参数 可变参数 返回值 作用域 局部变量 全局变量 lambda函数 递归函数 装饰器 生成器',
        keywords: ['python', '函数', 'def', '参数', '返回值', 'lambda', '递归', '装饰器']
    },
    {
        id: 'python-05-oop',
        title: 'Python 面向对象',
        url: '/docs/python/05-oop',
        category: 'Python',
        content: 'Python 面向对象 类和对象 类定义 对象创建 属性和方法 实例属性 类属性 实例方法 类方法 静态方法 继承 单继承 多继承 方法重写 多态 封装 私有属性 特殊方法 构造方法 析构方法',
        keywords: ['python', '面向对象', '类', '对象', '继承', '封装', '多态', '方法']
    },
    {
        id: 'python-06-common-modules',
        title: 'Python 常用模块',
        url: '/docs/python/06-common-modules',
        category: 'Python',
        content: 'Python 常用模块 模块导入 import语句 from import 标准库模块 os模块 sys模块 time模块 datetime模块 random模块 math模块 json模块 re模块 正则表达式 文件操作 文件读写 文件路径',
        keywords: ['python', '模块', 'import', '库', 'os', 'sys', 'json', '文件操作']
    },

    // C++教程
    {
        id: 'cpp-01-basics',
        title: 'C++ 基础入门',
        url: '/docs/cpp/01-basics',
        category: 'C++',
        content: 'C++ 基础入门 C++简介 语言特点 静态类型 编译时确定类型 编译型语言 编译为机器码执行 面向对象 支持封装继承多态 高性能 接近硬件执行效率高 系统编程 可直接操作内存 向下兼容 兼容C语言 应用领域 系统软件 操作系统驱动程序 游戏开发 引擎图形渲染 高性能计算 科学计算金融 嵌入式系统 物联网单片机 图形界面 桌面应用 环境搭建 编译器安装 编译运行 IDE推荐 第一个程序 基本语法 头文件 命名空间 注释 语句与分号 变量与数据类型 基本数据类型 变量声明与初始化 常量 类型转换',
        keywords: ['c++', 'cpp', '基础', '入门', '编译', '语法', '数据类型', '变量']
    },
    {
        id: 'cpp-02-data-types',
        title: 'C++ 数据类型与指针',
        url: '/docs/cpp/02-data-types',
        category: 'C++',
        content: 'C++ 数据类型与指针 基本数据类型 整型 浮点型 字符型 布尔型 指针 指针声明 指针操作 指针运算 引用 引用声明 引用特性 数组 数组声明 数组操作 多维数组 动态内存 new delete 内存管理',
        keywords: ['c++', 'cpp', '数据类型', '指针', '引用', '内存', '数组']
    },
    {
        id: 'cpp-03-control-flow',
        title: 'C++ 控制流',
        url: '/docs/cpp/03-control-flow',
        category: 'C++',
        content: 'C++ 控制流 条件语句 if语句 switch语句 循环语句 for循环 while循环 do-while循环 循环控制 break continue goto 位运算 按位与 按位或 按位异或 位移运算',
        keywords: ['c++', 'cpp', '控制流', 'if', 'for', 'while', '循环', '位运算']
    },
    {
        id: 'cpp-04-functions',
        title: 'C++ 函数',
        url: '/docs/cpp/04-functions',
        category: 'C++',
        content: 'C++ 函数 函数定义 函数声明 参数传递 值传递 引用传递 指针传递 函数重载 默认参数 内联函数 递归函数 函数指针 函数模板',
        keywords: ['c++', 'cpp', '函数', '重载', '模板', '参数', '递归']
    },
    {
        id: 'cpp-05-oop',
        title: 'C++ 面向对象',
        url: '/docs/cpp/05-oop',
        category: 'C++',
        content: 'C++ 面向对象 类和对象 类定义 对象创建 构造函数 析构函数 拷贝构造函数 赋值运算符 继承 公有继承 私有继承 保护继承 多重继承 虚函数 纯虚函数 抽象类 多态 运算符重载 友元函数 友元类',
        keywords: ['c++', 'cpp', '面向对象', '类', '继承', '多态', '虚函数', '运算符重载']
    },
    {
        id: 'cpp-06-stl',
        title: 'C++ STL标准库',
        url: '/docs/cpp/06-stl',
        category: 'C++',
        content: 'C++ STL标准库 容器 vector 动态数组 list 链表 deque 双端队列 set 集合 map 映射 stack 栈 queue 队列 priority_queue 优先队列 迭代器 算法 sort 排序 find 查找 智能指针 unique_ptr shared_ptr weak_ptr',
        keywords: ['c++', 'cpp', 'stl', '标准库', 'vector', 'map', '容器', '算法']
    },

    // 算法专题
    {
        id: 'algorithm-sorting',
        title: '排序算法',
        url: '/docs/algorithm/sorting',
        category: '算法',
        content: '排序算法 冒泡排序 选择排序 插入排序 快速排序 归并排序 堆排序 计数排序 桶排序 基数排序 时间复杂度 空间复杂度 稳定性 排序算法比较',
        keywords: ['算法', '排序', '冒泡', '快排', '归并', '堆排序', '时间复杂度']
    },
    {
        id: 'algorithm-searching',
        title: '搜索算法',
        url: '/docs/algorithm/searching',
        category: '算法',
        content: '搜索算法 线性搜索 二分搜索 跳跃搜索 指数搜索 插值搜索 斐波那契搜索 哈希搜索 深度优先搜索 广度优先搜索 A*搜索 搜索算法比较',
        keywords: ['算法', '搜索', '二分', '线性', 'DFS', 'BFS', 'A*']
    },
    {
        id: 'algorithm-dynamic-programming',
        title: '动态规划',
        url: '/docs/algorithm/dynamic-programming',
        category: '算法',
        content: '动态规划 基本概念 最优子结构 重叠子问题 状态转移方程 斐波那契数列 背包问题 最长公共子序列 最长递增子序列 硬币找零 编辑距离 动态规划优化',
        keywords: ['算法', '动态规划', '背包', '子序列', '状态转移', '优化']
    },

    // 辅助资源
    {
        id: 'faq',
        title: 'FAQ - 常见问题',
        url: '/docs/FAQ',
        category: '资源',
        content: 'FAQ 常见问题 Python问题 C++问题 算法问题 环境配置 编程技巧 学习方法 考试准备 面试技巧',
        keywords: ['FAQ', '问题', '技巧', '学习', '考试', '面试']
    },
    {
        id: 'resources',
        title: '学习资源汇总',
        url: '/docs/resources',
        category: '资源',
        content: '学习资源汇总 在线教程 视频课程 书籍推荐 练习平台 开发工具 社区论坛 博客网站 官方文档',
        keywords: ['资源', '教程', '书籍', '工具', '社区', '文档']
    },
    {
        id: 'quick-reference',
        title: '速查手册',
        url: '/docs/quick-reference',
        category: '资源',
        content: '速查手册 Python语法 C++语法 算法复杂度 数据结构 常用函数 关键字 操作符 标准库',
        keywords: ['速查', '语法', '函数', '关键字', '标准库']
    },
    {
        id: 'summary',
        title: '学习进度跟踪',
        url: '/docs/SUMMARY',
        category: '资源',
        content: '学习进度跟踪 学习计划 进度管理 章节清单 完成状态 学习统计 时间安排',
        keywords: ['进度', '计划', '管理', '统计', '安排']
    },
    {
        id: 'teaching',
        title: '教学设计指南',
        url: '/docs/TEACHING',
        category: '资源',
        content: '教学设计指南 课程设计 教学方法 课堂活动 作业设计 考试评价 教学资源 教学技巧',
        keywords: ['教学', '课程', '方法', '活动', '评价', '技巧']
    }
];
