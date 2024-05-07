import { inject } from "@angular/core"
import { Router } from "@angular/router"
import { AuthenticatedUsersService } from "./authenticated-users.service"

export let className = ''

export const canActivateTeam = ()=>{

    const authentication = inject(AuthenticatedUsersService)


    return authentication.isAuthenticated()
    
    /* if(authentication.isAuthenticated()){
        const router = inject(Router)    
        return true
    }else{
        const router = inject(Router)

        router.navigate([''])

        return false
    } */
}

// restrictics user from going index page unless logged out

// you must logout to see index page
export const Restrictions = ()=>{

    const authentication = inject(AuthenticatedUsersService)
    
    if(!authentication.isAuthenticated()){
        const router = inject(Router) 
        return true
    }else{
        const router = inject(Router) 
        router.navigate([''])        
        return false
    }

}