// Translation utilities for dynamic data
import { useTranslation } from 'react-i18next';

// Gender translations
export const translateGender = (gender: string, currentLanguage: string) => {
  if (currentLanguage === 'en') return gender;
  
  const genderTranslations: { [key: string]: string } = {
    'male': 'പുരുഷൻ',
    'female': 'സ്ത്രീ', 
    'other': 'മറ്റുള്ളവ',
    'prefer_not_to_say': 'പറയാൻ ആഗ്രഹിക്കുന്നില്ല'
  };
  
  return genderTranslations[gender.toLowerCase()] || gender;
};

// State translations for Indian states
export const translateState = (state: string, currentLanguage: string) => {
  if (currentLanguage === 'en') return state;
  
  const stateTranslations: { [key: string]: string } = {
    // Major Indian states
    'Kerala': 'കേരളം',
    'Tamil Nadu': 'തമിഴ്നാട്',
    'Karnataka': 'കർണാടക',
    'Andhra Pradesh': 'ആന്ധ്രപ്രദേശ്',
    'Telangana': 'തെലങ്കാന',
    'Maharashtra': 'മഹാരാഷ്ട്ര',
    'Gujarat': 'ഗുജറാത്ത്',
    'Rajasthan': 'രാജസ്ഥാൻ',
    'Punjab': 'പഞ്ചാബ്',
    'Haryana': 'ഹരിയാണ',
    'Uttar Pradesh': 'ഉത്തർപ്രദേശ്',
    'Madhya Pradesh': 'മധ്യപ്രദേശ്',
    'Bihar': 'ബിഹാർ',
    'West Bengal': 'പശ്ചിമ ബംഗാൾ',
    'Odisha': 'ഒഡിശ',
    'Jharkhand': 'ജാർഖണ്ഡ്',
    'Chhattisgarh': 'ഛത്തീസ്ഗഡ്',
    'Assam': 'അസം',
    'Himachal Pradesh': 'ഹിമാചൽപ്രദേശ്',
    'Uttarakhand': 'ഉത്തരാഖണ്ഡ്',
    'Goa': 'ഗോവ',
    'Manipur': 'മണിപ്പൂർ',
    'Meghalaya': 'മേഘാലയ',
    'Tripura': 'ത്രിപുര',
    'Nagaland': 'നാഗാലാൻഡ്',
    'Mizoram': 'മിസോറാം',
    'Arunachal Pradesh': 'അരുണാചൽപ്രദേശ്',
    'Sikkim': 'സിക്കിം'
  };
  
  return stateTranslations[state] || state;
};

// Kerala district translations
export const translateDistrict = (district: string, currentLanguage: string) => {
  if (currentLanguage === 'en') return district;
  
  const districtTranslations: { [key: string]: string } = {
    // Kerala Districts
    'Thiruvananthapuram': 'തിരുവനന്തപുരം',
    'Kollam': 'കൊല്ലം',
    'Pathanamthitta': 'പത്തനംതിട്ട',
    'Alappuzha': 'ആലപ്പുഴ',
    'Kottayam': 'കോട്ടയം',
    'Idukki': 'ഇടുക്കി',
    'Ernakulam': 'എറണാകുളം',
    'Thrissur': 'തൃശൂർ',
    'Palakkad': 'പാലക്കാട്',
    'Malappuram': 'മലപ്പുറം',
    'Kozhikode': 'കോഴിക്കോട്',
    'Wayanad': 'വയനാട്',
    'Kannur': 'കണ്ണൂർ',
    'Kasaragod': 'കാസർഗോഡ്',
    
    // Tamil Nadu Districts
    'Chennai': 'ചെന്നൈ',
    'Coimbatore': 'കോയമ്പത്തൂർ',
    'Madurai': 'മധുര',
    'Salem': 'സേലം',
    'Tiruchirappalli': 'തിരുച്ചിറപ്പള്ളി',
    
    // Karnataka Districts  
    'Bangalore': 'ബെംഗളൂരു',
    'Mysore': 'മൈസൂർ',
    'Mangalore': 'മംഗളൂരു',
    'Hubli': 'ഹുബ്ലി'
  };
  
  return districtTranslations[district] || district;
};

// Taluk translations (focusing on Kerala taluks for now)
export const translateTaluk = (taluk: string, currentLanguage: string) => {
  if (currentLanguage === 'en') return taluk;
  
  const talukTranslations: { [key: string]: string } = {
    // Thiruvananthapuram
    'Thiruvananthapuram': 'തിരുവനന്തപുരം',
    'Chirayinkeezhu': 'ചിറയിൻകീഴ്',
    'Nedumangad': 'നെടുമങ്ങാട്',
    'Neyyattinkara': 'നെയ്യാറ്റിൻകര',
    
    // Kollam
    'Kollam': 'കൊല്ലം',
    'Karunagappally': 'കരുനാഗപ്പള്ളി',
    'Kunnathur': 'കുന്നത്തൂർ',
    'Kottarakkara': 'കോട്ടാരക്കര',
    'Punalur': 'പുനലൂർ',
    
    // Pathanamthitta
    'Adoor': 'ആദൂർ',
    'Kozhencherry': 'കോഴെഞ്ചേരി',
    'Thiruvalla': 'തിരുവല്ല',
    'Mallappally': 'മല്ലപ്പള്ളി',
    'Ranni': 'റാന്നി',
    
    // Alappuzha
    'Alappuzha': 'ആലപ്പുഴ',
    'Cherthala': 'ചേർത്തല',
    'Karthikappally': 'കാർത്തികപ്പള്ളി',
    'Kuttanad': 'കുട്ടനാട്',
    'Mavelikkara': 'മാവേലിക്കര',
    'Chengannur': 'ചെങ്ങന്നൂർ',
    
    // Kottayam
    'Kottayam': 'കോട്ടയം',
    'Changanassery': 'ചങ്ങനാശ്ശേരി',
    'Kanjirappally': 'കാഞ്ഞിറപ്പള്ളി',
    'Meenachil': 'മീനച്ചിൽ',
    'Vaikom': 'വൈക്കം',
    
    // Idukki
    'Devikulam': 'ദേവികുളം',
    'Peermade': 'പീരുമേട്',
    'Udumbanchola': 'ഉടുമ്പൻചോല',
    'Thodupuzha': 'തൊടുപുഴ',
    
    // Ernakulam
    'Ernakulam': 'എറണാകുളം',
    'Fort Kochi': 'ഫോർട്ട് കൊച്ചി',
    'Kanayannur': 'കനയന്നൂർ',
    'Kochi': 'കൊച്ചി',
    'Kothamangalam': 'കോതമംഗലം',
    'Kunnathunad': 'കുന്നത്തുനാട്',
    'Muvattupuzha': 'മുവറ്റുപുഴ',
    'North Paravur': 'നോർത്ത് പറവൂർ',
    'Vypeen': 'വൈപ്പിൻ',
    'Aluva': 'അലുവ',
    'Perumbavoor': 'പെരുമ്പാവൂർ',
    'Angamaly': 'അങ്കമാലി',
    
    // Thrissur
    'Thrissur': 'തൃശൂർ',
    'Chalakudy': 'ചാലക്കുടി',
    'Chavakkad': 'ചാവക്കാട്',
    'Kodungallur': 'കൊടുങ്ങല്ലൂർ',
    'Kunnamkulam': 'കുന്നംകുളം',
    'Manalur': 'മാനലൂർ',
    'Ollur': 'ഒല്ലൂർ',
    'Thalapilly': 'തലപ്പിള്ളി',
    'Irinjalakuda': 'ഇരിഞ്ഞാലക്കുട',
    
    // Palakkad
    'Palakkad': 'പാലക്കാട്',
    'Alathur': 'ആലത്തൂർ',
    'Chittur': 'ചിറ്റൂർ',
    'Mannarkkad': 'മന്നാർക്കാട്',
    'Ottappalam': 'ഓട്ടപ്പാലം',
    'Pattambi': 'പറ്റാമ്പി',
    
    // Malappuram
    'Tirur': 'തിരൂർ',
    'Tirurangadi': 'തിരുരങ്ങാടി',
    'Ponnani': 'പൊന്നാനി',
    'Nilambur': 'നിലമ്പൂർ',
    'Manjeri': 'മഞ്ചേരി',
    'Malappuram': 'മലപ്പുറം',
    'Kondotty': 'കൊണ്ടോട്ടി',
    'Perinthalmanna': 'പെരിന്തൽമണ്ണ',
    'Vengara': 'വേങ്ങര',
    
    // Kozhikode
    'Kozhikode': 'കോഴിക്കോട്',
    'Koyilandy': 'കൊയിലാണ്ടി',
    'Vatakara': 'വടകര',
    'Thamarassery': 'താമരശേരി',
    
    // Wayanad
    'Mananthavady': 'മാനന്തവാടി',
    'Sulthan Bathery': 'സുൽത്താൻ ബത്തേരി',
    'Vythiri': 'വൈത്തിരി',
    
    // Kannur
    'Kannur': 'കണ്ണൂർ',
    'Taliparamba': 'തലിപ്പറമ്പ്',
    'Iritty': 'ഇരിട്ടി',
    'Thalassery': 'തലശേരി',
    'Payyanur': 'പയ്യന്നൂർ',
    
    // Kasaragod
    'Kasaragod': 'കാസർഗോഡ്',
    'Hosdurg': 'ഹൊസ്ദുർഗ്',
    'Vellarikundu': 'വെള്ളരിക്കുണ്ട്'
  };
  
  return talukTranslations[taluk] || taluk;
};

// Hook to get all translation functions
export const useDataTranslations = () => {
  const { i18n } = useTranslation();
  
  return {
    translateGender: (gender: string) => translateGender(gender, i18n.language),
    translateState: (state: string) => translateState(state, i18n.language),
    translateDistrict: (district: string) => translateDistrict(district, i18n.language),
    translateTaluk: (taluk: string) => translateTaluk(taluk, i18n.language)
  };
};