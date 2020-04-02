import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlansDetailPageRoutingModule } from './plans-detail-routing.module';

import { PlansDetailPage } from './plans-detail.page';
import { ComponentsModule } from '../../components/components.module';
import { CalendarModule} from 'ion2-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlansDetailPageRoutingModule,
    ComponentsModule,
    CalendarModule
  ],
  declarations: [PlansDetailPage]
})
export class PlansDetailPageModule {}