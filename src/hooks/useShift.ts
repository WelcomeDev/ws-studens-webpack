import { translateX } from '../utils/styleUtils';

/**
 * Функция отвечающая непосредственно за логику смещения элементов
 * В React это называется "Хук". Но подобная терминология много где используется
 * В общем и целом, это некоторая функция, управляющая внешним видом объекта
 */
export function useShift(playlistItems: JQuery[], shiftSize: number, displayedAmount: number) {

    const itemsCount = playlistItems.length;

    let carouselShift = 0;

    function setCarouselShift(value: number) {
        carouselShift = value % itemsCount;
        return carouselShift;
    }

    /**
     * "Накладываем" одну область - отображаемые элементы на другую - общее число
     * Таким образом, мы "типо" перемещаем полоску по кругу
     * @return true - если элемент сдвинуть в прямом направлении.
     * В противном случае он уже "прокрутился" или находится за пределами видимости
     * @param index
     */
    // По-моему, я немного намудрил. Будет здорово, если кто-то из вас придумает альтернативный способ проще
    function isInRing(index: number) {
        const shiftAbs = Math.abs(carouselShift);
        const minIndexInRing = shiftAbs;
        let maxIndexInRing = shiftAbs + displayedAmount - 1;

        // находится в прямом направлении (двигаем влево)
        if (carouselShift < 0)
            return maxIndexInRing < itemsCount
                ? minIndexInRing <= index && index <= maxIndexInRing
                : index >= minIndexInRing;
        else
            // факт, что здесь всего 1 условие меня немного смущает, но математически выходит верно
            // Хвост переходит в начало на shiftAbs. Последний начальный displayedAmount - shiftAbs
            return index < displayedAmount - shiftAbs;
    }

    /**
     * Сдвигаем карусель в нужном направлении
     * @param direction
     */
    function turn(direction: 'left' | 'right') {
        // определяем, куда крутимся - от этого зависит transformX.
        // Если карусель сдвигаются "влево", то сами элементы - вправо
        const directionSign = direction === 'left' ? 1 : -1;
        // противоположный знак сдвигу, в куда мы там накрутили в общей сложности
        const shiftSign = carouselShift < 0 ? 1 : -1;

        // сдвиг элементов, которые видны. Они сдвигаются всегда в прямом направлении
        const forwardShift = setCarouselShift(carouselShift - directionSign) * shiftSize;
        // скрытые элементы, сдвигаются в обратном направлении (загляните в DOM)
        const backwardsShift = shiftSign * shiftSize * (itemsCount + shiftSign * carouselShift);

        // неиспользуемый параметр принято называть "_" в JS
        playlistItems.filter((_, index) => isInRing(index))
                     .forEach(playlist => playlist.css(translateX(forwardShift)));

        playlistItems.filter((_, index) => !isInRing(index))
                     .forEach(playlist => playlist.css(translateX(backwardsShift)));
    }

    function turnLeft() {
        turn('left');
    }

    function turnRight() {
        turn('right');
    }

    return {
        turnLeft,
        turnRight,
    };

}