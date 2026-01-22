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
import * as auth from "../../utils/auth.js";
import * as api from "../../utils/api.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";

function App() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
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

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      return;
    }

    auth
      .checkTokenValidity()
      .then((res) => {
        setUserData(res);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        setIsLoggedIn(false);
        console.error(error);
      });
  }, []);

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

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleEscape = (evt) => {
    if (evt.key === "Escape") {
      closeActiveModal();
    }
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

  const handleCardLike = ({ itemId, isLiked }) => {
    const token = localStorage.getItem("jwt");
    !isLiked
      ? api
          .addCardLike({ itemId, isLiked, token })
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === itemId ? updatedCard : item)),
            );
          })
          .catch((err) => console.log(err))
      : api
          .removeCardLike({ itemId, isLiked, token })
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === itemId ? updatedCard : item)),
            );
          })
          .catch((err) => console.log(err));
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

  const openRegistrationModal = () => {
    setActiveModal("register");
  };

  const handleRegistration = ({ email, password, name, avatar }) => {
    auth
      .register(email, password, name, avatar)
      .then(() => {
        closeActiveModal();
        handleSignIn({ email, password });
      })
      .catch((error) => {
        console.error(error);
        return;
      });
  };

  const openSignInModal = () => {
    setActiveModal("signin");
  };

  const handleSignIn = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    auth
      .login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        auth.checkTokenValidity().then((res) => {
          setUserData(res);
          setIsLoggedIn(true);
          console.log("You've been signed in");
          navigate("/profile");
          closeActiveModal();
        });
      })
      .catch(console.error);
  };

  const signOut = () => {
    console.log("You've been signed out");
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setUserData(null);
    navigate("/");
    setUserData("");
  };

  const openEditProfileModal = () => {
    setActiveModal("edit-profile");
  };

  const handleEditProfile = ({ name, avatar, token }) => {
    console.log("editing profile imminent");
    auth
      .updateUserProfile(userData._id, userData.email, name, avatar, token)
      .then((res) => {
        console.log(res);
        setUserData({ ...userData, name, avatar, token });
        closeActiveModal();
      })
      .catch(() => {
        console.error();
      });
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
              error,
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
          },
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
    <CurrentUserContext.Provider value={userData}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              openRegistrationModal={openRegistrationModal}
              openSignInModal={openSignInModal}
            />
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
                    handleCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      userData={userData}
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onAddClick={handleAddClick}
                      handleCardLike={handleCardLike}
                      handleEditProfile={handleEditProfile}
                      openEditProfileModal={openEditProfileModal}
                      signOut={signOut}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
          <RegisterModal
            activeModal={activeModal}
            handleRegistration={handleRegistration}
            onClose={closeActiveModal}
            isOpen={activeModal === "register"}
          />
          <LoginModal
            activeModal={activeModal}
            handleSignIn={handleSignIn}
            onClose={closeActiveModal}
            isOpen={activeModal === "signin"}
          />
          <EditProfileModal
            activeModal={activeModal}
            onClose={closeActiveModal}
            isOpen={activeModal === "edit-profile"}
            handleEditProfile={handleEditProfile}
          />
          <AddItemModal
            activeModal={activeModal}
            onClose={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItem={onAddItem}
          />
          <ItemModal
            isLoggedIn={isLoggedIn}
            activeModal={activeModal}
            card={selectedCard}
            onCardLike={handleCardLike}
            onClose={closeActiveModal}
            isOpen={activeModal === "preview"}
            onDelete={deleteItemHandler}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
