import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addAllUsers } from './ngrx/user.actions';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

export interface IUser {
  name: string,
  surname: string,
  email: string,
  id: string,
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private jsonUrl = './assets/users.json';

  constructor(
    private httpClient: HttpClient,
    private store: Store<{ users: IUser[] }>
  ) { }

  getAllUsersFromJSON(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(this.jsonUrl);
  }

  saveAllUsersOnNgrx(): void {
    this.getAllUsersFromJSON().subscribe({
      next: (users: IUser[]) => {
        if (users && users.length > 0) this.store.dispatch(addAllUsers({ users }))
      },
      error: (err) => {
        console.error('Error to charge users:', err);
      }
    });
  }

  generatePDF(usersToPrint: IUser[], title: string, headers: string[]): void {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(title, 20, 20);

    const usersData = usersToPrint.map(user => [user.name, user.surname, user.email, user.id]);

    (doc as any).autoTable({
      head: [headers],
      body: usersData,
      startY: 30,
    });

    doc.save(`${title}.pdf`);
  }

  generateExcel(users: IUser[], title: string) {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(users);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, title);

    XLSX.writeFile(wb, `${title}.xlsx`);

  }
}
