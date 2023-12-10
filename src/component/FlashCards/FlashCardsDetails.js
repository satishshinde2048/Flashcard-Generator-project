import {useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import { GoArrowLeft } from "react-icons/go";
import {Link} from 'react-router-dom';
import { FaShare } from "react-icons/fa";                 
import { FaDownload } from "react-icons/fa6";
import { FaPrint } from "react-icons/fa6";
import { useState } from 'react';
import flashcardimg from './Images/flashcardimg.png';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";
import { FaRegCopy } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";
import { CgMail } from "react-icons/cg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import html2canvas from'html2canvas';
import {jsPDF} from 'jspdf';
import {useRef} from 'react';



const FlashCardsDetails=()=>{
   //to get the id
   const {id} = useParams();
   //to get cards id - useSelector
   const {Cards}=useSelector((state)=>state.FlashcardReducers);
   //ti find that id of router matches to that id of card
   const Carddata=Cards.find((Cards)=>Cards.id===id);
   //useState is used to update term img
   const [termimg,setTermimg]=useState((flashcardimg));
   //useState is used to update term defination
   const [termdef,setTermdef]=useState("");
   //active is used for index reference
   const [active,setActive]=useState(0);
   const handleclick=(event)=>{
    setActive(event);
   }
   //it is used to display term data
   const dispalaydata=(item,index)=>{
    setTermimg(item.TermUploadImage ?(item.TermUploadImage) :(flashcardimg));
    setTermdef(item.TermDefination)
    handleclick(index);
   }
   //function foer to set the active card
   const setCard=(newindex)=>{
     setTermimg(Carddata.term[newindex].TermUploadImage ?(Carddata.term[newindex].TermUploadImage) :(flashcardimg));
     setTermdef(Carddata.term[newindex].TermDefination);
    }
    //for to go next term
   const nextcard=()=>{
    const islast=active===Carddata.term.length-1;
    const newindex=islast?0 :active+1;
    setActive(newindex);
    setCard(newindex);
   }
   //for go to prev term
   const prevcard=()=>{
    const isfirst=active===0;
    const newindex=isfirst?Carddata.term.length-1:active-1;
    setActive(newindex);
    setCard(newindex);
   }
   //for  open and close modal
   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(!open);
   //url of page
   const Url = (window.location.href); 

   const CopyToClipboard = () => {
    // Copy the text inside the Clipboard
     navigator.clipboard.writeText(Url);
     toast.success(' Url Copied!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
     });
   } 
   //take the refrence of element
   const pdfRef=useRef();
   //for downloading that current page
   const downloadPDF=()=>{
      const input=pdfRef.current;
      html2canvas(input).then((canvas)=>{
        const imgData=canvas.toDataURL('image/png');
        const pdf=new jsPDF('p','mm','a4',true);
        const pdfWidth=pdf.internal.pageSize.getWidth();
        const pdfHeight=pdf.internal.pageSize.getHeight();
        const imgWidth=canvas.width;
        const imgHeight=canvas.height;
        const ratio=Math.min(pdfWidth/imgWidth,pdfHeight/imgHeight);
        const imgX=(pdfWidth-imgWidth*ratio)/2;
        const imgY=30;
        pdf.addImage(imgData,'PNG',imgX,imgY,imgWidth*ratio,imgHeight*ratio);
        pdf.save('flashcardetail.pdf');
      })
   }
 
return (
  <>   
  {/* it is display <- group name & group description */}
  <div ref={pdfRef}>
  <div className='flex flex-inline mt-3' >
    <div className='text-gray-900/100 hover:text-red-600/100 mt-[2px]'>
      <Link to='/myflashcard'>
      <GoArrowLeft className='h-[25px] w-[25px] font-bold'/>
      </Link>
    </div>
    <div className='font-bold text-gray-900/100 ml-3'>
      <h1>{Carddata.CreateGroup}</h1>
    </div>
  </div>
    <div className=' text-gray-700/75 mt-2 ml-[30px] h-[30px] w-full'>
      <h1>{Carddata.Description}</h1>
    </div>
  {/* display flashcard term name */} 
  <div className='flex flex-row mt-7 mb-[70px]'>
    <div className='drop-shadow-lg bg-gray-200 h-[300px] w-[250px]'>
     <h1 className='ml-3 mt-2 text-gray-700/50'>Flashcards</h1>
     <hr className="border bg-black-700 mt-[6px] border-gray-300 ml-2 mr-4" />
     {
         Carddata.term.map((item,index)=>{
          return (
               <div key={index} className='ml-4 mt-1 font-medium cursor-pointer hover:text-red-400' onClick={()=>dispalaydata(item,index)}>
                {item.EnterTerm}
               </div>
          );
         })       
     }
    </div>

    {/* it is display term img & term defination based on which term you click */}
   <div className='drop-shadow-lg bg-gray-200 h-[325px] w-[365px] ml-10'>
      <div className='drop-shadow-lg bg-gray-400 h-[150px] w-[300px] my-[20px] mx-[20px]'>
      <img src={termimg} alt="" className='h-[140px] w-[280px] pt-[7px] mx-[10px] my-[25px]'></img>
      </div>
      <div className='drop-shadow-lg bg-gray-400 h-[110px] w-[300px] my-[20px] mx-[20px]'>
      <span className='h-[100px] w-[280px] pt-[7px] mx-[10px] my-[25px]'>{termdef}</span>
      </div>
    
      <div className='flex flex-row mt-[35px] justify-center'>
         <IoIosArrowBack className='mr-7 mt-[6px]' onClick={prevcard} />
         <span>{active+1}/{Carddata.term.length}</span>
         <IoIosArrowForward className='ml-7 mt-[6px]' onClick={nextcard}/>
      </div>  
    </div>

    {/* it is display share download print btn */}
    <div className='ml-10'>
       <div className='drop-shadow-lg bg-gray-200 h-[40px] w-[200px] flex flex-row items-center' onClick={handleOpen}>
        <FaShare className='ml-7 text-gray-900/75'/> 
        <button className='ml-5 text-gray-900/75' >
          Share
        </button>
       </div>
       <div className='drop-shadow-lg bg-gray-200 mt-[20px] h-[40px] w-[200px] flex flex-row items-center' onClick={downloadPDF}>
        <FaDownload className='ml-7 text-gray-900/75'/>    
        <button className='ml-5 text-gray-900/75'>
          Download
        </button>      
       </div>
       <div className='drop-shadow-lg bg-gray-200 mt-[20px] h-[40px] w-[200px] flex flex-row items-center' onClick={()=>window.print()}>
        <FaPrint className='ml-7 text-gray-900/75'/> 
        <button className='ml-5 text-gray-900/75'>
          Print
        </button>
       </div>
    </div>
  </div>
  </div>
  {/* it is show modal for share btn */}
  <div>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <IoClose className='h-7 w-10 ml-[610px] mt-2 hover:text-red-400' onClick={handleOpen}/> 
        <DialogHeader>
          <h1 className='text-bold text-gray-900/100'>Share</h1> 
        </DialogHeader>
        <DialogBody>
          <div className='flex flex-col'>
            <div className='flex flex-row'>
              <span className='border-2 rounded-md border-gray-300 '><h1 className='mx-3 my-2'>Link: {Url}</h1></span>
              <ToastContainer/>
              <FaRegCopy  className='mx-3 my-3 h-7 w-10 hover:text-gray-900/100' onClick={CopyToClipboard}/>
            </div>
            <div className='flex flex-row mt-3 mx-2'>
              <FaFacebookSquare className='mx-3 my-3 h-7 w-10 hover:scale-125 text-blue-600'/>
              <FaLinkedin className='mx-3 my-3 h-7 w-10 text-blue-600 hover:scale-125'/>
              <FaWhatsappSquare className='mx-3 my-3 h-7 w-10 text-green-600 hover:scale-125'/>
              <FaSquareTwitter className='mx-3 my-3 h-7 w-10 text-blue-600 hover:scale-125'/>            
              <CgMail className='mx-3 my-3 h-7 w-10 text-red-600 hover:scale-125'/>
            </div>
          </div>
        </DialogBody>
      </Dialog>


  </div>
            
  </>
  );
}

export {FlashCardsDetails};