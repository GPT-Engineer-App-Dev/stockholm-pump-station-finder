import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Container, Text, VStack, Spinner } from "@chakra-ui/react";
import { FaBicycle } from "react-icons/fa";

// Custom icon for bike pump stations
const bikePumpIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/194/194927.png", // Placeholder icon URL
  iconSize: [25, 25],
  iconAnchor: [12, 25],
  popupAnchor: [0, -25],
});

const Index = () => {
  const [bikePumps, setBikePumps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch bike pump stations data
    fetch("https://api.example.com/bike-pumps") // Replace with actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        setBikePumps(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bike pump stations:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Bike Pump Stations in Stockholm</Text>
        {loading ? (
          <Spinner size="xl" />
        ) : (
          <MapContainer center={[59.3293, 18.0686]} zoom={12} style={{ height: "500px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {bikePumps.map((pump, index) => (
              <Marker key={index} position={[pump.latitude, pump.longitude]} icon={bikePumpIcon}>
                <Popup>
                  <Text>{pump.name}</Text>
                  <Text>{pump.address}</Text>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </VStack>
    </Container>
  );
};

export default Index;