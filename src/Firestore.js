import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBEehWk-_U79DUY9x81lAzRdUmwdRzEjC8",
    authDomain: "exercise-log-df6cc.firebaseapp.com",
    projectId: "exercise-log-df6cc",
    storageBucket: "exercise-log-df6cc.appspot.com",
    messagingSenderId: "685328826210",
    appId: "1:685328826210:web:75b96ec4300307e50c363b",
    measurementId: "G-PFRS36YSFG"
};

firebase.initializeApp(firebaseConfig);

//export default firebase;
export const auth=firebase.auth()
export const firestore=firebase.firestore()

// export const generateUserDocument=async(user,additionalData)=>{
//     if(!user){
//         return;
//     }

//     const userRef=firestore.doc(`users/${user.uid}`)
//     const snapshot= await userRef.get()

//     if(!snapshot.exists){
//         const {email,username,photoURL}=user
//         try {
//             await userRef.set({
//                 username,
//                 email,
//                 photoURL,
//                 ...additionalData
//             })
//         }catch(error){
//             console.error("Error creating user document", error)
//         }
//     }

//     return generateUserDocument(user.uid)
// }


export const generateUserDocument = async (user, additionalData) => {
    if (!user) return;
  
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    console.log(userRef)
    if (!snapshot.exists) {
      const { email} = user;
      try {
        await userRef.set({
          email,
          ...additionalData
        });
      } catch (error) {
        console.error("Error creating user document", error);
      }
    }
    return getUserDocument(user.uid);
  };
  
  const getUserDocument = async uid => {
    if (!uid) return null;
    try {
      const userDocument = await firestore.doc(`users/${uid}`).get();
  
      return {
        uid,
        ...userDocument.data()
      };
    } catch (error) {
      console.error("Error fetching user", error);
    }
  };