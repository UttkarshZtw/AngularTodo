import { Component, OnInit,SimpleChange,SimpleChanges } from '@angular/core';
import {Todo} from '../../models/Todo'
// see the local-storage 
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos:Todo[]; // array of Todos
  emptyTodos:boolean;
  inputTodo: string = "";
  constructor(){}

  ngOnInit(): void {
    this.todos = [];
    // console.log(JSON.parse(localStorage))
    let temp = JSON.stringify(localStorage);
    const todoObject = JSON.parse(temp)
    console.log(todoObject);
    // for(let obj in todoObject)
    // {
      
    // }


    this.emptyTodos = (this.todos.length === 0);
  }

  ngOnChanges(changes : SimpleChanges) : void{
    // console.log(changes)
  }

  toggleDone(id : number){
    this.todos.map((v,i)=>{
      if(i == id) v.compleated = !v.compleated;
      return v;
    })
  }

  deleteTodo(id : number){
    this.todos = this.todos.filter((v, i)=> i!=id);
    this.emptyTodos = (this.todos.length === 0);
  }

  addTodo(){
    if(this.inputTodo.trim() === ''){
      this.inputTodo = ""
      return;
    }
    this.todos.push({
      content:this.inputTodo,
      compleated:false
    });
    this.emptyTodos = (this.todos.length === 0);
    this.inputTodo = "";
  }

  updateTodo(id:number){
    let editedTodo = prompt("Enter the content you want to edit",this.todos[id].content)
    console.log(editedTodo)
    if(editedTodo == null || editedTodo === undefined)
      return;
    this.todos[id].content = editedTodo;
    localStorage.setItem(id.toString(),JSON.stringify(this.todos[id]))
  }
}
