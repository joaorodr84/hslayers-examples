import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { HslayersModule } from "hslayers-ng";
import { NgModule } from "@angular/core";
import { MapComponent } from "./app/map/map.component";
import { HomeComponent } from "./app/home/home.component";
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'map', component: MapComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HslayersModule
  ],
  declarations: [AppComponent, MapComponent, HomeComponent],
  exports: [
    RouterModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
