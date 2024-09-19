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
      return result;
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  }


  async getUserByEmail(email: string, password: string, isAdmin: boolean = false): Promise<signup | boolean> {
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



  //Customers

  async addCustomer(customer: addCustomer): Promise<boolean> {
    const res = await firstValueFrom(this.dbService.add('customers', customer));

    if (res) {
      return true;
    } else {
      return false;
    }
  }

  async getCustomerById(id: number) {
    return await firstValueFrom(this.dbService.getByKey('customers', id));
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

  async addAdmin(admin: signup) {
    await firstValueFrom(this.dbService.add('admin', admin));
  }


}
