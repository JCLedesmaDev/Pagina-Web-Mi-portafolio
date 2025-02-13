/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useMyData } from "../../Hooks/useMyData";
import parse from "html-react-parser";
import AboutMeCSS from "./AboutMe.module.css";

import myPhoto from "../../data/images/img.jpg";
import loaderSVG from "../../data/images/Spin-1s-200px.svg";

import { usePaginate } from "../../Hooks/usePaginate";
import { Technologys } from "./Components/Technologys/Technologys";
import { ITechnology } from '../../Interface/IMyData';


enum Technology {
  PER_PAGE = 9
}

export const AboutMe: React.FC = () => {

  /// HOOKS

  const [technologies, setTechnologies] = useState<ITechnology[]>([]);
  const [filterActive, setFilterActive] = useState(0);
  const { aboutMe } = useMyData();
  const {
    elementsPaginate, pageCount,
    locatedPageNumber, loader,
    changePage, setLoader
  } = usePaginate(Technology.PER_PAGE, technologies)

  /// METODOS

  const getTechnologiesByArea = (skillsArea: string, index: number) => {
    setLoader(true);

    let Technologies: any[] = [];

    if (skillsArea.includes("Front")) {
      aboutMe?.front_Technologies.map((techno) => Technologies.push(techno));
    }
    if (skillsArea.includes("Back")) {
      aboutMe?.back_Technologies.map((techno) => Technologies.push(techno));
    }
    if (skillsArea.includes("Otros") || skillsArea.includes("Other")) {
      aboutMe?.other_technology.map((techno) => Technologies.push(techno));
    }
    if (skillsArea.includes("Proximamente") || skillsArea.includes("coming")) {
      aboutMe?.coming_soon.map((techno) => Technologies.push(techno));
    }

    setFilterActive(index);
    changePage({ selected: 0 })
    setTechnologies(Technologies);

    setTimeout(() => setLoader(false), 500);
  };


  const getCssFilter = (indexArea: number) => filterActive === indexArea
    ? AboutMeCSS.technologyContainer__navLinksActive : ""


  useEffect(() => getTechnologiesByArea("Front", 0), []);


  return (
    <section
      id="aboutMe"
      className={`${AboutMeCSS.aboutMeContainer} centerContainer section-space full-lg-screen`}
      data-scroll-spy
    >
      <h2 className={AboutMeCSS.aboutMeContainer__titulo}> {aboutMe?.aboutme}</h2>

      {/* Mi descripcion */}
      <article className="article-space text-center">

        <aside>
          <h1>{aboutMe?.nameCompleted}</h1>
          <h4 className="text-color-principal">{aboutMe?.rol}</h4>
        </aside>

        {aboutMe?.presentations.map((present, indexPresent) => (
          <p key={indexPresent}>{parse(`${present}`)}</p>
        ))}

        <div>
          <a href={aboutMe?.CVLink} className="button"
            target="_blank" rel="noopener noreferrer">
            {aboutMe?.downloadCV}
          </a>
        </div>

      </article>

      {/* Mi imagen perfil */}
      <article className="article-space text-center">
        <img
          src={myPhoto}
          className="scale-img avatar"
          alt="Juan Cruz Ledesma"
        />
      </article>

      {/*  Mis habilidades */}
      <article className={`${AboutMeCSS.aboutMeContainer__skills} text-center`}>

        <h2 className="sub-section-title">{aboutMe?.mySkills}</h2>

        {aboutMe?.mySkillsPresentations.map((skillsPresent, indexSkill) => (
          <p key={indexSkill}>{parse(`${skillsPresent}`)}</p>
        ))}

        <h3 className="sub-section-title">{aboutMe.technologies}</h3>

        <aside className={AboutMeCSS.technologyContainer}>

          <div className={AboutMeCSS.technologyContainer__navLinks}>

            {aboutMe?.skills_area.map((area, indexArea) => (
              <a
                key={indexArea} href={"#/"}
                className={getCssFilter(indexArea)}
                onClick={(e: any) => getTechnologiesByArea(area, indexArea)}
              >
                {area}
              </a>
            ))}

          </div>

          <div className={AboutMeCSS.technologyContainer__technologys}>
            {
              loader ? (<img src={loaderSVG} alt="loader" className="loader" />) : (
                <Technologys
                  ElementsPaginate={elementsPaginate}
                  ChangePage={changePage}
                  PageCount={pageCount}
                  LocatedPageNumber={locatedPageNumber}
                />
              )
            }
          </div>

        </aside>

      </article>

    </section>
  );
};
