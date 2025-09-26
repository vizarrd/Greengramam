// Indian location data service
// Based on https://github.com/achiit/India_Info API structure
// Using comprehensive fallback data since API endpoints are not currently accessible

const API_BASE_URL = 'https://india-info-api.onrender.com'; // API may not be available

export interface State {
  state_code: number;
  state: string;
}

export interface District {
  district_code: number;
  district: string;
}

export interface Taluk {
  taluk_code: number;
  taluk: string;
}

export interface Village {
  village_code: number;
  village: string;
}

// Complete Indian states and union territories data
const fallbackStates: State[] = [
  { state_code: 35, state: "Andaman and Nicobar Islands" },
  { state_code: 28, state: "Andhra Pradesh" },
  { state_code: 12, state: "Arunachal Pradesh" },
  { state_code: 18, state: "Assam" },
  { state_code: 10, state: "Bihar" },
  { state_code: 4, state: "Chandigarh" },
  { state_code: 22, state: "Chhattisgarh" },
  { state_code: 26, state: "Dadra and Nagar Haveli and Daman and Diu" },
  { state_code: 7, state: "Delhi" },
  { state_code: 30, state: "Goa" },
  { state_code: 24, state: "Gujarat" },
  { state_code: 6, state: "Haryana" },
  { state_code: 2, state: "Himachal Pradesh" },
  { state_code: 1, state: "Jammu and Kashmir" },
  { state_code: 20, state: "Jharkhand" },
  { state_code: 29, state: "Karnataka" },
  { state_code: 32, state: "Kerala" },
  { state_code: 37, state: "Ladakh" },
  { state_code: 31, state: "Lakshadweep" },
  { state_code: 23, state: "Madhya Pradesh" },
  { state_code: 27, state: "Maharashtra" },
  { state_code: 14, state: "Manipur" },
  { state_code: 17, state: "Meghalaya" },
  { state_code: 15, state: "Mizoram" },
  { state_code: 13, state: "Nagaland" },
  { state_code: 21, state: "Odisha" },
  { state_code: 34, state: "Puducherry" },
  { state_code: 3, state: "Punjab" },
  { state_code: 8, state: "Rajasthan" },
  { state_code: 11, state: "Sikkim" },
  { state_code: 33, state: "Tamil Nadu" },
  { state_code: 36, state: "Telangana" },
  { state_code: 16, state: "Tripura" },
  { state_code: 9, state: "Uttar Pradesh" },
  { state_code: 5, state: "Uttarakhand" },
  { state_code: 19, state: "West Bengal" },
];

// Comprehensive district data for major Indian states
const fallbackDistricts: { [stateCode: number]: District[] } = {
  // Kerala - 32
  32: [
    { district_code: 296, district: "Thiruvananthapuram" },
    { district_code: 298, district: "Kollam" },
    { district_code: 300, district: "Pathanamthitta" },
    { district_code: 301, district: "Alappuzha" },
    { district_code: 302, district: "Kottayam" },
    { district_code: 303, district: "Idukki" },
    { district_code: 307, district: "Ernakulam" },
    { district_code: 308, district: "Thrissur" },
    { district_code: 309, district: "Palakkad" },
    { district_code: 310, district: "Malappuram" },
    { district_code: 311, district: "Kozhikode" },
    { district_code: 312, district: "Wayanad" },
    { district_code: 313, district: "Kannur" },
    { district_code: 314, district: "Kasaragod" },
  ],
  
  // Tamil Nadu - 33
  33: [
    { district_code: 571, district: "Chennai" },
    { district_code: 572, district: "Coimbatore" },
    { district_code: 573, district: "Cuddalore" },
    { district_code: 574, district: "Dharmapuri" },
    { district_code: 575, district: "Dindigul" },
    { district_code: 576, district: "Erode" },
    { district_code: 577, district: "Kanchipuram" },
    { district_code: 578, district: "Kanyakumari" },
    { district_code: 579, district: "Karur" },
    { district_code: 580, district: "Krishnagiri" },
    { district_code: 581, district: "Madurai" },
    { district_code: 582, district: "Nagapattinam" },
    { district_code: 583, district: "Namakkal" },
    { district_code: 584, district: "Perambalur" },
    { district_code: 585, district: "Pudukkottai" },
    { district_code: 586, district: "Ramanathapuram" },
    { district_code: 587, district: "Salem" },
    { district_code: 588, district: "Sivaganga" },
    { district_code: 589, district: "Thanjavur" },
    { district_code: 590, district: "The Nilgiris" },
    { district_code: 591, district: "Theni" },
    { district_code: 592, district: "Thiruvallur" },
    { district_code: 593, district: "Thiruvarur" },
    { district_code: 594, district: "Thoothukudi" },
    { district_code: 595, district: "Tiruchirappalli" },
    { district_code: 596, district: "Tirunelveli" },
    { district_code: 597, district: "Tiruppur" },
    { district_code: 598, district: "Vellore" },
    { district_code: 599, district: "Viluppuram" },
    { district_code: 600, district: "Virudhunagar" },
  ],

  // Karnataka - 29
  29: [
    { district_code: 265, district: "Bagalkot" },
    { district_code: 266, district: "Ballari" },
    { district_code: 267, district: "Belagavi" },
    { district_code: 268, district: "Bengaluru Rural" },
    { district_code: 269, district: "Bengaluru Urban" },
    { district_code: 270, district: "Bidar" },
    { district_code: 271, district: "Chamarajanagar" },
    { district_code: 272, district: "Chikballapur" },
    { district_code: 273, district: "Chikkamagaluru" },
    { district_code: 274, district: "Chitradurga" },
    { district_code: 275, district: "Dakshina Kannada" },
    { district_code: 276, district: "Davanagere" },
    { district_code: 277, district: "Dharwad" },
    { district_code: 278, district: "Gadag" },
    { district_code: 279, district: "Hassan" },
    { district_code: 280, district: "Haveri" },
    { district_code: 281, district: "Kalaburagi" },
    { district_code: 282, district: "Kodagu" },
    { district_code: 283, district: "Kolar" },
    { district_code: 284, district: "Koppal" },
    { district_code: 285, district: "Mandya" },
    { district_code: 286, district: "Mysuru" },
    { district_code: 287, district: "Raichur" },
    { district_code: 288, district: "Ramanagara" },
    { district_code: 289, district: "Shivamogga" },
    { district_code: 290, district: "Tumakuru" },
    { district_code: 291, district: "Udupi" },
    { district_code: 292, district: "Uttara Kannada" },
    { district_code: 293, district: "Vijayapura" },
    { district_code: 294, district: "Yadgir" },
  ],

  // Maharashtra - 27
  27: [
    { district_code: 358, district: "Ahmednagar" },
    { district_code: 359, district: "Akola" },
    { district_code: 360, district: "Amravati" },
    { district_code: 361, district: "Aurangabad" },
    { district_code: 362, district: "Beed" },
    { district_code: 363, district: "Bhandara" },
    { district_code: 364, district: "Buldhana" },
    { district_code: 365, district: "Chandrapur" },
    { district_code: 366, district: "Dhule" },
    { district_code: 367, district: "Gadchiroli" },
    { district_code: 368, district: "Gondia" },
    { district_code: 369, district: "Hingoli" },
    { district_code: 370, district: "Jalgaon" },
    { district_code: 371, district: "Jalna" },
    { district_code: 372, district: "Kolhapur" },
    { district_code: 373, district: "Latur" },
    { district_code: 374, district: "Mumbai City" },
    { district_code: 375, district: "Mumbai Suburban" },
    { district_code: 376, district: "Nagpur" },
    { district_code: 377, district: "Nanded" },
    { district_code: 378, district: "Nandurbar" },
    { district_code: 379, district: "Nashik" },
    { district_code: 380, district: "Osmanabad" },
    { district_code: 381, district: "Palghar" },
    { district_code: 382, district: "Parbhani" },
    { district_code: 383, district: "Pune" },
    { district_code: 384, district: "Raigad" },
    { district_code: 385, district: "Ratnagiri" },
    { district_code: 386, district: "Sangli" },
    { district_code: 387, district: "Satara" },
    { district_code: 388, district: "Sindhudurg" },
    { district_code: 389, district: "Solapur" },
    { district_code: 390, district: "Thane" },
    { district_code: 391, district: "Wardha" },
    { district_code: 392, district: "Washim" },
    { district_code: 393, district: "Yavatmal" },
  ],

  // Uttar Pradesh - 9 (Major districts only)
  9: [
    { district_code: 101, district: "Agra" },
    { district_code: 102, district: "Aligarh" },
    { district_code: 103, district: "Allahabad (Prayagraj)" },
    { district_code: 104, district: "Ambedkar Nagar" },
    { district_code: 105, district: "Amethi" },
    { district_code: 106, district: "Amroha" },
    { district_code: 107, district: "Auraiya" },
    { district_code: 108, district: "Azamgarh" },
    { district_code: 109, district: "Baghpat" },
    { district_code: 110, district: "Bahraich" },
    { district_code: 111, district: "Ballia" },
    { district_code: 112, district: "Balrampur" },
    { district_code: 113, district: "Banda" },
    { district_code: 114, district: "Barabanki" },
    { district_code: 115, district: "Bareilly" },
    { district_code: 116, district: "Basti" },
    { district_code: 117, district: "Bhadohi" },
    { district_code: 118, district: "Bijnor" },
    { district_code: 119, district: "Budaun" },
    { district_code: 120, district: "Bulandshahr" },
    { district_code: 121, district: "Chandauli" },
    { district_code: 122, district: "Chitrakoot" },
    { district_code: 123, district: "Deoria" },
    { district_code: 124, district: "Etah" },
    { district_code: 125, district: "Etawah" },
    { district_code: 126, district: "Faizabad (Ayodhya)" },
    { district_code: 127, district: "Farrukhabad" },
    { district_code: 128, district: "Fatehpur" },
    { district_code: 129, district: "Firozabad" },
    { district_code: 130, district: "Gautam Buddha Nagar" },
    { district_code: 131, district: "Ghaziabad" },
    { district_code: 132, district: "Ghazipur" },
    { district_code: 133, district: "Gonda" },
    { district_code: 134, district: "Gorakhpur" },
    { district_code: 135, district: "Hamirpur" },
    { district_code: 136, district: "Hapur" },
    { district_code: 137, district: "Hardoi" },
    { district_code: 138, district: "Hathras" },
    { district_code: 139, district: "Jalaun" },
    { district_code: 140, district: "Jaunpur" },
    { district_code: 141, district: "Jhansi" },
    { district_code: 142, district: "Kannauj" },
    { district_code: 143, district: "Kanpur Dehat" },
    { district_code: 144, district: "Kanpur Nagar" },
    { district_code: 145, district: "Kasganj" },
    { district_code: 146, district: "Kaushambi" },
    { district_code: 147, district: "Kushinagar" },
    { district_code: 148, district: "Lakhimpur Kheri" },
    { district_code: 149, district: "Lalitpur" },
    { district_code: 150, district: "Lucknow" },
    { district_code: 151, district: "Maharajganj" },
    { district_code: 152, district: "Mahoba" },
    { district_code: 153, district: "Mainpuri" },
    { district_code: 154, district: "Mathura" },
    { district_code: 155, district: "Mau" },
    { district_code: 156, district: "Meerut" },
    { district_code: 157, district: "Mirzapur" },
    { district_code: 158, district: "Moradabad" },
    { district_code: 159, district: "Muzaffarnagar" },
    { district_code: 160, district: "Pilibhit" },
    { district_code: 161, district: "Pratapgarh" },
    { district_code: 162, district: "Raebareli" },
    { district_code: 163, district: "Rampur" },
    { district_code: 164, district: "Saharanpur" },
    { district_code: 165, district: "Sambhal" },
    { district_code: 166, district: "Sant Kabir Nagar" },
    { district_code: 167, district: "Shahjahanpur" },
    { district_code: 168, district: "Shamli" },
    { district_code: 169, district: "Shrawasti" },
    { district_code: 170, district: "Siddharthnagar" },
    { district_code: 171, district: "Sitapur" },
    { district_code: 172, district: "Sonbhadra" },
    { district_code: 173, district: "Sultanpur" },
    { district_code: 174, district: "Unnao" },
    { district_code: 175, district: "Varanasi" },
  ],

  // Gujarat - 24
  24: [
    { district_code: 180, district: "Ahmedabad" },
    { district_code: 181, district: "Amreli" },
    { district_code: 182, district: "Anand" },
    { district_code: 183, district: "Aravalli" },
    { district_code: 184, district: "Banaskantha" },
    { district_code: 185, district: "Bharuch" },
    { district_code: 186, district: "Bhavnagar" },
    { district_code: 187, district: "Botad" },
    { district_code: 188, district: "Chhota Udepur" },
    { district_code: 189, district: "Dahod" },
    { district_code: 190, district: "Dang" },
    { district_code: 191, district: "Devbhoomi Dwarka" },
    { district_code: 192, district: "Gandhinagar" },
    { district_code: 193, district: "Gir Somnath" },
    { district_code: 194, district: "Jamnagar" },
    { district_code: 195, district: "Junagadh" },
    { district_code: 196, district: "Kheda" },
    { district_code: 197, district: "Kutch" },
    { district_code: 198, district: "Mahisagar" },
    { district_code: 199, district: "Mehsana" },
    { district_code: 200, district: "Morbi" },
    { district_code: 201, district: "Narmada" },
    { district_code: 202, district: "Navsari" },
    { district_code: 203, district: "Panchmahal" },
    { district_code: 204, district: "Patan" },
    { district_code: 205, district: "Porbandar" },
    { district_code: 206, district: "Rajkot" },
    { district_code: 207, district: "Sabarkantha" },
    { district_code: 208, district: "Surat" },
    { district_code: 209, district: "Surendranagar" },
    { district_code: 210, district: "Tapi" },
    { district_code: 211, district: "Vadodara" },
    { district_code: 212, district: "Valsad" },
  ],

  // Rajasthan - 8 (Major districts)
  8: [
    { district_code: 213, district: "Ajmer" },
    { district_code: 214, district: "Alwar" },
    { district_code: 215, district: "Banswara" },
    { district_code: 216, district: "Baran" },
    { district_code: 217, district: "Barmer" },
    { district_code: 218, district: "Bharatpur" },
    { district_code: 219, district: "Bhilwara" },
    { district_code: 220, district: "Bikaner" },
    { district_code: 221, district: "Bundi" },
    { district_code: 222, district: "Chittorgarh" },
    { district_code: 223, district: "Churu" },
    { district_code: 224, district: "Dausa" },
    { district_code: 225, district: "Dholpur" },
    { district_code: 226, district: "Dungarpur" },
    { district_code: 227, district: "Ganganagar" },
    { district_code: 228, district: "Hanumangarh" },
    { district_code: 229, district: "Jaipur" },
    { district_code: 230, district: "Jaisalmer" },
    { district_code: 231, district: "Jalore" },
    { district_code: 232, district: "Jhalawar" },
    { district_code: 233, district: "Jhunjhunu" },
    { district_code: 234, district: "Jodhpur" },
    { district_code: 235, district: "Karauli" },
    { district_code: 236, district: "Kota" },
    { district_code: 237, district: "Nagaur" },
    { district_code: 238, district: "Pali" },
    { district_code: 239, district: "Pratapgarh" },
    { district_code: 240, district: "Rajsamand" },
    { district_code: 241, district: "Sawai Madhopur" },
    { district_code: 242, district: "Sikar" },
    { district_code: 243, district: "Sirohi" },
    { district_code: 244, district: "Tonk" },
    { district_code: 245, district: "Udaipur" },
  ],
};

// API service functions
export const getStates = async (): Promise<State[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/states`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error('API not available');
  } catch (error) {
    console.log('Using fallback states data');
    return fallbackStates;
  }
};

export const getDistrictsByState = async (stateCode: number): Promise<District[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/districts/${stateCode}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error('API not available');
  } catch (error) {
    console.log('Using fallback district data for state:', stateCode);
    // Return districts from comprehensive fallback data
    return fallbackDistricts[stateCode] || [];
  }
};

// Comprehensive taluk data for major districts - Much expanded coverage
const fallbackTaluks: { [districtCode: number]: Taluk[] } = {
  // ============ KERALA ============
  // Thiruvananthapuram - 296
  296: [
    { taluk_code: 2960, taluk: "Thiruvananthapuram" },
    { taluk_code: 2961, taluk: "Chirayinkeezhu" },
    { taluk_code: 2962, taluk: "Neyyattinkara" },
    { taluk_code: 2963, taluk: "Nedumangad" },
    { taluk_code: 2964, taluk: "Varkala" },
  ],
  
  // Kollam - 298
  298: [
    { taluk_code: 2980, taluk: "Kollam" },
    { taluk_code: 2981, taluk: "Karunagappally" },
    { taluk_code: 2982, taluk: "Kunnathur" },
    { taluk_code: 2983, taluk: "Kottarakkara" },
    { taluk_code: 2984, taluk: "Punalur" },
  ],

  // Pathanamthitta - 300
  300: [
    { taluk_code: 3000, taluk: "Pathanamthitta" },
    { taluk_code: 3001, taluk: "Adoor" },
    { taluk_code: 3002, taluk: "Konni" },
    { taluk_code: 3003, taluk: "Kozhencherry" },
    { taluk_code: 3004, taluk: "Ranni" },
  ],

  // Alappuzha - 301
  301: [
    { taluk_code: 3010, taluk: "Alappuzha" },
    { taluk_code: 3011, taluk: "Karthikappally" },
    { taluk_code: 3012, taluk: "Kuttanad" },
    { taluk_code: 3013, taluk: "Chengannur" },
    { taluk_code: 3014, taluk: "Cherthala" },
    { taluk_code: 3015, taluk: "Mavelikkara" },
  ],

  // Kottayam - 302
  302: [
    { taluk_code: 3020, taluk: "Kottayam" },
    { taluk_code: 3021, taluk: "Changanassery" },
    { taluk_code: 3022, taluk: "Kanjirappally" },
    { taluk_code: 3023, taluk: "Vaikom" },
    { taluk_code: 3024, taluk: "Meenachil" },
  ],

  // Idukki - 303
  303: [
    { taluk_code: 3030, taluk: "Devikulam" },
    { taluk_code: 3031, taluk: "Peermade" },
    { taluk_code: 3032, taluk: "Udumbanchola" },
    { taluk_code: 3033, taluk: "Thodupuzha" },
  ],
  
  // Ernakulam - 307
  307: [
    { taluk_code: 3070, taluk: "Ernakulam" },
    { taluk_code: 3071, taluk: "Kanayannur" },
    { taluk_code: 3072, taluk: "Aluva" },
    { taluk_code: 3073, taluk: "Kunnathunad" },
    { taluk_code: 3074, taluk: "Muvattupuzha" },
    { taluk_code: 3075, taluk: "Kothamangalam" },
    { taluk_code: 3076, taluk: "North Paravur" },
  ],

  // Thrissur - 308
  308: [
    { taluk_code: 3080, taluk: "Thrissur" },
    { taluk_code: 3081, taluk: "Mukundapuram" },
    { taluk_code: 3082, taluk: "Chalakudy" },
    { taluk_code: 3083, taluk: "Talappilly" },
    { taluk_code: 3084, taluk: "Chavakkad" },
    { taluk_code: 3085, taluk: "Irinjalakuda" },
    { taluk_code: 3086, taluk: "Kodungallur" },
  ],

  // Palakkad - 309
  309: [
    { taluk_code: 3090, taluk: "Palakkad" },
    { taluk_code: 3091, taluk: "Alathur" },
    { taluk_code: 3092, taluk: "Chittur" },
    { taluk_code: 3093, taluk: "Ottapalam" },
    { taluk_code: 3094, taluk: "Mannarkkad" },
  ],

  // Malappuram - 310
  310: [
    { taluk_code: 3100, taluk: "Eranad" },
    { taluk_code: 3101, taluk: "Kondotty" },
    { taluk_code: 3102, taluk: "Nilambur" },
    { taluk_code: 3103, taluk: "Perinthalmanna" },
    { taluk_code: 3104, taluk: "Ponnani" },
    { taluk_code: 3105, taluk: "Tirur" },
    { taluk_code: 3106, taluk: "Tirurangadi" },
  ],

  // Kozhikode - 311
  311: [
    { taluk_code: 3110, taluk: "Kozhikode" },
    { taluk_code: 3111, taluk: "Vatakara" },
    { taluk_code: 3112, taluk: "Koyilandy" },
    { taluk_code: 3113, taluk: "Thamarassery" },
  ],

  // Wayanad - 312
  312: [
    { taluk_code: 3120, taluk: "Mananthavady" },
    { taluk_code: 3121, taluk: "Sulthan Bathery" },
    { taluk_code: 3122, taluk: "Vythiri" },
  ],

  // Kannur - 313
  313: [
    { taluk_code: 3130, taluk: "Kannur" },
    { taluk_code: 3131, taluk: "Taliparamba" },
    { taluk_code: 3132, taluk: "Iritty" },
    { taluk_code: 3133, taluk: "Thalassery" },
    { taluk_code: 3134, taluk: "Payyanur" },
  ],

  // Kasaragod - 314
  314: [
    { taluk_code: 3140, taluk: "Kasaragod" },
    { taluk_code: 3141, taluk: "Hosdurg" },
  ],

  // ============ TAMIL NADU ============
  // Chennai - 571
  571: [
    { taluk_code: 5710, taluk: "Chennai (North)" },
    { taluk_code: 5711, taluk: "Chennai (Central)" },
    { taluk_code: 5712, taluk: "Chennai (South)" },
    { taluk_code: 5713, taluk: "Ambattur" },
    { taluk_code: 5714, taluk: "Sholinganallur" },
  ],

  // Coimbatore - 572
  572: [
    { taluk_code: 5720, taluk: "Coimbatore (North)" },
    { taluk_code: 5721, taluk: "Coimbatore (South)" },
    { taluk_code: 5722, taluk: "Mettupalayam" },
    { taluk_code: 5723, taluk: "Pollachi" },
    { taluk_code: 5724, taluk: "Valparai" },
    { taluk_code: 5725, taluk: "Sulur" },
  ],

  // Madurai - 581
  581: [
    { taluk_code: 5810, taluk: "Madurai (East)" },
    { taluk_code: 5811, taluk: "Madurai (West)" },
    { taluk_code: 5812, taluk: "Melur" },
    { taluk_code: 5813, taluk: "Peraiyur" },
    { taluk_code: 5814, taluk: "Thiruparankundram" },
    { taluk_code: 5815, taluk: "Usilampatti" },
  ],

  // Salem - 587
  587: [
    { taluk_code: 5870, taluk: "Salem" },
    { taluk_code: 5871, taluk: "Attur" },
    { taluk_code: 5872, taluk: "Edappadi" },
    { taluk_code: 5873, taluk: "Gangavalli" },
    { taluk_code: 5874, taluk: "Kadayampatti" },
    { taluk_code: 5875, taluk: "Mettur" },
    { taluk_code: 5876, taluk: "Omalur" },
    { taluk_code: 5877, taluk: "Sankari" },
    { taluk_code: 5878, taluk: "Vazhapadi" },
    { taluk_code: 5879, taluk: "Yercaud" },
  ],

  // Tiruchirappalli - 595
  595: [
    { taluk_code: 5950, taluk: "Tiruchirappalli (West)" },
    { taluk_code: 5951, taluk: "Tiruchirappalli (East)" },
    { taluk_code: 5952, taluk: "Lalgudi" },
    { taluk_code: 5953, taluk: "Manapparai" },
    { taluk_code: 5954, taluk: "Musiri" },
    { taluk_code: 5955, taluk: "Srirangam" },
    { taluk_code: 5956, taluk: "Thottiyam" },
    { taluk_code: 5957, taluk: "Thuraiyur" },
  ],

  // ============ KARNATAKA ============
  // Bangalore Urban - 269
  269: [
    { taluk_code: 2690, taluk: "Bangalore North" },
    { taluk_code: 2691, taluk: "Bangalore South" },
    { taluk_code: 2692, taluk: "Bangalore East" },
    { taluk_code: 2693, taluk: "Anekal" },
  ],

  // Mysuru - 286
  286: [
    { taluk_code: 2860, taluk: "Mysuru" },
    { taluk_code: 2861, taluk: "Hunsur" },
    { taluk_code: 2862, taluk: "Krishnarajanagar" },
    { taluk_code: 2863, taluk: "Piriyapatna" },
    { taluk_code: 2864, taluk: "Saragur" },
    { taluk_code: 2865, taluk: "Nanjangud" },
    { taluk_code: 2866, taluk: "T. Narasipur" },
  ],

  // Mandya - 285
  285: [
    { taluk_code: 2850, taluk: "Mandya" },
    { taluk_code: 2851, taluk: "Krishnarajpet" },
    { taluk_code: 2852, taluk: "Maddur" },
    { taluk_code: 2853, taluk: "Malavalli" },
    { taluk_code: 2854, taluk: "Nagamangala" },
    { taluk_code: 2855, taluk: "Pandavapura" },
    { taluk_code: 2856, taluk: "Srirangapatna" },
  ],

  // Tumakuru - 290
  290: [
    { taluk_code: 2900, taluk: "Tumakuru" },
    { taluk_code: 2901, taluk: "Chikkanayakanahalli" },
    { taluk_code: 2902, taluk: "Gubbi" },
    { taluk_code: 2903, taluk: "Koratagere" },
    { taluk_code: 2904, taluk: "Kunigal" },
    { taluk_code: 2905, taluk: "Madhugiri" },
    { taluk_code: 2906, taluk: "Pavagada" },
    { taluk_code: 2907, taluk: "Sira" },
    { taluk_code: 2908, taluk: "Tiptur" },
    { taluk_code: 2909, taluk: "Turuvekere" },
  ],

  // ============ MAHARASHTRA ============
  // Pune - 383
  383: [
    { taluk_code: 3830, taluk: "Pune City" },
    { taluk_code: 3831, taluk: "Pimpri-Chinchwad" },
    { taluk_code: 3832, taluk: "Haveli" },
    { taluk_code: 3833, taluk: "Mulshi" },
    { taluk_code: 3834, taluk: "Maval" },
    { taluk_code: 3835, taluk: "Bhor" },
    { taluk_code: 3836, taluk: "Purandar" },
    { taluk_code: 3837, taluk: "Baramati" },
    { taluk_code: 3838, taluk: "Daund" },
    { taluk_code: 3839, taluk: "Indapur" },
    { taluk_code: 3840, taluk: "Khed" },
    { taluk_code: 3841, taluk: "Shirur" },
    { taluk_code: 3842, taluk: "Ambegaon" },
    { taluk_code: 3843, taluk: "Junnar" },
  ],

  // Mumbai City - 374
  374: [
    { taluk_code: 3740, taluk: "Mumbai City" },
    { taluk_code: 3741, taluk: "Mumbai Island City" },
  ],

  // Mumbai Suburban - 375
  375: [
    { taluk_code: 3750, taluk: "Andheri" },
    { taluk_code: 3751, taluk: "Borivali" },
    { taluk_code: 3752, taluk: "Kurla" },
  ],

  // Nashik - 379
  379: [
    { taluk_code: 3790, taluk: "Nashik" },
    { taluk_code: 3791, taluk: "Baglan" },
    { taluk_code: 3792, taluk: "Kalwan" },
    { taluk_code: 3793, taluk: "Deola" },
    { taluk_code: 3794, taluk: "Dindori" },
    { taluk_code: 3795, taluk: "Igatpuri" },
    { taluk_code: 3796, taluk: "Malegaon" },
    { taluk_code: 3797, taluk: "Nandgaon" },
    { taluk_code: 3798, taluk: "Niphad" },
    { taluk_code: 3799, taluk: "Peint" },
    { taluk_code: 3800, taluk: "Sinnar" },
    { taluk_code: 3801, taluk: "Surgana" },
    { taluk_code: 3802, taluk: "Trimbakeshwar" },
    { taluk_code: 3803, taluk: "Yeola" },
    { taluk_code: 3804, taluk: "Chandvad" },
  ],

  // Nagpur - 376
  376: [
    { taluk_code: 3760, taluk: "Nagpur (Rural)" },
    { taluk_code: 3761, taluk: "Nagpur (Urban)" },
    { taluk_code: 3762, taluk: "Bhiwapur" },
    { taluk_code: 3763, taluk: "Hingna" },
    { taluk_code: 3764, taluk: "Kamptee" },
    { taluk_code: 3765, taluk: "Katol" },
    { taluk_code: 3766, taluk: "Mauda" },
    { taluk_code: 3767, taluk: "Narkhed" },
    { taluk_code: 3768, taluk: "Parseoni" },
    { taluk_code: 3769, taluk: "Ramtek" },
    { taluk_code: 3770, taluk: "Saoner" },
    { taluk_code: 3771, taluk: "Umred" },
  ],

  // ============ UTTAR PRADESH ============
  // Lucknow - 150
  150: [
    { taluk_code: 1500, taluk: "Lucknow" },
    { taluk_code: 1501, taluk: "Mohanlalganj" },
    { taluk_code: 1502, taluk: "Malihabad" },
    { taluk_code: 1503, taluk: "Bakshi Ka Talab" },
  ],

  // Kanpur Nagar - 144
  144: [
    { taluk_code: 1440, taluk: "Kanpur Nagar" },
    { taluk_code: 1441, taluk: "Ghatampur" },
    { taluk_code: 1442, taluk: "Bilhaur" },
  ],

  // Agra - 101
  101: [
    { taluk_code: 1010, taluk: "Agra" },
    { taluk_code: 1011, taluk: "Kiraoli" },
    { taluk_code: 1012, taluk: "Kheragarh" },
    { taluk_code: 1013, taluk: "Fatehabad" },
    { taluk_code: 1014, taluk: "Bah" },
    { taluk_code: 1015, taluk: "Shamshabad" },
    { taluk_code: 1016, taluk: "Etmadpur" },
  ],

  // Allahabad (Prayagraj) - 103
  103: [
    { taluk_code: 1030, taluk: "Sadar" },
    { taluk_code: 1031, taluk: "Phulpur" },
    { taluk_code: 1032, taluk: "Handia" },
    { taluk_code: 1033, taluk: "Meja" },
    { taluk_code: 1034, taluk: "Karchhana" },
    { taluk_code: 1035, taluk: "Bara" },
    { taluk_code: 1036, taluk: "Soraon" },
    { taluk_code: 1037, taluk: "Karaj" },
  ],

  // ============ GUJARAT ============
  // Ahmedabad - 180
  180: [
    { taluk_code: 1800, taluk: "City" },
    { taluk_code: 1801, taluk: "Daskroi" },
    { taluk_code: 1802, taluk: "Detroj-Rampura" },
    { taluk_code: 1803, taluk: "Dholka" },
    { taluk_code: 1804, taluk: "Bavla" },
    { taluk_code: 1805, taluk: "Ranpur" },
    { taluk_code: 1806, taluk: "Viramgam" },
  ],

  // Surat - 208
  208: [
    { taluk_code: 2080, taluk: "City" },
    { taluk_code: 2081, taluk: "Chorasi" },
    { taluk_code: 2082, taluk: "Palsana" },
    { taluk_code: 2083, taluk: "Bardoli" },
    { taluk_code: 2084, taluk: "Mahuva" },
    { taluk_code: 2085, taluk: "Kamrej" },
    { taluk_code: 2086, taluk: "Olpad" },
    { taluk_code: 2087, taluk: "Mangrol" },
    { taluk_code: 2088, taluk: "Umargam" },
  ],

  // Vadodara - 211
  211: [
    { taluk_code: 2110, taluk: "Vadodara City" },
    { taluk_code: 2111, taluk: "Waghodia" },
    { taluk_code: 2112, taluk: "Dabhoi" },
    { taluk_code: 2113, taluk: "Padra" },
    { taluk_code: 2114, taluk: "Karjan" },
    { taluk_code: 2115, taluk: "Sinor" },
    { taluk_code: 2116, taluk: "Savli" },
    { taluk_code: 2117, taluk: "Jetpur Pavi" },
  ],

  // Rajkot - 206
  206: [
    { taluk_code: 2060, taluk: "Rajkot" },
    { taluk_code: 2061, taluk: "Gondal" },
    { taluk_code: 2062, taluk: "Dhoraji" },
    { taluk_code: 2063, taluk: "Upleta" },
    { taluk_code: 2064, taluk: "Kotda Sangani" },
    { taluk_code: 2065, taluk: "Jasdan" },
    { taluk_code: 2066, taluk: "Paddhari" },
    { taluk_code: 2067, taluk: "Morbi" },
    { taluk_code: 2068, taluk: "Tankara" },
    { taluk_code: 2069, taluk: "Wankaner" },
    { taluk_code: 2070, taluk: "Lodhika" },
  ],

  // ============ RAJASTHAN ============
  // Jaipur - 229
  229: [
    { taluk_code: 2290, taluk: "Jaipur" },
    { taluk_code: 2291, taluk: "Amer" },
    { taluk_code: 2292, taluk: "Phagi" },
    { taluk_code: 2293, taluk: "Dudu" },
    { taluk_code: 2294, taluk: "Mauzamabad" },
    { taluk_code: 2295, taluk: "Amber" },
    { taluk_code: 2296, taluk: "Jamwa Ramgarh" },
    { taluk_code: 2297, taluk: "Kotputli" },
    { taluk_code: 2298, taluk: "Viratnagar" },
  ],

  // Jodhpur - 234
  234: [
    { taluk_code: 2340, taluk: "Jodhpur" },
    { taluk_code: 2341, taluk: "Bilara" },
    { taluk_code: 2342, taluk: "Luni" },
    { taluk_code: 2343, taluk: "Bap" },
    { taluk_code: 2344, taluk: "Phalodi" },
    { taluk_code: 2345, taluk: "Osian" },
    { taluk_code: 2346, taluk: "Shergarh" },
  ],

  // Udaipur - 245
  245: [
    { taluk_code: 2450, taluk: "Udaipur" },
    { taluk_code: 2451, taluk: "Girwa" },
    { taluk_code: 2452, taluk: "Gogunda" },
    { taluk_code: 2453, taluk: "Kotra" },
    { taluk_code: 2454, taluk: "Kherwara" },
    { taluk_code: 2455, taluk: "Mavli" },
    { taluk_code: 2456, taluk: "Rishabhdeo" },
    { taluk_code: 2457, taluk: "Sarada" },
    { taluk_code: 2458, taluk: "Vallabhnagar" },
    { taluk_code: 2459, taluk: "Bhinder" },
    { taluk_code: 2460, taluk: "Lasadiya" },
  ],

  // Ajmer - 213
  213: [
    { taluk_code: 2130, taluk: "Ajmer" },
    { taluk_code: 2131, taluk: "Beawar" },
    { taluk_code: 2132, taluk: "Kekri" },
    { taluk_code: 2133, taluk: "Kishangarh" },
    { taluk_code: 2134, taluk: "Nasirabad" },
    { taluk_code: 2135, taluk: "Pisangan" },
    { taluk_code: 2136, taluk: "Pushkar" },
    { taluk_code: 2137, taluk: "Sarwar" },
  ],

  // Kota - 236
  236: [
    { taluk_code: 2360, taluk: "Kota" },
    { taluk_code: 2361, taluk: "Ladpura" },
    { taluk_code: 2362, taluk: "Pipalda" },
    { taluk_code: 2363, taluk: "Sultanpur" },
    { taluk_code: 2364, taluk: "Digod" },
  ],
};
export const getTaluksByDistrict = async (districtCode: number): Promise<Taluk[]> => {
  console.log('🔍 Getting taluks for district code:', districtCode);
  try {
    const response = await fetch(`${API_BASE_URL}/api/taluks/${districtCode}`);
    if (response.ok) {
      const data = await response.json();
      console.log('✅ API returned taluks:', data);
      return data;
    }
    throw new Error('API not available');
  } catch (error) {
    console.log('⚠️ API failed, using fallback taluk data for district:', districtCode);
    // Return taluks from comprehensive fallback data
    const taluks = fallbackTaluks[districtCode] || [];
    console.log('📋 Fallback taluks found:', taluks.length > 0 ? taluks : 'No taluks available for this district');
    return taluks;
  }
};

export const getVillagesByTaluk = async (talukCode: number): Promise<Village[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/villages/${talukCode}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error('API not available');
  } catch (error) {
    console.log('Using fallback village data for taluk:', talukCode);
    // Return some sample villages
    return [
      { village_code: talukCode * 100 + 1, village: "Sample Village 1" },
      { village_code: talukCode * 100 + 2, village: "Sample Village 2" },
      { village_code: talukCode * 100 + 3, village: "Sample Village 3" },
    ];
  }
};

// Helper function to format options for dropdowns
export const formatOptionsForDropdown = <T extends { [key: string]: any }>(
  items: T[],
  valueKey: string,
  labelKey: string
) => {
  return items.map(item => ({
    value: item[valueKey].toString(),
    label: item[labelKey]
  }));
};