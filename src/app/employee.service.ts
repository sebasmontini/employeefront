import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'}) //Con esto hacemos que toda la aplicación de Angular sepa del servicio. Inyectamos en el componente "root"
                                  //Si no usamos esta línea, hay que registrar el servicio en el app.module.ts, en providers: [EmployeeService]
export class EmployeeService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`); //Pasamos la URL que vamos a definir más arriba. Esta es una notación de TS que permite poner una variables
                                                                    //y luego un string.
  } //Con esto le estoy diciendo al cliente http dónde hacer la request y el tipo de request. Le estaos diciendo que va a aer una GET request y va a retornar un tipo any.
    //Y como se trata de una GET no hace falta que pasemos nada en el body y no tenemos ningún encabezado.

  public findEmployee(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiServerUrl}/employee/find/${employeeId}`);
  }
  
  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`, employee);
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiServerUrl}/employee/update`, employee);
  }

  public deleteEmployee(employeeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
  }
}
