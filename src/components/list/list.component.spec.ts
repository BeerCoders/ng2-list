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
import {Subject} from "rxjs";
import {Column} from "../../model/column";
import {Action} from "../../model/action";
import {TestItem, RouterStub} from "../../test/mock";
import {ListItemComponent} from "../list-item/list-item.component";
import {Router} from "@angular/router";
import {SortEvent} from "../../model/sort_event";

describe('ListComponent', () => {
    let fixture: ComponentFixture<ListComponent>;
    let comp: ListComponent;

    let columns: {[id: string]: Column};
    let rowAction: Action;
    let items = [{id: 1, name: 'I am item', nested: {id: 1, name: 'I am nested'}}];
    let subject :Subject<TestItem[]>;

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

        subject = new Subject<TestItem[]>();

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
        comp.onSort.subscribe((event: SortEvent) => selectedCol = event.key);

        let elem = fixture.debugElement.query(By.css('th:first-child'));
        elem.triggerEventHandler('click', null);

        expect(selectedCol).toBe(Object.keys(columns)[0]);
    });

    it('should subscribe items', () => {
        let expectedItems:TestItem[];

        comp.items.subscribe((data:TestItem[]) => expectedItems=data);
        subject.next(items);
        expect(expectedItems.length).toBe(items.length);

        if(items.length > 0){
            expect(expectedItems[0].id).toBe(items[0].id);
        }
    });
});
