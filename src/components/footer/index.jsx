import { Button } from "@material-ui/core";
import Image from "next/image";
import { useRouter } from "next/router";
import { default as React, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  setLanguageMode,
  setSong,
  setSongs,
  setUser,
} from "./../../store/musicReducer";
import classes from "./Footer.module.css";

const postSelector = (state) => state.music;

const languages = [
  {
    title: "nl",
    src: "nl-2.jpg",
  },
  {
    title: "eng",
    src: "usa-2.jpg",
  },
];

const Footer = () => {
  const router = useRouter();

  const { user, language } = useSelector(postSelector, shallowEqual);

  const dispatch = useDispatch();

  function handleLogout() {
    if (typeof window !== "undefined") {
      // Perform localStorage action
      localStorage.removeItem("songArray");
      localStorage.removeItem("Expiring-Days-Api");
      localStorage.removeItem("subscriptionSongDetails");
      localStorage.removeItem("music-app-credentials");
    }

    dispatch(setSong({}));
    dispatch(setSongs([]));
    dispatch(setUser(null));

    localStorage.clear()
    router.push(`/login`);
  }

  function handleLanguage(lan) {
    const { route } = router;
    router.push(`${route}?lang=${lan.title}`);
    dispatch(setLanguageMode(lan));
  }

  function handleHistory() {
    router.push(`/api/history/${user.email}`);
  }

  useEffect(() => {
    try {
      let len = router.pathname.length + 1;
      let query = router.asPath.slice(len).split("&");
      let subQuery = [];
      for (let i in query) {
        subQuery.push(query[i].split("="));
      }
      let lang = findParam("lang", subQuery);
      if (lang !== "") {
        if (lang === languages[0].title) {
          handleLanguage(languages[0]);
        } else if (lang === languages[1].title) {
          handleLanguage(languages[1]);
        }
      }
    } catch (e) {
      // console.log(e, "- Footer");
      console.error(e);
    }
  }, []);

  const findParam = (name, array) => {
    for (let i in array) {
      if (array[i][0] === name) {
        return array[i][1];
      }
    }
    return "";
  };

  return (
    <footer className={classes.footer}>
      <div className={classes.footerTop}>
        <Image priority src="/images/logo.svg" alt="" width={200} height={50} />
        <p>
          {language.title === "nl" ? "Auteursrechten" : "Copyright"} &copy; 1992
          - {new Date().getFullYear()}{" "}
          {language.title === "nl" ? "Miller Muziek" : "Miller Music"}
        </p>
        <nav className={classes.menu}>
          <ol className={classes.languageWrapper}>
            {languages.map((lan, index) => (
              <li
                key={index}
                className={`${classes.menuItem} ${language.title === lan.title ? classes.activeLanguage : ""
                  }`}
                onClick={() => handleLanguage(lan)}
              >
                <Image
                  priority
                  alt=""
                  src={`/images/${lan.src}`}
                  width={50}
                  height={33}
                />
              </li>
            ))}
          </ol>
          {user && (
            <span className={classes.btnWrapper}>
              <Button className={classes.logoutBtn} onClick={handleLogout}>
                {language.title === "nl" ? "Uitloggen" : "Logout"}
              </Button>
              <Button className={classes.logoutBtn} onClick={handleHistory}>
                {language.title === "nl" ? "Geschiedenis" : "History"}
              </Button>
            </span>
          )}
        </nav>
      </div>
      <p className={classes.footerBottom}>
        {language.title === "nl" ? "Auteursrechten" : "Copyright"} &copy; 1992 -{" "}
        {new Date().getFullYear()}{" "}
        {language.title === "nl" ? "Miller Muziek" : "Miller Music"}
      </p>
    </footer>
  );
};

export default Footer;
