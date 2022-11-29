import React, { useState, useEffect, useContext } from "react";
import { auth, fStore, storage } from "../../firebaseConfig";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  setDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const fStoreUser = (uid, user) => {
    return setDoc(doc(fStore, "users", uid), user);
  };

  const fStorePub = (publication) => {
    return addDoc(collection(fStore, "publications"), publication);
  };

  const fStoreSetImage = (uid, imageURL) => {
    return setDoc(doc(fStore, "publications", uid), imageURL);
  };

  const storageRef = (name) => {
    return ref(storage, `images/${name}`);
  };

  const storageUpload = (file, reference) => {
    return uploadBytes(reference, file);
  };

  const downloadURL = (reference) => {
    return getDownloadURL(reference);
  };

  const queryDocs = () => {
    return (getDocs(collection(fStore, "publications")));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(`Hola ${user}`);
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        createUser,
        logout,
        signIn,
        fStorePub,
        fStoreUser,
        storageUpload,
        fStoreSetImage,
        storageRef,
        downloadURL,
        queryDocs,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const UserAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, UserAuth };
