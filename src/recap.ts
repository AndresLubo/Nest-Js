const myName = 'Andres';
const myAge = 22;

const suma = (a: number, b: number) => a + b;

suma(20, 30);

class Persona {
  constructor(private age: number, private name: string) { } //! Ya no es necesario asignarlos directamente, podemos emplear este atajo para el constructor

  getSumary() {
    return `Mi nombre es ${this.name} y tengo ${this.age} años`;
  }
}

const clase = new Persona(22, 'Andres');

console.log(clase);
