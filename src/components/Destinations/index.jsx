import React, { useState, useRef, useEffect } from 'react';
import './styles.css';
import { DestinationCards } from 'components/DestinationCards';
import { JournalistCard } from 'components/JournalistCard';
import timesFavicon from '../../assets/timesFavicon.svg';
import { journalists } from './constants';
import { GenerateButton } from 'components/GenerateButton';
import { CountrySelection } from 'components/CountrySelection';


export const Destinations = ({ selectedMonth, aiResponse, selectedItems, selectedDuration, selectedBudget, onRegenerate }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const countrySelectionRef = useRef(null);

  useEffect(() => {
    if (selectedCountry) {
      countrySelectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (aiResponse) {
      const countryRegex = /\b(Afghanistan|Albania|Algeria|Andorra|Angola|Antigua and Barbuda|Argentina|Armenia|Australia|Austria|Azerbaijan|Bahamas|Bahrain|Bangladesh|Barbados|Belarus|Belgium|Belize|Benin|Bhutan|Bolivia|Bosnia and Herzegovina|Botswana|Brazil|Brunei|Bulgaria|Burkina Faso|Burundi|Cabo Verde|Cambodia|Cameroon|Canada|Central African Republic|Chad|Chile|China|Colombia|Comoros|Congo|Costa Rica|Croatia|Cuba|Cyprus|Czech Republic|Denmark|Djibouti|Dominica|Dominican Republic|Ecuador|Egypt|El Salvador|Equatorial Guinea|Eritrea|Estonia|Eswatini|Ethiopia|Fiji|Finland|France|Gabon|Gambia|Georgia|Germany|Ghana|Greece|Grenada|Guatemala|Guinea|Guinea-Bissau|Guyana|Haiti|Honduras|Hungary|Iceland|India|Indonesia|Iran|Iraq|Ireland|Israel|Italy|Jamaica|Japan|Jordan|Kazakhstan|Kenya|Kiribati|Kosovo|Kuwait|Kyrgyzstan|Laos|Latvia|Lebanon|Lesotho|Liberia|Libya|Liechtenstein|Lithuania|Luxembourg|Madagascar|Malawi|Malaysia|Maldives|Mali|Malta|Marshall Islands|Mauritania|Mauritius|Mexico|Micronesia|Moldova|Monaco|Mongolia|Montenegro|Morocco|Mozambique|Myanmar|Namibia|Nauru|Nepal|Netherlands|New Zealand|Nicaragua|Niger|Nigeria|North Korea|North Macedonia|Norway|Oman|Pakistan|Palau|Palestine|Panama|Papua New Guinea|Paraguay|Peru|Philippines|Poland|Portugal|Qatar|Romania|Russia|Rwanda|Saint Kitts and Nevis|Saint Lucia|Saint Vincent and the Grenadines|Samoa|San Marino|Sao Tome and Principe|Saudi Arabia|Senegal|Serbia|Seychelles|Sierra Leone|Singapore|Slovakia|Slovenia|Solomon Islands|Somalia|South Africa|South Korea|South Sudan|Spain|Sri Lanka|Sudan|Suriname|Sweden|Switzerland|Syria|Taiwan|Tajikistan|Tanzania|Thailand|Timor-Leste|Togo|Tonga|Trinidad and Tobago|Tunisia|Turkey|Turkmenistan|Tuvalu|Uganda|Ukraine|United Arab Emirates|United Kingdom|United States|Uruguay|Uzbekistan|Vanuatu|Vatican City|Venezuela|Vietnam|Yemen|Zambia|Zimbabwe)\b/gi;
      const continentRegex = /\b(Europe|South America|Africa|North America|Asia|Oceania)\b/gi;

      const countryMatches = aiResponse.match(countryRegex);
      const continentMatches = aiResponse.match(continentRegex);

      const countries = countryMatches ? countryMatches.slice(0, 5) : [];
      const continents = continentMatches ? continentMatches.slice(0, 5) : [];

      const destinations = countries.map((country, index) => ({
        country,
        continent: continents[index],
      }));

      setDestinations(destinations);
    }
  }, [aiResponse]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  const handleRegenerate = () => {
    console.log("hit")
    onRegenerate();
  }

  return (
    <>
      <div className='destinationContainer'>
        <div className='destinationHeadingContainer'>
          <h2 className='destinationHeading'>
            {`Great! Here are some amazing destinations for a relaxing trip in ${selectedMonth}`}
          </h2>
          <h3 className='destinationSubHeading'>
            Select any of the below destinations that are of interest to you to refine your trip, you can save your progress for later!
          </h3>
        </div>
        <div className='destinationSuggestionContainer'>
          {destinations.map((destination, index) => (
            <DestinationCards
              key={index}
              continent={destination.continent}
              country={destination.country}
              onSelect={handleCountrySelect}
            />
          ))}
        </div>
      </div>
      <div className='suggestionMessage'>
        <img src={timesFavicon} className='timesFavicon' alt='The Times Favicon' style={{ width: '16px', height: '16px' }} />
        <h3 className='suggestionHeading'>
          Suggestions created through sources from The Times and Sunday Times Journalists
        </h3>
      </div>
      <div className='journalistCardContainer'>
        {journalists.map((journalist, index) => (
          <JournalistCard key={index} name={journalist.name} title={journalist.title} image={journalist.image} />
        ))}
      </div>
      <div className='generateSaveContainer'>
        <GenerateButton onClick={handleRegenerate}/>
      </div>
      <div className='selectedCountryHeadingContainer' ref={countrySelectionRef}>
        {selectedCountry && <CountrySelection country={selectedCountry} selectedMonth={selectedMonth}
            selectedDuration={selectedDuration}
            selectedItems={selectedItems}
            selectedBudget={selectedBudget}
            aiResponse={aiResponse} />}
      </div>
    </>
  );
};