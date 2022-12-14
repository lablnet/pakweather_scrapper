import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
// import CitySelector from './components/CitySelector';
import Home from './Home';
import Weather from './Weather';

class App extends React.Component {

  render() {

    return (
      <div className='mx-auto p-4 bg-gray-400 h-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-101'>
          <div className="col-span-1">
            <h1 className='text-semibold text-3xl mx-2 p-2'>
              <Link to='/'>Pakistan Weather</Link>
            </h1>
          </div>
          {/* <div className='col-span-1'>
            <CitySelector />
          </div> */}
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather/:country" element={<Weather />} />
        </Routes>
      </div>
    );
  }
}

export default App;
