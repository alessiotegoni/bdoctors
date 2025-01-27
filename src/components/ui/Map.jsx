import { APIProvider, Map } from "@vis.gl/react-google-maps";

export default function GoogleMap() {
  const API_KEY = "AIzaSyDjIKHhyn9C39sPsPKf04y8ZqvAEcStaiI";

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        defaultZoom={13}
        defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
      ></Map>
    </APIProvider>
  );
}
