// React Imports
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

// Components
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";

// Utils, Constants, etc.
import { coordinates, apiKey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { getItems, addItem, removeItem } from "../../utils/api.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";

function App() {
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
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  onAddClick={handleAddClick}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <RegisterModal
          activeModal={activeModal}
          onClose={closeActiveModal}
          isOpen={activeModal === "register"}
        />
        <LoginModal
          activeModal={activeModal}
          onClose={closeActiveModal}
          isOpen={activeModal === "login"}
        />
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
