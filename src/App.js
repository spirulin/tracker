import React, { useState, useEffect } from 'react';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core"; 
import InfoBox from './InfoBox';
import Map from './Map';
import './App.css';


function App() {
const [countries, setCountries] = useState([]);
const [country, setCountry] = useState('worldwide');

useEffect(() => {
  const getCountriesData = async () => {
    await fetch("https://disease.sh/v3/covid-19/countries")
    .then ((response) => response.json())
    .then((data) => {
      const countries = data.map((country) => ({
        name: country.country,
        value: country.countryInfo.iso2,
      }));
    
      setCountries(countries);
    });
  };
  getCountriesData();
}, []);

const onCountryChange = (event) => {
  const countryCode = event.target.value;
  setCountry(countryCode);
};

  return (
    <div className="app">
      <div className="app__left">
      <div className="app__header">
      <h1>Коронавирус Тракер</h1> 
     <FormControl className="app__dropdown">
       <Select
         variant="outlined" onChange={onCountryChange} value={country}>
           <MenuItem value="worldwide">Worldwide</MenuItem>
           {countries.map((country) => (
             <MenuItem value={country.value}>{country.name}</MenuItem>
           )) }
       </Select>
     </FormControl>
      </div>
      <div className="app__stats">
        <InfoBox title= "Заразени" cases={123} total={2000} />
        <InfoBox title= "Излекувани" cases={1232} total={3000} />
        <InfoBox title= "Загинали" cases={1234} total={1000} />

      </div>

         <Map />

      </div> 
      <Card className="app__right">
        <CardContent>
          <h3>Случаи според държава</h3>
          <h3>Случаи по света</h3>
        </CardContent>

      </Card>

    </div>
  );
}

export default App;
