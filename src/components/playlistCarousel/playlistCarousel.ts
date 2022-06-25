import { Playlist } from '../../model/playlist';
import $ from 'jquery';
import { playlistCarouselItem } from '../playlistCarouselItem/playlistCarouselItem';
import { switcher } from '../switcher/switcher';
import './playlistCarousel.scss';
import { default as carouselCssKnowledge } from '../carouselVariables.module.scss';
import { translateX } from '../../utils/styleUtils';

// экспортируется как string, надо быть аккуратным
const shiftSize = Number(carouselCssKnowledge.carouselItemWidth)
    + Number(carouselCssKnowledge.carouselItemsGap)
    + 2 * Number(carouselCssKnowledge.carouselItemSidePadding);

console.log(shiftSize);

export function playlistCarousel(items: Playlist[]) {
    let carouselShift = 0;

    function setCarouselShift(value: number) {
        carouselShift = value % items.length;
        return carouselShift;
    }

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

    const carouselSize = shiftSize * items.length;

    function turnLeft() {
        const forwardShift = setCarouselShift(carouselShift - 1) * shiftSize;
        const backwardsShift = carouselSize + carouselShift * shiftSize;
        console.log('left', carouselShift);
        // playlists.css(translateX(value));

        playlistItems.slice(0, Math.abs(carouselShift))
                     .forEach(playlist => playlist.css(translateX(backwardsShift)));
        playlistItems.slice(Math.abs(carouselShift), items.length)
                     .forEach(playlist => playlist.css(translateX(forwardShift)));
        // .forEach(playlist => playlist.css(translateX(value)));
    }

    function turnRight() {
        const value = setCarouselShift(carouselShift + 1) * shiftSize;
        // playlists.css(translateX(value));
        console.log('shifting right', carouselShift);
        playlistItems.slice(carouselShift)
                     .forEach(playlist => playlist.css(translateX(carouselSize)));
        // .forEach(playlist => playlist.css(translateX(value)));
    }

    // возвращаем htmlElement, что делается вот таким интересным способом
    return carouselElement[0];
}