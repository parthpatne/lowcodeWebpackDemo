
import * as ActionSDK from 'actionSDK2';
ActionSDK.APIs.actionViewDidLoad(true /*success*/);

var root = document.getElementById("root");
let actionInstance:  ActionSDK.ActionInstance = null;
let actionSummary : ActionSDK.ActionInstanceSummary = null;

initialize();

function createBody(){

    var title = document.createElement('h3');
    title.innerHTML = actionInstance.title;
    root.appendChild(title);
    createQuestionView();

}


function createQuestionView(){

  var count = 1;
  actionInstance.columns.forEach((column: ActionSDK.ActionInstanceColumn) => {
    
          var qDiv = document.createElement("div");

          var linebreak = document.createElement('br');
          qDiv.appendChild(linebreak);  

          var questionHeading = document.createElement('h4'); // Heading of For
          questionHeading.innerHTML = count + "."+ column.title;
          qDiv.appendChild(questionHeading);      

          column.options.forEach((option:ActionSDK.ActionInstanceColumnOption) => {
           var optionView = getAggregateOptionView(option.title,option.id,column.id);
           qDiv.appendChild(optionView);
           
          });
          root.appendChild(qDiv);
          count++;
  });

}

function getAggregateOptionView( title,optionId,columnId) {

    var oDiv = document.createElement("div");
    
    var optionTitle = document.createElement('h6'); // Heading of For
    optionTitle.innerHTML = title;
    oDiv.appendChild(optionTitle);  

    var mDiv = document.createElement("div");
    mDiv.className = "meter";
    var spanTag1 = document.createElement('span');

    var wid = JSON.parse(actionSummary.aggregates[columnId])[optionId]/actionSummary.rowCount*100;
    spanTag1.style.width =  isNaN(wid) ? "0%": wid + "%";

    mDiv.appendChild(spanTag1);  

    oDiv.appendChild(mDiv);  
  
    var newline = document.createElement('br');
    oDiv.appendChild(newline);
    return oDiv;  
} 

function initialize(){

    ActionSDK.APIs.getCurrentContext()
    .then((context: ActionSDK.ActionContext) => {   
      ActionSDK.APIs.getActionInstance(context.actionInstanceId)
      .then((ai: ActionSDK.ActionInstance) => {
      actionInstance = ai;
      ActionSDK.APIs.getActionInstanceSummary(actionInstance.id, false /* isShortSummary */)
            .then((aggregatedSummary: ActionSDK.ActionInstanceSummary) => {
              actionSummary = aggregatedSummary;
                createBody();
            })
            .catch((error: ActionSDK.ActionError) => {
                
            });
      })      
    });

}

