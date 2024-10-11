import React from "react";
import { Link, useNavigate } from "react-router-dom";

const aims = [
  {
    image: "/images/Raise.jpg",
    text: "Raise Awareness",
  },
  {
    image: "/images/home.jpg",
    text: "Provide Home",
  },
  {
    image: "/images/operation.jpg",
    text: "Facilitate Rescue Operations",
  },
  {
    image: "/images/connect.jpg",
    text: "Connect Children With Resourses",
  },
  {
    image: "/images/communnity.jpg",
    text: "Mobilize Community Support",
  },
  {
    image: "/images/measures.jpg",
    text: "Tracking Progress And Measure Impact",
  },
];

export const Body = () => {
  const navigate = useNavigate();

  const handleDonateClick = () => {
    navigate("/donate");
  };

  return (
    <div className="flex flex-col content-center items-center justify-center mt-20 bg-gray-100 lg:px-[300px] md:px-[50px] px-[30px]">
      <div className="text-center">
        <main>
          <h1 className="text-4xl font-bold">Our Aims</h1>
          <h2 className="mt-10 text-xl">
            To create a comprehensive online platform that facilitate the
            rescue, rehabitation, and reintegration of children living on the
            streets . This platform will serve as a central hub for information,
            resources sharing, and community engagement to address the complex
            issues surrounding child homelessness.
          </h2>
        </main>
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
        {aims.map((aim, index) => (
          <main
            key={index}
            className="bg-white rounded-[20px] flex flex-col gap-4"
          >
            <img src={aim.image} alt="" className="rounded-[20px]" />
            <h2 className="text-2xl text-bold mb-5">{aim.text}</h2>
          </main>
        ))}
      </div>

      <main className="flex flex-col content-center items-center justify-center mt-20">
        <h1 className="text-4xl font-bold">Get Involved</h1>
        <section className="mt-10 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 content-center items-center text-center">
          <Link to="/donate" className="flex flex-col items-center">
            <img src="/images/1.png" alt="" className="w-1/2" />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleDonateClick}
            >
              Donate Now
            </button>
          </Link>
          <figure className="flex flex-col items-center">
            <img src="/images/now.png" alt="" className="w-1/2" />
            <button className="mt-5 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Volunteer Now
            </button>
          </figure>
          <figure className="flex flex-col items-center">
            <img src="/images/Learn.png" alt="" className="w-1/2" />
            <button className="mt-5 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Become a Mentor
            </button>
          </figure>
          <figure className="flex flex-col items-center">
            <img src="/images/more.png" alt="" className="w-1/2" />
            <button className="mt-5 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Learn More
            </button>
          </figure>
        </section>
      </main>
    </div>
  );
};
