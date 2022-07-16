import React from 'react';
import { useForm } from 'react-hook-form';
import {Form,Button} from "react-bootstrap";
import {MdLogin} from "react-icons/md";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import 'bootstrap';


function Login() {
    const {register,handleSubmit,formState:{errors},}=useForm();

    return (
        <div className='container mt-3 me-3'>
        <div className='display-2 text-center text-info'>SignUp</div>
            <Form className="w-50 mx-auto" onSubmit={handleSubmit(onFormSubmit)} >
                {/* username */}
                <Form.Group className="mb-3 mt-2" >
                    <Form.Label className='ms-1 float-start' >Username</Form.Label>
                    <Form.Control type="text"  placeholder="Enter username"{...register("username",{ minLength:4,maxLength:10,required:true})}/>
                    {/* validation error message for username */}
                    {errors.username?.type === 'required' && <p className="text-danger ms-1 float-start mb-2">* Username is required</p>}
                </Form.Group>
                {/* password */}
                <Form.Group className="mb-3 ">
                    <Form.Label className='ms-1 float-start'  >Password</Form.Label>
                    <Form.Control type="password"  placeholder="Enter password"{...register("password",{required:true,minLength:4,maxLength:10})}/>
                    {/* validation error message for password */}
                    {errors.password?.type === 'required' && <p className="text-danger ms-1 float-start">*Password is required</p>}
                </Form.Group>
                <Button variant="primary" type="submit" className='mb-4'>
                    Signup<MdLogin/>
                </Button>
            </Form>
        </div>
    );
}

export default Login;


