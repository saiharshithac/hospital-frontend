import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink,FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
 
}
