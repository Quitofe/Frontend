import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Administración',
                items: [
                    { label: 'Admin', icon: 'pi pi-fw pi-home', routerLink: ['/admin'] },
                    { label: 'Perfil', icon: 'pi pi-fw pi-user', routerLink: ['/admin/perfil'] }
                ]
            },
            {
                label: 'Inventario',
                items: [
                    { label: 'Categoria', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/formlayout'] },
                    { label: 'Producto', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/input'] }
                ]
            },
            {
                label: 'Pedidos',
                items: [
                    { label: 'Lista Pedidos', icon: 'pi pi-fw pi-shopping-cart', routerLink: ['/admin/pedido'], badge: 'New' },
                    { label: 'Nuevo Pedidos', icon: 'pi pi-fw pi-shopping-cart', routerLink: ['/admin/pedido/nuevo'], badge: 'New' },
                    { label: 'Cliente', icon: 'pi pi-fw pi-shopping-cart', routerLink: ['/admin/cliente'], target: '_blank' }
                ]
            },
            {
                label: 'Roles y Usuarios',
                items: [
                    { label: 'Usuarios', icon: 'pi pi-fw pi-users', routerLink: ['/utilities/icons'] },
                    { label: 'Roles', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
                ]
            }
        ];
    }
}
