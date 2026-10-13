import { NavLink } from "react-router-dom";

export default function Heading() {
    return (
        <>
            <ul className="nav-bar-container">
                <h2 className="home-link"><NavLink to='/'> TrendSettaz Music </NavLink></h2>
                <div className="sideBar">
                    <h2 className="music-creation"><NavLink to='/creationPage'> Music Creation </NavLink></h2>
                    <button className="sign-in"><NavLink to='/signInPage'> Sign in </NavLink></button>
                </div>
            </ul>
        </>
    )
}