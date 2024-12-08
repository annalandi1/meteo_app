import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import MySearch from "./MySearch";
import MyNav from './MyHeader';

function MyMain() {
  const [query, setQuery] = useState(""); // Campo di ricerca
  const [weatherData, setWeatherData] = useState(null); // Dati meteo
  const [loading, setLoading] = useState(false); // Stato di caricamento
  const [error, setError] = useState(null); // Stato errore
  const [favorites, setFavorites] = useState([]); // Località preferite
  const [view, setView] = useState("search"); // Gestione della vista: 'search' o 'favorites'

  const apiKey = "85b26cbd41b1ce95c09a8c38da4e7f0c";

  // Carica i preferiti dal localStorage quando il componente viene montato
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  // Salva i preferiti nel localStorage
  const saveFavoritesToStorage = (favoritesList) => {
    localStorage.setItem("favorites", JSON.stringify(favoritesList));
  };

  // Funzione per recuperare i dati meteo
  const fetchMeteoData = (city) => {
    setLoading(true);
    setError(null);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Errore HTTP: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Gestione del cambiamento del campo di ricerca
  const handleSearchChange = (newQuery) => {
    setQuery(newQuery);
  };

  // Gestione del click sul pulsante di ricerca
  const handleSearchClick = () => {
    if (query.trim() !== "") {
      fetchMeteoData(query);
    }
  };

  // Funzione per aggiungere o rimuovere una città dai preferiti
  const toggleFavorite = (city) => {
    const updatedFavorites = [...favorites];
    const index = updatedFavorites.indexOf(city);

    if (index === -1) {
      updatedFavorites.push(city); // Aggiungi ai preferiti
    } else {
      updatedFavorites.splice(index, 1); // Rimuovi dai preferiti
    }

    setFavorites(updatedFavorites);
    saveFavoritesToStorage(updatedFavorites);
  };

  // Funzione per cambiare la vista tra ricerca e preferiti
  const handleViewChange = (viewName) => {
    setView(viewName);
  };

  return (
    <Container fluid style={{ background: '#f0f8ff', minHeight: '100vh', padding: '20px' }}>
      <MyNav onViewChange={handleViewChange} />
      {view === "search" && (
        <>
          <Row className="justify-content-center mt-5">
            <Col xs={12} md={8}>
              <MySearch
                query={query}
                onSearchChange={handleSearchChange}
                onSearchClick={handleSearchClick}
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col style={{ margin: "30px", paddingTop: "20px", background: "#add8e6", borderRadius: "20px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
              {loading && <h1 style={{ textAlign: 'center' }}>Caricamento in corso...</h1>}
              {error && <h1 className="text-danger" style={{ textAlign: 'center' }}>Errore: {error}</h1>}
              {weatherData && (
                <div style={{ textAlign: 'center' }}>
                  <h2 style={{ color: '#2e8b57' }}>Meteo per {weatherData.name}</h2>
                  <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Temperatura: {weatherData.main.temp}°C</p>
                  <p>Condizioni: {weatherData.weather[0].description}</p>
                  <p>Umidità: {weatherData.main.humidity}%</p>
                  <Button
                    variant={favorites.includes(weatherData.name) ? "danger" : "primary"}
                    onClick={() => toggleFavorite(weatherData.name)}
                  >
                    {favorites.includes(weatherData.name) ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
                  </Button>
                </div>
              )}
            </Col>
          </Row>
        </>
      )}
      {view === "favorites" && (
        <>
          <Row className="mt-3">
            <Col>
              <h3>Località Preferite</h3>
              {favorites.length > 0 ? (
                <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
                  {favorites.map((favorite, index) => (
                    <li key={index} style={{ fontSize: '18px', marginBottom: '10px' }}>
                      {favorite}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Nessuna località preferita.</p>
              )}
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default MyMain;
