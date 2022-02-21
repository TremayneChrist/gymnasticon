import {PrimaryService} from '@abandonware/bleno';
import {HeartRateMeasurementCharacteristic} from './charateristics/heart-rate-measurement';

/**
 * Bluetooth LE GATT Heart Rate Service implementation.
 */
export class HeartRateService extends PrimaryService {
  /**
   * Create a HeartRateService instance.
   */
  constructor() {
    super({
      uuid: '180D',
      characteristics: [
        new HeartRateMeasurementCharacteristic()
      ]
    })
  }

  /**
   * Notify subscriber (e.g. Zwift) of new Heart Rate Measurement.
   * @param {object} measurement - new heart rate measurement.
   * @param {number} measurement.hr - current heart rate (bpm)
   */
  updateMeasurement(measurement) {
    this.characteristics[0].updateMeasurement(measurement)
  }
}
