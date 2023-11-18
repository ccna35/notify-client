import { ArrowDownRightIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import BrandsList from "../components/LandingPageComponents/BrandsList";
import Hero from "../components/LandingPageComponents/Hero";
import { BiArrowToRight, BiStar } from "react-icons/bi";
import Feature from "../components/LandingPageComponents/Features/Feature";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <section className="min-h-screen py-8 dark:bg-slate-950 transition">
      <div className="container flex flex-col gap-24">
        <div className="flex flex-col gap-8 items-center">
          <h2 className="max-w-xl text-6xl font-bold text-indigo-800 text-center leading-tight dark:text-slate-100">
            Write, plan, share. With <span className="text-yellow-500">AI</span>{" "}
            at your side.
          </h2>
          <h3 className="max-w-3xl text-2xl font-semibold text-indigo-800 dark:text-slate-100">
            Notify is the connected workspace where better, faster work happens.
          </h3>
          <button className="py-2 px-4 rounded-md bg-indigo-800 text-white text-xl">
            <Link to="/register">Get started now</Link>
          </button>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Feature
            headline="AI"
            desc="Ask literally anything. Notion will answer."
            iconBg="bg-indigo-200"
            iconColor="fill-indigo-800"
            btnStyle="hover:bg-indigo-300 bg-indigo-200 text-indigo-800"
          />
          <Feature
            headline="Wikis"
            desc="Centralize your knowledge. No more hunting for answers."
            iconBg="bg-yellow-200"
            iconColor="fill-yellow-800"
            btnStyle="hover:bg-yellow-300 bg-yellow-200 text-yellow-800"
          />
          <Feature
            headline="Projects"
            desc="Manage complex projects without the chaos."
            iconBg="bg-blue-200"
            iconColor="fill-blue-800"
            btnStyle="hover:bg-blue-300 bg-blue-200 text-blue-800"
          />
          <Feature
            headline="Docs"
            desc="Simple, powerful, beautiful. Next-gen notes & docs."
            iconBg="bg-red-200"
            iconColor="fill-red-800"
            btnStyle="hover:bg-red-300 bg-red-200 text-red-800"
          />
        </div>
      </div>
    </section>
  );
}

export default LandingPage;
