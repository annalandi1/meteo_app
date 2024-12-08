import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState  } from "react";
import { Container, Row, Col } from "react-bootstrap";
import MySearch from "./MySearch";


function MyMain() {
  const [query, setQuery] = useState(""); // Valore del campo di ricerca
  const [weatherData, setWeatherData] = useState(null); // Dati meteo
  const [loading, setLoading] = useState(false); // Stato di caricamento
  const [error, setError] = useState(null); // Messaggio di errore

  const apiKey = "85b26cbd41b1ce95c09a8c38da4e7f0c";

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

  return (
    <Container >
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={8} >
          <MySearch
            query={query}
            onSearchChange={handleSearchChange}
            onSearchClick={handleSearchClick}
          />
        </Col>
      </Row>
      <Row className="mainCss" >
        <Col>
          {loading && <h1>Caricamento in corso...</h1>}
          {error && <h1 className="text-danger">Errore: {error}</h1>}
          {weatherData && (
            <div>
              <h2>Meteo per {weatherData.name}</h2>
              <p>Temperatura: {weatherData.main.temp}°C</p>
              <p>Condizioni: {weatherData.weather[0].description}</p>
              <p>Umidità: {weatherData.main.humidity}%</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default MyMain;
