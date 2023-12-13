import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import { Provider } from 'react-redux';
import {store} from '../redux/store/store';
import { CreteFlashcard } from '../component/creteflashcard/CreateFlashcard1';

const renderWithRedux=(component)=>{
    return{
        ...render(<Provider store={store}>{component}</Provider>)
    }
}

test('should be group name', () => {
    renderWithRedux(<CreteFlashcard/>)
  const groupname=screen.getByLabelText(/Create Group*/i)
    expect(groupname).toBeInTheDocument();
})

test("should be  description",()=>{
     renderWithRedux(<CreteFlashcard/>)
    const description=screen.getByLabelText(/Add Description*/i)
    expect(description).toBeInTheDocument();
})

test('should be image of group', () => {
    renderWithRedux(<CreteFlashcard/>)
    const groupimage=screen.getByText("Upload Image")
    expect(groupimage).toBeInTheDocument()
})

test('should be term', () => {
    renderWithRedux(<CreteFlashcard/>)
    const term=screen.getByLabelText(/Enter Term*/i)
    expect(term).toBeInTheDocument()
})

test('should be definition', () => {
    renderWithRedux(<CreteFlashcard/>)
    const term=screen.getByLabelText(/Term Defination*/i)
    expect(term).toBeInTheDocument()
})

test('should be term image', () => {
    renderWithRedux(<CreteFlashcard/>)
    const termimage=screen.getByText(/Select Image/i)
    expect(termimage).toBeInTheDocument()
 })

test('should be addmore button', () => {
    renderWithRedux(<CreteFlashcard/>)
    const addmorebutton=screen.getByText(/Add more/i)
    expect(addmorebutton).toHaveTextContent(/Add more/i)
})

test('should be create button', () => {
    renderWithRedux(<CreteFlashcard/>)
    const create=screen.getByRole("button",{name:"Create"})
    expect(create).toHaveTextContent(/create/i)
})