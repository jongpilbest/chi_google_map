

export async  function  http_connect (url , fetch_data ,method){

   try{
   const res = await fetch(url, {
       method: method,
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ video_url: fetch_data} ),
     });
     const result = await res.json();

    return result
   }
   catch(e){
    console.log(e.message,'에러메세지를 확인부탁')
   }

   

}




