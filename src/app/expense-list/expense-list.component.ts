import { Component, OnInit } from '@angular/core';
import { Expense, ExpenseService } from '../expense.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css'
})
export class ExpenseListComponent {
  expenses: Expense[] = [];
  errorMessage = '';

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    this.loadExpenses();
  }

  loadExpenses() {
    this.expenseService.getExpenses().subscribe({
      next: (data) => (this.expenses = data),
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Could not load expenses.';
      }
    });
  }

  deleteExpense(id: number) {
    if(confirm('Are you sure you want to delete this expense')) {
      this.expenseService.deleteExpense(id).subscribe({
        next: () => this.loadExpenses(),
        error: (error) => {
          console.error(error);
          this.errorMessage = 'Could not delete the expense';
        }
      })
    }
  }
}
