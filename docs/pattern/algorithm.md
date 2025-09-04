# 演算法

## Big-O

- 演算法的執行時間不會隨著元素的增加而成等比增加
- 代表的是最差情況的執行時間

## Divide-and-Conquer

- 將一個問題分解成越來越小的問題。使用 D&C 時處理陣列時，Base Case 就是空陣列或單一元素的陣列

## 搜尋

### 二元搜尋法

```python
def binary_search(arr, item):
    low = 0
    high = len(arr) - 1

    while low <= high:
        mid = (low + high) // 2
        guess = arr[mid]

        if guess == item:
            return mid
        elif:
            high = mid - 1
        else:
            low = mid + 1
    return None
```

## 排序

### 選擇排序法

```python
def findSmallest(arr):
    smallest = arr[0]
    smallest_index = 0
    for i in range(1,len(arr)):
        if arr[i] < smallest:
            smallest_index = i
            smallest = arr[i]
    return smallest_index

def selectionSort(arr):
    newArr = []
    for i in range(len(arr)):
        smallest = findSmallest(arr)
        newArr.append(arr.pop(smallest))
    return newArr

```

### 快速排序法

- O(n log n)

```python
def quicksort(array):
    if len(array) < 2:
        return array
    else:
        pivot = array[0]
        less = [i for i in array[1:] if i <= pivot]
        greater = [i for i in array[1:] if i > pivot]

    return quicksort(less) + [pivot] + quicksort(greater)
```

## 遞迴

- 呼叫自己
- 必須有 Base Case 和 Recursive Case
- 所有呼叫都會產生一個 Call Stack
- 遞迴的 Call Stack 可能會變的非常大並且佔用大量的記憶體

```python
def countdown(i):
    print(i)
    if i <= 1:
        return
    else:
        countdown(i-1)
```
