import { MembersEditComponent } from './../members/members-edit/members-edit.component';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: MembersEditComponent): boolean {
      if(component.editForm.dirty) {
        return confirm("You Have made changes, are you sure you want to leave .. any unsaved changes will be lost")
      }
      return true;
  }

}
