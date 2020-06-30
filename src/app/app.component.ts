import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'directi-playground';
  public inputData='';
  public todoList = [];
  public fetchList;
  public displayTodo;
  ngOnInit(){
    this.fetchList = localStorage.getItem('list');
    if(this.fetchList){
      this.todoList = JSON.parse(this.fetchList);
    } else {
      this.todoList = [];
    }
    this.displayTodo = this.todoList;
    localStorage.clear();
  }

  onModify(index){
    this.inputData = this.todoList[index].title;
    this.todoList.splice(index,1);
    this.storeData();
    this.displayTodo = this.todoList;
  }
  onDelete(index){
    this.todoList.splice(index,1);
    this.storeData();
    this.displayTodo = this.todoList;

  }

  onAdd(){
    this.todoList.push({title : this.inputData, status: 'uncompleted' });
    this.displayTodo = this.todoList;
    this.storeData();
    this.inputData = '';
  }

  onStatusChange(index){
    this.todoList[index].status = 'completed';
    this.storeData();
    this.displayTodo = this.todoList;

  }
  storeData(){
    localStorage.setItem('list', JSON.stringify(this.todoList));
  }

  optionChanged(data){
    switch(data.target.value) {
      case 'all':
      break;
      case 'completed':
      
        this.displayTodo = this.todoList.filter( ele => ele.status === 'completed');

      break;
      case 'notcompleted':
      this.displayTodo = this.todoList.filter( ele => ele.status === 'uncompleted');
      break;
    }
  }
}
