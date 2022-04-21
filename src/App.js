import './App.css';
import InputForm from './components/form/form';
import ItemList from './components/table/item-list';
import { useState, useEffect } from 'react';

const getMakes = async (type) => {
  const url = `https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/${type}?format=json`;
  const res = await fetch(url);
  const data = await res.json();
  return data['Results'].map(type => type['MakeName']);
}

const getModels = async (type, make, year) => {
  let url = `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/${make}/vehicleType/${type}?format=json`;
  if (year) {
    url = `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/${make}/modelyear/${year}/vehicleType/${type}?format=json`;
  }
  const res = await fetch(url);
  const data = await res.json();
  return data['Results'];
}

function App() {
  const [types, setTypes] = useState([]);
  const [makes, setMakes] = useState([]);

  const [selectedType, setSelectedType] = useState();
  const [selectedMakes, setSelectedMakes] = useState([]);
  const [year, setYear] = useState({});
  const [models, setModels] = useState([]);

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTypeChange = async (typeObj) => {
    setSubmitted(false);
    setIsLoading(true);

    setSelectedType(typeObj);
    setModels([]);

    const newMakes = await getMakes(typeObj.value);
    setSelectedMakes([]);
    setMakes(newMakes);

    setIsLoading(false);
  }

  const handleMakeChange = async (currentMakes) => {
    setSubmitted(false);
    setModels([]);

    setSelectedMakes(currentMakes);
  }

  const handleYearChange = (year) => {
    setSubmitted(false);
    setModels([]);

    setYear(year);
  }

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    let modelData = [];
    for (const make of selectedMakes) {
      const data = getModels(selectedType.value, make.value, year.value);
      modelData.push(data)
    }

    Promise.all(modelData).then(data => {
      setModels(data.flat())
    })

    setIsLoading(false);
    setSubmitted(true);
  }


  useEffect(() => {
    const url = 'https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablevalueslist/vehicle%20type?format=json';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setTypes(data['Results'].map(type => type['Name'].trim()));
      });
  }, []);
  
  return (
    <div className="App">
      <h1>Car Search</h1>
      <InputForm
        types={types}
        makes={makes}
        selectedType={selectedType}
        selectedMakes={selectedMakes}
        year={year}
        handleTypeChange={handleTypeChange}
        handleMakeChange={handleMakeChange}
        handleYearChange={handleYearChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        submitted={submitted}
      />
      <ItemList
        models={models}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
