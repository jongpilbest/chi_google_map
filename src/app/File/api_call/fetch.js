
import { useSelector, useDispatch } from 'react-redux';
import {Loaing} from   '@/app/Redux/store';

export async  function   Fetch_post (url , fetch_data){


      const res = await fetch(url, {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ video_url: fetch_data} ),
     });
     const result = await res.json();
    console.log('백엔드에서 받은 결과좀 보여줘 ',result )
    return result

   

}

