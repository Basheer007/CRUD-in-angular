import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  list: string[] = [];
  initialValue: string = '';
  updatedInputValue = '';

  ngOnInit(): void {
    this.gettingvaluesOnpageLoad();
  }
  addtoLocalStorage() {
    if (this.initialValue) {
      this.list.push(this.initialValue);
      localStorage.setItem('value', JSON.stringify(this.list));
      this.initialValue = '';
    }
  }

  gettingvaluesOnpageLoad() {
    const values = localStorage.getItem('value');
    if (values) {
      this.list = JSON.parse(values);
    }
  }

  updatingValue(i: number) {
    const confirmValue = confirm('Are you sure You want to update the value ?');
    if (confirmValue) {
      const updaterValue = this.list.find((item, index) => {
        return i == index;
      });
      if (updaterValue) this.updatedInputValue = updaterValue;

      const updatedValue = this.list.filter((item, index) => {
        return i !== index;
      });
      if (updatedValue) this.list = updatedValue;
      localStorage.setItem('value', JSON.stringify(this.list));
    }
  }

  updatedvaluetoLocalstorage() {
    if (this.updatedInputValue) {
      this.list.push(this.updatedInputValue);
      localStorage.setItem('value', JSON.stringify(this.list));
      this.updatedInputValue = '';
    }
  }

  deletingValue(i: number) {
    const confirmValue = confirm('Are you sure You want to delete the value?');
    if (confirmValue) {
      const updaterValue = this.list.filter((item, index) => {
        return i !== index;
      });
      if (updaterValue) this.list = updaterValue;
      localStorage.setItem('value', JSON.stringify(this.list));
    }
  }
}
