import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

//Lo primero es definir una variable que va a conetener a todos nuestros employees que vengan desde el backend.
export class AppComponent implements OnInit{
  public employees: Employee[]=[];  //"employees" va a tener todos los employees una vez que llamemmos a la función de abajo, entonces podemos usar esta variable en el
                                    //template para este componente específico (AppComonent), lo que significa que se está comunicando directamente con este componente,
                                    //y podemos acceder a esta variable en el archivo .html

  //Ahora vamos a crear otra función que vamos a usar para llamar a nuestro servicio.
  //Para esto vamos a necesitar injectar este servicio en esta clase de la misma forma que inyectamos el cliente http dentro del servicio (en el cosntructor).
  constructor(private employeeService: EmployeeService){}

  ngOnInit() {
    this.getEmployees();
  }

  //Ahora creamos las funciones que van a llamar al servicio para realizar cada una de las tareas con la BD.
  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe( { //Usamos el subscribe porque estamos trabajando con un Observable y la consulta puede demorar un tiempo, entonces, con el subscribe
                                                    //se nos notifica cuando haya una respuesta desde el servidor.
      next:(response: Employee[]) => { //En caso de obtener una respuesta...
        this.employees = response;
      },
      error:(error: HttpErrorResponse) => { //En caso de error se ejecuta otro código. En este caso muestra un mensaje por consola.
        alert(error.message); 
      }
    });
  }

  public onOpenModal(employee: Employee, mode: String): void {    //Pasamos el employee que va a estar siendo agregado, editado o eliminado.
      const container = document.getElementById('main-container');
      const button = document.createElement('button');
      button.type = 'button';                   //Cambiamos el tipo de botón. Por defecto es de tipo es submit.
      button.style.display = 'none';            //No vamos a necesitar mostrar este botón por lo que le asignamos su estilo de visualización a "none".
      button.setAttribute('data-toggle','modal');
      if (mode === 'add'){
        button.setAttribute('data-target','#addEmployeeModal');
      }
      if (mode === 'edit'){
        button.setAttribute('data-target','#updateEmployeeModal');
      }
      if (mode === 'delete'){
        button.setAttribute('data-target','#deleteEmployeeModal');
      }
      container?.appendChild(button); //Ahora el botón existe en el template html.
      button.click(); //Cuando hagamos click en el botón, éste abrirá el modelo apropiado.

  } 

}
/*Debemos poder llamar a esta función (getEmployees) cada vez que este componente se carga o se inicializa, y a esto lo podemos hacer implementando una interface llamada
OnInit. Esta función vienen del core de Angular, por lo que al implementarla debemos sobreescribir la función llamada ngOnInit, y llamar a getEmployees para que se corra
al iniciar el componente.*/