import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from 'src/guards/auth.guard';

const appRoutes: Routes = [
    { path: '', component: LoginComponent  },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]  },

];

export const routing = RouterModule.forRoot(appRoutes);