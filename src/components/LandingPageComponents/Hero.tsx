import { FC } from "react";
import { Link } from "react-router-dom";

interface BioProps {
  grade?: number;
}

const Hero: FC<BioProps> = (props): JSX.Element => {
  return (
    <div
      className={`hero min-h-screen bg-base-${props.grade ? props.grade : 200}`}
    >
      <div className="hero-content text-center flex-col gap-12">
        <div className="">
          <h1 className="text-7xl font-bold">
            Your wiki, docs, & projects. Together.
          </h1>
          <p className="py-6 font-medium">
            Notion is the connected workspace where better, faster work happens.
          </p>
          <Link to="/register">
            <button className="py-1 px-3 bg-purple-700 text-white rounded-sm hover:bg-purple-800 transition font-normal text-lg">
              Get Started For Free
            </button>
          </Link>
        </div>
        <div>
          <img
            className="w-3/4"
            src="../../undraw_taking_notes_re_bnaf.svg"
            alt="Hero Image"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
