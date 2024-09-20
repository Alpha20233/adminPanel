import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { signup } from '../../../core/models/auth.interface';
import { catchError, firstValueFrom, from, Observable, tap } from 'rxjs';
import { addCustomer, updateUser } from '../../../core/models/dashboard.interface';

@Injectable({
  providedIn: 'root'
})
export class IndexDBService {

  constructor(private readonly dbService: NgxIndexedDBService) {
    this.initDatabase();
  }


  private async initDatabase() {
    try {
      await firstValueFrom(from(this.dbService.getByKey('users', 1)));
      console.log('Database already initialized');
    } catch (error) {
      console.log('Initializing database...');
      await firstValueFrom(from(this.dbService.clear('users')));
      console.log('Database initialized successfully');
    }
  }


  //Users 


  async addUser(user: signup): Promise<signup> {
    try {
      const result = await firstValueFrom(from(this.dbService.add('users', user)));
      console.log('User added successfully:', result);
      const res =  JSON.parse(localStorage.getItem('userDetail') || '{}');
      if(res.cRole !== 'admin'){
        localStorage.setItem('userDetail', JSON.stringify(user));
      }
      return result;
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  }


  async getUserByEmail(email: string, password: string, isAdmin: boolean = false): Promise<any> {
    debugger
    try {
      const store = isAdmin ? 'admin' : 'users';
      const user = await firstValueFrom(from(this.dbService.getByIndex(store, 'cEmail', email))) as signup;

      console.warn('user', user);
      if (user && user.cPass === password) {
        return user;
      } else {
        return false;
      }
    } catch (error) {
      console.error(`Error fetching ${isAdmin ? 'admin' : 'user'} by email:`, error);
      return false;
    }
  }

  async getUserById(id: number) {
    return await firstValueFrom(this.dbService.getByKey('users', id));
  }

  async getAllUsers() {
    return await firstValueFrom(this.dbService.getAll('users'));
  }

  async updateUser(id: number, detail: signup): Promise<boolean> {
    const res = await firstValueFrom(this.dbService.update('users', { id, ...detail }));
    if (res) {
      return true;
    } else {
      return false;
    }
  }

  async deleteUser(id: number): Promise<boolean> {
    const res = await firstValueFrom(this.dbService.delete('users', id));

    if (res) {
      return true;
    } else {
      return false;
    }
  }



  //Customers

  async addCustomer(customer: addCustomer): Promise<boolean> {
    const res = await firstValueFrom(this.dbService.add('customers', customer));

    if (res) {
      return true;
    } else {
      return false;
    }
  }


  async getAllCustomers() {
    return await firstValueFrom(this.dbService.getAll('customers'));
  }

  async updateCustomer(id: number, customer: Partial<addCustomer>) {
    return await firstValueFrom(this.dbService.update('customers', { id, ...customer }));
  }

  async deleteCustomer(id: number): Promise<boolean> {
    const res = await firstValueFrom(this.dbService.delete('customers', id));

    if (res) {
      return true;
    } else {
      return false;
    }
  }

  async addAdmin(admin: any) {
    try {
      const existingAdmin = await firstValueFrom(this.dbService.getByKey('admin', admin.id));
  
      if (existingAdmin) {
        console.warn('Admin with this ID already exists:', existingAdmin);
        return;  
      }

      const res = await firstValueFrom(this.dbService.add('admin', admin));
      console.warn('Admin added successfully:', res);
    } catch (error) {
      console.error('Error adding admin:', error);
    }
  }

  async updateAdmin(detail: any) {
    debugger
    const res = await firstValueFrom(this.dbService.update('admin', detail));
    console.warn('admin updated',res);
    localStorage.setItem('userDetail', JSON.stringify(res));
    if(res){
      return true;
    }else{
      return false;
    }
  }

  async updateProfile(id: number, detail: signup): Promise<any> {
    const res = await firstValueFrom(this.dbService.update('users', { id, ...detail }));
    if (res) {
      localStorage.setItem('userDetail', JSON.stringify(res));
      return res;
    } else {
      return false;
    }
  }




}
