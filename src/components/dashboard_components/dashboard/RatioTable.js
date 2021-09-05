import React from 'react';
import {Stock_list} from '../../atoms/stock_list'
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react"
import { NavLink } from 'react-router-dom';

function RatioTable(props) {
  const {portfolio} = props;
  const registeredTicker =  Stock_list()

  let asset_ttl=0
  portfolio.map(function(e,i){
    console.log(e.ttlprice)
    asset_ttl=asset_ttl+e.ttlprice
    console.log(asset_ttl)
  })

  return (
    <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-gray-200">
     
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
                {/* <th className="p-2">
                  <div className="font-semibold text-left">名称</div>
                </th> */}
                <th className="p-2">
                  <div className="font-semibold text-center">比率</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">詳細リンク</div>
                </th>
              
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-gray-100">
              {/* Row */}
              {portfolio.map(function(e,i){
                
                
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
                    {/* <td className="p-2">
                      <div className="text-center text-black-500">{found.name}</div>
                    </td> */}
                    <td className="p-2">
                      <div className="text-center text-black-500">{Math.round((e.ttlprice/asset_ttl)*100)}%</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-green-500">
                      <NavLink exact to={`/stock/${e.stock}`} className={`block text-blue-200 hover:text-white transition duration-150 ${'hover:text-blue-200'}`}>
                      <div className="flex flex-grow">
                        <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
                          <circle className={`fill-current text-gray-400 ${ 'text-indigo-300'}`} cx="18.5" cy="5.5" r="4.5" />
                          <circle className={`fill-current text-gray-600 ${ 'text-indigo-500'}`} cx="5.5" cy="5.5" r="4.5" />
                          <circle className={`fill-current text-gray-600 ${ 'text-indigo-500'}`} cx="18.5" cy="18.5" r="4.5" />
                          <circle className={`fill-current text-gray-400 ${ 'text-indigo-300'}`} cx="5.5" cy="18.5" r="4.5" />
                        </svg>
                        <span className="text-sm font-medium">詳細</span>
                      </div>
                      </NavLink>
                      </div>
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

export default RatioTable;
