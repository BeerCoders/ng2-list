/**
 * This file is part of the ng2-list package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
export interface TestItem {
    id: number;
    name: string;
    nested?: TestNested;
}

export interface TestNested {
    id: number;
    name: string;
}

export class RouterStub {
    navigateByUrl(url: string) {
        return url;
    }
}