import React from 'react'
import { useFormik , Formik  } from 'formik';
import {Container,Input} from "reactstrap";
import axios from "axios";
import "./Form.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

  const showToast = () => {
    toast.success("Success Notification !");
  };

 const SignupForm = () => {
   const formik = useFormik({
     initialValues: {
       firstName: '',
       lastName: '',
       email: '',
       userimage: '',
     },
     onSubmit: values => {
        console.log('val', values)
        
        axios.post('https://reqres.in/api/users', values )
        .then(function (response) {
            console.log(response);
            if( response.status === 201 ) {
              
            } else {
              toast.error("Error Notification !");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
     },
   });
   return (
    <div className='Show_From'>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="firstName">First Name: </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />
        <br/>
        <br/>
        <label htmlFor="lastName">Last Name: </label>
        <input
         id="lastName"
         name="lastName"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.lastName}
        />
       <br/>
       <br/>
       <label htmlFor="email">Enter Email: </label>
        <input
         id="email"
         name="email"
         type="email"
         onChange={formik.handleChange}
         value={formik.values.email}
       />
       <br/>
       <label htmlFor="image" className='IMAGE_update'>Image: </label>
         <Container className='image_show'>  
            <Formik
                initialValues={{photo1:""}}
                onSubmit={(values)=>{
                    console.log('img val', values);
                }}

            >
                {
                    (formProps) => (
                        
                        <Input
                            type="file"
                            name="userimage"
                            onChange={ formik.handleChange }
                            value={ formik.values.userimage }                        
                        />

                    )
                }

            </Formik>
        </Container>   
       <br/>
       <button type="submit" className='submit' onClick={showToast}>Submit</button>
       <ToastContainer />
     </form>
     </div>
   );
 };
 export default SignupForm