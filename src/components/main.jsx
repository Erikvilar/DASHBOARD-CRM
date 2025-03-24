import { Outlet } from "react-router-dom";

export default function Main(){


    return (
        <main style={{maxWidth:"1920", maxHeight:"100vh"}}>
            
            <Outlet/>
        </main>
    )
}