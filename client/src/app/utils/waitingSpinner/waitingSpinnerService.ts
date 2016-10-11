/**
 * Created by Oleksandr.Khymenko on 22.08.2016.
 */

import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";



@Injectable()
export class WaitingSpinnerService {

    private loadingCount: number = 0;

    startLoading$: Subject<any> = new BehaviorSubject('');

    stopLoading$: Subject<any> = new BehaviorSubject('');

    showSpinner$: Subject<any> = new BehaviorSubject(false);

    constructor() {
        this.startLoading$.subscribe(() => {
            if (this.loadingCount === 0) {
                this.loadingCount++;
                this.showSpinner$.next(true);
                return;
            }

            this.loadingCount++;
        });

        this.stopLoading$.subscribe(() => {
            this.loadingCount--;
            if (this.loadingCount === 0) {
                this.showSpinner$.next(false);
            }
        })
    }
}