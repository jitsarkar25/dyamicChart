function addclick(){
   
    dchart.createdata();
    //console.log(dchart.labels)
}

var count = 0;
var Dynamicchart =function ()
{
    this.chartElm="";
    this.data="";
    this.container = document.getElementById("datainputcontainer");
    this.typeselect = document.getElementById("typeselect");
    this.labels=[];
    this.values=[];
    this.typeselect.addEventListener("change",this.createChart.bind(this));
    
}
Dynamicchart.prototype.createdata = function(){ 
      var that=this;
   // console.log(that);
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
  
  updatebtn.addEventListener("click",function()
                            {
     
      that.updateLabel(inputBoxLabel.value,inputBoxValue.value);
      //that.values.push(inputBoxValue.value);
  });   
  var text = document.createElement("TEXT");
  text.innerHTML="<br/><br/>";
  this.container.appendChild(inputBoxLabel);
  this.container.appendChild(inputBoxValue);
  this.container.appendChild(updatebtn);
  this.container.appendChild(text);
};

Dynamicchart.prototype.createJSON=function()
{
    var that=this;
       console.log(that.labels);
       console.log(that.values);
    that.data=[];
    for( var i = 0 ; i < that.labels.length ; i++ )
        {
            var dataObj ={
              "label" : that.labels[i], 
              "value" : that.values[i]  
            };
            that.data.push(dataObj);
        }
    
    
  
    
    that.moredata={
        "chart": {
        "caption": "Monthly revenue for last year",
        "subCaption": "Harry's SuperMart",
        "xAxisName": "Month",
        "yAxisName": "Revenues (In USD)",
        "numberPrefix": "$",
        "theme": "fint"
    },
        "data" : that.data
    };
      console.log(that.chartType);
    
    /**/
    that.createChart();
   
}

Dynamicchart.prototype.createChart=function(){
    
    
    var that=this;
    
    if(!that.moredata)
        {
            return;
        }
    var type = "pie2d"
    

        var selected=that.typeselect.value;
        console.log("Selected  " + selected);
        
        if(selected === "Column")
            {
            type="column2d";
                 console.log("column");
            }
        else if(selected === "Bar")
            {
            type="bar2d";
                console.log("bar");
            }
        else if(selected === "Pie")
            {
            type = "pie2d";
                console.log("pie");
            }
        
       
        console.log(selected === "bar");

    
     FusionCharts.ready(function(){
      var revenueChart = new FusionCharts({
        "type": type,
        "renderAt": "chartContainer",
        "width": "500",
        "height": "300",
        "dataFormat": "json",
        "dataSource": JSON.stringify(that.moredata)
    });

    revenueChart.render();
});
}
  
Dynamicchart.prototype.updateLabel=function(inputlabel,inputvalue)
{
    var that=this;
    var index= that.labels.indexOf(inputlabel);
    if(index === -1)
        {
            that.labels.push(inputlabel)
            that.values.push(inputvalue);
        }
    else
        {
            that.labels[index] = inputlabel;
            that.values[index] = inputvalue;
        }
    
    that.createJSON(that);
    
}

window.addEventListener('load', function () {
    window.dchart = new Dynamicchart();
});