import { NavLink } from "react-router-dom";

export default function Heading() {
    return (
        <>
            <ul className="nav-bar-container">

                <h2 className="home-link"><NavLink to='/'>TrendSettaz Music</NavLink></h2>
                <div className="sideBar">
                    <h2 className="music-creation"><NavLink to='/musicPage'> Music Creation</NavLink></h2>
                    <button className="sign-in">Sign in</button>
                </div>
                {/* <h2 className="nav-link"><NavLink to='/about'>Sign in</NavLink></h2> */}
                
            </ul>
        </>
    )
}