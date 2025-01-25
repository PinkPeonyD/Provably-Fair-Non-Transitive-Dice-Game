# Non-Transitive Dice Game

This project implements a console-based game using non-transitive dice with provably fair random number generation. The game is written in Node.js and allows configurable dice values, interactive gameplay, and proof of fairness via HMAC.

---

## Features

- Supports an arbitrary number of dice with customizable face values.
- Provably fair random number generation using HMAC-SHA3 with unique secret keys.
- Interactive CLI gameplay.
- Help option to display a probability table of winning for dice pairs.
- Validates user input and handles incorrect parameters gracefully.

---

## Requirements

- **Node.js** (v14 or higher recommended)

---

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/PinkPeonyD/Provably-Fair-Non-Transitive-Dice-Game.git
   cd non-transitive-dice-game
2. npm install


# Команды для демонстрации игры "Non-Transitive Dice Game"

Данный файл содержит все команды для демонстрации работы игры с различными параметрами, отображения ошибок и выполнения полного игрового процесса.

---

## **1. Launch with Different Parameters**

### a. С 4 одинаковыми кубиками:
```bash
node index.js 1,2,3,4,5,6 1,2,3,4,5,6 1,2,3,4,5,6 1,2,3,4,5,6

b. С 3 разными кубиками:
node index.js 2,2,4,4,9,9 1,1,6,6,8,8 3,3,5,5,7,7

2. Launch with Incorrect Parameters
a. Без кубиков:
node index.js

b. Только 2 кубика:
node index.js 1,2,3,4,5,6 1,2,3,4,5,6

c. Неправильное количество граней (неравномерная длина):
node index.js 1,2,3,4,5

d. Нецифровое значение в конфигурации:
node index.js 1,2,3,4,a

3. Help Table with Probabilities
Шаги:
Запустите игру с 3 разными кубиками:
node index.js 2,2,4,4,9,9 1,1,6,6,8,8 3,3,5,5,7,7

Когда появится приглашение:
Welcome to the Non-Transitive Dice Game!
I generated a number (HMAC: ...). Try to guess it.
0 - 0
1 - 1
X - exit
? - help
Your selection:
Введите ? для отображения таблицы вероятностей:
?

4. Whole Game Played (2 Runs)
a. Первая игра:
Запустите игру:
node index.js 2,2,4,4,9,9 1,1,6,6,8,8 3,3,5,5,7,7
Выполните следующие шаги:
Угадайте число (например, введите 0 или 1).
Выберите кубик (например, введите 0 для первого кубика).
Завершите раунд, следуя инструкциям.

b. Вторая игра:
Запустите игру снова:
node index.js 2,2,4,4,9,9 1,1,6,6,8,8 3,3,5,5,7,7

Повторите игровой процесс.

