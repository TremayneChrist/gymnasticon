import {Characteristic, Descriptor} from '@abandonware/bleno';

/**
 * Bluetooth LE GATT Heart Rate Measurement Characteristic implementation.
 */
export class HeartRateMeasurementCharacteristic extends Characteristic {
  constructor() {
    super({
      uuid: '2a37',
      properties: ['notify'],
      descriptors: [
        new Descriptor({
          uuid: '2902',
          value: Buffer.alloc(2)
        })
      ]
    })
  }

  /**
   * Notify subscriber (e.g. Zwift) of new Heart Rate Measurement.
   * @param {object} measurement - new heart rate measurement.
   * @param {number} measurement.hr - current heart rate (bpm)
   */
  updateMeasurement({ hr }) {
    let flags = 0;

    const value = Buffer.alloc(8);
    value.writeInt16LE(hr, 2);

    value.writeUInt16LE(flags, 1); // use uint16 bpm

    if (this.updateValueCallback) {
      this.updateValueCallback(value)
    }
  }
}
