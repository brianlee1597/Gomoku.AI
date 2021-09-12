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
let isLoading = true;
setTimeout(() => { isLoading = false; }, makeBoard(11));
on('mousedown', function (e) {
    const RECT = PLAYING_FIELD.getBoundingClientRect(), X = e.clientX - RECT.left, Y = e.clientY - RECT.top;
    if (X < 0 || X > 550 || Y < 0 || Y > 550 || isLoading === true)
        return;
    console.time();
    playRound(X, Y);
    console.timeEnd();
});
const playRound = (X, Y) => __awaiter(void 0, void 0, void 0, function* () {
    var getRounded = (RAW) => {
        const FIRST_DIGITS = Math.floor(RAW / 100), LAST_TWO_ROUNDED = parseInt(`${~~(RAW / 10) % 10}${RAW % 10}`) <= 50 ? 25 : 75;
        return parseInt("" + FIRST_DIGITS + LAST_TWO_ROUNDED);
    };
    X = getRounded(X), Y = getRounded(Y);
    var ROW_NUM = (Y + 25) / 50, COL_NUM = (X + 25) / 50, CLICKED_NODE = nodeAt(ROW_NUM, COL_NUM);
    if (CLICKED_NODE.isEmpty()) {
        CLICKED_NODE.stone = true;
        CLICKED_NODE.color = Player.StoneColor;
        yield Player.PlaceStone(X, Y);
        AI.PlaceStone();
    }
});
