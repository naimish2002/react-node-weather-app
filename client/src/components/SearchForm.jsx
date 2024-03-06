import { Button, Input } from '@chakra-ui/react';
import { LocateFixed, MapPin } from 'lucide-react';

// Component for search form
const SearchForm = ({
  location,
  handleChange,
  handleSubmit,
  handleCurrentLocation,
}) => (
  <div className='w-full lg:w-[80%] mx-auto flex justify-between lg:gap-x-10 gap-x-5'>
    <form
      className='flex items-center gap-x-2 bg-[#1c1c1e] p-2 rounded-full flex-1'
      onSubmit={handleSubmit}>
      <MapPin className='w-5 h-5 text-zinc-400' />
      <button type='submit' className='w-full'>
        <Input
          type='text'
          placeholder='Enter city name'
          className='w-full bg-transparent outline-none placeholder:text-zinc-400'
          value={location}
          onChange={handleChange}
        />
      </button>
    </form>
    <div className='flex items-center justify-end w-fit'>
      <Button
        type='button'
        className='flex gap-x-2 px-4 py-2 bg-emerald-600 rounded-full'
        onClick={handleCurrentLocation}>
        <LocateFixed className='w-5 h-5' />
        <span className='text-sm hidden lg:block'>Current Location</span>
      </Button>
    </div>
  </div>
);

export default SearchForm;
