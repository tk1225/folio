import React from 'react';
import {Stock_list} from '../../atoms/stock_list'
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react"
import { NavLink } from 'react-router-dom';


function AssetsTable(props) {
  const {portfolio} = props;
  const registeredTicker =  Stock_list()

  return (
    <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">資産サマリー</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-gray-400 bg-gray-50 rounded-sm">
              <tr>
            
                
                <th className="p-2">
                  <div className="font-semibold text-left">Ticker</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">損益</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">合計</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">株数</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">単価</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">前日比</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-gray-100">
              {/* Row */}
              {portfolio.map(function(e,i){
                //利益計算
                e.profit=(e.nowprice-e.getprice)
                
                const found = registeredTicker.find(element => element.ticker==e.stock);
                console.log(found)
             

                  return(
                    <tr>
                    <td className="p-2">
                      <div className="flex items-center">
                      <NavLink exact to={`/stock/${e.stock}`} className={"flex items-center"}>
                          <Avatar className="flex-shrink-0 mr-2 sm:mr-3" size="sm" name={e.stock} src={`https://financialmodelingprep.com/image-stock/${e.stock}.png`} />
                          <div className="text-gray-800">{e.stock}</div>
                      </NavLink>
                      </div>
                    </td>
                    <td className="p-2">
                      {
                        e.profit>0?
                        <div className="text-center text-green-500">${Math.round(e.profit*e.value)}</div>
                        :
                        <div className="text-center text-red-500">${Math.round(e.profit*e.value)}</div>
                      }
                      
                    </td>
                    <td className="p-2">
                      <div className="text-center text-green-500">${Math.round(e.nowprice*e.value)}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">{Math.round(e.value)} </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-light-blue-500">{e.getprice} </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-light-blue-500">{Math.round(1000*(e.nowprice/e.price_before-1))/10}% </div>
                    </td>
                  </tr>

                  )
                })}
             
          </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

export default AssetsTable;
