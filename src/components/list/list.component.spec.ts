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
import {By} from "@angular/platform-browser";
import {Observable, Subject} from "rxjs";
import {Column} from "../../model/column";
import {Action} from "../../model/action";
import {TestItem, RouterStub} from "../../test/mock";
import {ListItemComponent} from "../list-item/list-item.component";
import {Router} from "@angular/router";

describe('ListComponent', () => {
    let fixture: ComponentFixture<ListComponent>;
    let comp: ListComponent;

    let columns: {[id: string]: Column};
    let rowAction: Action;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListComponent, ListItemComponent],
            providers: [
                {provide: Router, useClass: RouterStub}
            ]
        })
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListComponent);
        comp = fixture.componentInstance;

        let subject = new Subject<TestItem[]>();
        subject.startWith([{id: 1, name: 'I am item', nested: {id: 1, name: 'I am nested'}}]);

        columns = {
            'id': {sortable: true},
            'name': {sortable: false, title: 'Display Name', action: {path: '/items', property: 'id'}},
            'nested.name': {sortable: false, action: {path: '/nested/item', property: 'nested.id'}}
        };

        rowAction = {path: '/items', property: 'id'};

        comp.items = subject.asObservable();
        comp.rowAction = rowAction;
        comp.columns = columns;

        comp.init();

        fixture.detectChanges();
    });

    it('should raise sort event when clicked', () => {
        let selectedCol: string;
        comp.onSort.subscribe((col: string) => selectedCol = col);

        let elem = fixture.debugElement.query(By.css('th:first-child'));
        elem.triggerEventHandler('click', null);
        expect(selectedCol).toBe(Object.keys(columns)[0]);
    });
});
