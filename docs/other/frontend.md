---
title: Frontend
sidebar_position: 3
---

## 一、TypeScript & 前端框架

- TypeScript 是 JavaScript 的型別加強版，能提升大型前端專案的可維護性。
- React 與 Vue 都能搭配 TypeScript 使用。

## 二、React 基礎

### 1. React 組件與狀態

- React 組件是 UI 的最小單位，通常用函式（Function Component）撰寫。
- 狀態（state）用 `useState` 管理，互動時可用 `setState` 更新。

### 2. React Hooks：useEffect

- `useEffect` 是管理副作用（如 API 請求、事件監聽、計時器等）的 Hook。
- 基本語法：

  ```javascript
  useEffect(() => {
    // 組件掛載時執行
    // ...副作用邏輯...
    return () => {
      // 組件卸載前執行（清理）
    };
  }, [dependencies]); // 依賴陣列
  ```

- 關鍵概念：

  - 組件「出生」時執行
  - 依賴改變時重新執行
  - 組件「死亡」前自動清理

- 實用場景：
  - API 資料載入
  - 事件監聽器設定
  - 計時器管理
  - DOM 操作

### 3. React.FC 型別

- `React.FC` 是 Function Component 的型別註記，但 React 18+ 不再推薦。
- 建議直接用箭頭函式，不必加 `React.FC`。

  ```typescript
  // 舊寫法
  const MyComponent: React.FC = () => {
    return <div>Hello</div>;
  };

  // 新寫法（推薦）
  const MyComponent = () => {
    return <div>Hello</div>;
  };
  ```

---

## 三、Vue 基礎

### 1. Vue 組件與響應式

- Vue 組件也是 UI 的最小單位，語法更接近 HTML。
- 響應式資料用 `ref` 或 `reactive` 管理。

### 2. Vue 的副作用管理

- Vue 用 `watch` 監控資料變化，執行副作用。
- 生命週期（lifecycle hooks）如 `mounted`、`updated`、`unmounted`，類似 React 的 useEffect。

  ```javascript
  // Vue watch
  watch(count, (newVal, oldVal) => {
    // count 變化時執行
  });
  ```

### 3. 事件綁定

- Vue 用 `v-on`（或 `@`）綁定事件，類似 React 的 `onClick`。
- 但 Vue 的事件監聽生命週期可用 `watch` 或生命週期 hooks 管理。

---

## 四、React 與 Vue 對照

| 功能       | React              | Vue                         |
| ---------- | ------------------ | --------------------------- |
| 狀態管理   | useState           | ref / reactive              |
| 副作用管理 | useEffect          | watch / lifecycle hooks     |
| 事件綁定   | onClick            | v-on / @                    |
| 組件型別   | Function Component | SFC (Single File Component) |

---

## 五、常見實用場景

- API 資料載入
- 事件監聽器設定
- 計時器管理
- DOM 操作

---

## 六、官方教學資源

- [Vue 官方教學](https://vuejs.org/tutorial/)
- [React 官方教學](https://react.dev/learn)

---

這樣整理後，你可以依照「組件 → 狀態 → 副作用 → 事件 → 對照」的順序，逐步學習 React 與 Vue 的基礎與差異。
