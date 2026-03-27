import "./App.css";
import Container from "@mui/material/Container";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "moment/dist/locale/ar";
import { useTranslation } from "react-i18next";
moment.locale("ar");
let cancelAxios = null;
function App() {
  const { t, i18n } = useTranslation();
  const [dateTime, setDateTime] = useState("");
  const [countryName, setCountryName] = useState(
    localStorage.getItem("countryName") || "Egypt",
  );
  const [latLon, setLatLon] = useState(
    JSON.parse(localStorage.getItem("latLon")) || {
      lat: "30.0444",
      lon: "31.2357",
    },
  );
  const [temp, setTemp] = useState({
    temp: null,
    description: "",
    min: null,
    max: null,
    icon: "",
  });
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latLon.lat}&lon=${latLon.lon}&appid=8cf8bc6a09239964624a1360de7ae4c0`,
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        },
      )
      .then((res) => {
        setTemp({
          ...temp,
          temp: Math.round(res.data.main.temp - 272.15),
          description: res.data.weather[0].description,
          min: Math.round(res.data.main.temp_min - 272.15),
          max: Math.round(res.data.main.temp_max - 272.15),
          icon: res.data.weather[0].icon,
        });
      })
      .catch((error) => console.log(error));
    return () => {
      cancelAxios();
    };
  }, [latLon]);
  const [locale, setLocale] = useState(localStorage.getItem("language"));
  useEffect(() => {
    setDateTime(
      localStorage.getItem("dateTime") ||
        moment().format("MMMM Do YYYY, h:mm:ss a"),
    );
    i18n.changeLanguage(locale);
    if (localStorage.getItem("bodyClass") == "arabic") {
      document.body.classList.remove("english");
      document.body.classList.add("arabic");
    } else {
      document.body.classList.remove("arabic");
      document.body.classList.add("english");
    }
  }, []);
  function handleLanguageClick() {
    if (locale == "en") {
      setLocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
      localStorage.setItem("bodyClass", "arabic");
      localStorage.setItem("language", "ar");
    } else {
      setLocale("en");
      i18n.changeLanguage("en");
      moment.locale("en");
      localStorage.setItem("bodyClass", "english");
      localStorage.setItem("language", "en");
    }
    setDateTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
    localStorage.setItem(
      "dateTime",
      moment().format("MMMM Do YYYY, h:mm:ss a"),
    );
  }
  function handleEgyptClick() {
    setCountryName("Egypt");
    setLatLon({
      ...latLon,
      lat: "30.0444",
      lon: "31.2357",
    });
    localStorage.setItem("countryName", "Egypt");
    localStorage.setItem(
      "latLon",
      JSON.stringify({
        ...latLon,
        lat: "30.0444",
        lon: "31.2357",
      }),
    );
  }
  function handleAlexandriaClick() {
    setCountryName("Alexandria");
    setLatLon({
      ...latLon,
      lat: "31.11",
      lon: "29.52",
    });
    localStorage.setItem("countryName", "Alexandria");
    localStorage.setItem(
      "latLon",
      JSON.stringify({
        ...latLon,
        lat: "31.11",
        lon: "29.52",
      }),
    );
  }
  function handleQenaClick() {
    setCountryName("Qena");
    setLatLon({
      ...latLon,
      lat: "26.1551",
      lon: "32.7160",
    });
    localStorage.setItem("countryName", "Qena");
    localStorage.setItem(
      "latLon",
      JSON.stringify({
        ...latLon,
        lat: "26.1551",
        lon: "32.7160",
      }),
    );
  }
  function handleNagHammadiClick() {
    setCountryName("Nag Hammadi");
    setLatLon({
      ...latLon,
      lat: "26.0452",
      lon: "32.2428",
    });
    localStorage.setItem("countryName", "Nag Hammadi");
    localStorage.setItem(
      "latLon",
      JSON.stringify({
        ...latLon,
        lat: "26.0452",
        lon: "32.2428",
      }),
    );
  }
  return (
    <>
      <Container maxWidth="sm">
        {/* Card */}
        <div className="card" dir={locale == "en" ? "ltr" : "rtl"}>
          <div className="countries">
            <Button
              variant="text"
              sx={{ color: "#fff" }}
              onClick={handleEgyptClick}
            >
              {t("Egypt")}
            </Button>
            <Button
              variant="text"
              sx={{ color: "#fff" }}
              onClick={handleAlexandriaClick}
            >
              {t("Alexandria")}
            </Button>
            <Button
              variant="text"
              sx={{ color: "#fff" }}
              onClick={handleQenaClick}
            >
              {t("Qena")}
            </Button>
            <Button
              variant="text"
              sx={{ color: "#fff" }}
              onClick={handleNagHammadiClick}
            >
              {t("Nag Hammadi")}
            </Button>
          </div>
          <div className="top">
            <h2 className="country">{t(countryName)}</h2>
            <span>{dateTime}</span>
          </div>
          <hr></hr>
          <div className="bottom">
            <div>
              <div className="degree">
                <h2>{temp.temp}</h2>
                <img
                  src={`https://openweathermap.org/img/wn/${temp.icon}@2x.png`}
                />
              </div>
              <h3>{t(temp.description)}</h3>
              <h4>
                {t("min")} : {temp.min} | {t("max")} : {temp.max}
              </h4>
            </div>
            <div>
              <CloudIcon style={{ fontSize: "150px" }} />
            </div>
          </div>
          <Button
            className="language-btn"
            variant="text"
            sx={{
              right: locale == "en" ? "-10px !important" : "",
              color: "#fff",
            }}
            onClick={handleLanguageClick}
          >
            {locale == "en" ? "Arabic" : "انجليزي"}
          </Button>
        </div>
      </Container>
    </>
  );
}

export default App;
