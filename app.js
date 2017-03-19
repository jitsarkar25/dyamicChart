

var count = 0;
var Dynamicchart =function ()
{
    this.chartElm="";
    this.data="";
    this.container = document.getElementById("datainputcontainer");
    this.typeselect = document.getElementById("typeselect");
    this.chartcontainer = document.getElementById("chartcontainer");
    this.chartcaption = document.getElementById("caption");
    this.subcaption = document.getElementById("subcaption");
    this.xaxis = document.getElementById("xaxis");
    this.yaxis = document.getElementById("yaxis");
    this.numberprefix = document.getElementById("numberprefix");
    this.addValueBtn = document.getElementById("createdata");
    this.labels=[];
    this.values=[];
    this.typeselect.addEventListener("change",this.createChart.bind(this));
    this.chartcaption.addEventListener("keyup",this.createJSON.bind(this));
    this.subcaption.addEventListener("keyup",this.createJSON.bind(this));
    this.xaxis.addEventListener("keyup",this.createJSON.bind(this));
    this.yaxis.addEventListener("keyup",this.createJSON.bind(this));
    this.numberprefix.addEventListener("keyup",this.createJSON.bind(this));
    this.addValueBtn.addEventListener("click",this.createdata.bind(this));
    
    
}


Dynamicchart.prototype.createdata = function(){ 
      var that=this;
   // console.log(that);
  count++;    
  console.log("click");  
  var id = count;
    
  var div = document.createElement("DIV");
  div.className="row";
    
  var innerdivleft = document.createElement("DIV");
  innerdivleft.className=" col-md-6";   

  var innerdivright = document.createElement("DIV");
  innerdivright.className="col-md-6"; 
    
  var inputBoxLabel = document.createElement("INPUT");
  inputBoxLabel.placeholder="Label";
  inputBoxLabel.id="label"+count; 
  inputBoxLabel.className="inputlabel form-control"; 
  inputBoxLabel.addEventListener("keyup",function()
                                  {
        
          if(inputBoxLabel.value)
            {
                inputBoxValue.disabled=false;
                that.updateLabel(inputBoxLabel.value,inputBoxValue.value,id);
            }
    else
        {
            inputBoxValue.value="";
            inputBoxValue.disabled=true;
            that.updateLabel(inputBoxLabel.value,inputBoxValue.value,id);
        }
    });

  var inputBoxValue = document.createElement("INPUT");
  inputBoxValue.placeholder="Value";
  inputBoxValue.id="value"+count; 
  inputBoxValue.className="inputlabel form-control";
  inputBoxValue.disabled=true;    
    
    
inputBoxValue.addEventListener("keyup",function(){
     
    that.updateLabel(inputBoxLabel.value,inputBoxValue.value);
    });
    
 
  innerdivleft.appendChild(inputBoxLabel);
  innerdivright.appendChild(inputBoxValue);
    div.appendChild(innerdivleft);
    div.appendChild(innerdivright);
  this.container.appendChild(div);
  
};

Dynamicchart.prototype.createJSON=function()
{
    var that=this;
     
    that.data=[];
    for( var i = 0 ; i < that.labels.length ; i++ )
        {
            var dataObj ={
              "label" : that.labels[i], 
              "value" : that.values[i]  
            };
            that.data.push(dataObj);
        }
    
    
  var caption=that.chartcaption.value || "Chart";
  var subcaption=that.subcaption.value;
  var xaxis=that.xaxis.value || "X-AXIS";
  var yaxis=that.yaxis.value || "Y-AXIS";
  var prefix=that.numberprefix.value || "";    
    
    that.moredata={
        "chart": {
        "caption": caption,
        "subCaption": subcaption,
        "xAxisName": xaxis,
        "yAxisName": yaxis,
        "numberPrefix": prefix,
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
        "renderAt": that.chartcontainer,
        "width": "100%",
        "height": "300px",
        "dataFormat": "json",
        "dataSource": JSON.stringify(that.moredata)
    });

    revenueChart.render();
});
}
  
Dynamicchart.prototype.updateLabel=function(inputlabel,inputvalue,count)
{
     var that=this;
    
    if(count)
        {
            that.labels[count-1] = inputlabel;
            that.values[count-1] = inputvalue;
        }
    else{
   
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
}
    that.createJSON(that);
    
}

window.addEventListener('load', function () {
    window.dchart = new Dynamicchart();
});