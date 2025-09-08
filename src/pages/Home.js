import { lazy, useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import * as Scroll from 'react-scroll';
import Tesauro from "./Tesauro";
import ReactGA from "react-ga4";

const scroll = Scroll.animateScroll;

const AutoSectionSelect = lazy(() => import("./AutoSectionSelect"));
const Explora = lazy(() =>
  import("../sim-ui/organisms/bloqueBusqueda/Explora"),
);
const GestorNarrativasIntro = lazy(() => import("./GestorNarrativasIntro"));
const GestorNarrativas = lazy(() => import("./GestorNarrativas"));
const Intro = lazy(() => import("./Intro"));
const Colecciones = lazy(() => import("./Colecciones"));
const Crea = lazy(() => import("./Crea"));
const Fondos = lazy(() => import("./Fondos"))
const HomeDiccionario = lazy(() => import("./dictionary/HomeDiccionario"));
const DiccionarioTerminos = lazy(() => import("./dictionary/TermsDiccionario"));
const DiccionarioBusqueda = lazy(() =>
  import("./dictionary/BusquedaDiccionario"),
);
const TermDiccionario = lazy(() => import("./dictionary/TermDiccionario"));
const CardDiccionario = lazy(() => import("./dictionary/CardDiccionario"));
const FieldDiccionario = lazy(() => import("./dictionary/FieldDiccionario"));
// const Conoce = lazy(() => import("./Conoce"));
const Coleccion = lazy(() => import("./Coleccion"));
const LabVerdad = lazy(() => import("./LabVerdad"));
const MiBiblioteca = lazy(() => import("./MiBiblioteca"));
const Detalle = lazy(() => import("./Detalle"));
const ComoNavegar = lazy(()=>import("./ComoNavegar"))
const ComoNavegarInteractivo = lazy(()=>import("./ComoNavegarInteractivo"))
const ViewMicrosite = lazy(() => import("../sim-ui/organisms/ViewMicrosite"));

function getSection(location) {
  const stringSplited = location.split("/");
  const section = stringSplited[1];
  return section;
}


function scrollToTop() {
  scroll.scrollToTop();
};

const MuseoHome = (props) => {
  const location = useLocation();
  const section = getSection(location.pathname);
  const col_explora = {
    main: "#f45353",
    dark: "#e02020",
  };

  const col_conoce = {
    main: "#13c0c8",
    dark: "#019592",
  };

  const col_crea = {
    main: "#ffc258",
    dark: "#e07714",
  };

  let section_col = {
    main: "#2a5080",
    dark: "#19447c",
  };

  switch (section) {
    case "crea":
      section_col = col_crea;
      break;

    case "conoce":
      section_col = col_conoce;
      break;

    case "explora":
      section_col = col_explora;
      break;
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: "#6E3092",
        dark: "#19447c",
        gray: "#fafafa",
        light: "#65A3F2",
      },
      // secondary: section_col,
      secondary: {
        main: "#6E3092",
        dark: "#19447c",
        gray: "#fafafa",
        light: "#ffffff",
      },
      neutral: {
        main: "#ffffff",
        dark: "#19447c",
        gray: "#fafafa",
        light: "#ffffff",
      },
      all: {
        main: "#6E3092",
        conoce: "#13c0c8",
        explora: "#f45353",
        crea: "#ffc258",
      },
    },
    typography: {
      fontFamily: "'Obliqua ITC Std', sans-serif",
      fontSize: 16,
    },
    clasePrueba: {
      backgroundColor: "black",
    },
  });

  useEffect(() => {

    // if(process.env.REACT_APP_ENV === 'PROD') {
    //   ReactGA.initialize("G-06H3P1YKK4")
    //   ReactGA.send({ hitType: "pageview", page: location.pathname })
    // }

  }, []);

  return (
    <>
      <AutoSectionSelect location={location.pathname} />
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/explora/buscador" element={<Explora />} />
          {/* <Route path="/diccionario" element={<HomeDiccionario />}>
            <Route
              path="/diccionario/terminos/:id"
              element={<DiccionarioTerminos />}
            />
            <Route
              path="/diccionario/campos/:id"
              element={<DiccionarioTerminos />}
            />
            <Route
              path="/diccionario/termino/:like/:id"
              element={<TermDiccionario />}
            />
            <Route
              path="/diccionario/campo/:like/:id"
              element={<FieldDiccionario />}
            />
            <Route
              path="/diccionario/card/:like/:id"
              element={<CardDiccionario />}
            />
            <Route
              path="/diccionario/busqueda/:id"
              element={<DiccionarioBusqueda />}
            />
          </Route> */}
          <Route path="/" element={<Intro />} />
          <Route path="/colecciones" element={<Colecciones />} />
          
          {/* <Route path="/conoce" element={<Conoce />}></Route> */}
          <Route path="/:id" element={<Coleccion />}></Route>
          

        </Routes>
        {/* <IconButton color="primary" variant="outlined" class="toTop" onClick={scrollToTop} aria-label="up" size="large">
          <ArrowUpwardIcon />
        </IconButton> */}
      </ThemeProvider>
    </>
  );
};

export default MuseoHome;
