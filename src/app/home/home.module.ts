import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    HomepageComponent,
    AboutComponent,
    ContactComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ],
})
export class HomeModule {}
