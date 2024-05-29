"use client"
// Fetch Data from firebase DB
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const useFetchData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "teachers"));
      let fetchedData = [];
      querySnapshot.forEach((doc) => {
        fetchedData.push({ id: doc.id, ...doc.data() });
      });
      setData(fetchedData);
      setLoading(false);
    };

    fetchData();
  }, [data]);

  return { data, loading };
};

export default useFetchData;
