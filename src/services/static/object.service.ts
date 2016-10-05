/**
 * This file is part of the ng2-list package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

declare var _:any;

export class ObjectService {
    static getByString(target:any, path:string) {
        return _.reduce(path.split('.'), (previous:any, current:any) => previous ? previous[current] : undefined, target);
    }
}
