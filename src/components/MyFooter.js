import React, { useState, useEffect } from "react";

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
      className={`footer bg-dark text-white text-center p-2 ${
        showFooter ? "show" : "hide"
      }`}
    >
      &copy; 2024 Quadra Blog. All Rights Reserved.
    </footer>
  );
}

export default MyFooter;
