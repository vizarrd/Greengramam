import React, { useState, useEffect } from 'react';
import { 
  getStates, 
  getDistrictsByState, 
  getTaluksByDistrict, 
  formatOptionsForDropdown
} from '../utils/locationApi.js';

const LocationApiDemo = () => {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [taluks, setTaluks] = useState([]);

  useEffect(() => {
    const loadStates = async () => {
      try {
        const statesData = await getStates();
        setStates(statesData);
        console.log('States loaded:', statesData);
      } catch (error) {
        console.error('Error loading states:', error);
      }
    };

    loadStates();
  }, []);

  useEffect(() => {
    if (selectedState) {
      const loadDistricts = async () => {
        try {
          const districtData = await getDistrictsByState(parseInt(selectedState));
          setDistricts(districtData);
          console.log('Districts loaded:', districtData);
        } catch (error) {
          console.error('Error loading districts:', error);
        }
      };

      loadDistricts();
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedDistrict) {
      const loadTaluks = async () => {
        try {
          const talukData = await getTaluksByDistrict(parseInt(selectedDistrict));
          setTaluks(talukData);
          console.log('Taluks loaded:', talukData);
        } catch (error) {
          console.error('Error loading taluks:', error);
        }
      };

      loadTaluks();
    }
  }, [selectedDistrict]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Location API Test</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">State:</label>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">Select State</option>
          {formatOptionsForDropdown(states, 'state_code', 'state').map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {selectedState && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">District:</label>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select District</option>
            {formatOptionsForDropdown(districts, 'district_code', 'district').map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedDistrict && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Taluk:</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
            <option value="">Select Taluk</option>
            {formatOptionsForDropdown(taluks, 'taluk_code', 'taluk').map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default LocationApiDemo;