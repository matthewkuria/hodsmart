
"use client"
// Fetch Data from firebase DB
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const useFetchSubjectData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSubjectData = async () => {
      const querySnapshot = await getDocs(collection(db, "subjects"));
      let fetchedData = [];
      querySnapshot.forEach((doc) => {
        fetchedData.push({ id: doc.id, ...doc.data() });
      });
      setData(fetchedData);
      setLoading(false);
    };

    fetchSubjectData();
  }, [data]);

  return { data, loading };
};

export default useFetchSubjectData;