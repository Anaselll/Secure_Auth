
export default  function Isauth(){
let token = localStorage.getItem("accessToken");

return !!token


}