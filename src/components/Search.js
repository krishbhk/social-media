import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import FollowerAccountItem from './FollowerAccountItem';

export default function Search(props){
    const [searchData,setSearchData] = useState({flag:false, data:null});

    const location = useLocation();
    console.log(location);

    useEffect(
    async function(){
        const response = await axios({
            method: "post",
            url: "/api/v1/users/getallfirstname",
            headers: {
            Authorization: localStorage.getItem("psnToken"),
            },
            data: {
                "firstName": location.state,
            }
        });
        setSearchData({flag: true, data: response.data.payload});
        // console.log(searchData);

    },[]);

    useEffect(()=>{console.log(searchData.data);},[searchData]);

    return (
        <div className="card p-4">
            <h3>Search Results</h3>
            {searchData.flag && searchData.data.map((profile,i) => {
            return (
                <div key={i} > 
                <FollowerAccountItem
              key={profile.id}
              id={profile.id}
              firstName={profile.firstName}
              lastName={profile.lastName}
            />
            </div>
            );
            })}
            
        </div>
    );
}