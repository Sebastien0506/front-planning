import Link from "next/link"

function NavBar(){
    return(
        <nav>
            <ul>
                <li> <Link href="/">Accueil</Link></li>
                <li> <Link href="/connexion">Connexion</Link></li>
                <li> <Link href="/inscription">Inscription</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;