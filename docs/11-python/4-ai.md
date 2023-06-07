---
sidebar_position: 4
---
# AI

## 01人工智慧、機器學習、深度學習介紹
### 名詞簡介與關係
- 人工智慧 Artificial Intelligence
    - Turing 圖靈
    - strong AI: 居有和人類相同認知能
    - weak AI：不需要具有和人類相同認知能，只要設計的看起來具有智慧即可

- 機器學習：透過演算法使用大量資料進行訓練，訓練好會形成模型，當未來有新資料時可以進行預測 Machine Learning
    - 監督式學習: Supervised Learning
    - 非監督式學習: Unsupervised Learning
    - 增強式學習

- 深度學習 deep learning
    - 機器學習的分支
    - 模擬人類神經網路的運作模式
    - Multilayer Perceptron 多層感知器
    - DNN 深度神經網路/CNN 卷積神經網路/RNN 遞迴神經網路

question: 為何近年成長快速？
1. 大數據big data 分散式儲存與運算
2. GPU\TPU 平行運算

### 機器學習介紹
- 透過演算法、使用歷史資料進行訓練，訓練完成後會產生模型。未來有新資料後可以使用模型進行預測

- features 資料特徵 ex. 風向、濕度、氣壓
- label 資料標籤，希望預設的目標ex. 晴天、陰天、下雪
- training 過去累積的歷史資料
- predict 預測

### 機器學習分類
- 監督式學習 supervised learning
    - ：已知有具備特徵與預測目標
    - 二元分類
    - 多元分類
    - 回歸分析

- 非監督式學習 unsupervised learning
    - ：不知道要預測的答案
    - cluster 集群演算法：分成幾個相異性大的，而群組內相似程度高
- 強化學習 reinforcement learning
    - :藉由定義動作、狀態、獎勵的方式，不斷訓練機器循序漸進
    - Q-learning
    - TD
    - Sarsa

### 深度學習
- [wiki](https://zh.wikipedia.org/wiki/%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0)

## 02 深度學習的原理
- 神經傳導原理介紹 
- 多層感知器模型
- 使用back propagation 反向傳播演算法進行訓練
    - 資料預處理
    - 建立模型
    - 反向傳播算法訓練多層感知器模型
    - 最佳化方法
        - SGD梯度下降法

## 03 TensorFlow與Keras介紹
- TensorFlow 架構圖:Tensor 張量/廣義的數量+ Flow 資料流程
    - 高階API
    - 前端程式語言 python c++
    - TensorFlow Distributed Execution Engine
    - 平台作業系統
    - CPU GPU TPU
- 主要設計讓矩陣運算達到最高效能
- TensorFlow 程式設計模式核心:計算圖 建立與執行～

- Keras 介紹
    - 模型的建立與訓練、預測
    - 後端引擎: Theano 或者TensorFlow

- keras 程式設計模式
```
model = Sequential()
model.add(Dense(units=256,
                input_dim=784,
                kernel_initializer='normal',
                activation='relu')) //加入輸入層和隱藏層
model.add(Dense(units=10,
                kernel_initializer='normal',
                activation='softmax')) //加入輸出層
```

## 04 Windows 安裝TensorFlow 與Keras
- 安裝anaconda
- conda create --name tensorflow python=3.5 anaconda
- activate tensorflow //open env
    - jupyter notebook
- deactivate tensorflow //close env
- pip install tensorflow
- pip install keras
- import tensorflow as tf
    - tf._\_version_\_
- import keras
    - keras._\_version_\_

## 05 linux ubuntu 安裝 TensorFlow 與keras
- same step...
- edit .bashrc
    - export PATH="/home/user/anaconda3/bin:$PATH"
- jupyter notebook


## 必要函式庫
- Pandas
- Jupyter
- matplotlib
- TensorFlow
- Keras

## jupyter
```
jupyter notebook
```

## pandas
- 定義：
    - 直：column
    - 橫：row 
    - columns: 行標籤
    - index：列標籤
    - dataFrame / series

## 使用 pandas

### 基礎行列操作
```
import pandas as pd
df = pd.read_csv('ted_main.csv',encoding = 'utf-8')

# 行操作
df["comments"]
df[["comments","description"]]

# 列操作
df.head(5)
df.tail(5)
df.iloc[999]
df.iloc[999:1005]
df.iloc[999:1005:2]
```

### 進階操作
```
from datetime import datetime

def timeflow(t):
    return str(datetime.utcfromtimestamp(t))

df['file_date_utc'] = df['film_date'].apply(timeflow)
df

# df[條件]
df.head(3)[[False,True,False]]

df["comments"]>30
df[df["comments"]>3000]

# 篩選出children 的tag
def tagFlow(s):
    tags = eval(s)
    return "children" in tags
df["tags"].apply(tagFlow)
df[df["tags"].apply(tagFlow)]

def test(**a):
    print(a)

# 允許外部作為參數輸入tag
def tagFlow(s,**kwargs):
    tags = eval(s)
    return kwargs['tag'] in tags

df[df["tags"].apply(tagFlow,tag='children')]

# 翻轉資料
df.T
df.T.to_csv("hello.csv",encoding = 'utf-8',index=False)
```

<!-- # 深度學習入門教室
http://www.sotechsha.co.jp/sp/1187
## CH1 深度學習與機器學習
1. 深階層的類神經網路
DNN => Deep Neural Network
2. 歷史
3. 監督式學習與非監督式學習、強化學習
4. 所需的數學

## 安裝python 以及python 基本語法

## TensorFlow & Keras 的安裝

## numpy
```
import numpy as np
a = np.array([1,2,3,4,5,6])
a.reshape([3,2])
np.zeros((3,4)) //[[0,0,0,0],[0,0,0,0],[0,0,0,0]]
```

## matplotlib


- ANN: 人工神經網路
- 階躍函數：step function: 當某個條件才會是0/某個條件才是1
- 感知器

## 激勵函數
 -->
