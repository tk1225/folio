import React from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../../../charts/LineChart01';
import { Spinner } from "@chakra-ui/react"
import EditMenu from '../../../partials/EditMenu';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../../utils/Utils';

function TotalAssets(props) {
  const {totalAssets, day_before_ratio, risk_return_obj,totalprofit,totalrealizedprofit} = props;




  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
      <div className="px-5 pt-5">
        
        <h2 className="text-lg font-semibold text-gray-800 mb-2">資産総額</h2>
        <div className="text-xs font-semibold text-gray-400 uppercase mb-1">Total Assets</div>
        <div className="flex items-start">
         
          <div className="text-3xl font-bold text-gray-800 mr-2">${Math.round(totalAssets)}</div>
          <div className="text-xs font-semibold text-gray-400 uppercase mb-1">前日比</div>
          {
            day_before_ratio>0?
          <div className="text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full">{day_before_ratio}%</div>
          :
          <div className="text-sm font-semibold text-white px-1.5 bg-red-500 rounded-full">{day_before_ratio}%</div>
          }
        </div>
        <div className="flex items-start">

        <h3 className="text-sm font-semibold text-gray-800 mb-2">年リスク</h3>
        
        <div className="text-xs font-semibold text-gray-400 uppercase mb-1">{risk_return_obj.pfolio_vola==0?<Spinner />:risk_return_obj.pfolio_vola}%</div>
        <h3 className="text-sm font-semibold text-gray-800 mb-2">年リターン</h3>
        <div className="text-xs font-semibold text-gray-400 uppercase mb-1">{risk_return_obj.pfolio_return==0?<Spinner />:risk_return_obj.pfolio_return}%</div>

        </div>
          
        <div className="flex items-start">

          <h3 className="text-sm font-semibold text-gray-800 mb-2">含み益</h3>

          <div className="text-xs font-semibold text-gray-400 uppercase mb-1">${Math.round(totalprofit)}</div>
          <h3 className="text-sm font-semibold text-gray-800 mb-2">実現損益</h3>

          <div className="text-xs font-semibold text-gray-400 uppercase mb-1">${Math.round(totalrealizedprofit)}</div>

        </div>
  
      
      </div>
      
    </div>
  );
}

export default TotalAssets;
