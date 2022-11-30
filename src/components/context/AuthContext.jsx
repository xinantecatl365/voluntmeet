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
  getDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [nameUser, setNameUser] = useState(null);
  const [publications, setPublications] = useState([]);

  const getDataPubs = async () => {
    const docs = await getDocs(collection(fStore, "publications"));
    let arrAux = [];
    let aux = null;
    docs.forEach((doc) => {
      aux = { id: doc.id, ...doc.data() };
      arrAux.push(aux);
    });
    console.log(`publicaciones ${publications}`);
    setPublications(arrAux);
  };

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
    return getDocs(collection(fStore, "publications"));
  };

  const fStoreComment = (comment, userId, uid) => {
    const docRef = doc(fStore, "publications", uid);
    const docSubcollection = collection(docRef, "comments");
    console.log(nameUser);
    return addDoc(docSubcollection, {
      comment: comment,
      userId: userId,
      name: nameUser.name,
      lname: nameUser.lName,
    });
  };

  const getComments = (uid) => {
    return getDocs(collection(fStore, "publications/" + uid + "/comments"));
  };

  const getCurrentUserName = async (uid) => {
    getDoc(doc(fStore, "users", uid))
      .then((doc) => {
        const user = doc.data();
        setNameUser(user);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getCurrentUserName(user.uid);
      }
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
        nameUser,
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
        fStoreComment,
        getComments,
        getDataPubs,
        publications
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
