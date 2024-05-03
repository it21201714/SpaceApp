import { Alert, Button, DarkThemeToggle, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {

    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value.trim()
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!formData.email || !formData.password || !formData.name){
            setErrorMessage('Please fill in all the fields');
            return;
        }

        try{
            setLoading(true);
            setErrorMessage(null);
            const res = await fetch('/api/user/signup',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if(data.success===false){
                setErrorMessage('Something went wrong');
                return;
            }
            setLoading(false);
            if(res.ok){
                navigate('/');
            }
        }catch(error){
            setErrorMessage('Something went wrong');
            setLoading(false);
        }
    }

  return (
    <div className="min-h-screen mt-28">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left*/}
        <div className="flex-1">
          <Link to="/" className=" text-4xl font-bold">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Space
            </span>
            View
          </Link>
          <p className="text-sm mt-5">
            Sign up to get the latest updates on space and astronomy.
          </p>
        </div>
        {/* right*/}
        <div className="flex-1">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div >
                    <Label className="text-white" value="Name "/>
                    <TextInput type="text" placeholder="Name" id="name" onChange={handleChange}/>
                </div>
                <div >
                    <Label className="text-white" value="Email "/>
                    <TextInput type="email" placeholder="example@account.com" id="email" onChange={handleChange}/>
                </div>
                <div >
                    <Label className="text-white" value="Password "/>
                    <TextInput type="password" placeholder="Password" id="password" onChange={handleChange}/>
                </div>
                <Button className="mt-2" gradientDuoTone="purpleToPink" type="submit" disabled={loading}>{loading ? (<><Spinner size='sm'/> <span className="pl-3">Loading...</span></>): 'Sign up'}</Button>
            </form>
            <div className="flex gap-2 text-sm mt-5">
                <span>Have an account?</span>
                <Link to="/" className="text-blue-500">Sign In</Link>
            </div>
            {
                errorMessage && (
                    <Alert className="mt-5" color='failure'>{errorMessage}</Alert>
                )
            }
        </div>
      </div>
    </div>
  );
}
