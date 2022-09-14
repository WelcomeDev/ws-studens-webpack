import { Playlist } from '../../model/playlist';
import $ from 'jquery';
import { playlistCarouselItem } from '../playlistCarouselItem/playlistCarouselItem';
import { switcher } from '../switcher/switcher';
import './playlistCarousel.scss';
import { default as carouselCssKnowledge } from '../carouselVariables.module.scss';
import { useShift } from '../../hooks/useShift';

// экспортируется как string, надо быть аккуратным
// Сдвигаем на размер элемента ширина + gap
const shiftSize = Number(carouselCssKnowledge.carouselItemWidth)
    + Number(carouselCssKnowledge.carouselItemsGap);

// todo: адаптива ПОКА не будет, поэтому не будем следить за размером окна, количество не меняется
// учитывая как вы сдаете домашки, я успею долги по работе закрыть и сюда адаптив добавить :D O.O
const displayedAmount = Math.floor(carouselCssKnowledge.carouselWidth / shiftSize);

export function playlistCarousel(items: Playlist[]) {
    // как и в Java, если функция принимает тот же набор параметров, можно не сопоставлять их явно
    const playlistItems = items.map(playlistCarouselItem);
    // благодаря такому разделению функция отвечает исключительно за отображение карусели, а не за логику кручения
    // меньше функция - проще читать. За функции на 200+ строк - бан ж0пы
    const { turnRight, turnLeft } = useShift(playlistItems, shiftSize, displayedAmount);

    const playlists = $('<ul class="carousel-list">').append(playlistItems);
    const leftSwitcher = switcher({
        direction: 'left',
        onClick: turnLeft,
        class: ['carousel__control', 'carousel__control--left'],
    });
    const rightSwitcher = switcher({
        direction: 'right',
        onClick: turnRight,
        class: ['carousel__control', 'carousel__control--right'],
    });

    // эквивалент document.createElement('div');
    return $('<div class="carousel">').append(playlists)
                                      .append(leftSwitcher)
                                      .append(rightSwitcher);
}