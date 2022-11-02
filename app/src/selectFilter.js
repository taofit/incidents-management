import React from "react";
import { useState, useEffect } from "react";
import Select from "react-select";
import AsyncSelect from 'react-select/async';

const statusOptions = [
    { value: "open", label: "open"},
    { value: "closed", label: "closed"},
    { value: "all", label: "all"},
  ]
  
  const customStyles = {
    option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted pink',
        color: state.isSelected ? 'white' : 'black',
        padding: 7,
        background: '#494949',
      }),
    control: () => ({
        background: '#494949',
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';
        const color = '#fff';
        return { ...provided, opacity, transition, color };
    },
    input: () => ({
        color: 'black',
    }),
  }
  
  const App = ({onSelectChange}) => {
    const [cinemaInputValue, setCinemaInputValue] = useState('');
    const [selectedCinema, setSelectedCinema] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
 
    const handleCinemaInputChange = value => {
        setCinemaInputValue(value);
    };
 
    const handleCinemaChange = cinema => {
        setSelectedCinema(cinema);
        onSelectChange(cinema, selectedStatus)
    }

    const handleStatusChange = status => {
        setSelectedStatus(status)
        onSelectChange(selectedCinema, status)
    }
    const loadOptions = (inputValue) => {
        if (inputValue.length > 0) {
            return fetch(`http://localhost:4000/incidents/cinema/${inputValue}`).then(res => res.json());
        }
        return []
    };

    return (<div className="select">
                <div>
                <span>Cinema</span>
                <AsyncSelect 
                    cacheOptions
                    defaultOptions
                    className="react-select-container" 
                    classNamePrefix="react-select"
                    styles={customStyles}
                    loadOptions={loadOptions}
                    getOptionLabel={e => e.label}
                    getOptionValue={e => e.value}
                    onInputChange={handleCinemaInputChange}
                    onChange={handleCinemaChange}
                    />
                </div>
                <div>
                <span>Status</span>
                <Select 
                    className="react-select-container" 
                    classNamePrefix="react-select"
                    options={statusOptions} 
                    styles={customStyles} 
                    onChange={handleStatusChange}
                    isSearchable={false}
                    />
                </div>
            </div>)
}

export default App;