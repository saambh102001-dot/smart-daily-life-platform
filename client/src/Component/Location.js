import React, { useState, useEffect } from "react";

import axios from "axios";
import { Container, Card, CardBody, Spinner } from "reactstrap";


const Location = () => {

    const [ip, setip] = useState(null);
    const [geodata, setgeodata] = useState(null);
    const [exactCoords, setExactCoords] = useState(null);

   
    const fetchIpAddress  =async ()=>{
        try {

            const response = await axios.get("https://api.ipify.org?format=json");
            setip(response.data.ip);
            
        } catch (error) {
            console.error("Error fetching IP address:", error.message);
        }
    };



    const getGeoLocationData = async () => {
    if (!ip) return;
    try {
      
      const response = await axios.get(`http://ip-api.com/json/${ip}`);
      const data = {
        location: {
          country: response.data.country,
          region: response.data.regionName,
          lat: response.data.lat, 
          lng: response.data.lon  
        }
      };

      setgeodata(data);


      console.log("Latitude:", data.location.lat);
      console.log("Longitude:", data.location.lng);

    } catch (error) {
      console.error("Error fetching location data:", error.message);
    }
  };

// const getExactLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const lat = position.coords.latitude;
//           const lng = position.coords.longitude;
//           setExactCoords({ lat, lng });
          
//         console.log("Latitude (lat):", lat);
//           console.log("Longitude (lng):", lng);
     
//         },
        
//         (error) => {
//          console.log(error);
//         }
//       );
//     }
//   };

const getExactLocation = () => {
    if (navigator.geolocation) {
   
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setExactCoords({ lat, lng });
          
       
          console.log("Latitude (lat):", lat);
          console.log("Longitude (lng):", lng);
        },
        (error) => {
          console.log(error);
        },
        {
          enableHighAccuracy: true, 
          timeout: 15000,           
          maximumAge: 0             
        }
      );
    }
  };


      useEffect(() => {
    fetchIpAddress();
  }, []);

  useEffect(() => {
    if (ip) {
      getGeoLocationData();
    }
  }, [ip]);





    return (
       <Container className="d-flex justify-content-center mt-5">
 
      <div className="form-container shadow-sm p-4 text-center" style={{ width: "100%", maxWidth: "450px" }}>
        
        <h5 className="fw-bold mb-4" style={{ color: 'var(--text-dark)' }}>
           Location Information
        </h5>

        <div className="location-info-box">
        

          <hr className="my-3 opacity-25" />

    
          {geodata ? (
            <div className="geo-details py-2">
              <p className="mb-2">
                <span className="text-muted small">Country: </span>
                <span className="fw-bold">{geodata.location.country}</span>
              </p>
              <p className="mb-0">
                <span className="text-muted small">Region: </span>
                <span className="fw-bold">{geodata.location.region}</span>
              </p>
            </div>
          ) : (
            <div className="d-flex align-items-center justify-content-center py-2">
              <Spinner size="sm" color="primary" className="me-2" />
              <p className="text-muted small mb-0">Loading Geolocation Data...</p>
            </div>
          )}
        </div>

      </div>
    </Container>
     );
}
 
export default Location;