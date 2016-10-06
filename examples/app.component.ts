/**
 * This file is part of the ng2-list package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import {Component} from '@angular/core';
import {Observable} from "rxjs";

interface Item{
    id:number;
    name:string;
    nested?:Nested;
}

interface Nested{
    id:number;
    name:string;
}

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    protected items$: Observable<Item[]>;
    protected action: {path:'/items', property:'id'};
    protected columns = {
        'id': {sortable:true, sort: 'desc'},
        'name': {sortable:false, title:'Display Name', action:{path:'/items', property:'id'}},
        'nested.name': {sortable:false, action:{path:'/nested/item', property:'nested.id'}},
        'callback': {sortable:false, callback:this.customColumn},
    };

    constructor() {
        //load items here
    }

    customColumn(item){
        return '<button>{{ item.id }}</button>';
    }
}
