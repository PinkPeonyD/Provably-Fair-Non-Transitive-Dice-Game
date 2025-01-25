"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableRenderer = void 0;
const table_1 = require("table");
class TableRenderer {
    static renderTable(probabilities, dice) {
        // Формируем данные для таблицы
        const data = [
            ['User dice v', ...dice.map((_, i) => `Dice ${i + 1}`)],
            ...probabilities.map((row, i) => [
                JSON.stringify(dice[i].values),
                ...row.map((p, j) => (i === j ? '-' : p.toFixed(4))), // Остальные колонки - вероятности
            ]),
        ];
        console.log('Probability of the win for the user:');
        console.log((0, table_1.table)(data)); // Рендерим таблицу
    }
}
exports.TableRenderer = TableRenderer;
