import React, { useContext, useState, useEffect, useRef } from 'react'; // Added useRef here
import axios from 'axios';
import commonContext from '../../contexts/common/commonContext';
import useForm from '../../hooks/useForm';
import useOutsideClose from '../../hooks/useOutsideClose';
import useScrollDisable from '../../hooks/useScrollDisable';


const AccountForm = () => {
    const { isFormOpen, toggleForm, formUserInfo, setFormUserInfo } = useContext(commonContext);
    const { inputValues, handleInputValues, setInputValues } = useForm();
    const formRef = useRef();

    useOutsideClose(formRef, () => toggleForm(false));
    useScrollDisable(isFormOpen);

    const [isSignup, setIsSignup] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Handling toggle between signup and login
    const handleToggleForm = () => {
        setIsSignup(!isSignup);
        setErrorMessage('');
    };

    // Handle login/signup form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const url = `http://localhost:5000/api/${isSignup ? 'signup' : 'login'}`;
            const payload = isSignup
                ? { username: inputValues.username, mail: inputValues.mail, password: inputValues.password }
                : { mail: inputValues.mail, password: inputValues.password };

            const { data } = await axios.post(url, payload);

            if (data.success) {
                // If login/signup is successful, store the token and user info
                localStorage.setItem('userToken', data.token);  // Save token in localStorage
                setFormUserInfo(data.user);  // Save user data in context

                alert(data.message);
                toggleForm(false);  // Close the modal after successful login/signup
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'An error occurred');
        }
    };

    // Logout functionality
    const handleLogout = () => {
        localStorage.removeItem('userToken');  // Remove token from localStorage
        setFormUserInfo('');  // Clear user info from context
        alert('You have successfully logged out');
    };

    return (
        isFormOpen && (
            <div className="backdrop">
                <div className="modal_centered">
                    <form id="account_form" ref={formRef} onSubmit={handleSubmit}>
                        <div className="form_head">
                            <h2>{isSignup ? 'Signup' : 'Login'}</h2>
                            <p>
                                {isSignup ? 'Already have an account?' : 'New to AudioLoom?'}
                                &nbsp;&nbsp;
                                <button type="button" onClick={handleToggleForm}>
                                    {isSignup ? 'Login' : 'Create an account'}
                                </button>
                            </p>
                        </div>

                        {errorMessage && <p className="error_message">{errorMessage}</p>}

                        <div className="form_body">
                            {isSignup && (
                                <InputField
                                    type="text"
                                    name="username"
                                    label="Username"
                                    value={inputValues.username}
                                    onChange={handleInputValues}
                                />
                            )}
                            <InputField
                                type="email"
                                name="mail"
                                label="Email"
                                value={inputValues.mail}
                                onChange={handleInputValues}
                            />
                            <InputField
                                type="password"
                                name="password"
                                label="Password"
                                value={inputValues.password}
                                onChange={handleInputValues}
                            />

                            <button type="submit" className="btn login_btn">
                                {isSignup ? 'Signup' : 'Login'}
                            </button>
                        </div>

                        <div className="close_btn" title="Close" onClick={() => toggleForm(false)}>
                            &times;
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

// InputField Component (Reusable for Signup/Login)
const InputField = ({ type, name, label, value, onChange }) => (
    <div className="input_box">
        <input type={type} name={name} className="input_field" value={value || ''} onChange={onChange} required />
        <label className="input_label">{label}</label>
    </div>
);

export default AccountForm;
