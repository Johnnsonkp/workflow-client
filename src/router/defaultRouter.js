import About from "../pages/About.jsx";
import App from "../App.jsx";
import Landing from "../pages/Landing.jsx";
import PageBoilerPlate from "../components/boilerplate/Boilerplate.jsx";
import PersonalLanding from "../pages/PersonalLanding.jsx";
import UserXP from "../pages/UserXP.jsx";
import WorkLanding from "../pages/WorkLanding.jsx";
import { createBrowserRouter } from "react-router-dom";

const defaultRouter = [
    {
      path: "/",
      element: <Landing />
    },
    {
      path: "/app",
      element: <PageBoilerPlate component={<App />} />
    },
    {
      path: "/work",
      element: <PageBoilerPlate component={<WorkLanding />} />
    },
    {
      path: "/userxp",
      element: <PageBoilerPlate component={<UserXP />} />
    },
    {
      path: "/about",
      element:  <About/>
    },
    {
      path: "/personal",
      element: <PageBoilerPlate component={<PersonalLanding />} />
    }
];

export default defaultRouter