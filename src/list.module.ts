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
import {ListComponent} from "./components/list/list.component";
import {ListItemComponent} from "./components/list-item/list-item.component";

@NgModule({
    imports: [CommonModule],
    declarations: [ListComponent, ListItemComponent],
    exports: [ListComponent]
})
export class ListModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ListModule,
            providers: []
        };
    }
}
