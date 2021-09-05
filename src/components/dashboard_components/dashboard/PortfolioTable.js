import React from 'react';
import {Stock_list} from '../../atoms/stock_list'
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react"

function PortfolioTable(props) {
  const {portfoliodetails} = props;


  return (
    <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">ポートフォリオサマリー</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-gray-400 bg-gray-50 rounded-sm ">
              <tr>
            
    
                <th className="p-2">
                  <div className="font-semibold text-left">リスク</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">リターン</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">配当利回り</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">5年売上成長率</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">5年EPS成長率</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">PER</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">ROE</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">PBR</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-gray-100 ">
              {/* Row */}
              
             
  
                  
                    <tr>
                    <td className="p-2">
                      <div className="text-center text-green-500">{Math.round(portfoliodetails.pfolio_vola*100)}%</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-green-500">{Math.round(portfoliodetails.pfolio_return*100)}%</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-green-500">{Math.round(portfoliodetails.dividendYield*100)}%</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">{Math.round(portfoliodetails.fiveYRevenueGrowthPerShare*100)}% </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-light-blue-500">{Math.round(portfoliodetails.fiveYNetIncomeGrowthPerShare*100)}%</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-light-blue-500">{Math.round(portfoliodetails.priceEarningsRatio)}倍</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-light-blue-500">{Math.round(portfoliodetails.returnOnEquity*100)}%</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-light-blue-500">{Math.round(portfoliodetails.priceBookValueRatio)}倍</div>
                    </td>
                  </tr>


          
              
             
          </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

export default PortfolioTable;
