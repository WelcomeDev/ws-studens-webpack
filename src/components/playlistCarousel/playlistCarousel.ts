import { Playlist } from '../../model/playlist';
import $ from 'jquery';
import { playlistCarouselItem } from '../playlistCarouselItem/playlistCarouselItem';
import { switcher } from '../switcher/switcher';
import './playlistCarousel.scss';
import { default as carouselCssKnowledge } from '../carouselVariables.module.scss';
import { translateX } from '../../utils/styleUtils';

// экспортируется как string, надо быть аккуратным
/**
 * Сдвигаем на размер элемента ширина + gap
 */
const shiftSize = Number(carouselCssKnowledge.carouselItemWidth)
    + Number(carouselCssKnowledge.carouselItemsGap);

const displayedAmount = Math.floor(carouselCssKnowledge.carouselWidth / shiftSize);
console.log('displayedAmount', displayedAmount);

// todo: remake jqery to $('')
export function playlistCarousel(items: Playlist[]) {
    let carouselShift = 0;

    function setCarouselShift(value: number) {
        carouselShift = value % items.length;
        return carouselShift;
    }

    /**
     * Работаем в кольце. Индекс принадлежит, если меньше остатка или если больше сдвига
     * На первый аргумент все равно, важен только индекс
     */
    function isInForwardRing(_: any, index: number) {
        const shiftAbs = Math.abs(carouselShift);
        const minIndexInRing = shiftAbs;
        let maxIndexInRing = shiftAbs + displayedAmount - 1;

        console.log('index', index, 'minIndexInRing', maxIndexInRing % items.length, 'maxIndexInRing', displayedAmount - shiftAbs);
        // is in forward ring
        if (carouselShift < 0)
            return maxIndexInRing < items.length
                ? minIndexInRing <= index && index <= maxIndexInRing
                : index >= minIndexInRing;
            // if (maxIndexInRing < items.length)
            //     return minIndexInRing <= index && index <= maxIndexInRing;
            // if (carouselShift < 0)
        //     return index >= minIndexInRing;
        else
            // index > maxIndexInRing % items.length ||
            return index < displayedAmount - shiftAbs;
    }

    function notInForwardRing(_: any, index: number) {
        return !isInForwardRing(_, index);
    }

    // как и в Java, если функция принимает тот же набор параметров, можно не сопоставлять их явно
    const playlistItems = items.map(playlistCarouselItem);
    const playlists = $('<ul>').addClass('carousel-list')
                               .append(playlistItems);
    const leftSwitcher = switcher({ direction: 'left', onClick: turnLeft });
    const rightSwitcher = switcher({ direction: 'right', onClick: turnRight });

    // стили добавляем здесь, потому что сам switcher не должен ничего знать о своем положении в контейнере. Это обеспечит переиспользуемость
    leftSwitcher.classList.add('carousel__control', 'carousel__control--left');
    rightSwitcher.classList.add('carousel__control', 'carousel__control--right');
    // эквивалент document.createElement('ul');
    const carouselElement = $('<div>').addClass('carousel')
                                      .append(playlists)
                                      .append(leftSwitcher)
                                      .append(rightSwitcher);

    function turn(direction: 'left' | 'right') {
        const directionSign = direction === 'left' ? 1 : -1;
        const shiftSign = carouselShift < 0 ? -1 : 1;
        const forwardShift = setCarouselShift(carouselShift - directionSign) * shiftSize;
        const backwardsShift = -shiftSign * shiftSize * (items.length + -shiftSign * carouselShift);

        playlistItems.filter(isInForwardRing)
                     .forEach(playlist => playlist.css(translateX(forwardShift)));

        playlistItems.filter(isInForwardRing)
                     .forEach((element) => console.log('index in ring', element.attr('data-index')));

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