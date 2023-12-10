import logo from './logo.png';


const FlashcardNavbar=()=>{


return (
    <div className="bg-white w-screen fixed z-50  drop-shadow-md flex items-center px-5">
    <div className="flex items-center h-16 ">
        <img src={logo} alt="logo" className='h-10'></img>
    </div>
    </div>
)
}

export {FlashcardNavbar};