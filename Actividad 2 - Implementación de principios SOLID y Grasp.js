window.onload = function() {

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
            console.log('dando de Alta el equipo en la base de datos.....');
            document.body.innerHTML = `<h1>Principio de responsabilidad única</h1><br><br><h3>dando de alta el equipo ${equipo.nombre} en la base de datos..<h3>`;
        }
        darBajaEquipo(equipo) {
            console.log('dando de baja el equipo de la base de datos.....');
            document.body.innerHTML = `<h1>Principio de responsabilidad única</h1><br><br><h3>dando de baja el equipo ${equipo.nombre} de la base de datos..<h3>`;

        }

    }
    let equipo = new Equipo('Autoclave', 'Gnatus', '12l', 'gib1234');
    let inventario = new gestionEquipo();
    inventario.darBajaEquipo(equipo);








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
        imprimir(documento) {
            //codigo para impresion 
        }
    }

    class Pdf extends Imprimible {
        constructor(nombre, tamaño) {
            super();
            this.name = nombre;
            this.size = tamaño;
        }

        // sobreescribiendo el metodo de la clase padre 
        imprimir(documento) {
            console.log('imprimiendo PDF de ' + this.name);
            document.body.innerHTML = `<h1> Principio abierto/cerrado</h1><br><br><h3>imprimiendo PDF ${this.name}.....<h3><br>`;
        }
    }

    class Png extends Imprimible {
        constructor(nombre) {
            super();
            this.name = nombre;
        }

        // sobreescribiendo el metodo de la clase padre 
        imprimir(documento) {
            console.log('imprimiendo PNG de ' + this.name);
            document.body.innerHTML = `<h1> Principio abierto/cerrado</h1><br><br><h3>imprimiendo PNG ${this.name}.....</h3><br>`;
        }
    }
    class Impresion {
        imprimirArchivo(file) {
            file.imprimir();
        }
    }

    let documento1 = new Pdf('fundamentos en Pdf', 14);

    let impresora = new Impresion(documento1);

    impresora.imprimirArchivo(documento1);





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
            console.log('El area es  ' + area);
            document.body.innerHTML = `<h1>  Principio de Sustitución de Liskow</h1><br><br><h3>El area es  ${area}.....</h3><br>`;

        });
    }

    let cuadro = new Cuadrado(25);
    let calcular = [];
    calcular.push(cuadro);
    renderLargeRectangles(calcular);
    //=========================================================================================
    //                                         Principio de Segregación de Interfaces
    //=========================================================================================


    /* Al incluir en la clase abstracta Car los métodos de una clase concreta, en este caso 'carroMaquinaTiempo', obligamos a que todas las
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
            console.log('arrancanco el motor...');
        }
        acelerar() {
            console.log('acelerando....');
        }
    }

    const maquinaDelTiempo = Super => class extends Super {
        volverAlPasado() {
            console.log('viajando al pasado');
        }
        irAlFuturo() {
            console.log('viajando al futuro...');
        }
    };

    class carroMaquinaTiempo extends maquinaDelTiempo(Carro) {
        arrancarMotor() {
            console.log('arrancando el motor...');
            document.body.innerHTML = `<h1>  Principio de Segregación de Interfaces</h1><br><br><h3>arrancando el motor...`;
        }
        acelerar() {
            console.log('acelerando....');
            document.body.innerHTML = `<h1>  Principio de Segregación de Interfaces</h1><br><br><h3>acelerando el motor...`;
        }
        volverAlPasado() {
            console.log('viajando al pasado');
            document.body.innerHTML = `<h1>  Principio de Segregación de Interfaces</h1><br><br><h3>viajando al pasado...`;
        }
        irAlFuturo() {
            console.log('viajando al futuro...');
            document.body.innerHTML = `<h1>  Principio de Segregación de Interfaces</h1><br><br><h3>viajando al futuro...`;
        }
    }

    let vehiculoHiperSonico = new carroMaquinaTiempo();

    vehiculoHiperSonico.irAlFuturo();

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
            console.log('Calculando el costo de la bebida....');
            document.body.innerHTML = `<h1>  Principio de Inversión de Dependencias</h1><br><br><h3>Calculando el costo de la bebida...`;
        }
    }

    class Cafe extends Bebida {
        costo() {
            console.log('Calculando el costo de del cafè....');
            document.body.innerHTML = `<h1>  Principio de Inversión de Dependencias</h1><br><br><h3>Calculando el costo del cafè...`;
        }
    }

    let pedido = new Cafe();
    pedido.costo();

};