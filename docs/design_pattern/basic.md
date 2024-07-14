
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