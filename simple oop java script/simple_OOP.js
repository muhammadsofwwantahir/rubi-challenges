class carFactory {
  constructor(brand) {
      this.carProduction = Math.floor(Math.random() * 8) + 1;
    }
    bikinMobil(){
        let resultCar = [];
        let makePerari = new Perari ();
        let makeLambo = new Lambo ();
        let makePiat = new Piat ();
        for (let i = 0; i < this.carProduction; i++) {
          resultCar.push(makePerari.buildPerari())
          resultCar.push(makeLambo.buildLambo())
          resultCar.push(makePiat.buildPiat())
        }
        console.log(this.carProduction);
        console.log(resultCar);
    }
}

class Car {
  constructor(ban, kursi, pintu) {
          this.ban = new Tyre();
          this.kursi = Math.floor(Math.random() * 5) + 1;
          this.pintu = Math.floor(Math.random() * 5) + 1;
        }
  warrantyProduct() {
      let year = (Math.floor(Math.random() * 5) + 1) + ' tahun';
      return year;
  }
}

class Tyre {
  constructor() {
      const brandOfTyre = ['Michelin', 'Achilles', 'GoodYear', 'Hankook', 'Falken'];
      this.brand = brandOfTyre[Math.floor(Math.random() * 4)];
      // console.log(Math.floor(Math.random() * 4))
  }
}

class Perari extends Car {
  buildPerari() {
      let carParts = {
          carBrand: 'Perari',
          kursi: this.kursi,
          pintu: this.pintu,
          Tyre: this.ban.brand,
          warranty: this.warrantyProduct()
      }
      return carParts;
  }
}

class Lambo extends Car {
  buildLambo() {
      let carParts = {
          carBrand: 'Lambo',
          kursi: this.kursi,
          pintu: this.pintu,
          Tyre: this.ban.brand,
          warranty: this.warrantyProduct()
      }
      return carParts;
  }
}

class Piat extends Car {
  buildPiat() {
      let carParts = {
          carBrand: 'Piat',
          kursi: this.kursi,
          pintu: this.pintu,
          Tyre: this.ban.brand,
          warranty: this.warrantyProduct()
      }
      return carParts;
  }
}

let carResult = new carFactory();
carResult.bikinMobil();