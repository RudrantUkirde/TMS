import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-logout-confirmation',
  standalone: false,
  templateUrl: './logout-confirmation.component.html',
  styleUrl: './logout-confirmation.component.css'
})
export class LogoutConfirmationComponent {


  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();


onConfirmClick() {
  this.confirm.emit();
}

onCancelClick() {
  this.cancel.emit();
}



}
