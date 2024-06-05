import React, {useState} from 'react';
import {ReactComponent as Logo} from '../assets/logo.svg';
import {Link} from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
        // Here you would typically handle the login logic, like calling an API.
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen w-auto">
            <form onSubmit={handleSubmit} className="flex flex-col w-80">
                <Logo className="w-500 h-500 mx-auto mb-4"/>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    placeholder="Email"
                    className="tip mt-4"
                    data-tip="Tooltip text here"
                />
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    placeholder="Password"
                    className="tip mt-3"
                    data-tip="Tooltip text here"
                />
                <p className="text-white text-xs mx-auto mt-2">
                    Click
                    <Link to="/register" className="text-primary-yellow underline hover:no-underline hover:opacity-80">
                        here
                    </Link>
                    to register
                </p>
                <button className="bg-primary-yellow mt-12 w-52 mx-auto h-8 rounded-xl hover:opacity-80 text-black"
                        type="submit">
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
