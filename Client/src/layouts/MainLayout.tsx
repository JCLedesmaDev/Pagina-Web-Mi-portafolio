import { Outlet, useNavigation } from "react-router-dom"
import css from './MainLayout.module.css'
import { NavLink } from 'react-router-dom'
import { ui } from '@/libraries/index.libraries';

import image from '@/assets/rocket-page-logo.png'
import Project from '@/assets/project.png'
import Skills from '@/assets/skills.jpg'
import AboutMe from '@/assets/AboutMe.png'
import Report from '@/assets/Report.png';
import { useState } from 'react';
import { MenuSVG } from '@/assets/MenuSVG';

export const MainLayout: React.FC = () => {

    const storeUi = ui.useStoreUi()
    //const navigation = useNavigation()
    const [toggle, setToggle] = useState(true)

    return (
        <main className={`${css.mainContainer} ${toggle ? css.mainContainerSidebarNone : ''}`}>

            <div className={css.headerGridContainer}>
                <div className={css.headerContainer__title}>
                    <button onClick={() => setToggle((preVal) => !preVal)}>
                        <MenuSVG />
                    </button>
                    <p> {storeUi.state.titleView}</p>
                </div>

                <a>Cerrar Sesion</a>
            </div>

            <div className={`${css.sidebarGridContainer} ${toggle ? css.sidebarGridContainerNone : ''}`}>
                <div className={css.sidebarContainer__header}>
                    <NavLink to="/"><img src={image} /></NavLink>
                </div>

                <div className={`${css.sidebarContainer__content}`}>
                    <NavLink to="#" className={({ isActive }) => isActive ? css.isActive : undefined}>
                        <img src={AboutMe} />
                        Mi descripcion
                    </NavLink>

                    <NavLink to="/mySkills" className={({ isActive }) => isActive ? css.isActive : undefined}>
                        <img src={Skills} />
                        Mis habilidades
                    </NavLink>

                    <NavLink to="/project" className={({ isActive }) => isActive ? css.isActive : undefined}>
                        <img src={Project} />
                        Mis proyectos
                    </NavLink>

                    <NavLink to="/loggerDb" className={({ isActive }) => isActive ? css.isActive : undefined}>
                        <img src={Report} />
                        Reportes LoggerDB
                    </NavLink>
                </div>
            </div>

            <div className={css.contentGridContainer}>
                {/* Gracais al Outlet aqui se plasmaran todos los childrens de router/index.tsx */}
                <Outlet />
            </div>
        </main >
    )
}

