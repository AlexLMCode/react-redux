import React from 'react';
import {Link} from 'react-router-dom'
import {useForm} from "../../hooks/useForm";
import {useDispatch, useSelector} from "react-redux";
import {startGoogleLogin, startLoginEmailPass} from "../../actions/auth";
import {setError} from "../../actions/ui";
import validator from "validator";

export const LoginScreen = () => {

    const {loading} = useSelector((state) => state.ui);

    const dispatch = useDispatch();

    const [formValues, handleInputChange] = useForm({
        email: 'alex@gmail.com',
        password: '1234567',

    });

    const {email, password} = formValues;

    const handleLogin = (e) => {
        e.preventDefault();

        if (isFormValid()) {
            dispatch(startLoginEmailPass(email, password));

        } else {
            alert('Invalid form!')
        }


    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    }

    const isFormValid = () => {

        if (!validator.isEmail(email)) {

            // console.log('Name is required and it should be at least 3 characters')
            dispatch(setError('Type a valid email'))
            return false;

        } else if (password.length < 5) {

            // console.log('Password should be at least 6 characters and match each other');
            dispatch(setError('Password should be at least 6 characters and match each other'))
            return false;

        }

        return true;
    }


    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form onSubmit={handleLogin}>

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />


                <button
                    type="submit"
                    className={`btn btn-primary btn-block ${loading ? "disabled" : ""}`}
                    disabled={loading}

                >
                    Login
                </button>


                <div className="auth__social-networks">
                    <p>Login with social networks</p>

                    <div
                        className="google-btn"
                        onClick={handleGoogleLogin}

                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon"
                                 src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                 alt="google button"/>
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link
                    to="/auth/register"
                    className="link"
                >
                    Create new account
                </Link>

            </form>
        </>
    )
}
