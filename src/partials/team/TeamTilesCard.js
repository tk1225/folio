import React from 'react';
import { Link } from 'react-router-dom';
import EditMenu from '../EditMenu';
import { Avatar, AvatarBadge, AvatarGroup,Flex } from "@chakra-ui/react"
import {CustomControlsExample} from "./atoms/editable"

function TeamTilesCard(props) {


  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
      <div className="flex flex-col h-full">
        {/* Card top */}
        
        <div className="flex-grow pl-5 pt-2">
          <div className="flex justify-between items-start">
            {/* Image + name */}
            <header>
              <div className="mb-2">
                <Flex>
                  <Avatar size="md" name="Dan Abrahmov" src={props.image} />
                  <div>{props.name}</div>
                  {/* <CustomControlsExample key={props.name}name={props.name}/> */}
                
                </Flex>
              </div>
            </header>
          
          </div>
         
        </div>
        {/* Card footer */}
        <div className="border-t border-gray-200">
          <div className="flex divide-x divide-gray-200r">
            <Link className="block flex-1 text-center text-sm text-indigo-500 hover:text-indigo-600 font-medium px-3 py-4" 
          to={`/followlist/`+props.uid}>
              <div className="flex items-center justify-center" >
                
                <span>{props.follows}フォローリスト</span>
              </div>
            </Link>
            <Link className="block flex-1 text-center text-sm text-gray-600 hover:text-gray-800 font-medium px-3 py-4 group" 
            to={`/followerlist/`+props.uid}>
              <div className="flex items-center justify-center">
               
                <span>{props.follows}フォロワーリスト</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamTilesCard;
