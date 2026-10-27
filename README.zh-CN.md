# 你好，我是 Guozheng Li

[![Switch to English](https://raw.githubusercontent.com/liguozheng-ac/liguozheng-ac/main/assets/language-en.svg)](https://github.com/liguozheng-ac) [![简体中文 — 当前语言](https://raw.githubusercontent.com/liguozheng-ac/liguozheng-ac/main/assets/language-zh-active.svg)](https://github.com/liguozheng-ac/liguozheng-ac/blob/main/README.zh-CN.md)

**中日游戏本地化 QA · 日语语音数据 · 评估工具开发**

我开发语言与语音质量工具，让问题更容易被观察、评估和复核。我的项目结合确定性规则、模型辅助分析与明确的证据，为人工判断提供支持。

### 代表项目

| 项目 | 研究与实现方向 | 了解更多 |
| --- | --- | --- |
| **[J-GameLQA](https://github.com/liguozheng-ac/j-gamelqa)** | 面向中译日游戏本地化的 QA 工具，将规则检查与结合上下文的 LLM 评估相结合。 | [本地演示](https://github.com/liguozheng-ac/j-gamelqa/blob/main/docs/local_demo.md) · [评估结果](https://github.com/liguozheng-ac/j-gamelqa/blob/main/docs/heldout_evaluation_results.md) |
| **[J-SpeechOps](https://github.com/liguozheng-ac/j-speechops)** | 日语语音数据质量控制流程，覆盖语音生成、发音证据、人工复核与发布门禁。 | [系统架构](https://github.com/liguozheng-ac/j-speechops/blob/main/docs/architecture_overview.md) · [流程示例](https://github.com/liguozheng-ac/j-speechops/blob/main/examples/release_flow/README.md) |
| **[Japanese Speech X-Ray](https://github.com/liguozheng-ac/japanese-speech-xray)** | 语音波形、音高与语调可视化，结合实验性语音对齐和描述性的参考比较。 | [产品展示](https://github.com/liguozheng-ac/japanese-speech-xray#product-showcase) · [复现指南](https://github.com/liguozheng-ac/japanese-speech-xray/blob/main/docs/REPRODUCIBILITY.md) |

这些项目目前以原型和研究工具为主。每个仓库都记录了验证范围、复现步骤与已知局限。

### 我的质量评估方法

- 用确定性规则检查技术约束，用模型辅助分析依赖上下文的问题。
- 将实测证据、模型预测与人工批准分开处理。
- 保持实验可复现，保留失败案例，并明确说明不确定性。

**项目涉及的技术：** Python · FastAPI · Pydantic · Streamlit · Ollama / Qwen · librosa / pYIN · GitHub Actions

### 项目动态

<!-- PROJECT-ACTIVITY:START -->
快照采集时间 **2026-10-27 13:42** (Asia/Shanghai).

| 项目 | 最近提交日期 | 提交记录 |
| --- | --- | --- |
| [J-GameLQA](https://github.com/liguozheng-ac/j-gamelqa) | 2026-10-16 | [`89a53c5`](https://github.com/liguozheng-ac/j-gamelqa/commit/89a53c597ed07aafab548cc8de76b7021b906f6b) |
| [J-SpeechOps](https://github.com/liguozheng-ac/j-speechops) | 2026-10-16 | [`b9dc139`](https://github.com/liguozheng-ac/j-speechops/commit/b9dc139d535bd1232a05a6fe7b9e1f6efc4dcbd0) |
| [Japanese Speech X-Ray](https://github.com/liguozheng-ac/japanese-speech-xray) | 2026-10-16 | [`0e41af0`](https://github.com/liguozheng-ac/japanese-speech-xray/commit/0e41af07e50d6abe3c357ac3e843b341a7289813) |

[快照详情](https://github.com/liguozheng-ac/liguozheng-ac/blob/main/snapshots/2026/10/2026-10-27.json) · [快照归档](https://github.com/liguozheng-ac/liguozheng-ac/tree/main/snapshots)
<!-- PROJECT-ACTIVITY:END -->
