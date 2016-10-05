import {Component, Input, Output, EventEmitter, SimpleChange, OnChanges} from '@angular/core';
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Entity} from "../../model/entity";
import {Column} from "../../model/column";
import {Action} from "../../model/action";
import {ObjectService} from "../../services/static/object.service";

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
    @Output() onSort: EventEmitter<string> = new EventEmitter<string>();

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
            this.onSort.next(key);
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
}
