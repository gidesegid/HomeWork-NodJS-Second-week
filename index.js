var fs = require('fs');
var args = process.argv.slice(2);
var task;
var allTasks;
var done;

if (args.length === 0) {
  showHelp();
} else {
  switch (args[0]) {
    case 'help':
      showHelp();
      break;

    case 'list':
      showList();
      break;

    case 'add':
      var item = args.slice(1).join(' ');
      addItem(item);
      break;

    case 'done':
      var taskdone = parseInt(args[1], 10);
      markAsDone(taskdone);
      break;
      case 'undone':
       var undoneItem = parseInt(args[1], 10);
       markAsUndone(undoneItem);
      break;
      case 'del':
       var taskNumber = parseInt(args[1], 10);
       deleteItem(taskNumber);
       break;
       case 'update':
       var taskUpdate=parseInt(args[1],10);
       update(taskUpdate);
       default:
      console.error('Unknown command: ' + args[0] + '. Here below are the only commands you should use.');
      showHelp();
      break;
  }
}

//delet a single task
function deleteItem(taskNumber) {
   
      fs.readFile(__dirname + '/todo.txt', 'utf-8', function (error, data) {
      
    if (error == null) {
      allTasks = data.split(/\n/);
      task = allTasks[taskNumber - 1];
      allTasks[taskNumber - 1] =allTasks.splice(taskNumber,1);
     
      data = allTasks.join('\n');
      fs.writeFile(__dirname + '/todo.txt', data);
     console.log('The task "' + task + '" is being deleted from the tasks');
     console.log('now your task is: '+'\n' + data);
    } else if (error.code == 'ENOENT') {
      console.error('No to-do items yet');
    } else {
      console.error('Error reading to do task');
    }

  });

}
//mark the task as done ,when done!
 function markAsDone(taskdone) {

  fs.readFile(__dirname + '/todo.txt', 'utf-8', function (error, data) {

    if (error == null) {

      allTasks = data.split(/\n/);
      task = allTasks[taskdone - 1];
      if (task.charAt(0) != '*'){
         allTasks[taskdone - 1] = '*' + task.slice(1);
         data = allTasks.join('\n');
         fs.writeFile(__dirname + '/todo.txt', data);
         console.log('The task  "' + task +'"' + ' is marked as done succesfully!');
       }else{
        console.log(' oops! the task "'+ task + '"' + 'is already marked as done.'+'\n'+'You can only mark it as undone.')
       }
     
    } else if (error.code == 'ENOENT') {
      console.error('No to-do items yet');
    } else {
      console.error('Error reading to do list');
    }

  });

}
//show help if a user input gives unknown command.
function showHelp() {
  fs.readFile(__dirname + '/help.txt', 'utf-8', function (error, data) {
    if (error == null) {
      console.log(data);
    } else {
      console.error('Error reading help');
    }
  });
}
//shows the list of commands to use
function showList() {
  
  fs.readFile(__dirname + '/todo.txt', 'utf-8', function (error, data) {

    if (error == null) {
      data = data.slice(0, data.length);
      allTasks = data.split(/\n/);
     
      if(allTasks.length===1){
        console.log('Please create tasks first!');
      }else{
       

       console.log('To-do items:\n');

      for (var i = 0; i < allTasks.length-1; i++) {
        task = allTasks[i];
        done = task.charAt(0) != ' ';

        console.log('  ' + (i + 1) + ': ' + task.slice(1) + ' (done: ' + done + ')');
      }
    }

      

    } else if (error.code == 'ENOENT') {
      console.log('The to do list is empty');
    } else {
      console.error('Error reading to do list');
    }

  });
}
//add a single task to the todo file.
function addItem(item) {
 
if(item==="" || item===" " ){
  console.log("please write a task to add");
}else{
  task = ' ' + item + '\n';
  allTasks=item;
  fs.appendFile(__dirname + '/todo.txt', task);
  console.log(task + ' is being added to the list succesfully!');
}
 
}

//marks as undone for the tasks which are already being marked as done.
function markAsUndone(undoneItem) {
    // if (undoneItem===charAt(0,'')){
    //     console.log("please write the task you need to undone");
    // }else{
      fs.readFile(__dirname + '/todo.txt', 'utf-8', function (error, data) {
         allTasks = data.split(/\n/);
         task = allTasks[undoneItem - 1];
    if (error == null) {
         if (task.charAt(0) != ' '){
          allTasks[undoneItem - 1] = ' ' + task.slice(1);
          data = allTasks.join('\n');
         fs.writeFile(__dirname + '/todo.txt', data);
         console.log('"' + task +'"' + ' is marked as undone succesfully!');
          }
      else{
        console.log('oops "' + task +'"' + ' is marked already as undone!'+'\n'+'You can only mark it done.');
      }
    }
    
     else if (error.code == 'ENOENT') {
      console.error('No to-do items yet');
    } else {
      console.error('Error reading to do list');
    }

  });
 
  

}

