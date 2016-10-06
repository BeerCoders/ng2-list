import {Component, Input, Output, EventEmitter, SimpleChange, OnChanges} from '@angular/core';
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Entity} from "../../model/entity";
import {Column} from "../../model/column";
import {Action} from "../../model/action";
import {ObjectService} from "../../services/static/object.service";
import {SortEvent} from "../../model/sort_event";

declare var _: any;

@Component({
    selector: 'bc-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnChanges {
    @Input() items: Observable<Entity[]>;
    @Input() columns: {[id: string]: Column};
    @Input() rowAction: Action;
    @Output() onSort: EventEmitter<SortEvent> = new EventEmitter<SortEvent>();

    protected properties: string[] = [];

    constructor(private router: Router) {
        this.init();
    }

    ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
        if (changes['columns']) {
            this.init();
        }
    }

    init() {
        this.setColumnTitle();
        this.setProperties();
    }

    sort(key: string) {
        let col = this.getColumn(key);
        if (col && col.sortable) {
            this.toggleSort(col);
            this.onSort.next({
                key: key,
                sort: col.sort
            });
        }
    }

    onRowClick(item: Entity) {
        if (this.rowAction) {
            let property = ObjectService.getByString(item, this.rowAction.property);
            this.router.navigate([this.rowAction.path, property]);
        }
    }

    isSortable(key: string): boolean {
        let col = this.getColumn(key);
        return col ? col.sortable : false;
    }

    getTitle(key: string) {
        let col = this.getColumn(key);
        return col ? col.title : '';
    }

    getColumn(key: string): Column {
        return this.columns[key];
    }

    setProperties() {
        if (this.columns) {
            this.properties = Object.keys(this.columns);
        }
    }

    setColumnTitle() {
        if (this.columns) {
            Object.keys(this.columns).map(key => {
                if (!this.columns[key].title) {
                    this.columns[key].title = _.camelCase(key);
                }
            });
        }
    }

    toggleSort(col: Column) {
        switch (col.sort) {
            case 'asc':
                col.sort = 'desc';
                break;
            default:
                col.sort = 'asc';
                break;
        }
    }
}
