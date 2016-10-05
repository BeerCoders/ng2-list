/**
 * This file is part of the ng2-list package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import {async, TestBed, ComponentFixture} from '@angular/core/testing';
import {ListComponent} from "./list.component";

describe('ListComponent', () => {
    let fixture: ComponentFixture<ListComponent>;
    let comp: ListComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListComponent],
        })
    }));

    // beforeEach(() => {
    //     fixture = TestBed.createComponent(ListComponent);
    //     comp = fixture.componentInstance;
    //
    //     fixture.detectChanges();
    // });
});
