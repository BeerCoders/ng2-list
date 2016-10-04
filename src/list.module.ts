/**
 * This file is part of the ng2-list package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from "./list.component";
import {Config} from "./config";

@NgModule({
    imports: [CommonModule],
    declarations: [ListComponent],
    exports: [ListComponent]
})
export class ListModule {
    static forRoot(config: Config): ModuleWithProviders {
        return {
            ngModule: ListModule,
            providers: [
                {provide: Config, useValue: config }
            ]
        };
    }
}
