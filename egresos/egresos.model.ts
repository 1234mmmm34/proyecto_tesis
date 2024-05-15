export class Egresos {
    id_egreso: number;
    concepto: string;
    descripcion: string;
    proveedor: string;
    monto: number;
    fecha: string;
    constructor( 
        id_egreso: number,
        concepto: string,
        descripcion: string,
        proveedor: string,
        monto: number,
        fecha: string,)
        {
        this.id_egreso=id_egreso;
        this.concepto=concepto;
        this.descripcion=descripcion;
        this.proveedor=proveedor;
        this.monto=monto;
        this.fecha=fecha;

        }
}
