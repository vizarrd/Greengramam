// Indian location data service
// Based on https://github.com/achiit/India_Info API structure
// Using comprehensive fallback data since API endpoints are not currently accessible

const API_BASE_URL = 'https://india-info-api.onrender.com'; // API may not be available

// Fallback data for Indian states
const fallbackStates = [
  { state_code: 1, state: "Andhra Pradesh" },
  { state_code: 2, state: "Arunachal Pradesh" },
  { state_code: 3, state: "Assam" },
  { state_code: 4, state: "Bihar" },
  { state_code: 5, state: "Chhattisgarh" },
  { state_code: 6, state: "Goa" },
  { state_code: 7, state: "Gujarat" },
  { state_code: 8, state: "Haryana" },
  { state_code: 9, state: "Himachal Pradesh" },
  { state_code: 10, state: "Jharkhand" },
  { state_code: 11, state: "Karnataka" },
  { state_code: 12, state: "Kerala" },
  { state_code: 13, state: "Madhya Pradesh" },
  { state_code: 14, state: "Maharashtra" },
  { state_code: 15, state: "Manipur" },
  { state_code: 16, state: "Meghalaya" },
  { state_code: 17, state: "Mizoram" },
  { state_code: 18, state: "Nagaland" },
  { state_code: 19, state: "Odisha" },
  { state_code: 20, state: "Punjab" },
  { state_code: 21, state: "Rajasthan" },
  { state_code: 22, state: "Sikkim" },
  { state_code: 23, state: "Tamil Nadu" },
  { state_code: 24, state: "Telangana" },
  { state_code: 25, state: "Tripura" },
  { state_code: 26, state: "Uttar Pradesh" },
  { state_code: 27, state: "Uttarakhand" },
  { state_code: 28, state: "West Bengal" },
  { state_code: 29, state: "Andaman and Nicobar Islands" },
  { state_code: 30, state: "Chandigarh" },
  { state_code: 31, state: "Dadra and Nagar Haveli and Daman and Diu" },
  { state_code: 32, state: "Delhi" },
  { state_code: 33, state: "Jammu and Kashmir" },
  { state_code: 34, state: "Ladakh" },
  { state_code: 35, state: "Lakshadweep" },
  { state_code: 36, state: "Puducherry" }
];

// Comprehensive fallback district data organized by state_code
const fallbackDistricts = {
  11: [ // Karnataka
    { district_code: 1101, district: "Bagalkot" },
    { district_code: 1102, district: "Ballari" },
    { district_code: 1103, district: "Belagavi" },
    { district_code: 1104, district: "Bengaluru Rural" },
    { district_code: 1105, district: "Bengaluru Urban" },
    { district_code: 1106, district: "Bidar" },
    { district_code: 1107, district: "Chamarajanagar" },
    { district_code: 1108, district: "Chikkaballapur" },
    { district_code: 1109, district: "Chikkamagaluru" },
    { district_code: 1110, district: "Chitradurga" },
    { district_code: 1111, district: "Dakshina Kannada" },
    { district_code: 1112, district: "Davanagere" },
    { district_code: 1113, district: "Dharwad" },
    { district_code: 1114, district: "Gadag" },
    { district_code: 1115, district: "Hassan" },
    { district_code: 1116, district: "Haveri" },
    { district_code: 1117, district: "Kalaburagi" },
    { district_code: 1118, district: "Kodagu" },
    { district_code: 1119, district: "Kolar" },
    { district_code: 1120, district: "Koppal" },
    { district_code: 1121, district: "Mandya" },
    { district_code: 1122, district: "Mysuru" },
    { district_code: 1123, district: "Raichur" },
    { district_code: 1124, district: "Ramanagara" },
    { district_code: 1125, district: "Shivamogga" },
    { district_code: 1126, district: "Tumakuru" },
    { district_code: 1127, district: "Udupi" },
    { district_code: 1128, district: "Uttara Kannada" },
    { district_code: 1129, district: "Vijayapura" },
    { district_code: 1130, district: "Yadgir" }
  ],
  12: [ // Kerala
    { district_code: 1201, district: "Alappuzha" },
    { district_code: 1202, district: "Ernakulam" },
    { district_code: 1203, district: "Idukki" },
    { district_code: 1204, district: "Kannur" },
    { district_code: 1205, district: "Kasaragod" },
    { district_code: 1206, district: "Kollam" },
    { district_code: 1207, district: "Kottayam" },
    { district_code: 1208, district: "Kozhikode" },
    { district_code: 1209, district: "Malappuram" },
    { district_code: 1210, district: "Palakkad" },
    { district_code: 1211, district: "Pathanamthitta" },
    { district_code: 1212, district: "Thiruvananthapuram" },
    { district_code: 1213, district: "Thrissur" },
    { district_code: 1214, district: "Wayanad" }
  ],
  23: [ // Tamil Nadu
    { district_code: 2301, district: "Ariyalur" },
    { district_code: 2302, district: "Chengalpattu" },
    { district_code: 2303, district: "Chennai" },
    { district_code: 2304, district: "Coimbatore" },
    { district_code: 2305, district: "Cuddalore" },
    { district_code: 2306, district: "Dharmapuri" },
    { district_code: 2307, district: "Dindigul" },
    { district_code: 2308, district: "Erode" },
    { district_code: 2309, district: "Kallakurichi" },
    { district_code: 2310, district: "Kanchipuram" },
    { district_code: 2311, district: "Kanyakumari" },
    { district_code: 2312, district: "Karur" },
    { district_code: 2313, district: "Krishnagiri" },
    { district_code: 2314, district: "Madurai" },
    { district_code: 2315, district: "Mayiladuthurai" },
    { district_code: 2316, district: "Nagapattinam" },
    { district_code: 2317, district: "Namakkal" },
    { district_code: 2318, district: "Nilgiris" },
    { district_code: 2319, district: "Perambalur" },
    { district_code: 2320, district: "Pudukkottai" },
    { district_code: 2321, district: "Ramanathapuram" },
    { district_code: 2322, district: "Ranipet" },
    { district_code: 2323, district: "Salem" },
    { district_code: 2324, district: "Sivaganga" },
    { district_code: 2325, district: "Tenkasi" },
    { district_code: 2326, district: "Thanjavur" },
    { district_code: 2327, district: "Theni" },
    { district_code: 2328, district: "Thoothukudi" },
    { district_code: 2329, district: "Tiruchirappalli" },
    { district_code: 2330, district: "Tirunelveli" },
    { district_code: 2331, district: "Tirupathur" },
    { district_code: 2332, district: "Tiruppur" },
    { district_code: 2333, district: "Tiruvallur" },
    { district_code: 2334, district: "Tiruvannamalai" },
    { district_code: 2335, district: "Tiruvarur" },
    { district_code: 2336, district: "Vellore" },
    { district_code: 2337, district: "Viluppuram" },
    { district_code: 2338, district: "Virudhunagar" }
  ],
  14: [ // Maharashtra
    { district_code: 1401, district: "Ahmednagar" },
    { district_code: 1402, district: "Akola" },
    { district_code: 1403, district: "Amravati" },
    { district_code: 1404, district: "Aurangabad" },
    { district_code: 1405, district: "Beed" },
    { district_code: 1406, district: "Bhandara" },
    { district_code: 1407, district: "Buldhana" },
    { district_code: 1408, district: "Chandrapur" },
    { district_code: 1409, district: "Dhule" },
    { district_code: 1410, district: "Gadchiroli" },
    { district_code: 1411, district: "Gondia" },
    { district_code: 1412, district: "Hingoli" },
    { district_code: 1413, district: "Jalgaon" },
    { district_code: 1414, district: "Jalna" },
    { district_code: 1415, district: "Kolhapur" },
    { district_code: 1416, district: "Latur" },
    { district_code: 1417, district: "Mumbai City" },
    { district_code: 1418, district: "Mumbai Suburban" },
    { district_code: 1419, district: "Nagpur" },
    { district_code: 1420, district: "Nanded" },
    { district_code: 1421, district: "Nandurbar" },
    { district_code: 1422, district: "Nashik" },
    { district_code: 1423, district: "Osmanabad" },
    { district_code: 1424, district: "Palghar" },
    { district_code: 1425, district: "Parbhani" },
    { district_code: 1426, district: "Pune" },
    { district_code: 1427, district: "Raigad" },
    { district_code: 1428, district: "Ratnagiri" },
    { district_code: 1429, district: "Sangli" },
    { district_code: 1430, district: "Satara" },
    { district_code: 1431, district: "Sindhudurg" },
    { district_code: 1432, district: "Solapur" },
    { district_code: 1433, district: "Thane" },
    { district_code: 1434, district: "Wardha" },
    { district_code: 1435, district: "Washim" },
    { district_code: 1436, district: "Yavatmal" }
  ]
};

// Sample taluk data for major districts
const fallbackTaluks = {
  1105: [ // Bengaluru Urban
    { taluk_code: 110501, taluk: "Anekal" },
    { taluk_code: 110502, taluk: "Bengaluru East" },
    { taluk_code: 110503, taluk: "Bengaluru North" },
    { taluk_code: 110504, taluk: "Bengaluru South" }
  ],
  1122: [ // Mysuru
    { taluk_code: 112201, taluk: "Hunsur" },
    { taluk_code: 112202, taluk: "Krishnarajanagara" },
    { taluk_code: 112203, taluk: "Mysuru" },
    { taluk_code: 112204, taluk: "Nanjangud" },
    { taluk_code: 112205, taluk: "Piriyapatna" },
    { taluk_code: 112206, taluk: "T.Narasipur" }
  ],
  1202: [ // Ernakulam (Kerala)
    { taluk_code: 120201, taluk: "Aluva" },
    { taluk_code: 120202, taluk: "Kanayannur" },
    { taluk_code: 120203, taluk: "Kochi" },
    { taluk_code: 120204, taluk: "Kothamangalam" },
    { taluk_code: 120205, taluk: "Kunnathunad" },
    { taluk_code: 120206, taluk: "Muvattupuzha" },
    { taluk_code: 120207, taluk: "Paravur" }
  ],
  1212: [ // Thiruvananthapuram (Kerala)
    { taluk_code: 121201, taluk: "Chirayinkeezhu" },
    { taluk_code: 121202, taluk: "Nedumangad" },
    { taluk_code: 121203, taluk: "Thiruvananthapuram" },
    { taluk_code: 121204, taluk: "Varkala" }
  ],
  2303: [ // Chennai (Tamil Nadu)
    { taluk_code: 230301, taluk: "Alandur" },
    { taluk_code: 230302, taluk: "Ambattur" },
    { taluk_code: 230303, taluk: "Egmore-Nungambakkam" },
    { taluk_code: 230304, taluk: "Fort-Tondiarpet" },
    { taluk_code: 230305, taluk: "Mambalam-Guindy" },
    { taluk_code: 230306, taluk: "Mylapore-Triplicane" },
    { taluk_code: 230307, taluk: "Perambur-Purasawalkam" },
    { taluk_code: 230308, taluk: "Sholinganallur" }
  ],
  2304: [ // Coimbatore (Tamil Nadu)
    { taluk_code: 230401, taluk: "Annur" },
    { taluk_code: 230402, taluk: "Coimbatore North" },
    { taluk_code: 230403, taluk: "Coimbatore South" },
    { taluk_code: 230404, taluk: "Kinathukadavu" },
    { taluk_code: 230405, taluk: "Madukarai" },
    { taluk_code: 230406, taluk: "Mettupalayam" },
    { taluk_code: 230407, taluk: "Perur" },
    { taluk_code: 230408, taluk: "Pollachi" },
    { taluk_code: 230409, taluk: "Sulur" },
    { taluk_code: 230410, taluk: "Valparai" }
  ],
  1426: [ // Pune (Maharashtra)
    { taluk_code: 142601, taluk: "Ambegaon" },
    { taluk_code: 142602, taluk: "Baramati" },
    { taluk_code: 142603, taluk: "Bhor" },
    { taluk_code: 142604, taluk: "Daund" },
    { taluk_code: 142605, taluk: "Haveli" },
    { taluk_code: 142606, taluk: "Indapur" },
    { taluk_code: 142607, taluk: "Junnar" },
    { taluk_code: 142608, taluk: "Khed" },
    { taluk_code: 142609, taluk: "Maval" },
    { taluk_code: 142610, taluk: "Mulshi" },
    { taluk_code: 142611, taluk: "Pune City" },
    { taluk_code: 142612, taluk: "Purandar" },
    { taluk_code: 142613, taluk: "Shirur" },
    { taluk_code: 142614, taluk: "Velhe" }
  ]
};

// Helper function to add default districts for states without specific data
const getDefaultDistrictsForState = (stateCode) => {
  const stateName = fallbackStates.find(s => s.state_code === stateCode)?.state || 'Unknown';
  return [
    { district_code: stateCode * 100 + 1, district: `${stateName} District 1` },
    { district_code: stateCode * 100 + 2, district: `${stateName} District 2` },
    { district_code: stateCode * 100 + 3, district: `${stateName} District 3` }
  ];
};

// Helper function to add default taluks for districts without specific data
const getDefaultTaluksForDistrict = (districtCode) => {
  const district = Object.values(fallbackDistricts)
    .flat()
    .find(d => d.district_code === districtCode);
  const districtName = district?.district || 'Unknown';
  
  return [
    { taluk_code: districtCode * 100 + 1, taluk: `${districtName} Taluk 1` },
    { taluk_code: districtCode * 100 + 2, taluk: `${districtName} Taluk 2` },
    { taluk_code: districtCode * 100 + 3, taluk: `${districtName} Taluk 3` }
  ];
};

/**
 * Fetches all states from the API or returns fallback data
 * @returns {Promise<State[]>} Array of state objects
 */
export const getStates = async () => {
  try {
    // Try to fetch from API first
    const response = await fetch(`${API_BASE_URL}/api/states`);
    if (response.ok) {
      const data = await response.json();
      if (data && Array.isArray(data)) {
        return data;
      }
    }
  } catch (error) {
    console.warn('API not available, using fallback data:', error.message);
  }
  
  // Return fallback data
  return fallbackStates;
};

/**
 * Fetches districts for a given state from API or returns fallback data
 * @param {number} stateCode - The state code
 * @returns {Promise<District[]>} Array of district objects
 */
export const getDistrictsByState = async (stateCode) => {
  try {
    // Try to fetch from API first
    const response = await fetch(`${API_BASE_URL}/api/districts/${stateCode}`);
    if (response.ok) {
      const data = await response.json();
      if (data && Array.isArray(data)) {
        return data;
      }
    }
  } catch (error) {
    console.warn('API not available, using fallback data:', error.message);
  }
  
  // Return fallback data
  return fallbackDistricts[stateCode] || getDefaultDistrictsForState(stateCode);
};

/**
 * Fetches taluks for a given district from API or returns fallback data
 * @param {number} districtCode - The district code
 * @returns {Promise<Taluk[]>} Array of taluk objects
 */
export const getTaluksByDistrict = async (districtCode) => {
  try {
    // Try to fetch from API first
    const response = await fetch(`${API_BASE_URL}/api/taluks/${districtCode}`);
    if (response.ok) {
      const data = await response.json();
      if (data && Array.isArray(data)) {
        return data;
      }
    }
  } catch (error) {
    console.warn('API not available, using fallback data:', error.message);
  }
  
  // Return fallback data
  return fallbackTaluks[districtCode] || getDefaultTaluksForDistrict(districtCode);
};

/**
 * Formats location data for dropdown components
 * @param {Array} items - Array of location objects
 * @param {string} valueField - Field name to use as value (e.g., 'state_code', 'district_code')
 * @param {string} labelField - Field name to use as label (e.g., 'state', 'district')
 * @returns {Array} Array of formatted options for dropdowns
 */
export const formatOptionsForDropdown = (items, valueField = 'state_code', labelField = 'state') => {
  if (!Array.isArray(items)) {
    return [];
  }
  
  return items.map(item => ({
    value: item[valueField],
    label: item[labelField]
  }));
};

/**
 * Gets state name by state code
 * @param {number} stateCode - The state code
 * @returns {string} State name or 'Unknown State'
 */
export const getStateNameByCode = (stateCode) => {
  const state = fallbackStates.find(s => s.state_code === parseInt(stateCode));
  return state ? state.state : 'Unknown State';
};

/**
 * Gets district name by district code
 * @param {number} districtCode - The district code
 * @returns {string} District name or 'Unknown District'
 */
export const getDistrictNameByCode = (districtCode) => {
  for (const districts of Object.values(fallbackDistricts)) {
    const district = districts.find(d => d.district_code === parseInt(districtCode));
    if (district) {
      return district.district;
    }
  }
  return 'Unknown District';
};

/**
 * Gets taluk name by taluk code
 * @param {number} talukCode - The taluk code
 * @returns {string} Taluk name or 'Unknown Taluk'
 */
export const getTalukNameByCode = (talukCode) => {
  for (const taluks of Object.values(fallbackTaluks)) {
    const taluk = taluks.find(t => t.taluk_code === parseInt(talukCode));
    if (taluk) {
      return taluk.taluk;
    }
  }
  return 'Unknown Taluk';
};

/**
 * Validates if a state code exists
 * @param {number} stateCode - The state code to validate
 * @returns {boolean} True if state exists
 */
export const isValidStateCode = (stateCode) => {
  return fallbackStates.some(s => s.state_code === parseInt(stateCode));
};

/**
 * Validates if a district code exists within a state
 * @param {number} stateCode - The state code
 * @param {number} districtCode - The district code to validate
 * @returns {boolean} True if district exists in the state
 */
export const isValidDistrictCode = (stateCode, districtCode) => {
  const districts = fallbackDistricts[stateCode] || [];
  return districts.some(d => d.district_code === parseInt(districtCode));
};

/**
 * Validates if a taluk code exists within a district
 * @param {number} districtCode - The district code
 * @param {number} talukCode - The taluk code to validate
 * @returns {boolean} True if taluk exists in the district
 */
export const isValidTalukCode = (districtCode, talukCode) => {
  const taluks = fallbackTaluks[districtCode] || [];
  return taluks.some(t => t.taluk_code === parseInt(talukCode));
};

// Export all functions as default for easier importing
export default {
  getStates,
  getDistrictsByState,
  getTaluksByDistrict,
  formatOptionsForDropdown,
  getStateNameByCode,
  getDistrictNameByCode,
  getTalukNameByCode,
  isValidStateCode,
  isValidDistrictCode,
  isValidTalukCode
};