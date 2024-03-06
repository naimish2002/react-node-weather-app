import { Radio, RadioGroup } from '@chakra-ui/react';

// Component for selecting temperature unit
const TemperatureUnitSelector = ({ unit, setUnit }) => (
  <div className='flex justify-evenly'>
    <RadioGroup onChange={setUnit} value={unit} className='flex gap-x-5'>
      <Radio value='metric'>
        <span
          className={`${
            unit === 'metric' && 'bg-emerald-600 px-2 py-1 rounded-full'
          }`}>
          °C
        </span>
      </Radio>
      <Radio value='imperial'>
        <span
          className={`${
            unit === 'imperial' && 'bg-emerald-600 px-2 py-1 rounded-full'
          }`}>
          °F
        </span>
      </Radio>
    </RadioGroup>
  </div>
);

export default TemperatureUnitSelector;
