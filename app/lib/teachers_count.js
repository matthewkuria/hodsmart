import { collection, getCountFromServer, getFirestore } from "firebase/firestore"
const db = getFirestore();

export default async  function getTeachersCount() {
const teachersCol = collection(db, 'teachers')
const snapshot = await getCountFromServer(teachersCol);
const totalCount = snapshot.data().count;
console.log(totalCount)
}