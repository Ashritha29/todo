import React from 'react';
import { useForm } from 'react-hook-form';
import {Form,Button} from "react-bootstrap";
import {MdLogin} from "react-icons/md";
import axios from "axios";


function SignUp() {
    const{register,handleSubmit,formState:{errors},}=useForm();
    const onFormSubmit=(userObj)=>{
        axios.post("http://localhost:5000/user-api/create-user",userObj)
        .then(response=>{
            console.log(response);
            alert('user created');
        })
        .catch(error=>
            {   console.log(error)
                alert("something is wrong in creating the user")
            });
    }
    return (
        <>
        <div className='display-2 text-center text-info'>SignUp</div>
            <Form className="w-50 mx-auto" onSubmit={handleSubmit(onFormSubmit)} >
                {/* username */}
                <Form.Group className="mb-3" >
                    <Form.Label >Username</Form.Label>
                    <Form.Control type="text"  placeholder="Enter username"{...register("username",{minLength:4,maxLength:10,required:true})}/>
                    {/* validation error message for username */}
                    {errors.username?.type === 'required' && <p classname="text-danger">* Username is required</p>}
                    {errors.username?.type === 'minLength' && <p className="text-danger">* Min length should be 4</p>}
                    {errors.username?.type === 'maxLength' && <p className="text-danger">* Max length should be 10</p>}
                </Form.Group>
                {/* password */}
                <Form.Group className="mb-3">
                    <Form.Label >Password</Form.Label>
                    <Form.Control type="password"  placeholder="Enter password"{...register("password",{required:true,minLength:4,maxLength:10})}/>
                    {/* validation error message for password */}
                    {errors.password?.type === 'required' && <p classname="text-danger">*Password is required</p>}
                    {errors.password?.type === 'minLength' && <p className="text-danger">* Min length should be 4</p>}
                    {errors.password?.type === 'maxLength' && <p className="text-danger">* Max length should be 10</p>}
                </Form.Group>
                {/* E-mail */}
                <Form.Group className="mb-3">
                    <Form.Label >Email</Form.Label>
                    <Form.Control type="mail"  placeholder="Enter mail"{...register("mail",{required:true})}/>
                    {/* validation error message for E-mail */}
                    {errors.email && <p classname="text-danger">*E-mail is required</p>}
                </Form.Group>
                {/* City */}
                <Form.Group className="mb-3">
                    <Form.Label >City</Form.Label>
                    <Form.Control type="city"  placeholder="Enter City"{...register("city",{required:true})}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Signup<MdLogin/>
                </Button>
            </Form>
        </>
    );
}

export default SignUp;




