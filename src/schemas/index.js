import * as Yup from 'yup';
//validation purpose
export const SignupSchema = Yup.object({
    CreateGroup: Yup.string()
      .min(5, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Please Enter Group Name'),
      Description: Yup.string()
      .min(20, 'Too Short!')
      .max(300, 'Too Long!')
      .required('Please Enter Description'),
      term:Yup.array(
        Yup.object({
            EnterTerm: Yup.string()
            .min(5, 'Too Short!')
            .max(20, 'Too Long!')
            .required('Please Enter Term Name'),
            TermDefination: Yup.string()
            .min(10, 'Too Short!')
            .max(200, 'Too Long!')
            .required('Please Enter Term Defination') 
        })
      )
  });