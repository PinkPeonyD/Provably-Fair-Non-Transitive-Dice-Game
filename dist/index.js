"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DiceParser_1 = require("./DiceParser");
const Game_1 = require("./Game");
(async () => {
    try {
        const dice = DiceParser_1.DiceParser.parseDice(process.argv.slice(2)); // Разбор аргументов
        const game = new Game_1.Game(dice);
        await game.start(); // Запуск игры
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message); // Вывод сообщения об ошибке
        }
        else {
            console.error('An unknown error occurred:', error);
        }
        process.exit(1); // Завершаем выполнение с кодом ошибки
    }
})();
