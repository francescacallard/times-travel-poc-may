import React from 'react';
import { TimesChat } from 'components/TimesChat';
import { Suggestions } from 'components/Suggestions';
import './styles.css';

export const CountrySelection = ({ country }) => {
  return (
    <div className='selectedCountryHeadingContainer'>
      <TimesChat />
      <h2 className='selectedCountryHeading'>
        {`Great Choice! ${country} has some of the most beautiful scenery in the world. Select your ideal holiday type, and we'll find the perfect trip for you!`}
      </h2>
      <div className='suggestionsContainerCountry'>
      <Suggestions />
      </div>
    </div>
  );
};