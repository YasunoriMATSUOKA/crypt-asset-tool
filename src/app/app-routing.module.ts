import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExchangesListComponent } from './exchanges-list/exchanges-list.component';
import { TickersListComponent } from './tickers-list/tickers-list.component';


const routes: Routes = [
  {
    path: '',
    component: ExchangesListComponent
  },
  {
    path: 'exchange/list',
    component: ExchangesListComponent
  },
  {
    path: 'ticker/list',
    component: TickersListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
