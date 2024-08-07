---
title: AI
position: 2
---

## AI 分支
- **專家系統**：模擬人類專家的系統，其性能取決於專家的知識與經驗。
- **預測型 AI**：利用深度學習進行數據分析，運用歷史數據預測趨勢，並可以利用非監督式學習發現數據中的隱含規則。
- **生成型 AI**：
  - **AIGC (AI Generated Content)**：使用 AI 生成內容。
  - **生成式 AI (GAI)**：基於專家團隊 (PGC)、用戶 (UGC) 與生成式平台的演算法。

## AI Model 演進
- **機器學習模型**：通過試錯法與反思來積累經驗。
- **類神經網路模型**：模擬人腦神經信號處理與思維過程。
- **生成式演算法模型**：對輸入數據的概率分布建模，生成新數據。
- **語言模型**：用於執行各種自然語言處理任務並理解人類語言。
- **大規模預訓練模型**：能根據上下文進行互動，並以類似人類的方式進行對話。
- **大型語言模型 (LLM)**

:::tip
梯度消失 (Gradient Vanishing):

指在深層神經網絡中，由於梯度在反向傳播過程中逐層變小，導致靠近輸入層的權重更新非常緩慢甚至停止，影響模型的訓練效果。該問題可以通過使用 ReLU 激活函數、適當的權重初始化（如 He 初始化或 Xavier 初始化）、批量歸一化（Batch Normalization）、殘差網絡（Residual Networks）和改進的遞歸神經網絡結構（如 LSTM 和 GRU）來解決。
:::

## AIGC 演算法
- **AE (Autoencoder)**：無監督學習模型，用於數據壓縮與特徵提取。自編碼器包括一個編碼器和一個解碼器，編碼器將輸入數據壓縮為低維表示，解碼器則將其還原為原始數據。這種模型主要用於降噪、特徵提取和數據壓縮。
- **VAE (Variational Autoencoder)**：結合自編碼器與概率建模，用於學習數據的低維表示並生成新樣本。VAE 引入了概率分佈的概念，通過對數據的潛在空間進行建模，可以生成具有隨機性的數據樣本，適用於圖像生成和異常檢測等應用。
- **GAN (Generative Adversarial Network)**：由生成器和判別器組成的一種生成模型。生成器試圖生成逼真的數據樣本，而判別器則負責區分真實數據和生成數據。兩者通過博弈過程相互改進，使生成器最終能夠生成高質量的數據。GAN 常用於圖像生成、圖像超分辨率和圖像修復。
- **PixelRNN**：用於生成像素級別圖像的神經網絡模型，學習圖像像素之間的依賴關係。PixelRNN 逐像素地生成圖像，每個像素的生成依賴於之前生成的像素，這使得它能夠捕捉圖像中的複雜結構和細節。
- **Flow**：基於圖論的方法，用於模擬與分析資料流的動態行為與交互。Flow 模型通過對數據流的依賴關係進行建模，適用於需要分析數據流動和轉換的場景，如交通流量分析和網絡流量管理。
- **Diffusion**：通過在圖像上進行隨機擴散生成圖像的生成模型。Diffusion 模型利用反覆擴散步驟，將圖像的梯度逐漸向噪聲化，從而生成高質量的圖像樣本。這種方法在去噪和圖像生成方面有顯著效果。
- **Transformer**：一種強大的神經網絡架構，特別適用於自然語言處理和其他序列建模任務。Transformer 使用自注意力機制來處理輸入序列中的依賴關係，能夠並行處理輸入序列，使其在處理長序列時表現出色，廣泛應用於機器翻譯、文本生成和語音識別。
- **NeRF (Neural Radiance Fields)**：能從 2D 或 3D 影像中學習出精確的三維場景表示。NeRF 通過將視線從不同角度投影到三維空間中，進行高品質的圖像合成和視圖合成。NeRF 被廣泛應用於三維重建、虛擬影像生成和增強現實等領域。
- **CLIP**：由 OpenAI 開發的自監督學習模型，將圖像與文字對齊，理解圖像與文本之間的關係。CLIP 通過預訓練大量的圖像-文本對，能夠在多領域表現出色，應用於圖像檢索、圖像分類和自然語言處理等任務，並且在零標籤訓練情況下也能取得優異的效果。

## Stable Diffusion 原理
- **Prompt Engineering**：設計高效的提示詞來引導模型生成期望的輸出。
  - **prompthero**：一個用於提示詞設計的工具。
- **PEFT (Parameter Efficient Fine-Tuning)**：
  - **添加法**：調節器、軟提示。
  - **選擇法**：選擇模型參數進行微調。
  - **重參數化**：通過修改模型參數進行調整。

### Embedding
- **Embedding**：通過少量範例影像捕捉新穎概念，微調模型參數。
  - **Textual inversion**：從文本中尋找關鍵詞並嵌入。

### Dreambooth
- **Dreambooth**：針對 Txt2Image 的改進方法，通過微調整個模型來提升生成效果。

### Lora
- **Lora (Low-Rank Adaptation)**：在特定層插入模組，使模型適應特定問題的處理。

### HyperNetwork
- **HyperNetwork**：利用神經網絡生成模型參數，修改 cross attention 模塊。

### ControlNet
- **ControlNet**：一種文生圖的擴展方法，不需重新訓練模型即可實現客製化生成。

### SwinIR
- **SwinIR (Swin Transformer for Image Restoration)**：一種用於影像重建的方法。

### SD XL
- **SD XL**：Stable Diffusion 的進階版本，提供更高質量的圖像生成。

| 技術名稱       | 類型     | 主要用途                     | 優點                                  | 適用情境                               |
|----------------|----------|------------------------------|---------------------------------------|----------------------------------------|
| Embedding      | 技術     | 特徵提取、降維               | 提高數據處理效率和模型性能            | 自然語言處理、推薦系統                 |
| Dreambooth     | 技術     | 文本到圖像生成的微調         | 提升生成圖像的質量和多樣性            | 需要針對特定風格或內容進行圖像生成     |
| LoRA           | 技術     | 大型模型微調                 | 保持原有知識，低成本適應新任務        | 有預訓練模型，需要適應新任務           |
| HyperNetwork   | 技術     | 動態生成模型參數             | 靈活調整模型權重以適應多任務          | 需要在多任務或變化環境下工作           |
| ControlNet     | 技術     | 模型功能擴充                 | 無需重新訓練，快速實現特定功能        | 需要在現有模型上增加特定控制或功能     |
| SD XL          | 模型     | 高質量圖像生成               | 生成更高分辨率和質量的圖像            | 需要生成高質量或特定用途的圖
