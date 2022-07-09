import axios from 'axios';
import { useState } from 'react';

export default function Test(props){
    // const [searchData,setSearchData] = useState(null);

    async function handleSearch(event) {
        event.preventDefault();
        // event.target.elements.formFirstName.innerHTML = "HAHA";
        let user = {
            firstName: event.target.elements.formFirstName.value,
        }

        const response = await axios({
            method: "post",
            url: "/api/v1/users/getallfirstname",
            headers: {
             Authorization: localStorage.getItem("psnToken"),
            },
            data: {
                firstName: user.firstName,
            }
        });
        // mydata = ;
        // setSearchData(response.data.payload);
        console.log(response.data);
        // return response.data;
    }

    return(
        <form class="form-inline mx-auto" onSubmit={handleSearch}>
            <input class="form-control" type="text" placeholder="Search" id='formFirstName' />
            <button type="submit" className='btn btn-primary'>Submitme</button>
        </form>
    );
}