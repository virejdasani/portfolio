import React, { useState, useEffect } from 'react';
import Hero from './Hero/Hero';
import About from './About/About';
import Projects from './Projects/Projects';
import Contact from './Contact/Contact';
import Footer from './Footer/Footer';
import Head from './Head/Head';
import { listRepos } from "../api/repos";

import { PortfolioProvider } from '../context/context';

import { heroData, aboutData, projectsData, contactData, footerData } from '../mock/data';


function App() {
  const [hero, setHero] = useState({});
  const [about, setAbout] = useState({});
  const [projects, setProjects] = useState([]);
  const [contact, setContact] = useState({});
  const [footer, setFooter] = useState({});
  const [repos, setRepos] = useState([]);


  useEffect(() => {
    setHero({ ...heroData });
    setAbout({ ...aboutData });
    setProjects([...projectsData]);
    setContact({ ...contactData });
    setFooter({ ...footerData });
  }, []);

  useEffect(async ()=>{
    const reps = await listRepos();
    const filterRepos = reps.filter((rep) => !rep.fork && rep.homepage && rep.name !== 'codersrank-practice')
    setRepos(filterRepos);
  }, [])


  return (
    <PortfolioProvider value={{ hero, about, projects, contact, footer, repos }}>
      <Head />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </PortfolioProvider>
  );
}

export default App;
