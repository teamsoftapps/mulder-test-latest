import { Button } from "@material-ui/core";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import api from "./../../../services/api";
import classes from "./ResetPassword.module.css";
import ClipLoader from "react-spinners/ClipLoader";

const postSelector = (state) => state.music;

const ResetPassword = () => {
  console.log("ResetPassword >>>>>>>>");

  const { language } = useSelector(postSelector, shallowEqual);

  const router = useRouter();
  const dispatch = useDispatch();

  const [accessCode, setAccessCode] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // console.log({ email, accessCode });
  // console.log(router.query.email ? router.query.email : "", router.query.access_code ? router.query.access_code : "");

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const body = {
        code: accessCode,
        password,
      };

      const userID = localStorage.getItem("userID");

      let res = await api.patch(`/reset-password/${userID}`, body);
      if (res) {
        console.log("reset password>>>>>>>>>>>>>", res);

        localStorage.removeItem("userID");
        setLoading(false);
        router.push("/auth/login");
      }
    } catch (error) {
      console.error("error >>>>>>", error);
      setError(error);
    }

    // const payload = { email, password, code: accessCode };

    // const url = `${process.env.base_url}/updatePassword`;

    // try {
    //   const { data } = await axios.post(url, payload);

    //   console.log(data);

    //   setLoading(false);

    //   localStorage.setItem("music-app-credentials", JSON.stringify(data));
    //   dispatch(setUser(data));

    // } catch (err) {
    //   setLoading(false);
    //   console.log({ err });
    //   setError(err?.response?.data);

    //   setTimeout(() => {
    //     setError("");
    //   }, 3000);
    // }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.auth}>
      <Head>
        <title>Mulder Music Streaming | </title>
      </Head>

      <h1>
        {language.title === "nl"
          ? "Wachtwoord opnieuw instellen"
          : "Reset Password"}
      </h1>

      {loading && <h3>Loading..</h3>}

      {error && <h3 style={{ color: "red" }}>{error}</h3>}

      <div className={classes.input}>
        <label htmlFor="">
          {language.title === "nl" ? "Wachtwoord" : "Password"}
        </label>
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          required
          minLength={6}
          maxLength={36}
          placeholder={
            language.title === "nl" ? "Nieuw Wachtwoord" : "Your New Password"
          }
        />
      </div>
      <div className={classes.input}>
        <label htmlFor="">
          {language.title === "nl" ? "Toegangscode" : "Access Code"}
        </label>
        <input
          // disabled={!isSignIn ? true : false}
          type="text"
          onChange={(e) => {
            setAccessCode(e.target.value);
          }}
          value={accessCode}
          required
          minLength={7}
          maxLength={10}
          placeholder={language.title === "nl" ? "Toegangscode" : "Access Code"}
        />
      </div>
      <Button type="submit" variant="contained">
        {language.title === "nl" ? "Indienen" : "Submit"}
        <div
          style={{
            position: "fixed",
            top: "50%",
            right: "44vw",
            left: "44vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
          }}
        >
          <ClipLoader color="red" loading={loading} size={"10vw"} />
        </div>
      </Button>
      <div
        style={{
          position: "fixed",
          top: "50%",
          right: "44vw",
          left: "44vw",

          // left: 0,
          // width: "100%",
          // height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 100,
        }}
      >
        <ClipLoader color="red" loading={loading} size={"10vw"} />
      </div>
      <br />
    </form>
  );
};

export default ResetPassword;
