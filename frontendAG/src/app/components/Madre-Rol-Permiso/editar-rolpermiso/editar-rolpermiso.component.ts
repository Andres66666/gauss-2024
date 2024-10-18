import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { RolPermiso } from '../models/rol-permiso';
import { RolPermisoService } from '../services/rol-permiso.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Rol } from '../../MadreRol/models/rol';
import { Permiso } from '../../MadrePermiso/models/permiso';
import { PermisoService } from '../../MadrePermiso/services/permiso.service';
import { RolService } from '../../MadreRol/services/rol.service';

@Component({
  selector: 'app-editar-rolpermiso',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './editar-rolpermiso.component.html',
  styleUrl: './editar-rolpermiso.component.css',
})
export class EditarRolpermisoComponent implements OnInit {
  rolPermiso!: RolPermiso; // El objeto RolPermiso que vamos a editar
  roles: Rol[] = []; // Lista de roles disponibles
  permisos: Permiso[] = []; // Lista de permisos disponibles

  form!: FormGroup;
  manejarModal: boolean = false;
  mensajeModal: string = '';
  errorModal: string = '';
  @Input() rolPermisoId: number | null = null;
  @Output() listarRolPermisoEditado = new EventEmitter<void>();
  constructor(
    private rolPermisoService: RolPermisoService,
    private rolService: RolService,
    private permisoService: PermisoService
  ) {}

  ngOnInit(): void {
    // Cargar roles y permisos
    this.loadRoles();
    this.loadPermisos();

    if (this.rolPermisoId !== null) {
      this.loadRolPermisoData(this.rolPermisoId);
    } else {
      console.error('rolPermisoId es nulo o indefinido');
    }
  }

  loadRolPermisoData(id: number): void {
    this.rolPermisoService.getRolPermisoById(id).subscribe({
      next: (data) => {
        this.rolPermiso = data;
        this.initializeForm();
      },
    });
  }

  // Cargar los roles disponibles desde el backend
  loadRoles(): void {
    this.rolService.getRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
      },
    });
  }

  // Cargar los permisos disponibles desde el backend
  loadPermisos(): void {
    this.permisoService.getPermisos().subscribe({
      next: (permisos) => {
        this.permisos = permisos;
      },
    });
  }

  initializeForm(): void {
    this.form = new FormGroup({
      rol: new FormControl(this.rolPermiso.rol.id, Validators.required),
      permiso: new FormControl(this.rolPermiso.permiso.id, Validators.required),
    });
  }

  onSubmit(): void {
    if (this.rolPermiso) {
      const updatedRolPermiso: RolPermiso = {
        id: this.rolPermiso.id,
        rol: {
          id: this.rolPermiso.rol.id,
          nombreRol: this.rolPermiso.rol.nombreRol,
          activo: this.rolPermiso.rol.activo,
        },
        permiso: {
          id: this.rolPermiso.permiso.id,
          nombre: this.rolPermiso.permiso.nombre,
          descripcion: this.rolPermiso.permiso.descripcion,
          activo: this.rolPermiso.permiso.activo,
        },
      };
      this.rolPermisoService
        .editarRolPermiso(this.rolPermiso.id, updatedRolPermiso)
        .subscribe(() => {
          this.mensajeModal = 'Rol Permiso Actualizado con exito';
          this.manejarModal = true;
        });
    }
  }
  manejarOk() {
    this.manejarModal = false; // Cerrar el modal
    this.listarRolPermisoEditado.emit(); // Emitir el evento para listar usuarios
  }
}