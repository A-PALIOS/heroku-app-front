

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginUser, reset } from '../features/authSlice';
import cashflow_logo from '../Images/who2.png';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import '../login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isError, isSuccess, isLoading, message } = useSelector(state => state.auth);

    const Auth = e => {
        e.preventDefault();
        dispatch(LoginUser({ email, password }));
    };

    useEffect(() => {
        if (user && isSuccess) {
            console.log("login user",user)
            navigate('/home');
        }
        dispatch(reset());
    }, [user, isSuccess, dispatch, navigate]);

    return (
        <div className="login-page-container">
            <div className="login-form-section">
                <div className="login-box">
                    <div className="text-center mb-5">
                        <img src={cashflow_logo} alt="CashFlow Logo" height={80} className="mb-3" />
                      
                    </div>
                    <form onSubmit={Auth}>
                        <div className="form-group">
                            <label htmlFor="email" style={{ color: 'white',fontSize:'16px' }}>Email</label>
                            <InputText type="text" className="w-full mb-3" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" style={{ color: 'white',fontSize:'16px' }}>Password</label>
                            <InputText type="password" className="w-full mb-3" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                        </div>
                        <Button type="submit" label={isLoading ? "Loading..." : "Login"} icon="pi pi-sign-in" className="w-full" />
                       
                    </form>
             
                    {isError && <p className="error-message">{message}</p>}
                    
                </div>
            </div>
           
        </div>
    );
};

export default Login;
