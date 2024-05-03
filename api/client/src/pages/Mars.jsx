import React, { useState } from 'react';
import axios from 'axios';

const MarsRoverImageGrid = () => {
  const [rover, setRover] = useState('curiosity');
  const [sol, setSol] = useState('0');
  const [camera, setCamera] = useState('');
  const [cam, setCam] = useState('fhaz');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    const NASA_KEY = import.meta.env.VITE_NASA_SECRET_KEY;
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`, {
        params: {
          sol,
          camera : cam,
          api_key: NASA_KEY,
        },
      });
      console.log('Response:', response.data);
      setImages(response.data.photos);

    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mx-auto">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <label className="flex flex-col w-60">
              <span className="text-white">Rover:</span>
              <select
                value={rover}
                onChange={(e) => setRover(e.target.value)}
                className="text-black mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="curiosity">Curiosity</option>
                <option value="opportunity">Opportunity</option>
                <option value="spirit">Spirit</option>
              </select>
            </label>
          </div>
          <div className="">
            <label className="flex flex-col">
              <span className="text-white">Sol:</span>
              <input
                type="text"
                value={sol}
                onChange={(e) => setSol(e.target.value)}
                className="text-black mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
          </div>
          <div className="">
            <label className="flex flex-col w-60">
              <span className="text-white">Camera:</span>
              <select
                value={cam}
                onChange={(e) => setCam(e.target.value)}
                className="text-black mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="fhaz">Front Hazard Avoidance Camera</option>
                <option value="RHAZ">Rear Hazard Avoidance Camera</option>
                <option value="MAST">Mast Camera</option>
                <option value="CHEMCAM">Chemistry and Camera Complex</option>
                <option value="MAHLI">Mars Hand Lens Imager</option>
                <option value="MARDI">Mars Descent Imager</option>
                <option value="NAVCAM">Navigation Camera</option>
                <option value="PANCAM">Panoramic Camera</option>
                <option value="MINITES">Miniature Thermal Emission Spectrometer (Mini-TES)</option>
              </select>
            </label>
          </div>
          <button
            type="submit"
            className="inline-block bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-300"
          >
            {loading ? 'Loading...' : 'Search'}
          </button>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {images.map((image) => (
          <div key={image.id}>
            <img
              src={image.img_src}
              alt={`Mars Rover - ${image.id}`}
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarsRoverImageGrid;
