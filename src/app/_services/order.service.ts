import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Order } from '@app/_models';

const baseUrl = `${environment.apiUrl}/ordenes`;

@Injectable({ providedIn: 'root' })
export class OrderService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Order[]>(baseUrl);
    }

    getById(id: string) {
        return this.http.get<Order>(`${baseUrl}/${id}`);
    }

    create(params: any) {
        return this.http.post(baseUrl, params);
    }

    update(id: string, params: any) {
        return this.http.put(`${baseUrl}/${id}`, params);
    }

    delete(id: string) {
        return this.http.delete(`${baseUrl}/${id}`);
    }
}
