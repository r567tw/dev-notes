---
sidebar_position: 3
---

## Design Pattern

### 監聽者模式

在物件間定義一種一對多的依賴關係，當這個物件狀態發生改變時，所有依賴他的物件都會被通知並自動更新

#### Python 範例

```python
class Subject:
  def __init__(self):
    self._observers = []
  def attach(self, observer):
    self._observers.append(observer)
  def detach(self, observer):
    self._observers.remove(observer)
  def notify(self, msg):
    for observer in self._observers:
      observer.update(msg)

class Observer:
  def update(self, msg):
    print(f"Received: {msg}")

subject = Subject()
observer1 = Observer()
observer2 = Observer()
subject.attach(observer1)
subject.attach(observer2)
subject.notify("Hello Observers!")
# Output:
# Received: Hello Observers!
# Received: Hello Observers!
```

> 這種模式常用於事件系統、GUI 框架、資料同步等場景。

### 裝飾者模式

動態地給物件增加職責，就像包裝一層一層的裝飾品一樣，不需改變原本的類別。

#### Python 範例

```python
class Coffee:
  def cost(self):
    return 5

class MilkDecorator:
  def __init__(self, coffee):
    self._coffee = coffee
  def cost(self):
    return self._coffee.cost() + 2

class SugarDecorator:
  def __init__(self, coffee):
    self._coffee = coffee
  def cost(self):
    return self._coffee.cost() + 1

coffee = Coffee()
print(coffee.cost())  # 5
coffee = MilkDecorator(coffee)
print(coffee.cost())  # 7
coffee = SugarDecorator(coffee)
print(coffee.cost())  # 8
```

> 裝飾者模式常用於需要動態擴充功能、避免類別爆炸的場景，例如 I/O stream、middleware 等。

#### Python 語言層級的裝飾器

- https://steam.oxxostudio.tw/category/python/basic/decorator.html

Python 本身支援函式/方法的裝飾器（decorator），可用來動態擴充函式功能，語法簡潔，常見於日誌、權限驗證、快取等場景。

```python
def my_decorator(func):
  def wrapper(*args, **kwargs):
    print("執行前...")
    result = func(*args, **kwargs)
    print("執行後...")
    return result
  return wrapper

@my_decorator
def say_hello(name):
  print(f"Hello, {name}")

say_hello("Jimmy")
# Output:
# 執行前...
# Hello, Jimmy
# 執行後...
```

> Python 的 @decorator 語法糖讓裝飾器應用更直觀，能有效分離橫切關注點（如日誌、驗證、計時等）。

### 單例模式 (Singleton)

確保一個類別只有一個實例，並提供全域存取點。

```python
class Singleton:
  _instance = None
  def __new__(cls):
    if cls._instance is None:
      cls._instance = super().__new__(cls)
    return cls._instance
a = Singleton()
b = Singleton()
print(a is b)  # True
```

### 工廠模式 (Factory)

定義一個用於建立物件的介面，讓子類決定實例化哪個類別。

```python
class Animal:
  def speak(self):
    pass
class Dog(Animal):
  def speak(self):
    return "Woof!"
class Cat(Animal):
  def speak(self):
    return "Meow!"
def animal_factory(kind):
  if kind == "dog":
    return Dog()
  elif kind == "cat":
    return Cat()
pet = animal_factory("dog")
print(pet.speak())  # Woof!
```

### 策略模式 (Strategy)

定義一系列演算法，把它們一個個封裝起來，並且使它們可以互換。

```python
class Strategy:
  def do_operation(self, a, b):
    pass
class Add(Strategy):
  def do_operation(self, a, b):
    return a + b
class Subtract(Strategy):
  def do_operation(self, a, b):
    return a - b
def execute(strategy, a, b):
  return strategy.do_operation(a, b)
print(execute(Add(), 5, 3))      # 8
print(execute(Subtract(), 5, 3)) # 2
```

### 命令模式 (Command)

將請求封裝成物件，讓你用不同的請求、佇列或日誌參數化其他物件。

```python
class Light:
  def on(self):
    print("Light is ON")
  def off(self):
    print("Light is OFF")
class Command:
  def execute(self):
    pass
class LightOnCommand(Command):
  def __init__(self, light):
    self.light = light
  def execute(self):
    self.light.on()
light = Light()
cmd = LightOnCommand(light)
cmd.execute()  # Light is ON
```

### 代理模式 (Proxy)

為其他物件提供一種代理以控制對這個物件的訪問。

```python
class RealSubject:
  def request(self):
    print("RealSubject: Handling request.")
class Proxy:
  def __init__(self, real_subject):
    self._real_subject = real_subject
  def request(self):
    print("Proxy: Logging before request.")
    self._real_subject.request()
real = RealSubject()
proxy = Proxy(real)
proxy.request()
```

### 模板方法模式 (Template Method)

定義一個操作中的演算法骨架，將一些步驟延遲到子類別中。

```python
class AbstractClass:
  def template_method(self):
    self.step1()
    self.step2()
  def step1(self):
    print("Step 1")
  def step2(self):
    pass
class ConcreteClass(AbstractClass):
  def step2(self):
    print("Step 2")
obj = ConcreteClass()
obj.template_method()
```

### 狀態模式 (State)

允許物件在內部狀態改變時改變它的行為。

```python
class State:
  def handle(self):
    pass
class StateA(State):
  def handle(self):
    print("State A")
class StateB(State):
  def handle(self):
    print("State B")
class Context:
  def __init__(self, state):
    self.state = state
  def request(self):
    self.state.handle()
context = Context(StateA())
context.request()  # State A
context.state = StateB()
context.request()  # State B
```

### 責任鏈模式 (Chain of Responsibility)

使多個物件都有機會處理請求，將這些物件連成一條鏈，並沿著這條鏈傳遞請求。

```python
class Handler:
  def __init__(self, successor=None):
    self.successor = successor
  def handle(self, request):
    if self.successor:
      self.successor.handle(request)
class ConcreteHandlerA(Handler):
  def handle(self, request):
    if request == "A":
      print("Handled by A")
    else:
      super().handle(request)
class ConcreteHandlerB(Handler):
  def handle(self, request):
    if request == "B":
      print("Handled by B")
    else:
      super().handle(request)
handler = ConcreteHandlerA(ConcreteHandlerB())
handler.handle("B")  # Handled by B
```

---

## SOLID

- SRP: Single Responsibility Principle (單一職責原則)
  應該且僅有一個原因引起類別的變更，讓類別只有一個職責。
- OCP: Open Closed Principle (開放封閉原則)
  軟體中的對象(類別、函數)，對於擴展是開放的，對於修改是封閉的。
- LSP: Liskov Substitution Principle (里氏替換原則)
  所有參照基礎類別的地方，必須可以使用衍生類別的物件代替，而不需要任何改變。
  子類別應該可以替換掉父類別而不影響程式架構。
  子類別應該可以執行父類別想做的事情。
- LKP: Least Knowledge Principle (最小知識原則)
  一個物件應該對其他物件有最少的了解，盡可能減少類別中的 public method，降低其他類別對此類別的偶合度。
- ISP: Interface Segregation Principle (介面隔離原則)
  用戶端程式碼不應該依賴他用不到的介面，依賴的介面都是有其必要性。
  把不同功能的從介面中分離出來。
- DIP: Dependency Inversion Principle (依賴反轉原則)
  高接模組不應該依賴低接模組，兩者應該要依賴其抽象，抽象不要依賴細節，細節要依賴抽象。
  不要把程式碼寫死某種實作上。

Ref: http://clouding.city/oop-solid/

總結面對原始碼改變的策略：

1. SRP: 降低單一類別被「改變」所影響的機會
2. OCP: 讓主類別不會因為新增需求而改變
3. LSP: 避免繼承時子類別所造成的「行為改變」
4. LKP: 避免暴露過多資訊造成用戶端因流程調整而改變
5. ISP: 降低用戶端因為不相關介面而被改變
6. DIP: 避免高階程式因為低階程式改變而被迫改變

### DI、IoC、DIP

控制權反轉，注入介面使用介面的方法，以便日後維護與替換

> DI 其實是個手段，不是目標。

- Inversion of Control （控制反轉）是實現低耦合的最佳設計方式之一，讓通用的程式碼來控制應用特定的程式碼，相依於抽象而不倚賴實作。實現 IoC 的做法有：DI、工廠模式……等。

> **DIP 是個使用抽象時依賴關係的準則或概念，IoC 說明了依賴關係的控制方向，而 DI 是一種處理依賴關係的模式。**

Ref: https://medium.com/wenchin-rolls-around/%E6%B7%BA%E5%85%A5%E6%B7%BA%E5%87%BA-dependency-injection-ea672ba033ca

## MVC

- Model：處理與應用程式業務邏輯相關的資料、及資料的處理方法
- View：實現顯示
- Controller：控制應用程式的流程、處理事件並作出回應
