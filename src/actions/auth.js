import {types} from "../types/types";
import {firebase, googleAuthProvider} from "../firebase/firebase-config";
import {finishLoading, startLoading} from "./ui";
import Swal from 'sweetalert2'

export const startLoginEmailPass = (email, password) => {

    return (dispatch) => {

        dispatch(startLoading());

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({user}) => {


                dispatch(login(user.uid, user.displayName));
                dispatch(finishLoading())

            })
            .catch(e => {
                console.log(e);
                dispatch(finishLoading());
                Swal.fire('Error', e.message, 'error')
            })


    }
};

export const startRegisterWIthEmailPasswordName = (email, pass, name) => {
    return (dispatch) => {

        firebase.auth().createUserWithEmailAndPassword(email, pass)
            .then(async ({user}) => {

                await user.updateProfile({displayName: name});


                dispatch(login(user.uid, user.displayName))


            }).catch(e => {
            console.log(e)
            Swal.fire('Error', e.message, 'error')
        })

    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({user}) => {

                dispatch(login(user.uid, user.displayName));

                console.log(user);
            })
    }
};


export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {uid, displayName}
    }
}

export const startLogout = () => {
    return async (dispatch) => {

        await firebase.auth().signOut();

        dispatch(logOut());

    }
}

export const logOut = () => {

    return {
        type: types.logout
    }

}
