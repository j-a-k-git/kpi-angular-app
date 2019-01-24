import { AbstractControl, ValidatorFn } from '@angular/forms';

export class DateValidators {
    private static _valid(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            let valid = false;
            if (Object.prototype.toString.call(control.value) === "[object Date]") {
                if (!isNaN(control.value.getTime())) {
                    valid = true;
                }
            }
            return valid ?
                null :
                { 'validdate': { value: control.value } };
        }
    }
    static get valid(): ValidatorFn { return this._valid() }
}