import { createRoot } from 'react-dom/client';
import { HelloReact } from './hello';
import './react.scss';

function App({ title }: { title: string }) {
    return (
        <div className='hello'>
            <h2 className='hello__header'>{title}</h2>
            <HelloReact />
        </div>
    )
}
//@ts-ignore
const root = createRoot(document.getElementById('root'));
root.render(<App title={'Hello React'} />);