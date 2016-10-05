/**
 * This file is part of the ng2-list package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";
import {Entity} from "../../model/entity";
import {Column} from "../../model/column";
import {ObjectService} from "../../services/static/object.service";

@Component({
    selector: 'bc-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
    @Input() item: Entity;
    @Input() properties: string[];
    @Input() columns: {[id: string]: Column};

    constructor(private router: Router) {}

    protected onClick(key: string) {
        if (this.hasAction(key)) {
            let action = this.getAction(key);
            let property = ObjectService.getByString(this.item, action.property);
            this.router.navigate([action.path, property]);
        }
    }

    getValue(key: string) {
        return ObjectService.getByString(this.item, key);
    }

    hasAction(key: string): boolean {
        return this.columns[key].hasOwnProperty('action');
    }

    getAction(key: string) {
        return this.columns[key].action
    }

    hasCallback(key: string): boolean {
        return this.columns[key].hasOwnProperty('callback');
    }

    getCallback(key: string) {
        return this.columns[key].callback
    }

    getCallbackHtml(key: string): string {
        let callback = this.getCallback(key);
        return callback(this.item);
    }
}
