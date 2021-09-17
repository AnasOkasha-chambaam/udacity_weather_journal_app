let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();
const apiKey = "3ac124a6693dbb8979089200eaa3642d";
 const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip="
 console.log("weather");
 document.getElementById('generate').addEventListener("click",performAction);
function performAction(){
    
    const myCode = document.querySelector("#zip").value;
    const finalForm = baseURL + myCode+'&appid='+apiKey;
const feelings = document.querySelector("#feelings").value;
getWeather(baseURL,myCode,apiKey)
}
const getWeather = async(baseURL,weather,key) =>{
    console.log('hellow')
    const res = await fetch(baseURL + weather + apiKey)
    try{
        const data = await res.json();
        console.log(data);
        return data;
    }catch(error){
        console.log("error",error);
    }
    const temp=data.main.temp
    await fetch('/weatherData',{
        method:"POST",
        Credentials : 'same-origin',
        headers:{
            'Content-type' : "application/json"
        },
        body:JSON.stringify({
            date : newDate,
            temp: temp,
            feelings: feelings
        })
    });
    const respond=await fetch('/getTemp');
    try{
         const finalData = await respond.json();
    }
   catch(error){
       console.log(error);
   }
   console.log(finalData);
}