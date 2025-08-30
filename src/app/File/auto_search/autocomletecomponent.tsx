import React, {FormEvent, useCallback, useState} from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

import {useAutocompleteSuggestions} from './search_hook';

interface Props {
  onPlaceSelect: (place: google.maps.places.Place | null) => void;
}

export const AutocompleteCustom = ({onPlaceSelect}: Props) => {
  const places = useMapsLibrary('places');

  const [inputValue, setInputValue] = useState<string>('');
  const {suggestions, resetSession} = useAutocompleteSuggestions(inputValue);

  const handleInput = useCallback((event: FormEvent<HTMLInputElement>) => {
    setInputValue((event.target as HTMLInputElement).value);
  }, []);

  const handleSuggestionClick = useCallback(
    async (suggestion: google.maps.places.AutocompleteSuggestion) => {
      if (!places) return;
      if (!suggestion.placePrediction) return;

      const place = suggestion.placePrediction.toPlace();

      await place.fetchFields({
        fields: [
          'viewport',
          'location',
          'svgIconMaskURI',
          'iconBackgroundColor'
        ]
      });

      setInputValue('');

      // calling fetchFields invalidates the session-token, so we now have to call
      // resetSession() so a new one gets created for further search
      resetSession();

      onPlaceSelect(place);
    },
    [places, onPlaceSelect]
  );

  return (
    <div className="p-2">
       <input
      className=" bg-white h-8  
      w-full
      min-w-[14rem]
      px-5 outline-none focus:border-[#A29BFE]"
        value={inputValue}
        onInput={event => handleInput(event)}
        placeholder="Search for a place"
      />


      {suggestions.length > 0 && (
        <ul className="">
          {suggestions.map((suggestion, index) => {
            return (
              <li
                key={index}
                className=" 
                p-3
                h-8 bg-white/80
                
                "
                onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion.placePrediction?.text.text}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};