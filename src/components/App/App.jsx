// React Imports
import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

// Components
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";

// Utils, Constants, etc.
import { coordinates, apiKey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { getItems, addItem, removeItem } from "../../utils/api.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

function App() {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [weatherData, setWeatherData] = useState({
    city: "Loading...",
    temp: { F: 999, C: 999 },
    type: "default",
    condition: "clear",
    isDay: true,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const onAddItem = (inputValues) => {
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weatherType,
    };
    addItem(newCardData)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const deleteItemHandler = (data) => {
    const filteredArray = clothingItems.filter((item) => {
      return item._id !== data._id;
    });
    removeItem(data._id)
      .then(() => {
        setClothingItems(filteredArray);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleEscape = (evt) => {
    if (evt.key === "Escape") {
      closeActiveModal();
    }
  };

  const navigate = useNavigate();

  const handleRegistration = ({ email, password, name, avatar }) => {
    auth
      .register(email, password, name, avatar)
      .then(() => {
        closeActiveModal();
        handleSignIn({ email, password });
      })
      .catch(console.error);
  };

  const handleSignIn = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    auth
      .login(email, password)
      .then((res) => {
        setUserData(data.user);
        setIsLoggedIn(true);
        localStorage.setItem("jwt", res.token);
        navigate("/");
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (activeModal) {
      document.addEventListener("keydown", handleEscape);
    } else {
      document.removeEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [activeModal]);

  useEffect(() => {
    function fetchWeatherWithGeo() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userCoords = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            getWeather(userCoords, apiKey)
              .then((data) => {
                const filteredData = filterWeatherData(data);
                setWeatherData(filteredData);
              })
              .catch((error) => {
                console.error("Weather API failed:", error);
                setWeatherData({
                  type: "cold",
                  temp: { F: 32, C: 0 },
                  city: "Unknown Location",
                  condition: "snow",
                  isDay: true,
                });
              });
          },
          (error) => {
            // Fallback to default coordinates if denied or error
            console.warn(
              "Geolocation error, using default coordinates:",
              error
            );
            getWeather(coordinates, apiKey)
              .then((data) => {
                const filteredData = filterWeatherData(data);
                setWeatherData(filteredData);
              })
              .catch((error) => {
                console.error("Weather API failed:", error);
                setWeatherData({
                  type: "cold",
                  temp: { F: 32, C: 0 },
                  city: "Unknown Location",
                  condition: "snow",
                  isDay: true,
                });
              });
          }
        );
      } else {
        // Geolocation not supported
        getWeather(coordinates, apiKey)
          .then((data) => {
            const filteredData = filterWeatherData(data);
            setWeatherData(filteredData);
          })
          .catch((error) => {
            console.error("Weather API failed:", error);
            setWeatherData({
              type: "cold",
              temp: { F: 32, C: 0 },
              city: "Unknown Location",
              condition: "snow",
              isDay: true,
            });
          });
      }
    }

    fetchWeatherWithGeo();

    getItems()
      .then((data) => {
        const reversedData = data.reverse();
        setClothingItems(reversedData);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="*"
              element={
                isLoggedIn ? (
                  <Navigate to="/profile" replace />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    userData={userData} // need to set up the header to toggle display of name/log in
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onAddClick={handleAddClick}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <RegisterModal
                  activeModal={activeModal}
                  handleRegistration={handleRegistration}
                  onClose={closeActiveModal}
                  isOpen={activeModal === "register"}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <LoginModal
                  activeModal={activeModal}
                  handleSignIn={handleSignIn}
                  onClose={closeActiveModal}
                  isOpen={activeModal === "signin"}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          activeModal={activeModal}
          onClose={closeActiveModal}
          isOpen={activeModal === "add-garment"}
          onAddItem={onAddItem}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          isOpen={activeModal === "preview"}
          onDelete={deleteItemHandler}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
