function validate(){
    var val = true;
    if(document.getElementById("user-input").value == "" )
        {
            val=false;
            document.getElementById("user-input").innerHTML = "Username required";
            
        }
    else if(document.getElementById("user-input").value != "Daud Khan"){
        val=false;
         document.getElementById("user-input").innerHTML = "Wrong Username";

    }
    else{
         document.getElementById("user-input").value = "Okay";

    }
    if(document.getElementById("pass-input").value == "")
        {
            val=false;
          
            document.getElementById("pass-input").innerHTML = "Password required";
        }
    else if(document.getElementById("pass-input").value != "123456"){
        val=false;
        document.getElementById("pass-input").value = "Wrong Password";
    }
    else
        {
        
            
           document.getElementById("pass-input").innerHTML = "Okay";
        }
    
    return val;
}