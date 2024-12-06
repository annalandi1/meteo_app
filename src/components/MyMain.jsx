import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

function MyMain() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const fetchMeteoData = async () => {
    const apiKey = "85b26cbd41b1ce95c09a8c38da4e7f0c";
    const city = "Milan";

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);

      // Salva i dati nel componente
      setWeatherData(data);

    } catch (err) {
      console.error("Errore durante la fetch:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeteoData();
  }, []);

  if (loading) {
    return <h1>Caricamento in corso...</h1>;
  }

  if (error) {
    return <h1 className="text-danger">Errore nel caricamento: {error}</h1>;
  }

  return (
    <Container className="d-flex align-items-center">
      <Row>
        <Col>
          <h1>Meteo per Milano</h1>
          {weatherData && (
            <ul>
              {weatherData.list.slice(0, 5).map((item, index) => (
                <li key={index}>
                  {item.dt_txt}: {item.main.temp}°C, {item.weather[0].description}
                </li>
              ))}
            </ul>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default MyMain;
