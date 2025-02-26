import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  effect,
  ElementRef,
  model,
  viewChild,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  readonly nameElement = viewChild.required<ElementRef>('name');

  //username='Test'
  username = model<string>('Test');
  userobj = model<{ firstname: string; lastname: string }>({
    firstname: '',
    lastname: '',
  });

  constructor(private cref: ChangeDetectorRef) {
    effect(() => {
      if (this.username().length > 5) {
        alert('Crossed more than 5 characters');
      }
    });
  }

  ngAfterViewInit(): void {
    this.cref.detectChanges();
  }
}
