import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { fStore } from "../../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import CardPublication from "../publications/Card";

const Home = () => {
  const { publications, getDataPubs } = UserAuth();

  

  useEffect(() => {
    getDataPubs();
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
            idFbs={el.id}
            name={el.name}
          />
        ))
      )}
    </>
  );
};

export default Home;
