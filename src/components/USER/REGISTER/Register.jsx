import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Auth/AuthContext';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useContext(AuthContext);

    const handleRegister = async (e) => {
        e.preventDefault();
        await register(email, password);
    };

    return (
        <form onSubmit={handleRegister}>
            <h2>Register</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
