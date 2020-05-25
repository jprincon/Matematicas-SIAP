import { Component, OnInit, Inject } from '@angular/core';
import { Resumen, Correo, Usuario } from '../../../interfaces/interfaces.interfaces';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'app-evaluar-resumen-emem',
  templateUrl: './evaluar-resumen-emem.component.html',
  styles: []
})
export class EvaluarResumenEmemComponent implements OnInit {

  resumen: Resumen;
  correo: Correo = {
    correo: '',
    asunto: '',
    mensaje: ''
  };

  participante: Usuario = {
    correo: ''
  };

  mensaje: string;

  constructor(private servicioGeneral: GeneralService,
              public dialogRef: MatDialogRef<EvaluarResumenEmemComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

      this.resumen = data.resumen;
      this.correo.asunto = 'Evaluación del Resumen';
      this.correo.correo = '';
    }

  ngOnInit() {
    this.leerDatosResumen();
  }

  leerDatosResumen() {
    console.log(this.resumen);
    this.servicioGeneral.getParticipante(this.resumen.idAutor).subscribe((rParticipante: Usuario) => {
      console.log(rParticipante);
      this.participante = rParticipante;
      this.correo.correo = this.participante.correo;
      this.correo.asunto = 'Evaluación del Resumen';
      this.correo.mensaje = `Cordial Saludo, desde el comité científico del Workshop EMEM,
le indicamos que su resumen titulado "${this.resumen.titulo}" en la modalidad de "${this.resumen.tipo}" ha sido: `;
    });
  }

  evaluacion(estado: string) {
    this.correo.mensaje = this.correo.mensaje + estado;
    this.resumen.evaluado = estado;
    const datos = JSON.stringify(this.resumen);

    this.servicioGeneral.putResumen(datos).subscribe((rRespuesta: any) => {
      console.log(rRespuesta);

      const correo = JSON.stringify(this.correo);
      this.servicioGeneral.postEnviarCorreo(correo).subscribe((rCorreo: any) => {
        console.log(rCorreo);

        this.dialogRef.close(rCorreo);
      });
    });
  }

}
