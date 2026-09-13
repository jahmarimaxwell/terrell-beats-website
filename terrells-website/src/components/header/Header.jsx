import { NavLink } from "react-router-dom";

export default function Heading() {
    return (
        <>
            <ul className="nav-bar-container">

                <h2 className="home-link"><NavLink to='/'>TrendSettaz Music</NavLink></h2>
                <button class="sign-in">Sign in</button>
                {/* <h2 className="nav-link"><NavLink to='/about'>Sign in</NavLink></h2> */}
                
            </ul>
        </>
    )
}