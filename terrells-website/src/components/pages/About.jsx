import htmlLogo from '../../assets/svg/html.svg'
import cssLogo from '../../assets/svg/css.svg'
import javascriptLogo from '../../assets/svg/javascript.svg'
import viteLogo from '../../assets/svg/vite.svg'
import reactLogo from '../../assets/svg/react.svg'
import pythonLogo from '../../assets/svg/python.svg'
import React, { useState, useEffect } from "react";
import TiltContainer from "../stylish/TiltContainer.jsx";

export default function About() {
      const [showScroll, setShowScroll] = useState(false);
    
        // Detect scroll position
        useEffect(() => {
            const handleScroll = () => {
                if (window.scrollY > 300) {
                    setShowScroll(true);
                } else {
                    setShowScroll(false);
                }
            };
    
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }, []);
    
        // Scroll back to top function
        const scrollToTop = () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        };
    
    return (
    <>
            <div className="about-content">
                <div className="resume-button-container">
                 <a href="Jahmari's Resume.pdf">   {/* references my resume */} {/* It's in the public folder*/}
                    <button className="resume-button"><strong>Here's my resume</strong></button>
                 </a>
                </div>
                <div className="email"><strong>jahmarimaxwell@gmail.com</strong></div>
                <div className="info-container">
                    <div className="portrait-holder">
                        <h2 className="hover-text"> (Hover over me) </h2>
                        <TiltContainer> 
                        <a href="https://github.com/jahmarimaxwell">
                            <img className="portrait" src="/personal-portfolio-project/pictures/Professional-Headshot.jpg"></img>                        
                        </a>
                        </TiltContainer> 
                        <h2 className="viewgithub"> Click to view github </h2>
                    </div>
                        <div className="personal-description">
                            <h4 className="description-words">I'm a passionate website developer in the making, 
                            constantly striving to grow my skills and create meaningful 
                            digital experiences. With a strong foundation in HTML, CSS, and JavaScript, 
                            I'm driven by curiosity and a desire to build clean, responsive, 
                            and user-friendly websites. Whether it's designing a sleek portfolio or solving bugs in complex layouts, 
                            I approach each challenge as a chance to learn and improve. 
                            I believe in the power of collaboration, perseverance, and continuous learning 
                            as I work toward becoming a confident and creative full-stack developer.
                            </h4>
                        </div>
                </div>
          
                <div className="description">
                        <p className="proficiency"><strong>Technologies</strong></p>
                        <div className="tech-stack">
                                    <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank">
                                        <img src={htmlLogo} className="logo" alt="HTML logo"/>
                                    </a>
                                    <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank">
                                        <img src={cssLogo} className="logo" alt="CSS logo"/>
                                    </a>
                                    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
                                        <img src={javascriptLogo} className="logo vanilla" alt="JavaScript logo" />
                                    </a>
                                    <a href="https://vitejs.dev" target="_blank">
                                        <img src= {viteLogo} className="logo" alt="Vite logo"/>
                                    </a>
                                    <a href="https://react.dev" target="_blank">
                                    <img src= {reactLogo} className="logo spin" alt="React logo"/>
                                    </a>  
                                    <a href="https://www.python.org/" target="_blank">
                                    <img src={pythonLogo} className="logo" alt="Python logo"/>
                                    </a>                       
                        </div>
                </div>
            </div>

          {/* Scroll-to-Top Button */}
          {showScroll && (
                <button className="scroll-to-top" onClick={scrollToTop}>
                    ↑
                </button>
            )}
    </>
    )
}