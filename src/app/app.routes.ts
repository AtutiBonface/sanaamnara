import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Restrictions, canActivateTeam } from './services/authguard';
import { CreateComponent } from './pages/create/create.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { SavedpostsComponent } from './pages/savedposts/savedposts.component';
import { MypostsComponent } from './pages/myposts/myposts.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';

export const routes: Routes = [
    
    {
        path: '',
        component: HomeComponent,
        canActivate: [canActivateTeam]
    },
    {
        path: 'unauth',
        loadComponent: ()=> import('./pages/unauthenticated/unauthenticated.component').then(e=>e.UnauthenticatedComponent),
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

    },
    {
        path: 'my/_settings',
        component: SettingsComponent,
        canActivate: [canActivateTeam]

    },

    {
        path: 'profile/changes',
        component: EditProfileComponent,
        canActivate: [canActivateTeam]

    },

    
    
    
    
    
    
];
