import React from 'react';
import {Link} from 'react-router-dom';
import {useForm} from "../../hooks/useForm";
import validator from "validator";
import {useDispatch, useSelector} from "react-redux";
import {removeError, setError} from "../../actions/ui";
import {startRegisterWIthEmailPasswordName} from "../../actions/auth";

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const {msgError} = useSelector(state => state.ui);


    const [formValues, handleInputChange] = useForm({
        name: 'Aleti',
        email: 'alex@gmail.com',
        password: '1234567',
        password2: '1234567'
    })

    const {
        name,
        email,
        password,
        password2,
    } = formValues;


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, email, password, password2);

        if (isFormValid()) {

            dispatch(removeError());
            dispatch(startRegisterWIthEmailPasswordName(email, password, name));

        }
    }

    const isFormValid = () => {

        if (name.trim().length < 3) {

            // console.log('Name is required and it should be at least 3 characters')
            dispatch(setError('Name is required and it should be at least 3 characters'))
            return false;

        } else if (!validator.isEmail(email)) {

            // console.log('Type a valid email')
            dispatch(setError('Type a valid email'))
            return false;

        } else if (password !== password2 || password.length < 5) {

            // console.log('Password should be at least 6 characters and match each other');
            dispatch(setError('Password should be at least 6 characters and match each other'))
            return false;

        }

        return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={handleSubmit}>

                {
                    (msgError) && (
                        <div className="auth__alert-error">
                            {msgError}
                        </div>
                    )
                }

                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />

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

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange={handleInputChange}
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>


                <Link
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}
