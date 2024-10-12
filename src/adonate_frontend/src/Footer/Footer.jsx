import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="bg-slate-300  mt-1 text-[18px] lg:px-[250px] md:px-[100px] px-[30px]">
        <section className=" flex flex-col items-center md:items-start lg:items-start md:flex-row lg:flex-row  gap-[30px] md:gap-[100px] lg:gap-[300px] content-center">
          <figure className="flex flex-col lg:w-[350px]">
            <Link href="/">
              <img
                src="/images/logo2.png"
                alt="QuadCode"
                className=" w-[40%] h-[40%] ml-[100px]"
              />
            </Link>
            <h2 className="">
              Join hands with us to make a difference. Volunteer, donate or
              spread the word – every action counts in giving these children a
              second chance..
            </h2>
            <div className="mt-5 flex flex-row justify-center  gap-5">
              <a
                href="https://x.com/IsiakQuadri"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="images/twitter-color-svgrepo-com.svg"
                  alt="Twitter"
                  className="w-8 h-8"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/isiak-quadri-316445211/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="images/linkedin-color-svgrepo-com.svg"
                  alt="LinkedIn"
                  className="w-8 h-8"
                />
              </a>

              <a
                href="https://github.com/Quadrial"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="images/github-round-svgrepo-com.svg"
                  alt="GitHub"
                  className="w-8 h-8"
                />
              </a>
            </div>
          </figure>
          <main className="mt-5 flex flex-col items-center">
            <h2 className="fhtext">Get In Touch</h2>
            <a>opequadri2@gmail.com</a>
            <h3>+2348145522446</h3>
          </main>
          <main className="mt-5 flex flex-col items-center">
            <h2 className="fhtext">Products</h2>
            <Link to="/" className="border-b border-gray-400 my-2 uppercase">
              Home
            </Link>
            <Link
              to="/donate"
              className="border-b border-gray-400 my-2 uppercase"
            >
              Donate
            </Link>
            <Link
              to="/history"
              className="border-b border-gray-400 my-2 uppercase"
            >
              Donate History
            </Link>
            <Link className="border-b border-gray-400 my-2 uppercase">
              How It Works
            </Link>
            <Link
              to="/about"
              className="border-b border-gray-400 my-2 uppercase"
            >
              About Us
            </Link>
          </main>
        </section>
        <div className="relative my-4">
          <hr className="border-t-2 border-Header w-full" />
        </div>
        <footer className="w-full text-center py-4">
          <p>© {currentYear} Break the chain. All rights reserved.</p>
        </footer>
      </footer>
    </>
  );
};
