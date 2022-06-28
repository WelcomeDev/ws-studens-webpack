import './switcher.scss';
import { getInlineSvg } from '../../utils/getInlineSvg';
import $ from 'jquery';

export interface SwitcherProps {
    // константы - тоже тип в JS, поэтому можно быстро создавать такие "типо-енумы". Для чего-то глобального не стоит это использовать
    direction: 'left' | 'right';
    // можно еще просто onClick():void; преимущество такого подхода, что можно обозначить параметр необязательным
    onClick: () => void;
    class?: string[] | string;
}

/**
 * Переключатель вправо/влево
 * @param props
 */
export function switcher(props: SwitcherProps) {
    const { direction, onClick } = props;

    // садомия и боль на JS
    //
    // const switcherElement = document.createElement('button');
    // switcherElement.setAttribute('type', 'button');
    // switcherElement.setAttribute('title', direction === 'left' ? 'Go left' : 'Go Right');
    // switcherElement.classList.add('switcher');
    // switcherElement.classList.add(`switcher--${direction}`);
    // switcherElement.addEventListener('click', onClick);
    //
    // getInlineSvg('chevron-up.svg')
    //     .then(inlineSvg => {
    //         inlineSvg.classList.add('switcher__chevron');
    //         switcherElement.appendChild(inlineSvg);
    //     });
    // return switcherElement[];
    //
    // or
    const switcherElement = $(`<button type="button"
                                        title="${direction === 'left' ? 'Go left' : 'Go Right'}">`)
        // иначе TS ругается, что undefined нельзя итерировать
        .addClass(['switcher', `switcher--${direction}`, ...props.class ?? ''])
        .on('click', onClick);

    getInlineSvg('chevron-up.svg')
        .then(inlineSvg => {
            inlineSvg.classList.add('switcher__chevron');
            switcherElement.append(inlineSvg);
        });

    return switcherElement;
}