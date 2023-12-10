import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import card_logo from './Images/LOGO.png';
import { MdOutlineDelete } from "react-icons/md";
import {DeleteGroup} from '../../redux/action/index1';

const MyFlashCards=()=>{
  //to getting flashcards:
  const FlashCards=useSelector((state)=>state.FlashcardReducers.Cards);
 
  //useDispatch for dispatching action
  const dispatch=useDispatch();
  //useState is used to take state of showcard
  const [showcard,setShowcard]=useState(6);

  //show component more than 6
  const showmore=()=>{
    setShowcard(FlashCards.length);
  }
 
  //show 6 component  
  const showless=()=>{
    setShowcard(6);
  }

  return (
   <>
    {/* if My flashcard is empty then it show 'Flashcards Is Not Available' & create button to which link to create new btn */}
    
    {
      FlashCards.length === 0
      ? <div className='flex flex-col justify-center items-center h-[70vh]'> 
          <div className="text-xl text-red-600 font-bold">
            <h1>Flashcards Is Not Available</h1>
          </div>
          <div className=" bg-blue-600/75 mt-5 px-3 py-2 rounded-lg">
            <Link to='/'>
              <button className='font-semibold text-gray-900'>
                 Create Flashcards
              </button>   
            </Link>
          </div>
        </div>
    
    //  if flash card present then it show flashcard : 
      : (null)
    }
      <div className='flex flex-inline flex-wrap'>
        {
        FlashCards.slice(0,showcard).map((item)=>{
          return (
          <div className='drop-shadow-md bg-gray-200  h-[263px] w-[250px] my-10 mx-4 '>
            <div className='h-[60px] w-[60px] flex flex-row mx-[95px] pt-2'>
              <img src={item.UploadImage==null ? (card_logo)  : (item.UploadImage) } alt=""></img>
            <div className='text-blue-600/75 hover:text-red-600 my-1 mx-14 '>
              <MdOutlineDelete className='h-9 w-9' onClick={()=>dispatch(DeleteGroup(item.id))}/>          
            </div>
            </div>
            <div className='mt-[15px]' >
              <h1 className='overflow-hidden  text-center font-bold text-gray-900/100'>{item.CreateGroup}</h1>
              <h1 className='overflow-hidden mt-[10px] h-[50px] w-[240px]  text-center'>{item.Description}</h1>
              <h1 className='text-center mt-[12px] font-bold text-gray-900/100'>{Object.keys(item.term).length} Cards</h1>
            </div>
            <div className='text-center bg-blue-600/75 mt-[15px] ml-[65px] rounded-lg h-[30px] w-[120px]'>
               <Link to={`/flashcardsdetails/${item.id}`}>
               <button className='font-semibold text-gray-900'>
                View Cards
               </button>
               </Link>
            </div>
          </div>
            )        
          })
        }
        </div>
        
        <div  className='flex flex-row justify-end mb-5 text-red-600 font-bold'>
        {
          FlashCards.length > 6
          ?(
            <div>{ showcard === FlashCards.length 
            ?<button onClick={showless}>See less</button>     
            :<button onClick={showmore}>See all</button>        
           }
           </div>
           )
         :(null)
        }


        </div>  
    
    
   </>
  )
}
export {MyFlashCards};