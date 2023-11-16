import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import database from '@react-native-firebase/database';

export const signUp = data => async dispatch => {
  console.log(data);

  const {name, email, password, country, image, instaUserId, bio} = data;

  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(data => {
      console.log(data);
      console.log('User creation was successful');

      database()
        .ref('/users/' + data.user.uid)
        .set({
          name,
          instaUserId,
          bio,
          country,
          image,
          uid: data.user.uid,
        })
        .then(() => console.log('Data set successful'));
      Snackbar.show({
        text: 'account created',
        textColor: 'white',
        backgroundColor: '1b262c',
      });
    })
    .catch(error => {
      console.error(error);
      Snackbar.show({
        text: 'SignUp Failed',
        textColor: 'White',
        backgroundColor: 'red',
      });
    });
};

export const signIn = data => async dispatch => {
  console.log(data);
  const {email, password} = data;

  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('Sign in success');
      Snackbar.show({
        text: 'Signin successful',
        textColor: 'White',
        backgroundColor: '1b262c',
      });
    })
    .catch(error => {
      console.error(error);
      Snackbar.show({
        text: 'Signin failed',
        textColor: 'White',
        backgroundColor: 'red',
      });
    });
};

export const signout = () => async dispatch => {
  auth()
    .signOut()
    .then(() => {
      Snackbar.show({
        text: 'Signout success',
        textColor: 'White',
        backgroundColor: '1b262c',
      });
    })
    .catch(error => {
      console.error(error);
      Snackbar.show({
        text: 'Signout failed',
        textColor: 'White',
        backgroundColor: 'red',
      });
    });
};
