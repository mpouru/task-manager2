

//Task and Activity Controller

var taskController=(function(){
  var Task = function(id, description, time){
    this.id = id;
    this.description =description;
    this.time= time;
    
};
var Activity = function(id, start_t, stop_t, total){
  this.id = id;
  this.star_t =start_t;
  this.stop_t= stop_t;
  this.total=total;
};

  //kaikki kerättävä data
var data={
  tasks:[],
  activities:[]
};
return{
  addTaskItem: function(description, time){
    var newTaskItem;
    //create new id
    if (data.tasks.length>0){
         ID = data.tasks[data.tasks.length-1].id +1;
    } else{
        ID = 0;
    }

    newTaskItem = new Task(ID, description,time);
     //push it into our data structure
     data.tasks.push(newTaskItem);
     //return the new element
     return newTaskItem;
  },
  addActivityItem: function(start, stop, total){
    var newActivityItem;
    if (data.activities.length>0){
          ID = data.activities[data.activities.length-1].id +1;
    } else{
        ID = 0;
    }
    newActivityItem= new Activity(ID,start_t,stop_t, total);
    data.activities.push(newActivityItem);
    return newActivityItem;
  },

  testing: function(){
    console.log(data);
}
}

})();

//UI Controller

var UIController= (function(){

  var DOMelements={
    addTaskBtn: '.add_task',
    addTaskLabel: '.add_description',
    taskList: '.tasklist',
    openTaskBtn: '.open_task',
    ActivityList:'.activities',
    ActivityItem: '.act_item',
    ActivityInput: '.a_input',
    StartBtn: '.start',
    TimerLabel:'.timerlabel'
  };

return{

  getInput: function (){
    return{
      description:document.querySelector(DOMelements.addTaskLabel).value,
      time: 0
    };
  
  },

  addTaskListItem: function (obj){
  var html, newHtml;
  
  html= '<div class="task_item" id="task-0"><div class="item__name">%Tehtava1%</div><div class="item__time">%21min%</div><button class="open_task"id="open-0">Open Task</button></div>';
  newHtml=html.replace('%Tehtava1%',obj.description);
  newHtml=newHtml.replace('%21min%',obj.time);
  document.querySelector(DOMelements.taskList).insertAdjacentHTML("beforeend",newHtml);
  },

  clearInputField: function(){
  var field;
  field= document.querySelector(DOMelements.addTaskLabel).value=" ";

  },
  showActivities:function(){
   var html2, newHtml2;
   html2='<div class="act_item" id="activity-0"><div class="item__name"> %Tapahtuma 1%</div><div class ="item_start">%00:00% </div><div class ="item_stop">%00:21% </div><div class="item__time">%21:00%</div>'
    newHtml2=html2.replace('%Tapahtuma 1%',0);
    newHtml2=newHtml2.replace('%00:00%',0);
    newHtml2=newHtml2.replace('%00:21%', 0);
    newHtml2=newHtml2.replace('%21:00%',0);
    document.querySelector(DOMelements.ActivityList).insertAdjacentHTML("beforeend", newHtml2);
  },

  getDOMElements: function() {
    return DOMelements;
}

};

})();




//AppController
var controller= (function(tCtrl, UICtrl, sCtrl){

var DOM = UICtrl.getDOMElements();

var setupEventListeners= function(){
document.querySelector(DOM.addTaskBtn).addEventListener('click',ctrlAddTaskItem);
document.addEventListener('click', function (event) {
	// tapahtuma kiinni vain jos löytyy open task nappula
	if (!event.target.matches('.open_task'))return;
    ctrlOpenAddActItem();
	console.log(event.target);

}, false);

document.querySelector(DOMelements.StartBtn).addEventListener('click',ctrlAddStartTime);


};
var ctrlAddTaskItem= function() {
  var input, newTaskItem;
  // 1. Get the field input data
   input = UICtrl.getInput();
  console.log (input);
  if(input.description !== "" ){
      //2.Add the item to the task controller
      newTaskItem = taskController.addTaskItem(input.description, input.time);
    
      // 3. Add Item to UI
      UICtrl.addTaskListItem(newTaskItem);
      //clear the fields
      UICtrl.clearInputField();
      
  };
};
var ctrlOpenAddActItem=function(){
UICtrl.showActivities();
}
var ctrlAddTimes=function(){
  var startTime, stopTime;
  startTime=document.querySelector.TimerLabel
  
  console.log(start);
  taskController.addActivityItem
}
return {
  init: function (){
      console.log('application has started');
     
      setupEventListeners();
  }
}


})(taskController, UIController,stopwatchController);

controller.init();











//Sekuntikello
var stopwatchController = (function(){
  var timer, toggleBtn;
  timer = document.getElementById('timer');
  toggleBtn = document.getElementById('toggle');
  
  var watch = new Stopwatch(timer);
  
  function start() {
    toggleBtn.textContent = 'Stop';
    watch.start();
    
  }
  
  function stop() {
    toggleBtn.textContent = 'Start';
    watch.stop();
    
  }
  
  toggleBtn.addEventListener('click', function() {
    watch.isOn ? stop() : start();
  });
  
  // resetBtn.addEventListener('click', function() {
  //   watch.reset();
  // });
})();
