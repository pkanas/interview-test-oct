import { Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { FormsComponent } from './forms/forms.component';
import { ChartsComponent } from './charts/charts.component';

export const routes: Routes = [
    { path: 'tables', component: TableComponent },
    { path: 'forms', component: FormsComponent },
    { path: 'charts', component: ChartsComponent },
    { path: '', redirectTo: '/tables', pathMatch: 'full' }
];
