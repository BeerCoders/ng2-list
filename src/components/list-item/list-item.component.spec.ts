/**
 * This file is part of the ng2-list package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import {async, TestBed, ComponentFixture} from '@angular/core/testing';
import {Router} from "@angular/router";
import {ListItemComponent} from "./list-item.component";
import {Column} from "../../model/column";
import {TestItem, RouterStub} from "../../test/mock";

describe('ListItemComponent', () => {
    let fixture: ComponentFixture<ListItemComponent>;
    let comp: ListItemComponent;
    let expectedItem: TestItem;
    let expectedProp: string[];
    let expectedCols: {[id: string]: Column};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListItemComponent],
            providers: [
                {provide: Router, useClass: RouterStub}
            ]
        })
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListItemComponent);
        comp = fixture.componentInstance;

        expectedItem = {id: 1, name: 'I am item', nested: {id: 1, name: 'I am nested'}};
        expectedProp = ['id', 'name', 'nested.name'];
        expectedCols = {
            'id': {sortable: true},
            'name': {sortable: false, title: 'Display Name', action: {path: '/items', property: 'id'}},
            'nested.name': {sortable: false, action: {path: '/nested/item', property: 'nested.id'}}
        };
        comp.item = expectedItem;
        comp.properties = expectedProp;
        comp.columns = expectedCols;
        fixture.detectChanges();
    });

    it('should return name value', () => {
        expect(comp.getValue('name')).toEqual(expectedItem.name);
    });
});
