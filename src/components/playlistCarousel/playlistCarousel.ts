import { Playlist } from '../../model/playlist';
import $ from 'jquery';
import { playlistCarouselItem } from '../playlistCarouselItem/playlistCarouselItem';
import { switcher } from '../switcher/switcher';
import './playlistCarousel.scss';
import { default as carouselCssKnowledge } from '../carouselVariables.module.scss';
import { translateX } from '../../utils/styleUtils';

// экспортируется как string, надо быть аккуратным
// Сдвигаем на размер элемента ширина + gap
const shiftSize = Number(carouselCssKnowledge.carouselItemWidth)
    + Number(carouselCssKnowledge.carouselItemsGap);

// адаптива ПОКА не будет, поэтому не будем следить за размером окна, количество не меняется
// учитывая как вы сдаете домашки, я успею долги по работе закрыть и сюда адаптив добавить :D O.O
const displayedAmount = Math.floor(carouselCssKnowledge.carouselWidth / shiftSize);

export function playlistCarousel(items: Playlist[]) {
    let carouselShift = 0;

    function setCarouselShift(value: number) {
        carouselShift = value % items.length;
        return carouselShift;
    }

    /**
     * Определяем, какие индексы принадлежат области отображения при текущем сдвиге
     */
    function isInForwardRing(_: any, index: number) {
        const shiftAbs = Math.abs(carouselShift);
        const minIndexInRing = shiftAbs;
        let maxIndexInRing = shiftAbs + displayedAmount - 1;

        // is in forward ring
        if (carouselShift < 0)
            return maxIndexInRing < items.length
                ? minIndexInRing <= index && index <= maxIndexInRing
                : index >= minIndexInRing;
        else
            return index < displayedAmount - shiftAbs;
    }

    function notInForwardRing(_: any, index: number) {
        return !isInForwardRing(_, index);
    }

    // как и в Java, если функция принимает тот же набор параметров, можно не сопоставлять их явно
    const playlistItems = items.map(playlistCarouselItem);
    const playlists = $('<ul class="carousel-list">').append(playlistItems);
    const leftSwitcher = switcher({ direction: 'left', onClick: turnLeft });
    const rightSwitcher = switcher({ direction: 'right', onClick: turnRight });

    leftSwitcher.addClass(['carousel__control', 'carousel__control--left']);
    rightSwitcher.addClass(['carousel__control', 'carousel__control--right']);
    // эквивалент document.createElement('div');
    const carouselElement = $('<div class="carousel">').append(playlists)
                                                       .append(leftSwitcher)
                                                       .append(rightSwitcher);

    function turn(direction: 'left' | 'right') {
        const directionSign = direction === 'left' ? 1 : -1;
        const shiftSign = carouselShift < 0 ? -1 : 1;
        const forwardShift = setCarouselShift(carouselShift - directionSign) * shiftSize;
        const backwardsShift = -shiftSign * shiftSize * (items.length + -shiftSign * carouselShift);

        playlistItems.filter(isInForwardRing)
                     .forEach(playlist => playlist.css(translateX(forwardShift)));

        playlistItems.filter(notInForwardRing)
                     .forEach(playlist => playlist.css(translateX(backwardsShift)));
    }

    function turnLeft() {
        turn('left');
    }

    function turnRight() {
        turn('right');
    }

    // возвращаем htmlElement, что делается вот таким интересным способом
    return carouselElement[0];
}