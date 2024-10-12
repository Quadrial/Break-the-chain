import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const imagesAndTexts = [
  {
    Dimage: "/images/Dimage1.png",
    Timage: "/images/Timage1.png",
    Mimage: "/images/Mimage1.png",
    text: "HELLO1",
  },
  {
    Dimage: "/images/Dimage2.png",
    Timage: "/images/Timage2.png",
    Mimage: "/images/Mimage2.png",
    text: "HELLO2",
  },
  {
    Dimage: "/images/Dimage3.png",
    Timage: "/images/Timage3.png",
    Mimage: "/images/Mimage3.png",
    text: "HELLO3",
  },
  {
    Dimage: "/images/Dimage4.png",
    Timage: "/images/Timage4.png",
    Mimage: "/images/Mimage4.png",
    text: "HELLO4",
  },
  {
    Dimage: "/images/Dimage5.png",
    Timage: "/images/Timage5.png",
    Mimage: "/images/Mimage5.png",
    text: "HELLO5",
  },
];

export default function Header() {
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.addEventListener("scroll", handleScroll);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === imagesAndTexts.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [imagesAndTexts.length]);

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 768 && window.innerWidth < 1024
  );
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Determine the appropriate image based on screen size
  const backgroundImage = isMobile
    ? imagesAndTexts[currentIndex].Mimage
    : isTablet
    ? imagesAndTexts[currentIndex].Timage
    : imagesAndTexts[currentIndex].Dimage;

  return (
    <section
      className="flex flex-col text-center relative bg-cover bg-no-repeat lg:h-screen md:h-[500px] h-[400px] w-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        transition: "background-image 0.5s ease-in-out", // Smooth transition
      }}
    >
      <div
        className={`fixed transition-colors duration-300 flex items-center justify-between border-b border-gray-400 lg:px-[300px] md:px-[50px] px-[30px] ${
          scroll ? "bg-slate-300 shadow-md" : "bg-transparent"
        }`}
      >
        <Link href="/" className="flex items-center">
          <img src="images/logo2.png" alt="logo" className="w-[20%]" />
          <p className="text-[20px] text-white">Break the chain</p>
        </Link>
        <nav>
          <section className="MOBILE-MENU flex lg:hidden md:hidden">
            <div
              className="HAMBURGER-ICON space-y-2"
              onClick={() => setIsNavOpen((prev) => !prev)}
            >
              <span className="block h-0.5 w-8 animate-pulse bg-white"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-white"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-white"></span>
            </div>

            <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
              <div
                className="absolute top-0 right-0 px-8 py-8"
                onClick={() => setIsNavOpen(false)}
              >
                <svg
                  className="h-8 w-8 text-gray-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <ul className="flex flex-col items-center justify-between min-h-[250px]">
                <Link
                  to="/"
                  className="border-b border-gray-400 my-8 uppercase"
                >
                  Home
                </Link>
                <Link
                  to="/donate"
                  className="border-b border-gray-400 my-8 uppercase"
                >
                  Donate
                </Link>
                <Link
                  to="/history"
                  className="border-b border-gray-400 my-8 uppercase"
                >
                  Donate History
                </Link>
                
                <Link
                  to="/about"
                  className="border-b border-gray-400 my-8 uppercase"
                >
                  About Us
                </Link>
              </ul>
            </div>
          </section>

          <ul className="DESKTOP-MENU hidden text-white space-x-[130px] lg:flex md:flex">
            <Link to="/" className=" my-8 uppercase">
              Home
            </Link>
            <Link to="/donate" className=" my-8 uppercase">
              Donate
            </Link>
            <Link to="/history" className=" my-8 uppercase">
              Donate History
            </Link>
            
            <Link to="/about" className=" my-8 uppercase">
              About Us
            </Link>
          </ul>
        </nav>

        <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
      </div>
      <main className="mt-[100px] md:mt-[150px] lg:mt-[300px]">{imagesAndTexts[currentIndex].text}</main>
    </section>
  );
}
