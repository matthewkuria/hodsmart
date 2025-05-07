"use client"
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { Input } from "@/components/ui/input"
import { getFirestore, collection, query, where, getDocs, FieldPath } from "firebase/firestore";
import { Key, useState } from 'react'
import { db } from '@/app/firebaseConfig';
export default function SearchBar() {
//     const searchDocuments = async (collectionName: string, field: string | FieldPath, value: unknown) => {
//   const q = query(collection(db, collectionName), where(field, "==", value));
//   const querySnapshot = await getDocs(q);
//   const results: { id: string; }[] = [];
//   querySnapshot.forEach((doc) => {
//     results.push({ id: doc.id, ...doc.data() });
//   });
//   return results;
// };
//     const SearchForm = () => {
//   const [searchField, setSearchField] = useState('');
//   const [searchValue, setSearchValue] = useState('');
//   const [results, setResults] = useState([]);

//   const handleSearch = async (e:any) => {
//     e.preventDefault();
//     const collectionName = 'yourCollection';  // Replace with your collection name
//     const searchResults = await searchDocuments(collectionName, searchField, searchValue);
//     setResults(searchResults);
//   };
    return (
        <main className="flex items-center">
        <div className="flex items-center w-full  gap-2">
            <MagnifyingGlassIcon className='size-6 text-slate-500'/>
            <Input 
             placeholder="Search for a teacher or subjects"
             type="text"
              // value={searchField}
            // onChange={(e) => setSearchField(e.target.value)}
            className='w-full h-10 rounded-md border-none bg-slate-100 focus:outline-none focus:ring-0 focus:border-none'
             />
        </div> 
        {/* <div>
        <h2>Results</h2>
        {results.length > 0 ? (
          <ul>
            {results.map((result: { id: Key | null | undefined }) => (
              <li key={result.id}>
                {JSON.stringify(result)}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>        */}
    </main>
    )
}