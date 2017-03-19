function addclick(){
    var dchart=new dynamicchart();
    dchart.createdata();
}

var count = 0;
var dynamicchart =function ()
{
    this.chartElm="";
    this.data="";
    this.container = document.getElementById("datainputcontainer");
    this.labels=[];
    this.values=[];
    
}
dynamicchart.prototype.createdata = function(){ 
  count++;    
  console.log("click");  
  
  var inputBoxLabel = document.createElement("INPUT");
  inputBoxLabel.placeholder="Label";
  inputBoxLabel.id="label"+count; 
  inputBoxLabel.className="inputlabel"; 

    var inputBoxValue = document.createElement("INPUT");
  inputBoxValue.placeholder="Value";
  inputBoxValue.id="value"+count; 
  inputBoxValue.className="inputlabel"; 
    
  var updatebtn = document.createElement("BUTTON");
  updatebtn.innerHTML="Update";
  updatebtn.id="updatebtn"+count;  
    var that=this;
  updatebtn.addEventListener("click",function()
                            {
      console.log(inputBoxValue.value);
  });
    
    
  var text = document.createElement("TEXT");
  text.innerHTML="<br/><br/>";
  this.container.appendChild(inputBoxLabel);
  this.container.appendChild(inputBoxValue);
  this.container.appendChild(updatebtn);
  this.container.appendChild(text);
};