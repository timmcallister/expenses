import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense, ExpenseService } from '../expense.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css'
})
export class ExpenseFormComponent implements OnInit {
  expense: Expense = {id: 0, description: '', amount: 0, date: ''};
  isEditing = false;
  errorMessage = '';

  constructor(
    private expenseService: ExpenseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(){
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditing = true;
      this.expenseService.getExpenses().subscribe((expenses) => {
        const existingExpense = expenses.find((exp) => exp.id === +id);
        if (existingExpense) {
          this.expense = existingExpense;
        }
      });
    }
  }

  saveExpense() {
    if (this.isEditing) {
      this.expenseService.updateExpense(this.expense).subscribe({
        next: () => this.router.navigate(['./expenses']),
        error: (error) => {
          console.error(error);
          this.errorMessage = 'Could not create the expense.';
        }
      })
    }
  }
}
