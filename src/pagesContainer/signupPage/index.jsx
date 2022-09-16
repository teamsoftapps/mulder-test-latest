import { Button, FormControlLabel } from "@material-ui/core";
import Checkbox from "@mui/material/Checkbox";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/musicReducer";
import api from "./../../../services/api";
import styles from "./Signup.module.css";

const postSelector = (state) => state.music;

const SignupPage = () => {
  console.log("Auth SignupPage >>>>>>>>");

  const { language } = useSelector(postSelector, shallowEqual);

  const router = useRouter();

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checkBox, setCheckBox] = useState(false);

  // console.log({ email, accessCode });
  // console.log(router.query.email ? router.query.email : "", router.query.access_code ? router.query.access_code : "");

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const payload = { email, password };

      // console.log("payload >>>>>>>>>", payload);

      const { data } = await api.post("/signup", payload);

      // console.log("data >>>>>>>>", data);

      if (data) {
        if (typeof window !== "undefined") {
          // Perform localStorage action
          localStorage.setItem("music-app-credentials", JSON.stringify(data));

          localStorage.setItem("type", "signup");
        }

        dispatch(setUser(data));

        setLoading(false);

        router.push("/auth/success");
      }
    } catch (err) {
      setLoading(false);
      // console.error(
      //   "err.response.data.message >>>>>>>>>>",
      //   err.response.data.message
      // );
      setError(err.response.data.message);

      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const codePromiseText =
    language.title === "nl"
      ? "Ik ben de exclusieve gebruiker van deze account en beloof de muziek niet te delen met derden."
      : "I promise this account will only be used by me, and not to share any of the content with others.";

  return (
    <form onSubmit={handleSubmit} className={styles.auth}>
      <Head>
        <title>
          Mulder Music Streaming |{" "}
          {language.title === "nl" ? "Maak uw account aan" : "Sign Up"}
        </title>
      </Head>

      <h1>{language.title === "nl" ? "Maak uw account aan" : "Sign Up"}</h1>

      {loading && <h3>Loading..</h3>}
      {error && <h3 style={{ color: "red" }}>{error}</h3>}

      <div className={styles.input}>
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          placeholder={
            language.title === "nl" ? "Uw emailadres" : "Your Email Address"
          }
        />
      </div>

      {/* Email */}
      {/* Disable conditions on the basis of /signup and /signup?uduiwe */}

      <div className={styles.input}>
        <label>{language.title === "nl" ? "Wachtwoord" : "Password"}</label>
        <input
          value={password}
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
          minLength={6}
          maxLength={36}
          placeholder={language.title === "nl" ? "Wachtwoord" : "Your Password"}
        />
      </div>

      <br />

      <FormControlLabel
        style={{ display: "block" }}
        control={
          <Checkbox
            color="default"
            value={checkBox}
            onClick={() => setCheckBox(!checkBox)}
          />
        }
        label={codePromiseText}
      />

      <Button type="submit" variant="contained">
        {language.title === "nl" ? "Maak uw account aan" : "Sign Up"}
      </Button>

      <br />

      <p>
        <span onClick={() => router.push("/auth/login")}>
          {language.title === "nl"
            ? "Heb je al een account? Nu inloggen"
            : "Already have an account? Now Login"}
        </span>
      </p>
      <br />
      {language.title === "nl" ? (
        <a target="_blank" href="https://janmulder.us/store/?album=Streaming">
          Door u aan te melden gaat u akkoord met onze terms & conditions.
        </a>
      ) : (
        <a target="_blank" href="https://janmulder.us/store/?album=Streaming">
          By Signing up, you are agree to follow our{" "}
          <span>Terms & conditions.</span>
        </a>
      )}
    </form>
  );
};

export default SignupPage;

// Sign up form: add the following checkbox (below Access Code field) that is required in order to register:
// I promise this account will only be used by me, and not to share any of the content with others.
// Dutch translation: Ik ben de exclusieve gebruiker van deze account en beloof de muziek niet te delen met derden.
// 4) Sign up form: Please link the Terms & Conditions (both English & Dutch

// I thought to already provide the Dutch translation for the text labels in the Sign up and Login screens. I hope the following format is OK (first the English, then the Dutch equivalent)
// "Sign Up", "Maak uw account aan"
// "Email", "Email"
// "Your email address", "Uw emailadres"
// "Password", "Wachtwoord"
// "Access Code", "Toegangscode"
// "Already have an account", "Heeft u al een account?" Inloggen."
// "By signing up, you are agree to follow our Terms and Conditions.", "Door u aan te melden gaat u akkoord met onze terms & conditions."
// "Login", "Inloggen"
// "Create your account", "Account aanmaken"
