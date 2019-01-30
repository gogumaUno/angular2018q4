import { CoursesService } from "./services/courses.service";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { BorderColorDirective } from "./directives/border-color.directive";
import { borderColorProvider } from "./providers/border-color.provider";
import { CourseItemComponent } from "./components/course-item/course-item.component";
import { CoursesHomeComponent } from "./components/courses-home/courses-home.component";
import { CoursesListComponent } from "./components/courses-list/courses-list.component";
import { CoursesRoutingModule } from "./courses-routing.module";
import { DurationPipe } from "./pipes/duration.pipe";
import { FilterPipe } from "./pipes/filter.pipe";
import { SharedModule } from "../shared/shared.module";
import { OrderByPipe } from "./pipes/order-by.pipe";
import { StorageProvider } from "./providers/storage.provider";

@NgModule({
  declarations: [
    CoursesHomeComponent,
    CoursesListComponent,
    CourseItemComponent,
    BorderColorDirective,
    DurationPipe,
    FilterPipe,
    OrderByPipe,
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule
  ],
  providers: [
    borderColorProvider,
    CoursesService,
    StorageProvider
  ]
})
export class CoursesModule { }
