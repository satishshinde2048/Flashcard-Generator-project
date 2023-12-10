import React ,{useRef} from "react";
import {useDispatch} from 'react-redux';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Formik,Form, Field, ErrorMessage, FieldArray} from 'formik';
import {SignupSchema} from '../../schemas/index';
import {CreteGroup} from "../../redux/action/index1";
import {MdUploadFile} from 'react-icons/md';
import {TiDeleteOutline} from 'react-icons/ti';
import { MdOutlineDelete } from "react-icons/md";
import {TbEdit} from "react-icons/tb";
import {BsPlus} from "react-icons/bs";

const CreteFlashcard=()=>{
   //create contant for to supported img file format:
    const SUPPORTED_FORMAT=['image/jpg','image/jpeg','image/png','image/.jfif'];
   //Dispatch is used to dispatch action:
    const dispatch=useDispatch();
   //useRef is used to create refrence on the element
    const inputRef=useRef([]);
    inputRef.current=[];
   //create function for to focus on edit when click on edit btn
    const addRef=(el)=>{
    if(el && !inputRef.current.includes(el)){
      inputRef.current.push(el);
      }
    }
   //function created for img error notification
    const imgError=(value)=>{
     toast.warn(value,{
            position:'top-center',
            autoClose:1000,
            closeOnClick:true,
            hideProgressBar:false,
            draggable:true,
            progress:undefined,
            pauseOnHover:true,
            theme:'light'      
     })
    }

    
  return (
    <div>
     {/* Toast Container to show notifitacation  */}
     <ToastContainer/>
      <Formik initialValues={{
        CreateGroup:"",
        UploadImage:null,
        Description:"",
        term:[{
          EnterTerm:"",
          TermDefination:"",
          TermUploadImage:"",
        }]
      }}

      //adding validation
      validationSchema={SignupSchema}
      //create onSubmit for to reset form
      onSubmit={(values,{resetForm})=>{
                    //reset form
                    resetForm({values:""})
                    //dispatch ceereate group action
                    dispatch(CreteGroup(values))
                    //show notification on flshcarsd creation
                    toast.success("👍 Flashcard Created successfully!",{
                          position:"top-center",
                          autoClose:1000,
                          hideProgressBar:false,
                          progress:undefined,
                          closeOnClick:true,
                          pauseOnHover:true,
                          draggable:true,
                          theme:"light"
                    })
                  }}>
        {({ values,handleChange,handleBlur,setFieldValue})=>(
         <Form>
          <div className="bg-gray-100 py-5 mt-5 drop-shadow-md rounded-lg ">
            <div className="flex flex-wrap">
              <div className="px-3">
                {/* it is input field for create group  */}
               <label htmlFor="CreateGroup" className="text-gray-900/75" >
               Create Group*
               </label>
               <Field className="appearance-none h-[38px] block w-[300px] my-1 bg border border-gray-700/50 rounded py-1 px-2 leading-tight focus:outline-none focus:border-gray-800"
                      id="CreateGroup"
                      name="CreateGroup"              
                      type="text"
                      placeholder="Group Name"/>
               <ErrorMessage className="text-red-500"
                             component='span'
                             name="CreateGroup"/>
              </div>
              <div>
                {/* it is image upload btn
                if img is present then it show img preview with delete icon
                if img not present then it show img upload btn */}
                {
                  values.UploadImage ?<div className="flex"><img className='h-16 mt-2' src={values.UploadImage} alt=""/><TiDeleteOutline className='text-3xl text-red-600' onClick={() => setFieldValue("UploadImage", '')} /> </div>
                  :(<label htmlFor="UploadImage" className="mt-8 mx-3 px-3 py-1  border border-gray-700/50 rounded w-48 h-[38px] flex  items-center justify-center">
                  <MdUploadFile
                          className=" text-[2em] text-blue-700" />
                  <span className=" text-blue-700 text-md">Upload Image</span>
                  </label>)
                }

                {/* for img error */}
                <ErrorMessage className="text-red-500"
                      component='span'
                      name='UploadImage'/>

                {/* it is input field for image upload */}
                <input
                    onChange={(event) => {
                      //  it's validation on image
                      if (event.target.files[0]
                        && !SUPPORTED_FORMAT.includes(event.target.files[0].type)) {
                        imgError('unsupported file format')
                      }
                      else if (event.target.files[0].size > 1024 * 1024 * 10) {
                        imgError('image size is very large')
                      } else if (event.target.files[0].size <= 1024 * 1024 * 10) {
                        const file = event.target.files[0];
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => {
                          setFieldValue("UploadImage", reader.result);
                        }
                      }
                    }}
                    className='hidden'
                    name='UploadImage'
                    id='UploadImage' 
                    type="file"
                />
              </div>
              <div className="pt-2">
               <label htmlFor="Description" className="text-gray-900/75 px-3">
                Add Description*
               </label>
               <Field as="textarea"
                rows="3"
                className="appearance-none h-[80px]  block  my-1 mx-3 bg border border-gray-700/50 rounded py-2 px-2  leading-tight focus:outline-none focus:border-gray-800"
                 id="Description"
                 name="Description"
                 type="text"
                 cols='75'
                 placeholder="Write something..."
               />
               <ErrorMessage className="text-red-600"
                        component="span"
                        name="Description"/>    
              </div>
            </div>
          </div> 
      <FieldArray
          name="term"
          render={(arrayHelpers)=>(
          <div className="bg-gray-100 py-5 mt-5 drop-shadow-md rounded-lg ">
           {
            values.term.map((term,index)=>(
            <div key={index} className="py-5 mt-5 drop-shadow-md rounded-lg ">
              <div className="inline-flex ">
                <div className="flex  items-center justify-center h-9 w-9 my-5 mx-2 rounded-full text-white bg-red-500 ">{index+1}</div>
                  <div className="px-3">
                    <label htmlFor={`term.${index}.EnterTerm`} className="text-gray-900/75" >
                     Enter Term*
                    </label>
                    <input className="appearance-none h-[38px] block w-[220px] my-1 bg border border-gray-700/50 rounded py-1 px-2 leading-tight focus:outline-none focus:border-gray-800"
                      ref={addRef}
                      id={`term.${index}.EnterTerm`} 
                      name={`term.${index}.EnterTerm`} 
                      value={term.EnterTerm}
                      onChange={handleChange}
                      onBlur={handleBlur}             
                      type="text"
                      placeholder="Term Name"
                    />
                    <ErrorMessage className="text-red-500"
                             component='span'
                             name={`term.${index}.EnterTerm`}
                    />
                  </div>
            
                  <div className="ml-3">
                    <label htmlFor={`term.${index}.TermDefination`} className="text-gray-900/75" >
                     Term Defination*
                    </label>
                    <Field className="appearance-none h-[38px] block w-[220px] my-1 bg border border-gray-700/50 rounded py-1 px-2 leading-tight focus:outline-none focus:border-gray-800"
                      id={`term.${index}.TermDefination`} 
                      name={`term.${index}.TermDefination`} 
                      value={term.TermDefination}             
                      type="text"
                      placeholder="Term Defination"
                    />
                    <ErrorMessage className="text-red-500"
                             component='span'
                             name={`term.${index}.TermDefination`}
                    />
                  </div>

                  <div className="ml-3">
                   {/* it is image upload btn
                   if img is present then it show img preview with delete icon
                   if img not present then it show img upload btn */}
                   {
                    term.TermUploadImage ?  ((<div className="flex"><img className='h-16 mt-2 max-w-[12rem]' src={term.TermUploadImage} alt=""/><TiDeleteOutline className='text-3xl text-red-600' onClick={() => setFieldValue(`term.${index}.TermUploadImage`, '')} /> </div>))
                                         :(<label htmlFor={`term.${index}.TermUploadImage`} className="mt-8 mx-3 px-3 py-1  border border-gray-700/50 rounded w-48 h-[38px] flex  items-center justify-center">
                                             <span className=" text-blue-700 text-md">Select Image</span>
                                           </label>)
                   }
            

                   {/* for img error */}
                     <ErrorMessage className="text-red-600"
                      component='span'
                      name={`term.${index}.TermUploadImage`}
                     />

            
           
                   {/* it is input field for image upload */}
                     <input
                       onChange={(event) => {
                      //  it's validation on image
                       if (event.target.files[0]
                         && !SUPPORTED_FORMAT.includes(event.target.files[0].type)) {
                         imgError('unsupported file format')
                        }
                       else if (event.target.files[0].size > 1024 * 1024 * 10) {
                        imgError('image size is very large')
                       } 
                       else if (event.target.files[0].size <= 1024 * 1024 * 10) {
                        const file = event.target.files[0];
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => {
                          setFieldValue(`term.${index}.TermUploadImage`, reader.result);
                        }
                       }
                     }}
                     
                     className='hidden'
                     name={`term.${index}.TermUploadImage`} 
                     id={`term.${index}.TermUploadImage`}
                     type="file" 
                    
                    />

                  </div>

                  {/* it's a delete button to delete a term with a condition 
                     if there is only one term present you can't delete the term &
                    you can edit that term */}
                  
                  <div>

                   {
                    values.term.length<=1 
                    ? ""
                    : <MdOutlineDelete  className='text-[1.4em]  m-2 cursor-pointer text-blue-500/75 hover:text-red-500' 
                                        onClick={() => arrayHelpers.remove(index)} />
                   }   

                  {/* Edit btn to edit term  */}
                   {
                     <TbEdit className="text-[1.4em] text-blue-500/75 m-2 cursor-pointer hover:text-blue-900" 
                             onClick={() => { inputRef.current[index].focus()}}/>
                   }
                
                  </div>
                </div>
              </div>
           ))
         }
       
         {/* it's a Add more button to add a new term */}
         <div onClick={() => arrayHelpers.insert(values.term.length + 1, {
             EnterTerm:"",
             TermDefination:"",
             TermUploadImage:"",
          })} 
             className="my-5 cursor-pointer w-28 mx-5 text-blue-700">
             <BsPlus className='inline-block' /> Add more
         </div>
       
         </div>
       )}
     />
         <div className="h-28 flex  items-center justify-center">  
        {/* it's a create button to create a flashcard */}
          <button type='submit'
                  className="text-white bg-red-700 hover:bg-red-800  font-bold 
                      py-2 px-14 rounded focus:outline-none focus:ring-4 focus:ring-red-300 
                      text-sm text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 
                      dark:focus:ring-red-900 ">
                Create
          </button>
          </div>
      </Form>
    )}            
   </Formik>
  </div>
 )
}

export {CreteFlashcard}