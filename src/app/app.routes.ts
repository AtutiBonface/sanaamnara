import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { IndexComponent } from './pages/index/index.component';
import { Restrictions, canActivateTeam } from './utils/authguard';
import { ProfileComponent } from './pages/profile/profile.component';
import { CreateComponent } from './pages/create/create.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { SavedpostsComponent } from './pages/savedposts/savedposts.component';
import { MypostsComponent } from './pages/myposts/myposts.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [canActivateTeam]
    },
    {
        path: 'index',
        component: IndexComponent,
        canActivate: [Restrictions]   

    },
    {
        path: ':username',
        component: MypostsComponent,
        canActivate: [canActivateTeam]

    },
    {
        path: ':username/posts',
        component: MypostsComponent,
        canActivate: [canActivateTeam]

    }, {
        path: ':username/saved',
        component: SavedpostsComponent,
        canActivate: [canActivateTeam]

    },  
    {
        path: 'posts/create',
        component: CreateComponent,
        canActivate: [canActivateTeam]

    },
    {
        path: 'posts/:id',
        component: CheckoutComponent,
        canActivate: [canActivateTeam]

    } 

    
    
    
];
