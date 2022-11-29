import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { fStore } from "../../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import CardPublication from "../publications/Card";

const Home = () => {
  const [publications, setPublications] = useState([]);

  const getData = async () => {
    const docs = await getDocs(collection(fStore, "publications"));
    let arrAux = [];
    let aux = null;
    docs.forEach((doc) => {
      aux = { id: doc.id, ...doc.data() };
      arrAux.push(aux);
    });
    setPublications(arrAux);
  };

  useEffect(() => {
    return () => {
      getData();
    };
  }, []);

  return (
    <>
      
      {publications.length === 0 ? (
        <h1>Cargando</h1>
      ) : (
        publications.map((el) => (
          <CardPublication
            key={el.id + "_pub"}
            title={el.title}
            description={el.description}
            imagePath={el.imageURL}
          />
        ))
      )}
    </>
  );
};

export default Home;
