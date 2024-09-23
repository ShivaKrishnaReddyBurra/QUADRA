import React, { useState, useEffect } from "react";
import { SocialIcon } from 'react-social-icons'
import '../styles/MyFooter.css';
function MyFooter() {
  const [showFooter, setShowFooter] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;

    // Show footer if user is near the bottom or if there is no scroll
    if (scrollTop + windowHeight >= fullHeight - 10 || windowHeight >= fullHeight) {
      setShowFooter(true);
    } else {
      setShowFooter(false);
    }
  };

  useEffect(() => {
    handleScroll(); // Call on component mount to check initial condition
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll); // To handle window resize
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <footer
  className={`footer bg-dark text-white p-2 d-flex flex-column flex-md-row justify-content-between align-items-center ${showFooter ? "show" : "hide"}`}
>
  <div className="social-icons d-flex mb-2 mb-md-0"> {/* Margin bottom on small screens */}
    <SocialIcon url="https://www.linkedin.com/in/shivakrishnareddyburra/" bgColor="transparent" className="mx-2" />
    <SocialIcon url="https://github.com/ShivaKrishnaReddyBurra" bgColor="transparent" className="mx-2" />
    <SocialIcon url="https://www.facebook.com/shivakrishnareddy.burra/" bgColor="transparent" className="mx-2" />
    <SocialIcon url="https://www.instagram.com/shivkrish_1624/" bgColor="transparent" className="mx-2" />
  </div>
  <div className="copyright" style={{ fontSize: '0.9rem' }}>
    &copy; 2024 Sk Blog. All Rights Reserved.
  </div>
</footer>

  
  );
}

export default MyFooter;
