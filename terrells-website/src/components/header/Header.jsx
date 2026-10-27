
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);

    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Unable to sign out. Please try again.");
    } finally {
      setSigningOut(false);
    }
  }

  return (
      <nav className="nav-bar-container">
        <h2 className="home-link">
          <NavLink to="/">
            TrellSettaz Music
          </NavLink>
        </h2>

        <div className="sideBar">
          {user?.role === "admin" && (
            <h2 className="music-creation">
                <NavLink to="/creationPage">
                Music Creation
                </NavLink>
            </h2>
          )}

          {user ? (
            <>
              <span className="welcome-text"> Welcome, {user.username} </span>

              <button
                className="sign-in"
                onClick={handleSignOut}
                disabled={signingOut}
              >
                {signingOut ? "Signing Out..." : "Sign Out"}
              </button>
            </>
          ) : (
            <NavLink to="/signIn">
              Sign In
            </NavLink>
          )}
        </div>
      </nav>
  );
}
