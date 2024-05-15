import React, { useState, useRef, useEffect } from 'react';
import './styles.css';
import { HolidayTypes } from 'components/HolidayTypes';
import { JournalistCard } from 'components/JournalistCard';
import { journalists } from '../Destinations/constants'
import { ItineraryHeading } from 'components/ItineraryHeading';
import { AzureKeyCredential, OpenAIClient } from '@azure/openai';
import { Loading } from 'components/Loading'; 


export const CountrySelection = ({ country, selectedBudget, selectedDuration, selectedItems, selectedMonth }) => {
  const [activeButton, setActiveButton] = useState(null);
  const [showHolidayTypes, setShowHolidayTypes] = useState(false);
  const [holidayType, setSelectedHolidayType] = useState(null);
  const holidaySelectionRef = useRef(null);
  const intineraryHeadingRef = useRef(null);
  const [holidayTypesAiResponse, setHolidayTypesAiResponse] = useState('');
  const [holidayTypes, setHolidayTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const endpoint = process.env.REACT_APP_AZURE_OPENAI_ENDPOINT;
  const azureApiKey = process.env.REACT_APP_AZURE_OPENAI_API_KEY;

  const systemPrompt = {
    role: 'system',
    content: `You are a travel agent that takes information based on the users choices. You need to suggest 5 different types of holidays that would be suitable for ${country}, along with a brief description of each holiday type in 15 words.`,
  };

  const handleHolidayTypesAiRequest = async () => {
    setIsLoading(true);
    const userMessage = {
      role: 'user',
      content: `The user has selected ${country} as their destination. Please suggest 5 different types of holidays that would be suitable for this country, along with a brief description of each holiday type in 15 words. Please provide the response in the following JSON format:

    [
      {
        "holidayType": "Holiday Type 1",
        "description": "Description of Holiday Type 1"
      },
      {
        "holidayType": "Holiday Type 2",
        "description": "Description of Holiday Type 2"
      },
      {
        "holidayType": "Holiday Type 3",
        "description": "Description of Holiday Type 3"
      },
      {
        "holidayType": "Holiday Type 4",
        "description": "Description of Holiday Type 4"
      },
      {
        "holidayType": "Holiday Type 5",
        "description": "Description of Holiday Type 5"
      }
    ]`,
  };
  
    try {
      const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
      const deploymentId = 'gpt4';
      const messages = [systemPrompt, userMessage];
      const result = await client.getChatCompletions(deploymentId, messages);
      const aiResponse = result.choices[0].message.content;
      setHolidayTypesAiResponse(aiResponse);
      setIsLoading(false);
      console.log(holidayTypesAiResponse)
      console.log('AI response holiday types:', aiResponse)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (holidayTypesAiResponse) {
      try {
        const holidayTypes = JSON.parse(holidayTypesAiResponse);
        const formattedHolidayTypes = holidayTypes.map((holidayType, index) => ({
          id: index + 1,
          holidayType: holidayType.holidayType,
          description: holidayType.description,
        }));
        setHolidayTypes(formattedHolidayTypes);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }
  }, [holidayTypesAiResponse]);


  const transportOptions = [
    'Rental car',
    'Coach',
    'Public transport',
    'Private driver',
    'Other',
    'Not sure',
  ];

  const handleHolidaySelection = (holidayType) => {
    setSelectedHolidayType(holidayType);
  };

  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex === activeButton ? null : buttonIndex);
    setShowHolidayTypes(true);
    handleHolidayTypesAiRequest();
  };
  useEffect(() => {
    if (showHolidayTypes && !isLoading) {
      setTimeout(() => {
        holidaySelectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 0);
    }
  }, [showHolidayTypes, isLoading]);

  // useEffect(() => {
  //   if (holidayType && !isLoading) {
  //     intineraryHeadingRef.current.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }, [holidayType, isLoading]);

  useEffect(() => {
    if (holidayType) {
      intineraryHeadingRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [holidayType])

  return (
    <>
      <div className='selectedCountryHeadingContainer'>
        <h2 className='selectedCountryHeading'>
          {`Great Choice! ${country} has some of the most beautiful scenery in the world`}
        </h2>
        <h3 className='selectedCountrySubheading'>
          {`There is so much to see and do in ${country}, it offers many different travel experiences`}
        </h3>
        <h2 className='transportText'>
          To receive personalised holiday recommendations tailored just for you, kindly specify your preferred mode of transportation
        </h2>
        <div className='selectedTransportContainer'>
          {transportOptions.map((option, index) => (
            <button
              key={index}
              className={`transportButtons ${activeButton === index ? 'active' : ''}`}
              onClick={() => handleButtonClick(index)}
            >
              {option}
            </button>
          ))}
        </div>
        <div className='holidayTypesContainer'>
          {isLoading ? (
            <Loading />
          ) : (
            showHolidayTypes &&
            holidayTypes.map((holidayType) => (
              <HolidayTypes
                key={holidayType.id}
                country={country}
                holidayType={holidayType.holidayType}
                description={holidayType.description}
                onSelect={handleHolidaySelection}
              />
            ))
          )}
        </div>
        {!isLoading && (
          <div>
            {showHolidayTypes && (
              <div className='journalistCardContainer' ref={holidaySelectionRef}>
                {journalists.map((journalist) => (
                  <JournalistCard
                    key={journalist.id}
                    country={country}
                    name={journalist.name}
                    title={journalist.title}
                    image={journalist.image}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {!isLoading && holidayType && (
        <div className='itineraryHeadingContainer' ref={intineraryHeadingRef}>
          <ItineraryHeading selectedHolidayType={holidayType} country={country} selectedMonth={selectedMonth}
            selectedDuration={selectedDuration}
            selectedItems={selectedItems}
            selectedBudget={selectedBudget}/>
        </div>
      )}
    </>
  );
};