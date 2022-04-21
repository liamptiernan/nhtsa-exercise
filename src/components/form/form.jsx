import './form.css';
import Select from 'react-select';
import { useState } from 'react';


function InputForm(props) {
  const [yearInputClass, setYearInputClass] = useState('hideYearInput');
  const [useYear, setUseYear] = useState(false);

  const {
    types,
    makes,
    selectedType,
    selectedMakes,
    year,
    handleTypeChange,
    handleMakeChange,
    handleYearChange,
    handleSubmit,
    isLoading,
    submitted
  } = props;

  const buildOptions = (field) => {
    if (field === 'type') {
      return types.map(type => {
        return {
          value: type,
          label: type
        }
      })
    } else if (field === 'make') {
      return makes.map(make => {
        return {
          value: make,
          label: make
        }
      })
    } else if (field === 'year') {
      let year = 1996;
      const currentYear = new Date().getFullYear();
      const yearOptions = [];
      while (year <= currentYear + 2) {
        yearOptions.push({
          value: year,
          label: year
        });
        year++;
      }

      return yearOptions;
    }

    return [];
  }

  const handleYearToggle = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setYearInputClass('yearInput');
      setUseYear(true);
    } else {
      handleYearChange({});
      setYearInputClass('hideYearInput');
      setUseYear(false);
    }
  }

  const submitButton = () => {
    let className = 'submitButton';
    let disabled = false;
    let text = 'Submit';

    if (!selectedType || selectedMakes.length === 0 || submitted) {
      disabled = true;
    } else if (useYear && !year.value) {
      disabled = true;
    } else if (isLoading) {
      text = 'Loading';
      disabled = true;
    }

    return (
      <button
        className={className}
        type='submit'
        disabled={disabled}>
          {text}
      </button>
    )
  }

  return (
    <form className='formContainer' onSubmit={handleSubmit}>
      <div className='selectorSubgroup'>
        <Select
          className='vehicleInput'
          classNamePrefix='field'
          placeholder='Vehicle Type'
          onChange={e => handleTypeChange(e)}
          options={buildOptions('type')}
          value={selectedType}
        />
        <Select
          className='vehicleInput'
          classNamePrefix='field'
          isMulti={true}
          placeholder='Make'
          onChange={e => handleMakeChange(e)}
          options={buildOptions('make')}
          value={selectedMakes}
        />
      </div>
      <div className='selectorSubgroup'>
        <div className='yearSelector'>
          <label>Use Year?</label>
          <input type="checkbox" onChange={handleYearToggle}/>
        </div>
        <Select
          className={yearInputClass}
          classNamePrefix='field'
          placeholder='Year'
          onChange={e => handleYearChange(e)}
          options={buildOptions('year')}
          value={year}
        />
        {submitButton()}
      </div>
    </form>
  )
}

export default InputForm;
