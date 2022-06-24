import './switcher.scss';

export interface SwitcherProps {
    // агаааа, константы - тоже тип в JS, поэтому можно быстро создавать такие "типо-енумы". Для чего-то глобального не стоит это использовать
    direction: 'left' | 'right';
    // можно еще просто onClick()
    onClick: () => void;
}

/**
 * Переключатель вправо/влево
 * @param props
 */
export function switcher(props: SwitcherProps) {
    const { direction, onClick } = props;

    const switcherElement = document.createElement('button');
    switcherElement.setAttribute('type', 'button');
    switcherElement.setAttribute('title', direction === 'left' ? 'Go left' : 'Go Right');
    switcherElement.classList.add('switcher');
    switcherElement.classList.add(`switcher--${direction}`);
    switcherElement.addEventListener('click', onClick);

    import('/src/assets/chevron-up.svg').then(svg => {
        const svgElement = new DOMParser().parseFromString(svg.default, 'image/svg+xml').documentElement;
        svgElement.classList.add('switcher__chevron');
        switcherElement.appendChild(svgElement);
    });

    return switcherElement;
}