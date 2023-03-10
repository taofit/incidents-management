import React from "react";
import { useState, useEffect, useRef } from "react";
import Select from "react-select";
import AsyncSelect from 'react-select/async';

const statusOptions = [
    { value: "open", label: "open"},
    { value: "closed", label: "closed"},
    { value: "progress", label: "progress"},
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
    const selectRef = useRef(null);

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
        if (inputValue.trim().length > 0) {
            return fetch(`http://localhost:4000/incidents/cinema/${inputValue}`).then(res => res.json());
        }
        return []
    };
    const clearValue = () => {
        selectRef.current.clearValue();
    }

    return (<div className="select">
                <AsyncSelect 
                    placeholder={'Cinema'}
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
                    ref={selectRef}
                    />
                <button onClick={clearValue}>clear</button>
                <Select 
                    placeholder={'Status'}
                    className="react-select-container" 
                    classNamePrefix="react-select"
                    options={statusOptions} 
                    styles={customStyles} 
                    onChange={handleStatusChange}
                    isSearchable={false}
                    />
            </div>)
}

export default App;