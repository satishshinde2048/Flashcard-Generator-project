import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import { Provider } from 'react-redux';
import {store} from '../redux/store/store';
import { BrowserRouter } from 'react-router-dom';
import { Flashcardhomepage } from '../component/creteflashcard/FlashcardMainpage';


const renderWithRouter=(component)=>{
    return{
        ...render(<BrowserRouter><Provider store={store}>{component}</Provider></BrowserRouter>)
    }
}


it('should contain navlinks ', () => {
    renderWithRouter(<Flashcardhomepage/>)
    expect(screen.getByRole('button', { name: /create new/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /my flashcard/i })).toBeInTheDocument()
})