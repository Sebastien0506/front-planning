import Link from "next/link"
import { Poppins, Ranga } from "next/font/google";

const poppins = Poppins({subsets: ['latin'], weight: ["600"]});
const ranga = Ranga({subsets: ["latin"], weight: ["700"]})

function NavBar(){
    return(
        <nav style={{display: "flex", flexDirection:"row", justifyContent: "space-around", backgroundColor:"#171717"}}>
            <span className={ranga.className} style={{color: "white", fontSize: "2.5rem", marginLeft: "5%"}}>Planeasy</span>
            <ul className={poppins.className} style={{color: "white", fontSize: "1.5rem", width: "50%" ,display: "flex", justifyContent: "space-around", margin: "auto"}}>
                <li> <Link href="/">Accueil</Link></li>
                <li> <Link href="/connexion">Connexion</Link></li>
                <li> <Link href="/inscription">Inscription</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;