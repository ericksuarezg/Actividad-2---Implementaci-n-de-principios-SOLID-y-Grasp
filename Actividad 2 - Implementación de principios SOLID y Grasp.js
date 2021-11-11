//==================================================================================================
//                                       Principio de responsabilidad única
//==================================================================================================

// el metodo 'darBajaEquipo' no deberia estar presente dentro de la clase 'Equipo' 
//puesto que esa tarea sera propia de otra clase que se encargara de vigiarel invntario 
class Equipo {
    constructor(nombre, marca, modelo, serie) {
        this.nombre = nombre;
        this.marca = marca;
        this.modelo = modelo;
        this.serie = serie;

    }

    get dataEquipo() {
        let data = {
            nombre: this.nombre,
            marca: this.marca,
            modelo: this.modelo,
            serie: this.serie
        };
        return data;
    }


    darBajaEquipo(equipo) {
        // al servidor para dar de baja el equipo
    }


}


// de esta manera cada clase se encarga de tareas especificas y es mas eficiente

class Equipo {
    constructor(nombre, marca, modelo, serie) {
        this.nombre = nombre;
        this.marca = marca;
        this.modelo = modelo;
        this.serie = serie;

    }

    get dataEquipo() {
        let data = {
            nombre: this.nombre,
            marca: this.marca,
            modelo: this.modelo,
            serie: this.serie
        };
        return data;
    }
}

class gestionEquipo {
    darAltaEquipo(equipo) {
        // al inventario y hojas de vida para dar el alta
    }
    darBajaEquipo(equipo) {
        // al servidor para dar de baja el equipo
    }
}









//=============================================================================================
//                                              Principio abierto/cerrado
//=============================================================================================

// supongamos que tenemos un documento y debemos imprimirlo,
//En este caso solo imprimiria documentos  PDF Y PNG,
// si quisieramos imprimir o tro tipo de formato tendriamos que modificar el metodo 'impresion'

class Pdf {
    constructor(nombre, tamaño) {
        this.name = nombre;
        this.size = tamaño;
    }

    // ...
}
class Png {
    constructor(nombre) {
        this.name = nombre;
    }

    // ...
}
class Impresion {
    printFile(file) {
        if (file instanceof Pdf) {
            // imprime Pdf...
        } else if (file instanceof Png) {
            // imprime Png...
        }
    }
}


//para solicionar esto seria combeiente  que cada tipo de archivo tiviese su propio metodo de impresion 
//de esta manera si agregaramos otro documento solo tendriamos que crear una nva clase  extendiendo de la clase 'Imprimible'
// y sorbreescribier el emtodo de impresion, lo cual haria que no tubieramos que modificar el codigo solo extenderlo.
class Imprimible {
    imprimir() {
        // ...
    }
}

class Pdf extends Imprimible {
    constructor(nombre, tamaño) {
        super();
        this.name = nombre;
        this.size = tamaño;
    }

    // sobreescribiendo el metodo de la clase padre 
    imprimir() {
        // ...
    }
}

class Png extends Imprimible {
    constructor(nombre) {
        super();
        this.name = nombre;
    }

    // sobreescribiendo el metodo de la clase padre 
    imprimir() {
        // ...
    }
}
class Impresion {
    imprimirArchivo(file) {
        file.print();
    }
}






//===========================================================================================
//                                              Principio de Sustitución de Liskow
//===========================================================================================

/* 'Cuadrado' sobrescribe los métodos setHeight y setWidth con un comportamiento diferente que 
provoca que getArea devuelva un valor inesperado al calcular el area del cuadrado. */


class Rectangulo {
    constructor() {
        this.ancho = 0;
        this.alto = 0;
    }

    setWidth(ancho) {
        this.ancho = ancho;
    }

    setHeight(alto) {
        this.alto = alto;
    }

    getArea() {
        return this.ancho * this.alto;
    }
}


class Cuadrado extends Rectangulo {

    setWidth(ancho) {
        this.ancho = ancho;
        this.alto = ancho;
    }

    setHeight(alto) {
        this.ancho = alto;
        this.alto = alto;
    }
}

function renderLargeRectangles(rectangulos) {
    rectangulos.forEach((rectangulo) => {
        rectangulo.setWidth(4);
        rectangulo.setHeight(5);
        const area = rectangulo.getArea();
    });
}
const rectangulos = [new Rectangulo(), new Rectangulo(), new Cuadrado()];
renderLargeRectangles(rectangulos);


/* Cada clase que hereda de otra puede usarse como su padre sin necesidad de
 conocer las diferencias entre ellas, esto nos obliga asegurarnos que cuando
  extendemos una clase no alteramos el comportamiento de la clase padre. */


class Rectangulo {
    constructor(ancho, alto) {
        this.ancho = ancho;
        this.alto = alto;
    }

    getArea() {
        return this.ancho * this.alto;
    }
}

class Cuadrado extends Rectangulo {
    constructor(lado) {
        super(lado, lado);
    }
}

function renderLargeRectangles(rectangulos) {
    rectangulos.forEach((rectangulo) => {
        const area = rectangulo.getArea();
    });
}
//=========================================================================================
//                                         Principio de Segregación de Interfaces
//=========================================================================================


/* Al incluir en la clase abstracta Car los métodos de una clase concreta, en este caso DeloRean, obligamos a que todas las
 clases que implementan nuestra interfaz o clase abstracta también implementen esos métodos. */

class Carro {
    arrancarMotor() {}
    acelerar() {}
    volverAlPasado() {}
    irAlFuturo() {}
}

class Fiat extends Carro {
    arrancarMotor() {
        // arranca el motor ...
    }
    acelerar() {
        // acelera...
    }
}

class carroMaquinaTiempo extends Carro {
    start() {
        // arranca el motor ...
    }
    acelerar() {
        // acelera...
    }
    volverAlPasado() {
        // ir al pasado...
    }
    irAlFuturo() {
        // ir al futuro...
    }
}


/* Al separar las interfaces podemos implementar concreciones mucho mejor. */


class Carro {
    arrancarMotor() {}
    acelerar() {}
}

class Fiat extends Carro {
    arrancarMotor() {
        // start engine...
    }
    acelerar() {
        // accelerate...
    }
}

const maquinaDelTiempo = Super => class extends Super {
    volverAlPasado() {}
    irAlFuturo() {}
};

class carroMaquinaTiempo extends maquinaDelTiempo(Carro) {
    arrancarMotor() {
        // arranca el motor ...
    }
    acelerar() {
        // acelera...
    }
    volverAlPasado() {
        // volver al pasado...
    }
    irAlFuturo() {
        // volver al futuro...
    }
}

//========================================================================================
//                    Principio de Inversión de Dependencias
//========================================================================================


/* Se pretende reducir el acoplamiento entre los componentes del software todo lo que se pueda con el uso de abstracciones, así una clase interactúa
 con otra sin que se conozcan directamente lo que hace que el diseño sea más fácil de cambiar. */
class Leche {
    // implementacion
}

class Cafe {
    constructor(Leche) {
        this.Leche = Leche
    }

    costo() {
        // calcula el costo
    }
}



/* La clase Cafe tiene que conocer la clase Leche para poder calcular el coste del café con lo que nos acoplamos mucho más a esa clase concreta. */
class Ingredientes {
    // implementacion
}

class Leche extends Ingredientes {
    // implementacion
}

class Bebida {
    constructor(ingrediente) {
        this.ingrediente = ingrediente
    }

    costo() {
        // calcula el costo
    }
}

class Cafe extends Bebida {
    costo() {
        // calcula el costo
    }
}