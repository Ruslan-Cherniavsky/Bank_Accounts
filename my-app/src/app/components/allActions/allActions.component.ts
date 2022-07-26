import { Component, Input } from '@angular/core'
import { IActions } from 'src/app/models/models'

@Component({
    selector: 'allActions',
    templateUrl: './allActions.component.html'

})
export class AllActionsComponent {
    @Input() actions: IActions

    details = false
} 