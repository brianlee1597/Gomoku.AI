"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const PLAYING_FIELD = document.getElementById('placeStoneLayer');
const on = PLAYING_FIELD.addEventListener;
const START_BUTTON = document.getElementById("start_button");
function playRound(x, y) {
    return __awaiter(this, void 0, void 0, function* () {
        let getRounded = (raw) => __awaiter(this, void 0, void 0, function* () {
            let first_digits = Math.floor(raw / 100);
            let last_two_rounded = parseInt(`${~~(raw / 10) % 10}${raw % 10}`) <= 50 ? 25 : 75;
            return parseInt("" + first_digits + last_two_rounded);
        });
        x = yield getRounded(x);
        y = yield getRounded(y);
        let row = (y + 25) / 50, col = (x + 25) / 50;
        let clicked_node = nodeAt(row, col);
        if (clicked_node.isEmpty()) {
            clicked_node.stone = true;
            clicked_node.color = Player.StoneColor;
            yield Player.PlaceStone(x, y);
            AI.PlaceStone();
        }
    });
}
function endGame(color) {
    setTimeout(() => alert((color === AI.StoneColor ? "AI" : "Player") + " Wins!"), 50);
}
let isLoading = true;
START_BUTTON.onclick = function () {
    setTimeout(() => { isLoading = false; }, makeBoard(11));
    document.getElementById("intro").style.display = "none";
    document.getElementById("game_container").style.display = "flex";
};
on('mousedown', (event) => {
    const RECT = PLAYING_FIELD.getBoundingClientRect();
    const X = event.clientX - RECT.left;
    const Y = event.clientY - RECT.top;
    if (X < 0 || X > 550 || Y < 0 || Y > 550 || isLoading === true)
        return;
    console.time();
    playRound(X, Y);
    console.timeEnd();
});
