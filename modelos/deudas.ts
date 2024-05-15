
export interface deudas {
    id_deudas: any,
    id_fraccionamiento: any,
    id_tesorero: any,
    monto: any,
    nombre: any,
    descripcion: any,
    dias_gracia: any,
    periodicidad: any,
    recargo: any,
    proximo_pago1: any,
    proximo_pago: any,

    };
    
    export class deuda {
        id_deudas: any;
        id_fraccionamiento: any;
        id_tesorero: any;
        monto: any;
        nombre: any;
        descripcion: any;
        dias_gracia: any;
        periodicidad: any;
        recargo: any;
        proximo_pago1: any;
        proximo_pago: any

        };


        
export interface deudores {
    id_deuda: any;
    concepto: any;
    persona: any; 
    monto: any;
    proximo_pago1: any;
    proximo_pago: any,

    };
    
    export class deudor {
        id_deuda: any;
        concepto: any;
        persona: any;
        monto: any;
        proximo_pago1: any;
        proximo_pago: any

        };
        