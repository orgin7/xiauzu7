export default {
   setItem(key,value){
      localStorage.setItem(key,JSON.stringify(value))
   },
   getItem(key){
      return JSON.parse(localStorage.getItem(key)) 
   }
}