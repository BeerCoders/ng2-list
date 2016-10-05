/**
 * This file is part of the ng2-list package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import {Action} from "./action";
import {Entity} from "./entity";

export interface Column {
    sortable: boolean;
    title?: string;
    action?: Action;
    callback?: (arg: Entity)=>string;
}
