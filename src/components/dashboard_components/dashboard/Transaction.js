import React from 'react';
import { Avatar, AvatarBadge, AvatarGroup,Text,Badge ,Image,StatArrow,Stat,StatHelpText} from "@chakra-ui/react"
import { NavLink } from 'react-router-dom';


function Transaction(props) {
  const {stock_transactions,private_mode} = props;

  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">最近の取引</h2>
      </header>
      <div className="p-3">

        {/* Card content */}
        {/* "Today" group */}
        <div>
          
          
       
            {/* Item */}
            {stock_transactions.map(function(e,i){
        return (
            
          <>
 <div className="bg-white shadow-lg rounded-sm border border-gray-200 p-4" key={e.timestamp}>
      {/* Body */}
      <div className="mb-3">
        {/* Title */}
        <div className="flex items-center mb-2">
        <NavLink exact to={`/profile/${e.UID}`} className={"flex items-center"}>

          <div className="flex flex-shrink-0 -space-x-3 -ml-px mr-2">
            <a className="block" href="#0">
            <Avatar className="flex-shrink-0 mr-2 sm:mr-3" size="sm"  src={e.photoUrl} />
            </a>
           
          </div>
          <div className="flex-grow">
            <a className="inline-flex text-gray-800 hover:text-gray-900" href="#0">
              <h2 className="font-semibold text-gray-800">{e.displayName}</h2>
            </a>
            <div className="text-xs font-medium text-gray-500">{e.timestamp}</div>
          </div>
          </NavLink>
        </div>
        {/* Content */}

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
                  <div className="font-semibold text-center">取引</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">単価</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">数量</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">損益</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">memo</div>
                </th>
                
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-gray-100">
              {/* Row */}
            
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
                      {(e.buy==1) && <Badge colorScheme="green">購入</Badge>}
                      {(e.buy==0) && <Badge colorScheme="red">売却</Badge>}
                      
                    </td>
                    <td className="p-2">
                     ${e.price}
                      
                    </td>
                    <td className="p-2">
                     {
                        private_mode?
                        <div className="text-center ">***</div>
                        :
                        <div className="text-center ">{e.value}</div>
                      }
                     
      
                      
                    </td>
                    <td className="p-2">
                      <div className="text-center text-green-500">

                      {
                        private_mode?
                        <div className="text-center ">***</div>
                        :
                        
                          e.profit>0?
                          <div className="text-center text-green-500">${Math.round(e.profit)}</div>
                          :
                          <div className="text-center text-red-500">${Math.round(e.profit)}</div>
                        
                      }

                       
                      </div>
                    </td>
                    <td className="p-2">
                     {e.text}
                      
                    </td>
                   
                  </tr>

                  

             
          </tbody>
          </table>

        </div>
       
        
      </div>
    </div>

          </>

         
        )})}
           
        
        </div>
       
      </div>
    </div>
  );
}

export default Transaction;
