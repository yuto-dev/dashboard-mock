// src/pages/MyNewPage.js
import React from 'react';
import {Link} from 'react-router-dom'
import TitleCard from '../components/Cards/TitleCard';

function Menu() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card w-full max-w-4xl bg-base-100 rounded-xl shadow-xl p-6">
      <div className="pt-8 pb-16 px-16">
          <img src="./Logodagri.png" alt="PKB" className="w-full h-full object-cover rounded-lg" />
        </div>
        {/* <h1 className="text-3xl font-bold mb-6 text-center">Main Menu</h1> */}
        <div className="p-4">
        <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
          {/* Button 1 */}
          <div className="flex flex-col items-center text-center">
            <Link to="/app/pkb">
              <button className="btn btn-primary w-full h-full p-0">
                <img src="./car.jpeg" alt="PKB" className="w-full h-full object-cover rounded-lg" />
              </button>
            </Link>
            <span className="text-lg">PKB</span>
          </div>
          {/* Button 2 */}
          <div className="flex flex-col items-center text-center">
            <Link to="/app/bbnkb">
              <button className="btn btn-secondary w-full h-full p-0">
                <img src="./bike.jpeg" alt="BBNKB" className="w-full h-full object-cover rounded-lg" />
              </button>
            </Link>
            <span className="text-lg">BBNKB</span>
          </div>
          {/* Button 3 */}
          <div className="flex flex-col items-center text-center">
            <Link to="/app/mblb">
              <button className="btn btn-accent w-full h-full p-0">
                <img src="./hihiirokane.jpeg" alt="MBLB" className="w-full h-full object-cover rounded-lg" />
              </button>
              </Link>
            <span className="text-lg">MBLB</span>
          </div>
          {/* Button 4 */}
          <div className="flex flex-col items-center text-center">
            <Link to="/app/provinsi">
              <button className="btn btn-info w-full h-full p-0">
                <img src="./chart.jpeg" alt="Analisa Data" className="w-full h-full object-cover rounded-lg" />
              </button>
              </Link>
            <span className="text-lg">Data Provinsi</span>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
