import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Almacen, Equipo } from '../models/equipos';
import { EquiposService } from '../service/equipos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrar-equipos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registrar-equipos.component.html',
  styleUrls: ['./registrar-equipos.component.css'],
})
export class RegistrarEquiposComponent implements OnInit {
  registrarForm: FormGroup;
  almacenes: Almacen[] = []; // Para almacenar los almacenes disponibles

  manejarModal: boolean = false;
  mensajeModal: string = '';
  errorModal: string = '';
  imagenPreview: string | ArrayBuffer | null = null;
  @Output() listarEquipo = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private equiposService: EquiposService) {
    // Inicializar el formulario con los controles necesarios
    this.registrarForm = this.fb.group({
      nombreEquipo: [''],
      marca: [''],
      modelo: [''],
      estadoUsoEquipo: [''],
      vidaUtil: [''],
      fechaAdquiscion: [''],
      almacen: [''],
      imagenEquipos: [''],
    });
  }

  ngOnInit(): void {
    this.loadAlmacenes(); // Cargar almacenes al iniciar el componente
  }

  loadAlmacenes() {
    this.equiposService.getAlmacen().subscribe((data) => {
      this.almacenes = data;
    });
  }

  registrarEquipos() {
    const formData = new FormData(); // Usar FormData para incluir la imagen y los datos

    // Añadir cada campo del formulario al formData
    formData.append(
      'nombreEquipo',
      this.registrarForm.get('nombreEquipo')?.value
    );
    formData.append('marca', this.registrarForm.get('marca')?.value);
    formData.append('modelo', this.registrarForm.get('modelo')?.value);
    formData.append(
      'estadoUsoEquipo',
      this.registrarForm.get('estadoUsoEquipo')?.value
    );
    formData.append('vidaUtil', this.registrarForm.get('vidaUtil')?.value);
    formData.append(
      'fechaAdquiscion',
      this.registrarForm.get('fechaAdquiscion')?.value
    );
    formData.append('almacen', this.registrarForm.get('almacen')?.value);
    formData.append(
      'imagenEquipos',
      this.registrarForm.get('imagenEquipos')?.value
    );

    // Registrar equipo
    this.equiposService
      .registrarEquipos(formData as unknown as Equipo)
      .subscribe(
        (response) => {
          this.mensajeModal = 'Equipo registrado exitosamente';
          this.manejarModal = true;
        },
        (error) => {
          this.errorModal = 'Error al registrar el equipo';
          this.manejarModal = true;
        }
      );
  }
  manejarOk() {
    this.manejarModal = false; // Cerrar el modal
    this.listarEquipo.emit(); // Emitir el evento para listar usuarios
  }

  // Manejar la selección de archivo
  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.registrarForm.patchValue({
        imagenEquipos: file,
      });
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagenPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}