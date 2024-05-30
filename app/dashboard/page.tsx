"use client"

import GreetingsComponent from "../ui/dashboard/home/greetings"
import SearchBar from "../ui/dashboard/home/search-component"

export default function Page() {
    return(
        <main className="bg-slate-50">
            <SearchBar />
            <GreetingsComponent />
        </main>
    )
}