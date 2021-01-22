import "./App.css";
import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { listLogEntries } from "./Api";
import LogEntryForm from "./LogEntryForm";
import DisplayElements from "./DisplayElements";

function Map() {
  const [logEntries, setLogEntries] = useState([]);
  const [addEntryLocation, setEntryLocation] = useState(null);
  const [showPopup, setShowPopup] = useState({});
  const [viewport, setViewport] = React.useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.6,
    longitude: -95.665,
    zoom: 2,
  });

  const getEntries = async () => {
    const LogEntries = await listLogEntries();
    setLogEntries(LogEntries.entries);
  };

  useEffect(() => {
    const ac = new AbortController();
    getEntries();
    return () => ac.abort();
  }, []);

  const showAddmarkerPopup = (event) => {
    const [longitude, latitude] = event.lngLat;
    console.log(longitude);
    console.log(latitude);
    setEntryLocation({
      longitude,
      latitude,
    });
  };

  return (
    <ReactMapGL
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      {...viewport}
      mapStyle="mapbox://styles/vishnuvardhan-reddy/ckin9aj6e0s7m18rpxvvyu9c0"
      onViewportChange={(viewport) => setViewport(viewport)}
      onDblClick={showAddmarkerPopup}
    >
      {logEntries.map((entry) => (
        <React.Fragment key={entry._id}>
          <Marker latitude={entry.lattitude} longitude={entry.longitude}>
            <div
              onClick={() =>
                setShowPopup({
                  showPopup,
                  [entry._id]: true,
                })
              }
            >
              <img
                alt="marker"
                className="marker"
                style={{
                  width: `${12 * viewport.zoom}px`,
                  height: `${12 * viewport.zoom}px`,
                }}
                src="https://i.imgur.com/y0G5YTX.png"
                alter="marker"
              />
            </div>
          </Marker>
          {showPopup[entry._id] ? (
            <>
              <Popup
                className="popup"
                latitude={entry.lattitude}
                longitude={entry.longitude}
                closeButton={true}
                closeOnClick={false}
                dynamicPosition={true}
                onClose={() => setShowPopup({ showPopup, [entry._id]: false })}
                anchor="top"
              >
                <div className="popup__content">
                  <DisplayElements
                    key={entry._id}
                    title={entry.title}
                    comment={entry.comments}
                    description={entry.description}
                    rating={entry.rating}
                    image={entry.image}
                    visitDate={entry.visitDate}
                  />
                </div>
              </Popup>
            </>
          ) : null}
        </React.Fragment>
      ))}
      {addEntryLocation ? (
        <>
          <Marker
            latitude={addEntryLocation?.latitude}
            longitude={addEntryLocation?.longitude}
          >
            <div>
              <img
                alt="marker"
                className="marker"
                style={{
                  width: `${12 * viewport.zoom}px`,
                  height: `${12 * viewport.zoom}px`,
                }}
                src="https://i.imgur.com/y0G5YTX.png"
                alter="marker"
              />
            </div>
          </Marker>
          <Popup
            latitude={addEntryLocation?.latitude}
            longitude={addEntryLocation?.longitude}
            closeButton={true}
            closeOnClick={false}
            dynamicPosition={true}
            onClose={() => setEntryLocation(null)}
            anchor="top"
          >
            <div className="popup__content">
              <LogEntryForm
                onClose={() => {
                  setEntryLocation(null);
                  getEntries();
                }}
                latitude={addEntryLocation.latitude}
                longitude={addEntryLocation.longitude}
              />
            </div>
          </Popup>
        </>
      ) : null}
    </ReactMapGL>
  );
}

export default Map;
