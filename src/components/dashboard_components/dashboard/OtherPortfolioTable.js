import React from 'react';
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react"
import { NavLink, useLocation } from 'react-router-dom';

function OtherPortfolioTable(props) {
  const {activeprofile} = props;
  const handleClick = ()=>{
    props.history.push({pathname: `/profile/`+activeprofile.UID});
  }

  return (
    <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">選択中のポートフォリオ</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-gray-400 bg-gray-50 rounded-sm">
              <tr>
            
                
                <th className="p-2">
                  <div className="font-semibold text-left">ユーザー</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">リターン</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">リスク</div>
                </th>
             
                <th className="p-2">
                  <div className="font-semibold text-center">プロフィール</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-gray-100">
              {/* Row */}
              {
             // UID: "RrRGQ1xX4tawiUpMW8gavfwQGU43"
              // bgurl: ""
              // followers: 0
              // follows: 0
              // iconimg: "https://lh3.googleusercontent.com/a/AATXAJx_mnSqOztFii05kCTk9Nx3JxP3WvBcelCPxG9X=s96-c"
              // pfolio_historical_price: (276) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, …]
              // pfolio_return: 0.4835347639314737
              // pfolio_vola: 0.30795242244444
              // res_min_vola: (3) [{…}, {…}, {…}]
              // res_sharp_ratio: (3) [{…}, {…}, {…}]
              // text: "hello"
              // username: "拓将岡本"
              }
                <tr>
                    <td className="p-2">
                      <div className="flex items-center">
                      <Avatar className="flex-shrink-0 mr-2 sm:mr-3" size="sm" name={activeprofile.username} src={activeprofile.iconimg} />
                        
                        <div className="text-gray-800">{activeprofile.username}</div>
                      </div>
                    </td>
                    <td className="p-2">
                  
                        <div className="text-center text-green-500">{Math.round(activeprofile.pfolio_return*100)}%</div>
                       
                      
                    </td>
                    <td className="p-2">
                      <div className="text-center text-green-500">{Math.round(activeprofile.pfolio_vola*100)}%</div>
                    </td>
                    

                    <td className="p-2">
                     <div className="text-center text-blue-500">
                     <NavLink exact to={`/profile/${activeprofile.UID}`} className={`block text-blue-200 hover:text-white transition duration-150 ${'hover:text-blue-200'}`}>
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

              
                
                
                
             
          </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

export default OtherPortfolioTable;
