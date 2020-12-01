import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent  {

  constructor() { }

  searchText = ""
  activemode = true;
  completedmode = false;
  allmode = false;
  TodoList = [];
  TodoListCopy = [];
  clearBtn = false;
  arrowSelectmode = true;
  allValuesTrue = true;
  allValuesFalse = false;
  arrowmode = true;
  itemsLeft = 0;


  getItemsCount()
  {
    this.itemsLeft = 0;
    for(let i=0; i< this.TodoList.length;i++)
    {
      if(this.TodoList[i].status == false)
      {
        this.itemsLeft = this.itemsLeft + 1
      }
    }
  }

  addtodo(event)
  {
    if(event)
    this.TodoList.push({status: false,value: event});
    this.searchText = "";

    this.getItemsCount();

  }

  selectedtodo(index,event)
  {
    this.TodoList[index] = {status: !this.TodoList[index].status,value: event}
    
    this.clearBtn = false;
    for(let i=0;i<this.TodoList.length;i++)
    {
      if(this.TodoList[i].status == true)
      {
        this.clearBtn = true;
      }
    }
    this.getItemsCount();

  }

  clearList()
  {
    for(let i=0;i<this.TodoList.length;i++)
    {
      if(this.TodoList[i].status == true)
      {
       this.TodoListCopy.push(this.TodoList[i]);
      }
    }

    for(let i=0;i<this.TodoListCopy.length;i++)
    {
      this.TodoList.splice(this.TodoList.indexOf(this.TodoListCopy[i]), 1);
    }
    this.TodoListCopy = []
   
  }

  cleardata(item)
  {
    this.TodoList.splice(this.TodoList.indexOf(item), 1);
    this.getItemsCount();
  }

  activetodos()
  {
    this.activemode = true;
    this.completedmode =false
    this.allmode = false;
    this.arrowmode =true;
    }
  completedtodos()
  {
    this.allmode = false;
    this.activemode = false;
    this.completedmode = true;
    this.arrowmode =true;
    }

  changeStatusForAllDatas()
  {
      this.allValuesTrue = true
      for(let i=0;i<this.TodoList.length;i++)
      {
        if(this.TodoList[i].status == false)
        this.allValuesTrue = false
      }

      this.allValuesFalse = true
      for(let i=0;i<this.TodoList.length;i++)
      {
        if(this.TodoList[i].status == true)
        this.allValuesFalse = false
      }
      
     if(this.allmode)
     {
        if(this.allValuesTrue){
        this.arrowSelectmode = false
        this.clearBtn = false;
        }
    
        else
        {
        this.arrowSelectmode = true;
        this.clearBtn = true;
        }
  
        for(let i=0;i<this.TodoList.length;i++)
        {
          this.TodoList[i] = { status:this.arrowSelectmode , value:this.TodoList[i].value};
        }
     }
    else if (this.activemode && this.allValuesTrue)
    {
      for(let i=0;i<this.TodoList.length;i++)
      {
        this.TodoList[i] = { status:false , value:this.TodoList[i].value};
      }
      this.clearBtn = false;
      this.arrowmode = true;
    }
    else if (this.completedmode && this.allValuesFalse)
    {
      for(let i=0;i<this.TodoList.length;i++)
      {
        this.TodoList[i] = { status:true , value:this.TodoList[i].value};
      }
      this.clearBtn = true;
      this.arrowmode = true;
    }
    else{
      this.arrowmode = !this.arrowmode;
    }
     
  }

  displayAllTodos()
  {
    this.allmode = true;
    this.activemode = false;
    this.completedmode = false; 
    this.arrowmode =true;
  }
}
